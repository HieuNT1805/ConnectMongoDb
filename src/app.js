const express = require("express");
const port = process.env.PORT;

const userRouter = require("./router/user");
require("./db/db")

const app = express();

app.use(express.json());
app.use('/api/user',userRouter);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})