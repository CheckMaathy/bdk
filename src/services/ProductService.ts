import { prisma } from "../database/prismaClient";

interface ICreateProduct {
  name: string;
  price: string;
  quantity: string;
}

export class ProductService {
  async execute({ name, price, quantity }: ICreateProduct) {
    const productExist = await prisma.product.findFirst({
      where: {
        name: {
          mode: "insensitive"
        }
      }
    });

    if (productExist) {
      throw new Error("Product already exists");
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        quantity
      }
    });

    return product;
  }

  async list() {
    const listOrders = await prisma.product.findMany();

    return listOrders;
  }
}