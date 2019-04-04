function changeLikeMode(){
   checkColor = document.getElementById('likebutton');
   if(checkColor.style.color =="blue"){
      checkColor.style.color = "black";
      checkColor.style.backgroundColor="white";
   }
   else{
      checkColor.style.color= "blue";
      checkColor.style.backgroundColor = "#4CAF50";
   }
}

function showpassword(){
   var click = document.getElementById('showpasswordClick')
   if(click.type=="password"){
      click.type="text";
   }
   else{
      click.type="password";
   }
}

function getFocus(){
    document.getElementById("comment").focus();
}
