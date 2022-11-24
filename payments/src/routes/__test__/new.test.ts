import { OrderStatus } from "@microticketingapp/common";
import mongoose, { mongo } from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/orders";

it("Returns a 4040 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin())
    .send({
      token: "adsfadf",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("return a 401 when purchasing an order that doesnot belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin())
    .send({
      token: "adsfadf",
      orderId: order.id,
    })
    .expect(401);
});

it("return a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 10,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin(userId))
    .send({
      token: "adsfadf",
      orderId: order.id,
    })
    .expect(400);
});