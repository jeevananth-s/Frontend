//odd/even
let input_number=50;
if(input_number%2==0){
    console.log("even");
    
}else{
    console.log("odd");
    
}
//negative and non-negative
if(input_number==0){
    console.log("Zero");
    
}else if(input_number < 0){
    console.log("negative");
    
}else{
    console.log("positive");
    
}
//eligiblity
let age=28;
if(age<18){
console.log("Not-Eligible");

}else{
    console.log("eligible");
    
}






//login validation
let username="Jeeva"
let input_name="Jeeva"
let input_password="1234"
let user_password="1234"
if(input_name==username && input_password==user_password){
    console.log("Login Success");
} else{
    console.log("Login Failed");
    
}
//discount
let price=2000;
if(price>1000){
    console.log("10% Discount");
    
}else{
    console.log("No Discount");
    
}

//grade 
let marks=95;
if(marks>=90){
    console.log("Grade A");
    
}else if(marks>50 && marks<=75){
    console.log("Grade B");
    
}else if(marks>=50){
    console.log("Grade C");
    
}else{
    console.log("Fail");
    
}
//leap year
let year=2026;
if(year%4==0){
    console.log("leap year");
    
}else{
    console.log("Non-Leap year");
    
}

let number=15;
if(number%3==0 && number%5==0){
    console.log("Divisible by both 3 and 5");
    
}else if(number%3==0){
    console.log("divisible by 3");
    
}else if(number%5==0){
    console.log("divisible by 5");
    
}else{
    console.log("Not divisible by 3 and 5")
}

// temperature
let temperature=18;
if(temperature>30){
    console.log("hot");
    
}else if(temperature<30 && temperature>20){
    console.log("normal");
    
}else if(temperature<=20){
    console.log("cold");
    
}else{
    console.log("invalid temperature")
}

//range
let given_number=15;
if(given_number <= 50 && given_number>=10){
    console.log("Beteeen 10 to 50");
    
}else{
    console.log("not in range");
    
}