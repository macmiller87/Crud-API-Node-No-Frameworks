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

    async listProduct(product_id) {
        const find = await this._database._prismaService.products.findUnique({
            where: {
                product_id: product_id
            }
        });

        return find;
    }

    async updateProduct(product_id, price) {
        const update = await this._database._prismaService.products.update({
            where: {
                product_id: product_id
            },
            data: {
                price: price
            }
        });

        return update;
    }

    async findProductById(product_id) {
        const find = await this._database._prismaService.products.findUnique({
            where: {
                product_id: product_id
            }
        });

        return find;
    }

}