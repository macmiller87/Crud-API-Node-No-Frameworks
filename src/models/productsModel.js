import { PrismaService } from "../database/prisma/prismaService.js";

export class ProductsModelRepository {
    _database;

    constructor(prismaService = new PrismaService) {
        this._database = prismaService;
    }

    async create(data) {
        const create = await this._database._prismaService.products.create({
            data: data
        });

        return create;
    }

}