const express = require("express");
const route = require('./routers/mainRouters')
const {sequelize} = require("./models")
const app = express();
const errorHandler = require("./middlewares/errorHandler")
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(route);





app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await sequelize.authenticate();
  console.log("Connected to database")
});