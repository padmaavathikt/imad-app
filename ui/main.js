/*
var button = document.getElementById("counter");


button.onclick = function () {
  
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
          }
      }
  }
  
  request.open('GET', 'http://padmavathythiruvenkadam.imad.hasura-app.io/counter');
  request.send(null);
};
*/

//submit button event handler
var submitBtn = document.getElementById("submitbtn");
submitBtn.style.visibility = "hidden";

var pwd = document.getElementById("password");
pwd.style.visibility = "hidden";

var loginBtn = document.getElementById("loginbtn");
loginBtn.onclick = function () {
   //send request to server and name as param
   var request = new XMLHttpRequest();
   
   request.onreadystatechange = function () {
       if(request.readyState === XMLHttpRequest.DONE) {
           if(request.status === 200){
               console.log("User logged in");
               alert('Logged in successfully');
           } else if (request.status === 403){
               console.log("Username/password invalid");
           } else if (request.status === 500){
               console.log("something went wrong on the server");
           }
       }
   }
   
   //submit input value
    var username = document.getElementById("username").value;
    var password = 'password';
    //document.getElementById("password").value;
   
   console.log(username);
   console.log(password);
   request.open('POST', 'http://padmavathythiruvenkadam.imad.hasura-app.io/login', true);
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username:username, password:password}));
};

var regBtn = document.getElementById("registerbtn");
regBtn.onclick=function () {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readystate === XMLHttpRequest.DONE){
            if (request.status === 200) {
                console.log("User registered");
            }
        }
    }
    
    var username = document.getElementById('username').value;
    var password = 'password';
    
    console.log(username);
    console.log(password);
    
    request.open('POST', 'http://padmavathythiruvenkadam.imad.hasura-app.io/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username:username, password:password}));
};

var logoutBtn = document.getElementById("submit2");
logoutBtn.onclick = function () {
    var request = new XMLHttpRequest();
    
    request.onreadystatechanged = function () {
        if (request.readystate === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert('you are logged out');
            }
        }
    }
    
    request.open('GET', 'http://padmavathythiruvenkadam.imad.hasura-app.io/logout', true);
    request.send(null);
};