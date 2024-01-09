import express from "express";
import prisma from "./prisma";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      message: "Hello World",
    });
  } catch (err: any) {
    res.send(err.message);
  }
});

app.listen(5125, () => {
  console.log("Server is running on port 5125");
});
