import { prisma } from "../database/prismaClient";

interface ICreateProduct {
  customer_id: string;
  total_price: string;
  products: [{
    id: string;
    quantity: string;
  }];
}

export class OrderService {
  async execute({ customer_id, total_price, products }: ICreateProduct) {
    const customerExist = await prisma.customer.findFirst({
      where: {
        id: {
          equals: customer_id
        }
      }
    });

    for (let product in products) {
      const productExist = await prisma.product.findFirst({
        where: {
          id: products[product].id
        }
      });

      if(!productExist) {
        throw new Error(`Validation Error: product ${products[product].id} not found`);
      }
    }

    if (!customerExist) {
      throw new Error("Validation Error");
    }

    const order = await prisma.order.create({
      data: {
        customer_id,
        total_price,
        products
      }
    });

    return order;
  }

  async list() {
    const listOrders = await prisma.order.findMany();

    return listOrders;
  }
}