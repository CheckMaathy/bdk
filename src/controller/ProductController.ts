import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { OrderService } from "../services/OrderService";

export class ProductController {
  async handle(request: Request, response: Response) {
    const { name, price, quantity } = request.body;

    const productUseCase = new ProductService();
    const result = await productUseCase.execute({
      name,
      price,
      quantity
    });

    return response.json(result);
  }

  async list(request: Request, response: Response) {
    const productUseCase = new ProductService();
    const result = await productUseCase.list();

    return response.json(result);
  }
}