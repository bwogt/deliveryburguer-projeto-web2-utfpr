+function () {
    $(document).ready(function () {
        //ativa o sidenav mobile
        $('.sidenav').sidenav();

        let is_connected = sessionStorage.getItem('logado');
        let existe_pedido = JSON.parse(sessionStorage.getItem('pedido'));
        let desconto = 0;

        //Verifica se existe usuário conectado
        if((is_connected == 'false') ||(is_connected == null)) {
            alert('É necessário estar logado para acessar seu carrinho... \nVocê sera redirecionado para a página de login');
            window.location.href = 'login.html';
        } else {
            let name_user = sessionStorage.getItem('display_name');
            if (name_user != null) {
                $('.a-menu-login').html('<i class="material-icons left">person_pin</i>' + name_user);
            }
            
            /*
                verifica se existe um pedido para exibir e ocultar divs
                **addClass - removeClass**
            */
            if ((existe_pedido == null) || (existe_pedido.order_list.length == 0)){
                $('#div-existe-pedido').removeClass('oculta-conteudo').addClass('exibe-conteudo');
            } else {
                $('#div-existe-pedido').removeClass('exibe-conteudo').addClass('oculta-conteudo');
                $('.informacao-pedido').removeClass('oculta-conteudo').addClass('exibe-conteudo');
                
                /*
                    Função aninhada auto executavel
                    Recebe um cupom de desconto
                    **confirm() - alert() - prompt()**
                */
                +function cupomDeDesconto() {
                    let has_a_cupom = window.confirm('Você possui um cupom de desconto? ');

                    if (has_a_cupom) {
                        let cupom = window.prompt('Digite seu cupom');

                        if (cupom === 'ganhei5') {
                            window.alert('Você ganhou R$5,00 de desconto na sua compra! ')
                            desconto = 5;
                        } else {
                            let resposta = window.alert('Cupom inválido... ou fora da promoção');
                        }
                    }
                }();
            }
        }

        let produtos = JSON.parse(sessionStorage.getItem('pedido'));
        let total_pedido = 0;
        let exibicao;
        let linha_um;

        //Verifica a oder de adicionar do produto no pedido
        //Formata e exibe corretamente os produtos
        function corrigeExibicaoPedido(linha_um){
            if(exibicao == undefined){
                exibicao = linha_um;
            }else{
                exibicao += '<br><br>' + linha_um;
            }
        }

        /*
            Verifica quais produtos estão no pedido
            Calcula o total 
            Imprime o pedido
            **parseInt() - toFixed() - StringTemplate() - html()
        */
        for (let i = 0; i < produtos.order_list.length; i++) {
            let id_button_add = produtos.order_list[i].button_click;

            let total_produto;

            switch (id_button_add) {
                case '#button-add-unit-hamb1':
                    total_produto = parseInt(produtos.order_list[i].amount) * 12.90;
                    total_pedido += total_produto;

                    linha_um = `Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$12.90<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb2':
                    total_produto = parseInt(produtos.order_list[i].amount) * 15.90;
                    total_pedido += total_produto;

                    linha_um = `Hamburguer Duplo Tradicional<br> Queijo Cheddar e molho especial.<br>`;
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$15.90<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb3':
                    total_produto = parseInt(produtos.order_list[i].amount) * 20.00;
                    total_pedido += total_produto;

                    linha_um = `Hamburguer Triplo Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$20.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total sem desconto R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink1':
                    total_produto = parseInt(produtos.order_list[i].amount) * 4.00;
                    total_pedido += total_produto;

                    linha_um = `Refrigerante<br> Lata de 350Ml.<br>`;
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$4.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink2':
                    total_produto = parseInt(produtos.order_list[i].amount) * 7.00;
                    total_pedido += total_produto;

                    linha_um = `Refrigerante<br> Garrafa 2L.<br>`;
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$7.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink3':
                    total_produto = parseInt(produtos.order_list[i].amount) * 11.00;
                    total_pedido += total_produto;

                    linha_um = `Cerveja<br> Garrafa 1l.<br>`;
                    corrigeExibicaoPedido(linha_um);

                    exibicao += `Preço unitario: R$11.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;
            }
            //escreve no html 
            $('#p-produtos').html(exibicao);
        }

         /*
            Verifica se existe desconto e calcula total
            **html() - toFixed()**
        */
        total_pedido = total_pedido - desconto;
        
        /*
            Exibe o total do pedido com ou sem desconto
            **html() - toFixed()**
        */
        if (desconto > 0) {
            $('#total-compra').html('Total com desconto: R$' + total_pedido.toFixed(2));
        } else {
            $('#total-compra').html('Total: R$' + total_pedido.toFixed(2));
        }

        /*
            Acessa o localStorage pegar os dados do endereço do comprador
            **JSON parse() - getItem localStorage -  
        */
        let usuario = JSON.parse(localStorage.getItem('user1'));
        let endereco_entrega = `Cep: ${usuario.adress}, `;
        endereco_entrega += `Número: ${usuario.adress_number}, `;
        endereco_entrega += `Cidade: ${usuario.city}`;

        //exibe endereço para entrega
        $('#p-endereco-entrega').text(endereco_entrega);

        /*
            Função para exibir o botão de pagamento
            **removeClass - addClass**
        */
        $('#button-payment-money').click(function () {
            $('#id-button-finalize-purchase').removeClass('oculta-conteudo').addClass('exibe-conteudo');
            $('#id-form-card').removeClass('exibe-conteudo').addClass('oculta-conteudo');
        });

        /*
            Função para ocultar dados do usuário e apresentar tela de compra finalizada
            **removeClass - addClass - sessionStorage**
        */
        function finalizarCompra() {
            $('.informacao-pedido').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#id-button-finalize-purchase').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#div-compra-finalizada').removeClass('exibe-conteudo').addClass('exibe-conteudo');
            sessionStorage.removeItem('pedido');
        }

        /*
            Função para invocar função de finalizar compra
            **click()**
        */
        $('#id-button-finalize-purchase').click(function () {
            finalizarCompra();
        });

        /*
            Função exibir div´s de pagamento com cartão
            **removeClass - addClass**
        */
        $('#button-payment-card').click(function () {
            $('#id-form-card').removeClass('oculta-conteudo').addClass('exibe-conteudo');
            $('#id-button-finalize-purchase').removeClass('exibe-conteudo').addClass('oculta-conteudo');
        });


        /*
            Função para evitar o envio do formulário e recarregamento da página
            **event.preventDefault()**
        */
        $('#id-form-card').submit(function (event) {
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

            $('.informacao-pedido').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#id-button-finalize-purchase').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#id-form-card').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#div-existe-pedido').removeClass('oculta-conteudo').addClass('exibe-conteudo');
        });

        /*
            recarrega a página se o usuário cancelar o pagamento com cartão
        */
        $('#form-button-cancel').click(function () {
            window.location.reload(true);
        });

    });
}()
