import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "POC API",
            description: "API for create Products, Orders and Customers (POC Acronym)",
            termsOfService: "http://localhost:3333/terms",
            contact: {
                email: "gc.matheus.wesleys@gmail.com"
            },
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3333",
                description: "API for develop test"
            },
        ],
    },
    apis: ["./src/routes.ts"],
}

export const specs = swaggerJSDoc(options);