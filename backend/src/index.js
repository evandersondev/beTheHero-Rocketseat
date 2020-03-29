const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("server running on http://localhost:3333");
});
