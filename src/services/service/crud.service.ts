import { Service } from "../../entities/service";
import { PgDataSource } from "../../integrations/postgresql";
import { IServiceData } from "../../interfaces/serviceData";

export class ServiceCrudService {
    private serviceRepo = PgDataSource.getRepository(Service);

    async create(data: IServiceData) {
        try {
            const service = await this.serviceRepo.findOne({ where: { name: data.name } });

            if (service) {
                return 409;
            }

            const newService = this.serviceRepo.create({ name: data.name });
            return await this.serviceRepo.save(newService);
        } catch (error) {
            throw error;
        }
    }

    async findOne(name: string) {
        try {
            return await this.serviceRepo.findOne({ where: { name } });
        } catch (error) {
            throw error;
        }
    }

    async find() {
        try {
            return await this.serviceRepo.find();
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            return await this.serviceRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
