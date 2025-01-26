const video_cart = document.querySelector(".video-details")
const selvideo = document.querySelector("#after-video")

const linkInp = document.querySelector("#link")


const selectvideo = document.querySelector("form#selectvideo")
const urlsubmit = document.querySelector("form#urlsubmit")
console.log(urlsubmit)



urlsubmit.addEventListener("submit",(e)=>{
  e.preventDefault()
  alert('submiting')
  if(urlsubmit.link.value.length > 3){
    POST_URL(urlsubmit.link.value)
  }else{
    alert("PROVIDE A GOOD URL...")
  }
  
  
})

selectvideo.addEventListener("submit",(e)=>{
  e.preventDefault()
  alert('submiting')
  
  let list = Array.from(e.target.querySelectorAll("input:checked")) || []
  
  console.log(list)
  let list2 = []
  list.forEach(item=>{
      console.log(item.value)
      item.value != ""? list2.push(item.value) : console.log(item)
      
  })
  
  window.fetch("http://localhost:3000/video", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body : JSON.stringify({
      formatId: list2,
      url: link.value
    })
  }).then((res)=>{
      return res.json()
  })
  .then((data)=>{
      alert(data.message)
        window.fetch("http://localhost:3000/download", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        filePath: data.filePath // Replace with your actual file name
    })
})
.then((res) => {
    if (res.ok) {
        return res.blob(); // Get the file as a Blob
    } else {
        throw new Error("Failed to download the file.");
    }
})
.then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "example-file.mp4"; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); // Clean up URL object
})
.catch((err) => {
    console.error("Error downloading file:", err);
});


  })
  
})




function POST_URL(url){
  
  window.fetch("http://localhost:3000/detail", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body : JSON.stringify({
      url: url
    })
  })
    .then((res)=>res.json())
    .then((detail)=>{
       RELOAD_DOM(detail)
    });
    
  
  
}

function TEMPLATE (info){
  return `
        <div>
          <input type="checkbox" name="" id="" value="${info.formatId}" >
        </div>
        <div>
          ${info.size}
        </div>
        <div>
          ${info.resolution}/${info.type}
        </div>
      `;
};

function RELOAD_DOM(msg){
    console.log(msg)
    if(msg && msg.formats){
        msg.formats.forEach((format)=>{

        selvideo.style.backgroundColor = "red"
        let div = document.createElement("div");
        div.classList.add("row")
        div.classList.add("stats-row")
        div.innerHTML = TEMPLATE( format || {size: "20.4m", resolution: "360p", type: "MP4"});

        selvideo.insertAdjacentElement("afterend", div);
 
        })
    }else{
        alert("No msg sended")
    }

    if(msg.formats && Array.isArray(msg.formats && msg.formats.length > 0)){


    }   



    video_cart.querySelector(".details-property h3").innerHTML = msg.title;      
    video_cart.querySelector(".details-property p").innerHTML = msg.desc;
    
    video_cart.querySelector(".details-thumbnail video").poster = msg.poster || "/media/01.png";
    
    video_cart.querySelector(".details-thumbnail video").src = msg.src ||  "/media/games.webm";

}





