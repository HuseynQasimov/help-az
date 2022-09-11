import { Request, Response } from "express";
import { AuthorizationService } from "../../services/nurse/auth.service";
import { authValidation } from "../../utils/validations/authValidation";

export class AuthController {
    private authService = new AuthorizationService();

    async login(req: Request, res: Response) {
        try {
            const { error } = authValidation.validate(req.body);

            if (error) {
                return res.status(400).json(error.message);
            }

            const resp = await this.authService.login(req.body);

            if (resp === 404) {
                return res.status(403).json("Email or password is incorrect");
            }

            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
