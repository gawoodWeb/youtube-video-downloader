const express = require("express")
const ejs = require("ejs");
const path = require("path")
const python = require("python-shell");


const app = express();

app.set("view engine", "ejs");
//app.use(express.static("/static",path.join(__dirname, "public"))) 

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())

/*
const option = {
	//mode : "text",
	//pythonPath : ,
	//pythonOptions: [""],
	scriptPath: "./exec",
	args : ["--url", "https://youtu.be/LjZxeSne67E?si=hiWiOxm_7cfpixGE", "--quality", "480p", "--choice", "audio"]

}



python.PythonShell.run("./down.py", option).then(msg =>{
	console.log("Hy", msg)

})
*/
	
app.get("/",(req, res)=>{
	res.render("home");
})







app.post("/download",(req, res)=>{
	
	console.log(req.body);
  let url = req.body.url;
	const option = {
        //mode : "text",
        //pythonPath : ,
        //pythonOptions: [""],
        scriptPath: "./exec",
        args : ["--url", `${url}`, "--quality", "480p", "--choice", "video"]
	}

  python.PythonShell.send('hello')

	
  python.PythonShell.run("./down.py", option)
	.then(msg =>{                          
	    console.log("Hy", msg);
      res.json("downloading");
	})
})










app.listen(3000, ()=>{
	console.log("Running at localhost:3000");
})


