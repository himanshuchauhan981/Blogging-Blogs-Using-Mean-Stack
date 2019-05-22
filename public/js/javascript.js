showPassword = (data)=>{
   var click = document.getElementById(data);
   if(click.type=="password"){
      click.type="text";
   }
   else{ 
      click.type="password";
   }
}