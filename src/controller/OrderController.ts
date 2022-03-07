import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
  async handle(request: Request, response: Response) {
    const { customer_id, total_price, products } = request.body;

    const orderUseCase = new OrderService();
    const result = await orderUseCase.execute({ customer_id, total_price, products });

    return response.json(result);
  }

  async list(request: Request, response: Response) {
    const limit = parseInt(request.params.limit);
    const page = parseInt(request.params.page);

    const orderUseCase = new OrderService();
    const result = await orderUseCase.list({ limit, page });

    return response.json(result);
  }

  async listByDate(request: Request, response: Response) {
    const date = request.params.date;

    const orderUseCase = new OrderService();
    const result = await orderUseCase.listByDate(date);

    return response.json(result);
  }
}