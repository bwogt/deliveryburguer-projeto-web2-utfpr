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

    //variáveis de controle do pedido
    let cont_hamb1 = 0;
    let cont_hamb2 = 0;

    //incrementa a quantidade no pedido - tipo do hamburguer tradicional
    //verifica se atingiu o limite do pedido (6 unidades) do mesmo tipo de hamburguer
    $('#button-add-unit-hamb1').click(function(){
        cont_hamb1++;
        if(cont_hamb1 <= 6){
            $('#card-content-hamb1 > +p').text('Seu pedido: '+cont_hamb1);
            $('#button-buy-item').css('display', 'block');

        }
        else{
            cont_hamb1 = 6;
            window.alert('Limite máximo atingido... (6 unidades)')
        }
    })

    //decrementa a quantidade exibida no card do produto - tipo do hamburguer tradicional
    $('#button-remove-unit-hamb1').click(function(){
        cont_hamb1--;
        if(cont_hamb1 >= 0){
            $('#card-content-hamb1 > +p').text('Seu pedido: '+cont_hamb1);
        }else{
            $('#button-buy-item').css('display', 'none');
            cont_hamb1= 0;
            window.alert('Você não possui nenhuma unidade no seu pedido')
        }
    })
    //incrementa a quantidade no pedido - tipo do chesse burguer
    //verifica se atingiu o limite do pedido (6 unidades) do mesmo tipo de hamburguer
    $('#button-add-unit-hamb2').click(function(){
        cont_hamb2++;
        if(cont_hamb2 <= 6){
            $('#card-content-hamb2 > +p').text('Seu pedido: '+cont_hamb2);
        }
        else{
            cont_hamb2 = 6;
            window.alert('Limite máximo atingido... (6 unidades)')
        }
    })
    
    //decrementa a quantidade exibida no card do produto - tipo do hamburguer tradicional
    $('#button-remove-unit-hamb2').click(function(){
        cont_hamb2--;
        if(cont_hamb2 >= 0){
            $('#card-content-hamb2 > +p').text('Seu pedido: '+cont_hamb2);
        }
        else{
            cont_hamb2 = 0;
            window.alert('Você não possui nenhuma unidade no seu pedido')
        }
    })

   }); 
}();
