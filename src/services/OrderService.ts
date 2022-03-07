import { prisma } from "../database/prismaClient";

interface ICreateOrder {
  customer_id: string;
  total_price: string;
  products: [{
    id: string;
    quantity: string;
  }];
}

interface IPaginated {
  page: number;
  limit: number;
}


export class OrderService {
  async execute({ customer_id, total_price, products }: ICreateOrder) {
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

  async list({ limit, page }: IPaginated) {
    const listOrders = await prisma.order.findMany({
      skip: page,
      take: limit,
      orderBy: {
        total_price: 'desc',
      },
    });

    return listOrders;
  }

  async listByDate(date: string) {
    const hasOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          in: date
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!hasOrders) {
      throw new Error("No orders found in selected Date");
    }

    return hasOrders;
  }
}