const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

//database connection check
db.connect((err) => {
  if (err) {
    console.log(err, "err");
  }
  console.log("database connected");
});

//get all users data from database
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err, "error");
    } else {
      res.send({
        message: "all user data",
        data: result,
      });
    }
  });
});

//get single user data
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        message: "returned user data",
        data: result,
      });
    }
  });
});

//create user data
app.post("/api/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  db.query(
    "INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)",
    [name, email, mobile],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          message: "user added successfully",
          data: result,
        });
      }
    }
  );
});

//update user data
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;

  db.query(
    "UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?",
    [name, email, mobile, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send({
        message: "user updated successfully",
      });
    }
  );
});

//delete single user data
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("user deleted successfully");
      res.send({
        message: "user deleted successfully",
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
