const express = require("express");
const app = express();
const server = app.listen(3000, function(err) {
  console.log("Server is On Port 3000")
});
