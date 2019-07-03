//Module Pattern 
'use strict';
(function () {
    $(document).ready(function () {
        //ativa o sidenav mobile materialize
        $('.sidenav').sidenav();
        //ativa o selected materialize
        $('select').formSelect();

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
            **removeClass - addClass - seletor tag**
        */
        $('#button-payment-money').click(function () {
            $('#button-finalize-purchase').removeClass('hide-content').addClass('show-content');
            $('form').removeClass('show-content').addClass('hide-content');
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
            **removeClass - addClass - seletor tag**
        */
        $('#button-payment-card').click(function () {
            $('form').removeClass('hide-content').addClass('show-content');
            $('#button-finalize-purchase').removeClass('show-content').addClass('hide-content');
        });

        /*
            Função para validar select de mês do cartão
            **val() - alert()**
        */
        function validSelectMothCard(){
            let selectMoth = $('#select-month').val();
           
            if(selectMoth === null || selectMoth < 0){
                window.alert('Selecione o mês de validade do seu cartão...');
                return false;

            } else{
                return true;
            }
            
        }

        /*
            Função para validar select de ano do cartão
            **val() - alert()**
        */
        function validSelectYearCard(){
            let selectYear = $('#select-year').val();
           
            if(selectYear === null || selectYear < 0){
                window.alert('Selecione o ano de validade do seu cartão...');
                return false;

            } else{
                return true;
            }
            
        }

        /*
            Função para evitar o envio do formulário e recarregamento da página
            Invoca as funções de validação do cartão de credito
            **event.preventDefault() - seletor tag**
         */

        $('form').submit(function (event) {
            event.preventDefault();
                if(validSelectMothCard() && validSelectYearCard()){
                    finalizarCompra();
                }
        });

        /*
            Oculta div´s de informações do cliente
            Oculta botões 
            Exibe div de carrinho vazio
            **addClass - removeClass - removeItem SessionStorage - seletor tag**
        */
        $('#button-cancel-order').click(function () {
            sessionStorage.removeItem('pedido');

            $('.order-information').removeClass('show-content').addClass('hide-content');
            $('#button-finalize-purchase').removeClass('show-content').addClass('hide-content');
            $('form').removeClass('show-content').addClass('hide-content');
            $('#div-order-exist').removeClass('hide-content').addClass('show-content');
        });

        /*
            recarrega a página se o usuário cancelar o pagamento com cartão
        */
        $('#form-button-cancel').click(function () {
            window.location.reload(true);
        });

        /*
            Validação do input nome
            **validação html5**
        */
        $('#input-name-in-card').on('invalid', function () {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Digite seu Nome completo, Inicio em maiúsculo');
            } else {
                this.setCustomValidity('');
            }
        });

        /*
            Validação do input número do cartão
            **validação html5**
        */
        $('#input-number-card').on('invalid', function () {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Mínimo 14 digitos, máximo 16');
            } else {
                this.setCustomValidity('');
            }
        });

        /*
            Validação do input código verificador do cartão
            **validação html5**
        */
        $('#input-verification-code').on('invalid', function () {
            if (this.validity.valueMissing) {
                this.setCustomValidity('Código de 3 digitos presente atrás do cartão');
            } else {
                this.setCustomValidity('');
            }
        });

        /*
            Exibe o cupom de desconto no console 
            quando o input "nome" do titular do cartão ganha foco.
            **Função aninhada**
        */
        function coupon(){
            let couponMenssage = 'Parabéns curioso :p , você ganhou R$5,00 de desconto!\n';
            couponMenssage += 'use o cupom "ganhei5" no seu carrinho.';
            
            function displayCoupon(){
                console.log(couponMenssage);
            }

            displayCoupon();
        }

        /*
            Exibe o cupom de desconto no console 
            quando o input "nome" do titular do cartão ganha foco.
            **Onfocus**
        */
        $('#input-name-in-card').focus(function () {
            coupon();
        });
    });
})();
