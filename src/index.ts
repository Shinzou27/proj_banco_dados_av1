import express from "express";
import { main } from "./main";
import cors from 'cors'

const app = express();

app.use(cors())

const PORT = 3000;

app.get("/", async(req, res) => {
    try{
        const pageSize = req.query.pageSize as string
        const searchWord = req.query.searchWord as string
        const result = await main(Number(pageSize || 10), searchWord)

        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send("Erro Interno")
    }
  res.send();
});

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
