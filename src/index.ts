import express from "express";
import { main } from "./main";

const app = express();
const PORT = 3000;

app.get("/", async(req, res) => {
    try{
        const searchWord = req.query.searchWord as string
        const result = await main(searchWord)

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
