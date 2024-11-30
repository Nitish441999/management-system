import express from "express"
const app = express()
const port =9000;
app.use("/",(req, resp) =>{
    resp.json({message:"Hello I am Express"})
})
app.listen(9000, () =>{
    console.log(`starting server on port ${port}`)
})