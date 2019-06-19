+function () {
    'use strict';
    $(document).ready(function () {
        //ativa o sidenav mobile
        $('.sidenav').sidenav();

        let isConnected = sessionStorage.getItem('logado'),
            existePedido = JSON.parse(sessionStorage.getItem('pedido')),
            desconto = 0;

        //Verifica se existe usuário conectado
        if ((isConnected === 'false') || (isConnected === null)) {
            window.alert('É necessário estar logado para acessar seu carrinho...' +
                '\nVocê sera redirecionado para a página de login');

            window.location.href = 'login.html';
        } else {
            let nameUser = sessionStorage.getItem('display_name');
            if (nameUser !== null) {
                $('.a-menu-login').html('<i class="material-icons left">person_pin</i>' + nameUser);
            }

            /*
                verifica se existe um pedido para exibir e ocultar divs
                **addClass - removeClass**
            */
            if ((existePedido === null) || (existePedido.orderList.length === 0)) {
                $('#div-order-exist').removeClass('hide-content').addClass('show-content');
            } else {
                $('#div-order-exist').removeClass('show-content').addClass('hide-content');
                $('.order-information').removeClass('hide-content').addClass('show-content');

                /*
                    Função aninhada auto executavel
                    Recebe um cupom de desconto
                    **confirm() - alert() - prompt()**
                */
                (function () {
                    let hasACupom = window.confirm('Você possui um cupom de desconto? ');

                    if (hasACupom) {
                        let cupom = window.prompt('Digite seu cupom');

                        if (cupom === 'ganhei5') {
                            window.alert('Você ganhou R$5,00 de desconto na sua compra! ');
                            desconto = 5;
                        } else {
                            window.alert('Cupom inválido ou fora da promoção...');
                        }
                    }
                })();
            }
        }

        let produtos = JSON.parse(sessionStorage.getItem('pedido')),
            totalPedido = 0,
            exibicao,
            linhaUm;

        //Verifica a oder de adicionar do produto no pedido
        //Formata e exibe corretamente os produtos
        function corrigeExibicaoPedido(linhaUm) {
            if (exibicao === undefined) {
                exibicao = linhaUm;
            } else {
                exibicao += '<br><br>' + linhaUm;
            }
        }

        /*
            Verifica quais produtos estão no pedido
            Calcula o total 
            Imprime o pedido
            **parseInt() - toFixed() - StringTemplate() - html()
        */
        for (let i = 0; i < produtos.orderList.length; i++) {
            let idButtonAdd = produtos.orderList[i].buttonClick,
                totalProduto;

            switch (idButtonAdd) {
                case '#button-add-unit-hamb1':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 12.90;
                    totalPedido += totalProduto;

                    linhaUm = `Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate,` +
                        `Cebola e molho especial.<br>`;
                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$12.90<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total R$: ${totalProduto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb2':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 15.90;
                    totalPedido += totalProduto;

                    linhaUm = `Hamburguer Duplo Tradicional<br> Queijo`+
                    `Cheddar e molho especial.<br>`;
                    
                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$15.90<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total R$: ${totalProduto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb3':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 20.00;
                    totalPedido += totalProduto;

                    linhaUm = `Hamburguer Triplo Tradicional<br> Queijo, Alface, Pickles, ` +
                        `Tomate, Cebola e molho especial.<br>`;

                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$20.00<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total sem desconto R$: ${totalProduto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink1':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 4.00;
                    totalPedido += totalProduto;

                    linhaUm = `Refrigerante<br> Lata de 350Ml.<br>`;
                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$4.00<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total R$: ${totalProduto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink2':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 7.00;
                    totalPedido += totalProduto;

                    linhaUm = `Refrigerante<br> Garrafa 2L.<br>`;
                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$7.00<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total R$: ${totalProduto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink3':
                    totalProduto = parseInt(produtos.orderList[i].amount) * 11.00;
                    totalPedido += totalProduto;

                    linhaUm = `Cerveja<br> Garrafa 1l.<br>`;
                    corrigeExibicaoPedido(linhaUm);

                    exibicao += `Preço unitario: R$11.00<br>`;
                    exibicao += `Quantidade: ${produtos.orderList[i].amount}<br>`;
                    exibicao += `Total R$: ${totalProduto.toFixed(2)}`;
                    break;
            }
            //escreve no html 
            $('#p-product-list').html(exibicao);
        }

        /*
           Verifica se existe desconto e calcula total
           **html() - toFixed()**
       */
        if(totalPedido < desconto){
            totalPedido = 0.00;
        }else{
            totalPedido = totalPedido - desconto;
        }
        
        /*
            Exibe o total do pedido com ou sem desconto
            **html() - toFixed()**
        */
        if (desconto > 0) {
            $('#h2-purchase-total').html('Total com desconto: R$' + totalPedido.toFixed(2));
        } else {
            $('#h2-purchase-total').html('Total: R$' + totalPedido.toFixed(2));
        }

        /*
            Acessa o localStorage pegar os dados do endereço do comprador
            **JSON parse() - getItem localStorage -  
        */
        let usuario = JSON.parse(localStorage.getItem('user1')),
        enderecoEntrega = `Cep: ${usuario.adress}, `;
        enderecoEntrega += `Número: ${usuario.adressNumber}, `;
        enderecoEntrega += `Cidade: ${usuario.city}`;

        //exibe endereço para entrega
        $('#p-shipping-address').text(enderecoEntrega);

        /*
            Função para exibir o botão de pagamento
            **removeClass - addClass**
        */
        $('#button-payment-money').click(function () {
            $('#button-finalize-purchase').removeClass('hide-content').addClass('show-content');
            $('#form-card').removeClass('show-content').addClass('hide-content');
        });

        /*
            Função para ocultar dados do usuário e apresentar tela de compra finalizada
            **removeClass - addClass - sessionStorage**
        */
        function finalizarCompra() {
            $('.order-information').removeClass('show-content').addClass('hide-content');
            $('#button-finalize-purchase').removeClass('show-content').addClass('hide-content');
            $('#div-purchase-completed').removeClass('show-content').addClass('show-content');
            sessionStorage.removeItem('pedido');
        }

        /*
            Função para invocar função de finalizar compra
            **click()**
        */
        $('#button-finalize-purchase').click(function () {
            finalizarCompra();
        });

        /*
            Função exibir div´s de pagamento com cartão
            **removeClass - addClass**
        */
        $('#button-payment-card').click(function () {
            $('#form-card').removeClass('hide-content').addClass('show-content');
            $('#button-finalize-purchase').removeClass('show-content').addClass('hide-content');
        });


        /*
            Função para evitar o envio do formulário e recarregamento da página
            **event.preventDefault()**
        */
        $('#form-card').submit(function (event) {
            event.preventDefault();
            finalizarCompra();
        });

        /*
            Oculta div´s de informações do cliente
            Oculta botões 
            Exibe div de carrinho vazio
            **addClass - removeClass - removeItem SessionStorage**
        */
        $('#button-cancel-order').click(function () {
            sessionStorage.removeItem('pedido');

            $('.order-information').removeClass('show-content').addClass('hide-content');
            $('#button-finalize-purchase').removeClass('show-content').addClass('hide-content');
            $('#form-card').removeClass('show-content').addClass('hide-content');
            $('#div-order-exist').removeClass('hide-content').addClass('show-content');
        });

        /*
            recarrega a página se o usuário cancelar o pagamento com cartão
        */
        $('#form-button-cancel').click(function () {
            window.location.reload(true);
        });
    });
}();
