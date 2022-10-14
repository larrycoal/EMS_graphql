const mongoose = require("mongoose");
mongoose.connect(
);
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Databse");
});
