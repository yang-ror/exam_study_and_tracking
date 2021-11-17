import express from 'express'
import db from './config/db'
import examRoute from './routes/examRoute'
import questionRoute from './routes/questionRoute'
import optionRoute from './routes/optionRoute'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('ERR:', err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname + '../public/index.html'))
)

examRoute(app)
questionRoute(app)
optionRoute(app)

app.listen(PORT, () =>
	console.log(`Server is running on port ${PORT}`)
)