import { Nurse } from "../../entities/nurse";
import { PgDataSource } from "../../integrations/postgresql";
import { INurseRegistrationData } from "../../interfaces/nurseRegistrationData";
import bcrypt from "bcrypt";

export class NurseCrudService {
    private nurseRepo = PgDataSource.getRepository(Nurse);

    async create(data: INurseRegistrationData) {
        try {
            const nurse = await this.nurseRepo.findOne({ where: { email: data.email } });

            if (nurse) {
                return 409;
            }

            const salt = await bcrypt.genSalt(6);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            const nurseInstance = this.nurseRepo.create({ ...data, password: hashedPassword });
            return { ...(await this.nurseRepo.save(nurseInstance)), password: null };
        } catch (error) {
            throw error;
        }
    }

    async find(filter: any) {
        try {
            const status = filter.status || "active";
            const limit = filter.limit || 10;
            const skip = filter.skip || 0;

            const nurses = await this.nurseRepo
                .createQueryBuilder("nurse")
                .where("nurse.status = :status", { status })
                .select([
                    "nurse.id",
                    "nurse.full_name",
                    "nurse.email",
                    "nurse.mobile_number",
                    "nurse.address",
                    "nurse.experience",
                    "nurse.social_media",
                    "nurse.photo",
                    "nurse.created_at",
                    "nurse.status",
                ])
                .leftJoinAndSelect("nurse.appointments", "appointments")
                .skip(skip)
                .take(limit)
                .orderBy("nurse.created_at", "ASC")
                .getMany();

            return { ...nurses, count: nurses.length };
        } catch (error) {
            throw error;
        }
    }
}
