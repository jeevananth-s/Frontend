let count = 0
let button = document.getElementById("button")
let display = document.getElementById("count")
button.addEventListener("click",() => {
    count += 1
    display.innerHTML= count 
})