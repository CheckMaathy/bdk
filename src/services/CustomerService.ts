import { prisma } from "../database/prismaClient";

interface ICreateCustomer {
  name: string;
  email: string;
  telephone: string;
}

export class CustomerService {
  async create({ name, email, telephone }: ICreateCustomer) {
    const customerExist = await prisma.customer.findFirst({
      where: {
        email: email
      }
    });

    if (customerExist) {
      throw new Error("Customer already exists");
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        telephone
      }
    });

    return customer;
  }

  async list() {
    const listCustomers = await prisma.customer.findMany();

    return listCustomers;
  }
}