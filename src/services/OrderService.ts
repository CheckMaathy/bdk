import { prisma } from "../database/prismaClient";

interface IProducts {
  id: string;
  quantity: string;
}

interface ICreateProduct {
  customer_id: string;
  total_price: string;
}

export class OrderService {
  async execute({ customer_id, total_price }: ICreateProduct, { id, quantity }: IProducts) {
    const customerExist = await prisma.customer.findFirst({
      where: {
        id: {
          equals: customer_id
        }
      }
    });

    const productExist = await prisma.product.findFirst({
      where: {
        id: {
          equals: id
        }
      }
    });

    if (!customerExist || !productExist) {
      throw new Error("Validation Error");
    }

    const order = await prisma.order.create({
      data: {
        customer_id,
        total_price,
        products: [{
          id,
          quantity
        }]
      }
    });

    return order;
  }

  async list() {
    const listOrders = await prisma.order.findMany();

    return listOrders;
  }
}