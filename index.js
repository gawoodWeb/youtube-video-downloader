const express = require("express")
const ejs = require("ejs");
const path = require("path")
const app = express();

app.set("view engine", "ejs");
//app.use(express.static("/static",path.join(__dirname, "public"))) 

app.use('/static', express.static(path.join(__dirname, 'public')))


app.get("/",(req, res)=>{
	res.render("home");
})


app.listen(3000, ()=>{
	console.log("Running at localhost:3000");
})


