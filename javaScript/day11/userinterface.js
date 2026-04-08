const rbtn= document.getElementById("redbtn")
const ybtn = document.getElementById("yellowbtn")
const gbtn = document.getElementById("greenbtn")


const box = document.getElementById("box")

rbtn.addEventListener("click",()=> {
          box.style.backgroundColor= "red"
          box.innerHTML="stay"
})

ybtn.addEventListener("click",()=> {
     box.style.backgroundColor= "yellow"
     box.innerHTML= "pending"
})

gbtn.addEventListener("click",()=> {
     box.style.backgroundColor= "green"
     box.innerHTML = "start"
})