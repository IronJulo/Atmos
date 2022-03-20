const express = require('express')
const app = express()
const port = 3005
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/', (req, res, next) => {
    console.log("Collector sent data")
    console.log(req.body)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})