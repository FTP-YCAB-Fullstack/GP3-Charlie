const express = require("express");
const route = require('./routers/mainRouters')

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(route);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});