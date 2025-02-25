import express from "express";
import { main } from "./main";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    main()
  res.send();
});

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
