const video_cart = document.querySelector(".video-details")

const urlsubmit = document.querySelector("form#urlsubmit")
urlsubmit.addEventListener("submit",(e)=>{
  e.preventDefault()
  
  if(urlsubmit.link.value.length > 10){
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
    .then((msg)=>{
      
      video_cart.querySelector(".details-property h3").innerHTML = msg.title;      
      video_cart.querySelector(".details-property p").innerHTML = msg.desc;
      
      video_cart.querySelector(".details-thumbnail video").poster = msg.poster || "/media/01.png";
      
      video_cart.querySelector(".details-thumbnail video").src = msg.src ||  "/media/games.webm";
      
      
    });
    
  
  
}



