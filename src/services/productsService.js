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

}