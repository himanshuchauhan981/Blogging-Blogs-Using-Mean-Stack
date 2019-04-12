function changeLikeMode(){
   checkColor = document.getElementById('likebutton');
   // console.log(checkColor)
   if(checkColor.style.color =="blue"){
      checkColor.style.color = "black";
   }
   else{
      checkColor.style.color= "blue";
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
