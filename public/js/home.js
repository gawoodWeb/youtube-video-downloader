

const urlsubmit = document.querySelector("form#urlsubmit")
urlsubmit.addEventListener("submit",(e)=>{
  e.preventDefault()
  
  
  
  if(urlsubmit.link.value.length > 10){
    POST_URL(urlsubmit.link.value)
    
  }else{
    alert("Provide a good url...")
  }
  
  
})


function POST_URL(url){
  
  window.fetch("http://localhost:3000/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
      url: url
    })
  })
    .then((res)=>res.json())
    .then((msg)=>{
      alert(msg);
    });
    
  
  
}



