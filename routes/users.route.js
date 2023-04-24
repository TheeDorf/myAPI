import express from "express";
import db from "../mockdb/index.js";

const userRouter = express.Router();

userRouter.get("/:id?", async (req, res, next) => {
  try {
    let { id } = req.params;
    let data;
    if (id) {
      data = await db.getOne(id);
    } else {
      data = await db.getAll();
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  
   try {
      
    let newUser = req.body;
    let data = await db.add(newUser);
    res.json(data);
   } catch (error) {
      next(error);
   }
});

userRouter.put("/:id", async (req, res, next) => {
   
   try {
    let { id } = req.params;
    let updatedUser = req.body;
    let data = await db.update(id, updatedUser);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
 
   try {
    let { id } = req.params;
   let  data = await db.remove(id);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
