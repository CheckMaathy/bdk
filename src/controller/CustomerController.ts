import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";

export class CustomerController {
  async handle(request: Request, response: Response) {
    const { name, email, telephone } = request.body;

    const customerUseCase = new CustomerService();
    const result = await customerUseCase.create({
      name,
      email,
      telephone
    });

    return response.json(result);
  }

  async list(request: Request, response: Response) {
    const customerUseCase = new CustomerService();
    const result = await customerUseCase.list();

    return response.json(result);
  }
}