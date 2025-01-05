const express = require("express")
const app = express();


app.get("/",(req, res)=>{
	res.send("Its work")
})


app.listen(3000)
