import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import * as dotenv from 'dotenv'
import userRouter from './src/modules/users/user.router.js'
import taskRouter from './src/modules/tasks/task.router.js'
import categoryRouter from './src/modules/categories/category.router.js'
const app = express()
const port = 3000

dotenv.config()
app.use(express.json())


app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/task',taskRouter)

dbConnection()


app.use((err,req,res,next)=>{
    res.json(err)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port||process.env.PORT, () => console.log(`Example app listening on port ${port}!`))