import express from "express";
const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price, desc} = req.body;
  const newTea = { id: nextId++, name, price, desc };
  teaData.push(newTea);
  res.status(201).send(newTea);
  console.log(teaData);
});
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// update

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id))

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price, desc } = req.body;
  tea.name = name
  tea.price = price
  tea.desc = desc
  res.status(200).send(tea);
});

// delete
app.delete("/teas/:id", (req, res) => {

  console.log("delete");
  console.log(req.params.id);
  
  
  const index = teaData.findIndex( t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  
    // Remove the item from the array
  teaData.splice(index, 1);
  res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
