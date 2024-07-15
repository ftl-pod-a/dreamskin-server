const express = require('express');
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

const productRoute = require("./route/productRoute");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('I see you ...')
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use("/products", productRoute);

