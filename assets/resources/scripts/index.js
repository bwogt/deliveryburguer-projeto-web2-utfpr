//Module Pattern
+ function () {
   //espera o html ser carreado
   $(document).ready(function(){
    
    //exibe e oculta o conteudo do card hamburguer e bebidas - acesso pelo id
    $('#button-hamb1').click(function(){
        $('#card-content-hamb1').slideToggle('fast');
    })

    $('#button-hamb2').click(function(){
        $('#card-content-hamb2').slideToggle('fast');
    })

    $('#button-hamb3').click(function(){
        $('#card-content-hamb3').slideToggle('fast');
    })

    $('#button-drink1').click(function(){
        $('#card-content-drink1').slideToggle('fast');
    })

    $('#button-drink2').click(function(){
        $('#card-content-drink2').slideToggle('fast');
    })

    $('#button-drink3').click(function(){
        $('#card-content-drink3').slideToggle('fast');
    })

   }); 
}();
