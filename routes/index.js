import express from "express";
import userRouter from "./users.route.js"
import clientRouter from "./clients.routes.js"
// TODO: import router from users.route

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("working");
});

router.use("/users",userRouter);
// TODO: use the imported router to handle all routes matching "/users"
router.use("/clients", clientRouter);
export default router;
