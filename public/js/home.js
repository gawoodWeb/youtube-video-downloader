const video_cart = document.querySelector(".video-details")
const selvideo = document.querySelector("#after-video")





  const urlsubmit = document.querySelector("form#urlsubmit")
  urlsubmit.addEventListener("submit",(e)=>{
  e.preventDefault()
  
  if(urlsubmit.link.value.length > 3){
    POST_URL(urlsubmit.link.value)
  }else{
    alert("PROVIDE A GOOD URL...")
  }
  
  
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
          <input type="checkbox" name="" id="">
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
     
    msg.formats.forEach((format)=>{
      
    selvideo.style.backgroundColor = "red"
    let div = document.createElement("div");
    div.classList.add("row")
    div.classList.add("stats-row")
    div.innerHTML = TEMPLATE( format || {size: "20.4m", resolution: "360p", type: "MP4"});
      
    selvideo.insertAdjacentElement("afterend", div);
      
    })
     
     
  if(msg.formats && Array.isArray(msg.formats && msg.formats.length > 0)){
    
    
  }
  
  
  
    video_cart.querySelector(".details-property h3").innerHTML = msg.title;      
      video_cart.querySelector(".details-property p").innerHTML = msg.desc;
      
      video_cart.querySelector(".details-thumbnail video").poster = msg.poster || "/media/01.png";
      
      video_cart.querySelector(".details-thumbnail video").src = msg.src ||  "/media/games.webm";
      
}

