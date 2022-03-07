import { prisma } from "../database/prismaClient";

interface ICreateCustomer {
  name: string;
  email: string;
  telephone: string;
}

export class CustomerService {
  async create({ name, email, telephone }: ICreateCustomer) {
    const telephoneValidator: RegExp = /\(\d{2,}\) \d{4,}\-\d{4}/
    const emailValidator: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!telephoneValidator.test(telephone)) {
      throw new Error("Must be a valid telephone");
    }

    if (!emailValidator.test(email)) {
      throw new Error("Must be a valid email address");
    }

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