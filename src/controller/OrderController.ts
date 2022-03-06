import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
  async handle(request: Request, response: Response) {
    const { customer_id, total_price, id, quantity } = request.body;

    const orderUseCase = new OrderService();
    const result = await orderUseCase.execute({ customer_id, total_price }, { id, quantity });

    return response.json(result);
  }

  async list(request: Request, response: Response) {
    const orderUseCase = new OrderService();
    const result = await orderUseCase.list();

    return response.json(result);
  }
}