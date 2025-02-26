import express from "express";
import { main } from "./main";
import cors from 'cors'

const app = express();

app.use(cors())

const PORT = 3000;

app.get("/", async (req, res) => {
  let toSend;
  let status;
  try {
    const pageSize = req.query.pageSize as string
    const searchWord = req.query.searchWord as string

    const result = await main(Number(pageSize || 10), searchWord)
    toSend = result
    status = 200;
  } catch (err) {
    console.log(err)
    toSend = "Erro Interno"
    status = 500;
  }
  res.status(status).send(toSend);
});

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
