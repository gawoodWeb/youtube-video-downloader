
const express = require("express")
const ejs = require("ejs");
const path = require("path")
//const python = require("python-shell");
const ytb  = require("yt-dlp-exec");
const fs = require("fs")
const app = express();
const crypto = require("crypto")

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
  console.log("Request is processing!",url)
  
  GET_DETAILS(url)
  .then((info)=>{
    console.log("Sending info")
    console.log("Formats");

    
    const formats = FILTER_FORMAT(info.formats) 
    console.log("Working 100% ...")
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
    //console.log(info)
    return info;
  }
  catch(e){
      console.log(e)
    throw e 
  }
}


function FILTER_FORMAT(formats){
  console.log("Format process.")
  if(Array.isArray(formats)){
    console.log("Formating ...")
    return formats
      .filter(format => format.ext && format.filesize) // Garder les formats avec extension et taille
      .map(format => ({
        formatId: format.format_id, // Récupérer l'ID de format
        size: format.filesize ? `${(format.filesize / 1024 / 1024).toFixed(2)} MB` : 'Unknown', // Taille
        type: format.ext || 'Unknown', // Extension du fichier
        resolution: format.height ? `${format.height}p` : 'Unknown', // Résolution
      }));
  }
}

let datas = null

app.post("/video",(req,res)=>{
	let data = req.body	
	let format_id = data.formatId[0]
	let uuid = crypto.randomUUID().slice(0,5);
	const fileName = `${uuid}video_${format_id}.mp4`; //
    const filePath = path.join(FOLDER, fileName);
	
	
	
	console.log(req.body, fileName, filePath)
	
    ytb(data.url, {
        format: format_id ,
        output: filePath
    }).then(output => {
        console.log('Download completed');
        res.status(200)
	    res.json({
            message: "Download successful",
            filePath: `/${fileName}`, // Lien pour accéder au fichier téléchargé
        });
    }).catch(err => {
        console.error(err);
    });
	
	
})




app.post("/download", (req, res) => {
    const { filePath } = req.body;
    console.log("Receive ", filePath)
    if (!filePath) {
        return res.status(400).json({ error: "File path is required." });
    }

    const sanitizedFileName = path.basename(filePath); // Avoid directory traversal
    const fullPath = path.join(__dirname, "downloads", sanitizedFileName);

    if (fs.existsSync(fullPath)) {
        console.log("Sending video")
        res.download(fullPath, sanitizedFileName, (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).send("Failed to download the file.");
            }
        });
    } else {
        res.status(404).send("File not found.");
    }
});


app.listen(3000, ()=>{
	console.log("Running at localhost:3000");
})


