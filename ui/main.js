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

//submit input value
var nameInput = document.getElementById("name");
var name1 = nameInput.value;

//submit button event handler
var submitBtn = document.getElementById("submitbtn");
submitBtn.onclick = function () {
   //send request to server and name as param
   alert("hi");
   //get list from server and display it
   var names = ["name1", "name2", "name3", "name4"];
   var lis = "";

   for(var i=0; i< names.length; i++)
   {
       lis += "<li>" + names[0] + "</li>";
   }

   var ul = getElementById("nameList");
   ul.innerHTML = lis;
};