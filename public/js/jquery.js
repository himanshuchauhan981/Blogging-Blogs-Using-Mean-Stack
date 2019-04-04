$('document').ready(function(){
    $('.input-highlight').on("focusin",function(){
        $(this).closest('div').find('label').css({"color":"#563D7C"})
    });
    $('.input-highlight').on("focusout",function(){
        $(this).closest('div').find('label').css({"color":"black"})
    })
})
