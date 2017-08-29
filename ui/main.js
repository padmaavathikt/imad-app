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
submitBtn.onclick = function () {
   //send request to server and name as param
   var request = new XMLHttpRequest();
   
   request.onreadystatechange = function () {
       if(request.readyState === XMLHttpRequest.DONE) {
           if(request.status === 200){
                //get list from server and display it
               var names = request.responseText;
               names = JSON.parse(names);
               
               var lis = "";
            
               for(var i=0; i< names.length; i++)
               {
                   lis += "<li>" + names[i] + "</li>";
               }
            
               var ul = document.getElementById("nameList");
               ul.innerHTML = lis;
           }
       }
   }
   
   //submit input value
    var username = document.getElementById("username").value;
    var password = document.getElementById("pasword").value;
   
   request.open('POST', 'http://padmavathythiruvenkadam.imad.hasura-app.io/login', true);
   request.send(JSON.stringify({username:username, password:password}));
};