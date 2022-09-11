import { Nurse } from "../../entities/nurse";
import { PgDataSource } from "../../integrations/postgresql";
import { IAuthData } from "../../interfaces/authData";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";

export class AuthorizationService {
    private nurseRepo = PgDataSource.getRepository(Nurse);

    async login(data: IAuthData) {
        try {
            const nurse = await this.nurseRepo.findOne({ where: { email: data.email } });

            if (!nurse || nurse.status === "deactive") {
                return 404;
            }

            const passwordComparison = await bcrypt.compare(data.password, nurse.password);

            if (!passwordComparison) {
                return 404;
            }

            const token = jwt.sign(nurse.email, config.get("secret-key"));

            return { ...nurse, password: null, token };
        } catch (error) {
            throw error;
        }
    }
}
