$('ul').on('click','li',function(){
    $(this).toggleClass("completed");
});

$('input[type="text"]').keypress(function(ev){
    if(ev.which == 13){
        var text=$(this).val();
        $(this).val('');
        if(text!='')
           $('ul').append("<li><span><i class='fa fa-trash'></i></span> "+text+"</li>");
    }
});

$('ul').on('click','span',function(ev){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    ev.stopPropagation();
});

$('.fa-plus').click(function(){
    $('input[type="text"]').fadeToggle();
});