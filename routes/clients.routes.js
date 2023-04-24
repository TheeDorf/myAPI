import express from "express";
import clients from "../controllers/clients.controller.js";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  let { id } = req.params;
  let data;

  if (id) {
    data = await clients.findOne(id);
  } else {
    data = await clients.findAll();
  }

  res.json(data);
});

router.post("/", async (req, res, next) => {
  let clientsDTO = req.body;
  let data = await clients.addOne(clientsDTO);
  res.json(data);
});

router.put("/:id", async (req, res, next) => {
  let { id } = req.params;
  let clientsDTO = req.body;
  let data = await clients.updateOne(id, clientsDTO);
  res.json(data);
});

router.delete("/:id", async (req, res, next) => {
  let { id } = req.params;
  let data = await clients.removeOne(id);
  res.json(data);
});

export default router;