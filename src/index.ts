import express from "express";
import prisma from "./prisma";
import userRouter from "./routes/user.router";
import errorMiddleware from "./middleware/error.middleware";
import memberRouter from "./routes/member.router";
import authRouter from "./routes/auth.router";

const app = express();
app.use(express.json());

//using the router in server
app.use(userRouter, memberRouter, authRouter);
// connect the database first then run run server
app.use(errorMiddleware);
prisma
  .$connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err: any) => {
    console.log("Error connecting to Database: ", err);
  });
