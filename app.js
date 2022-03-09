const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

const sequelize = require('./database')

const userRoutes = require('./routes/user')

app.use(cors());

app.use(express.json())

app.use('/user', userRoutes)

app.listen(port, async() => {

    await sequelize.sync({ force: false })

    console.log(`Blog app listening at http://localhost:${port}`)

})