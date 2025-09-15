import { ProductsModelRepository } from "../models/productsModel.js";

export class ProductsService {
    _productsModelRepository;

    constructor(productsModelRepository = new ProductsModelRepository) {
        this._productsModelRepository = productsModelRepository;
    }

    async create(data) {
        const create = await this._productsModelRepository.create(data);
        return create;
    }

    async listProduct(product_id) {
        const find =  await this._productsModelRepository.listProduct(product_id);
        return find;
    }

    async updateProduct(product_id, price) {
        const update = await this._productsModelRepository.updateProduct(product_id, price);
        return update;
    }

}