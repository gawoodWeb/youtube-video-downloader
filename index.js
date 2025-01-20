const express = require("express")
const ejs = require("ejs");
const path = require("path")
const python = require("python-shell");
const ytb  = require("yt-dlp-exec");
const fs = require("fs")
const app = express();

app.set("view engine", "ejs");
//app.use(express.static("/static",path.join(__dirname, "public"))) 




app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/media', express.static(path.join(__dirname, 'downloads')))
app.use(express.json())


const FOLDER = "downloads"


if(!fs.existsSync(FOLDER)){
  fs.mkdirSync(FOLDER)
}


	
app.get("/",(req, res)=>{
	res.render("home");
})

app.post("/detail",(req, res)=>{
  let url = req.body.url;
  console.log("Request is processing!")
  
  GET_DETAILS(url)
  .then((info)=>{
    console.log("Sending info")
    const formats = FILTER_FORMAT(info.formats)
    
    
    
    res.json({
  	  title: info.title || "How to kill yourself",
  	  desc : info.description || "5 best way to dissaper...",
  	  poster: info.thumbnail || "/media/01.png",
  	  formats: formats,
  	  src :  "http://localhost:3000/media/games.webm" || "/media/games.webm"
  	})
  })
  .catch((e)=>{
    console.error(e)
    res.json({
  	  title: "How to kill yourself",
  	  desc : "5 best way to dissaper...",
  	  poster: "/media/01.png",
  	  formats : [],
  	  src :  "http://localhost:3000/media/games.webm" || "/media/games.webm"
  	})
  })
  
  
})


async function  GET_DETAILS(url){
  
  try {
    console.log("Getting details");
    const info = await ytb(url, {
      noWarnings: true,
      noCallHome: true,
      dumpSingleJson: true
    })
    console.log(info)
    return info;
  }
  catch(e){
    return {err: e}
  }
}


function FILTER_FORMAT(formats){
  console.log("Format process.")
  if(Array.isArray(formats)){
  console.log("Formating ...")
    
    return formats
      .filter(format => format.ext && format.filesize) // Keep formats with size and extension
      .map(format => ({
        size: format.filesize ? `${(format.filesize / 1024 / 1024).toFixed(2)} MB` : 'Unknown',
        type: format.ext || 'Unknown',
        resolution: format.height ? `${format.height}p` : 'Unknown',
      }));
    
  }
  
}


let datas = null

app.post("/video",(req,res)=>{
	console.log(req.body)
	let data = req.body
	res.status(200)
	res.send("Yes")
})





/*****
	
	console.log(req.body);
	let url = req.body.url;
	const option = {
		//mode : "text",
		//pythonPath : ,
		//pythonOptions: [""],
		scriptPath: "./exec",
		args : ["--url", `${url}`, "--quality", "480p", "--choice", "video"]
	}
	
	console.log(req.body);
	
	/*****
	 * res.json({
	  title: "How to kill yourself",
	  desc : "5 best way to dissaper...",
	  poster: "/media/01.png",
	  src : "http://localhost:3000/media/games.webm" || "/media/games.webm"
	});
	
	

	//return
	python.PythonShell.run("./down.py", option)
	.then(msg =>{                          
	    console.log("Hy", msg);
	    res.status(200);
	    res.send("Succesfull");
	})
})

*****/

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

  //python.PythonShell.send('hello')

	res.download(path.join(__dirname, "downloads/games.webm"))
	
	return 
  python.PythonShell.run("./down.py", option)
	.then(msg =>{                          
	    console.log("Hy", msg);
	    

      //res.json("downloading");
	})
	
	
	/*
	res.download("/audi1.mp3", "tatesTalk.mp3", {root: path.join(__dirname, "download")}, 
	function(err){
	  if(err){
	    console.log("GoGo")
	  }
	})
	*/
	
})










app.listen(3000, ()=>{
	console.log("Running at localhost:3000");
})


