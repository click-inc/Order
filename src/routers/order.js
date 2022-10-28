const express = require("express");
const Order = require("../models/order");
// const Cart = require("../models/cart");
const Auth = require("../middleware/auth");

const router = new express.Router();

//get orders
router.get("/orders", Auth, async (req, res) => {
  const owner = req.headers.useId;
  try {
    const order = await Order.find({ owner: owner }).sort({ date: -1 });
    console.log(req.body);
    if (order) {
      return res.status(200).send(order);
    }
    res.status(404).send("No orders found");
  } catch (error) {
    res.status(500).send();
  }
});

//checkout
router.post("/orders/checkout", Auth, async (req, res) => {
  try {
    const owner = req.headers.userid;
    let payload = req.body;
    console.log(req.headers, " , ", payload);
    // const order = new Order({owner:owner,payload.items,});
    const order = await Order.create({
      owner: owner,
      items: payload.items,
      bill: payload.bill,
    });
    console.log(order);
    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send("invalid request");
  }
});

module.exports = router;
