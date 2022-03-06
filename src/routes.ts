import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import {specs} from "./swaggerOptions";
import { CustomerController } from "./controller/CustomerController";
import { OrderController } from "./controller/OrderController";
import { ProductController } from "./controller/ProductController";


const router = Router();

const customerController = new CustomerController();
const orderController = new OrderController();
const productController = new ProductController();

// Customer
router.post("/api/customers", customerController.handle);
router.get("/api/customers", customerController.list);

// Order
router.post("/api/orders", orderController.handle);
router.get("/api/orders", orderController.list);

// Product
router.post("/api/products", productController.handle);
router.get("/api/products", productController.list);

// Documentation
router.get("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
router.get("/terms", (req, res) => {
  return res.json({
    message: "Service Terms"
  })
})

export { router };