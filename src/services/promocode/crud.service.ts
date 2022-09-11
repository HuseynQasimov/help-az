import { Promocode } from "../../entities/promocode";
import { PgDataSource } from "../../integrations/postgresql";
import { IPromoCodeData } from "../../interfaces/promocodeData";

export class PromoCodeCrudService {
    private promoCodeRepo = PgDataSource.getRepository(Promocode);

    async create(data: IPromoCodeData) {
        try {
            const promoCode = await this.promoCodeRepo.findOne({ where: { code: data.code } });

            if (promoCode) {
                return 409;
            }

            const newPromoCode = this.promoCodeRepo.create(data);
            return await this.promoCodeRepo.save(newPromoCode);
        } catch (error) {
            throw error;
        }
    }

    async findOne(code: string) {
        try {
            return await this.promoCodeRepo.findOne({ where: { code } });
        } catch (error) {
            throw error;
        }
    }

    async find() {
        try {
            return await this.promoCodeRepo.find();
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await this.promoCodeRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
