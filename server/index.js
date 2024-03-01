const express = require("express");
require("./config");
const app = express();
const model = require("./data/schema");
const productmodel = require("./data/items");
const cors = require("cors");
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("", async (req, resp) => {
  resp.send("helllo");
});

app.post("/register", async (req, resp) => {
  let data = new model(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  console.log(result);
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let data = await model.findOne(req.body).select("-password");
    if (data) {
      resp.send(data);
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new productmodel(req.body);
  let data = await product.save();
  resp.send(data);
});

app.get("/products", async (req, resp) => {
  let data = await productmodel.find();
  if (data.length > 0) {
    resp.send(data);
  } else {
    resp.send("No Record Found");
  }
});
app.delete("/product/:id", async (req, resp) => {
  const data = await productmodel.deleteOne({ _id: req.params.id });

  if (data.deletedCount === 1) {
    console.log(data);
    console.log("item deleted");
    resp.send(data);
  } else {
    console.log("no item delete");
    resp.send("no record");
  }
});

app.get("/product/:id", async (req, resp) => {
  let data = await productmodel.findOne({ _id: req.params.id });
  if (data) {
    resp.send(data);

    console.log(data);
  } else {
    resp.send("no record found");

    console.log("no record found");
  }
});
app.put("/product/:id", async (req, resp) => {
  let data = await productmodel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

 
  if (data.modifiedCount === 1) {
    resp.send(data);
    console.log(data);
  } else {
    resp.send("No record updated");
    console.log("no update");
  }
});

app.get("/search/:key", async (req,resp)=>{
  const result = await productmodel.find({
    "$or":[
      {name:{$regex : req.params.key}},
      {price:{$regex : req.params.key}},
      {company:{$regex : req.params.key}},
      {category:{$regex : req.params.key}}

    ]
  })
  console.log(result);
  resp.send(result)

})

app.listen(port, () => {
  console.log(`server is ready at port number ${port}`);
});
