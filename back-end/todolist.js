const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const e = require("express");
const app = express();

const port = 3005;
app.use(cors());
app.use(bodyParser.json());
let list = [
  {
    id: 0,
    value: "đi học",
    status: false,
  },
  {
    id: 1,
    value: "đi chơi",
    status: false,
  },
  {
    id: 2,
    value: "đi ngủ",
    status: false,
  },
];
app.get("/todolist", (req, res) => {
  res.json(list);
});

app.post("/todolist", (req, res) => {
  list.push(req.body);
  res.json(list);
});

app.put("/todolist/:id", (req, res) => {
  list = list.map((e, i) => {
    if (Number(req.params.id) === i) {
      return { value: req.body.value, status: req.body.status, id: i };
    } else {
      return e;
    }
  });
  res.json(list);
});

app.delete("/todolist/:id", (req, res) => {
  list.splice(Number(req.params.id), 1);
  list = list.map((e, i) => {
    return { id: i, value: e.value, status: e.status };
  });
  res.json(list);
});

app.listen(port, () => {
  console.log("đã khởi tạo thành công server tại cổng " + port);
});
