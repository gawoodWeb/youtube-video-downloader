const express = require("express")
const ejs = require("ejs");
const path = require("path")
const python = require("python-shell");


const app = express();

app.set("view engine", "ejs");
//app.use(express.static("/static",path.join(__dirname, "public"))) 

app.use('/static', express.static(path.join(__dirname, 'public')))

/*
const option = {
	mode : "text",
	pythonPath : "/data/data/com.termux/files/usr/bin/python",
	pythonOptions: [""],
	scriptPath: "/exec/",
	argv : [""]
}

python.PythonShell.run("down.py", option).then((message)=>{
	console.log("Success.")
})
*/

python.PythonShell.runString('x=1;print(x)', null).then(messages=>{                            
	console.log("Hello"); 
})  

python.PythonShell.run("../../lab/flask_project/main.py", null).then(msg =>{
	console.log("Hy", msg)

})

	
app.get("/",(req, res)=>{
	res.render("home");
})


app.listen(3000, ()=>{
	console.log("Running at localhost:3000");
})


