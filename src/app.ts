import express, { Request, Response } from "express";

const app = express();

app.get("/testing", (req: Request, res: Response) => {
  res.status(200).send("testing");
});

export default app;
