const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const app = express();

app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//    res.send("Hello everyone")
// })

const Connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12345@cluster0.algx8kj.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Db Connected");
  } catch (error) {
    console.log("Error while connecting Database!!", error);
  }
};
Connectdb();

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res)=>{
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is Running on PORT 3000");
});
