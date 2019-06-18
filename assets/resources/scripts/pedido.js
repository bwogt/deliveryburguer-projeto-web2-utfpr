+function () {
    $(document).ready(function () {
        //ativa o sidenav mobile
        $('.sidenav').sidenav();

        let is_connected = sessionStorage.getItem('logado');
        let existe_pedido = JSON.parse(sessionStorage.getItem('pedido'));
        let desconto = 0;


        if (existe_pedido == null) {
            $('#div-existe-pedido').removeClass('oculta-conteudo').addClass('exibe-conteudo');
        } else {
            $('#div-existe-pedido').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('.informacao-pedido').removeClass('oculta-conteudo').addClass('exibe-conteudo');

            //Função aninhada
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


        if (is_connected == 'false') {
            alert('É necessário estar logado para acessar seu carrinho... \nVocê sera redirecionado para a página de login');
            window.location.href = 'login.html';
        } else {
            let nome_usuario = sessionStorage.getItem('display_name');

            if (nome_usuario != null) {
                $('.a-menu-login').html('<i class="material-icons left">person_pin</i>' + nome_usuario);
            }
        }

        let produtos = JSON.parse(sessionStorage.getItem('pedido'));
        let total_pedido = 0;

        //verifica quais produtos estão no pedido
        //calcula o total 
        //imprime o pedido
        let exibicao;
        for (let i = 0; i < produtos.order_list.length; i++) {
            let id_button_add = produtos.order_list[i].button_click;

            let total_produto;

            switch (id_button_add) {
                case '#button-add-unit-hamb1':
                    total_produto = parseInt(produtos.order_list[i].amount) * 12.90;
                    total_pedido += total_produto;

                    exibicao = `Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                    exibicao += `Preço unitario: R$12.90<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb2':
                    total_produto = parseInt(produtos.order_list[i].amount) * 15.90;
                    total_pedido += total_produto;

                    exibicao += `<br><br>Hamburguer Duplo Tradicional<br> Queijo Cheddar e molho especial.<br>`;
                    exibicao += `Preço unitario: R$15.90<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-hamb3':
                    total_produto = parseInt(produtos.order_list[i].amount) * 20.00;
                    total_pedido += total_produto;

                    exibicao += `<br><br>Hamburguer Triplo Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                    exibicao += `Preço unitario: R$20.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total sem desconto R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink1':
                    total_produto = parseInt(produtos.order_list[i].amount) * 4.00;
                    total_pedido += total_produto;

                    exibicao += `<br><br>Refrigerante<br> Lata de 350Ml.<br>`;
                    exibicao += `Preço unitario: R$4.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink2':
                    total_produto = parseInt(produtos.order_list[i].amount) * 7.00;
                    total_pedido += total_produto;

                    exibicao += `<br><br>Refrigerante<br> Garrafa 2L.<br>`;
                    exibicao += `Preço unitario: R$7.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;

                case '#button-add-unit-drink3':
                    total_produto = parseInt(produtos.order_list[i].amount) * 11.00;
                    total_pedido += total_produto;
                    exibicao += `<br><br>Cerveja<br> Garrafa 1l.<br>`;
                    exibicao += `Preço unitario: R$11.00<br>`;
                    exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                    exibicao += `Total R$: ${total_produto.toFixed(2)}`;
                    break;
            }
            $('#p-produtos').html(exibicao);
        }

        //calcula o desconto do total
        total_pedido = total_pedido - desconto;
        //exibe total
        if (desconto > 0) {
            $('#total-compra').html('Total com desconto: R$' + total_pedido.toFixed(2));
        } else {
            $('#total-compra').html('Total: R$' + total_pedido.toFixed(2));
        }

        //Recupera o endereço e o imprime
        let usuario = JSON.parse(localStorage.getItem('user1'));
        let endereco_entrega = `Cep: ${usuario.adress}, `;
        endereco_entrega += `Número: ${usuario.adress_number}, `;
        endereco_entrega += `Cidade: ${usuario.city}`;

        //exibe endereço para entrega
        $('#p-endereco-entrega').text(endereco_entrega);

        $('#button-payment-money').click(function () {
            $('#id-button-finalize-purchase').removeClass('oculta-conteudo').addClass('exibe-conteudo');
            $('#id-form-card').removeClass('exibe-conteudo').addClass('oculta-conteudo');
        });

        function finalizarCompra() {
            $('.informacao-pedido').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#id-button-finalize-purchase').removeClass('exibe-conteudo').addClass('oculta-conteudo');
            $('#div-compra-finalizada').removeClass('exibe-conteudo').addClass('exibe-conteudo');
            sessionStorage.removeItem('pedido');
        }

        $('#id-button-finalize-purchase').click(function () {
            finalizarCompra();
        });

        $('#button-payment-card').click(function () {
            $('#id-form-card').removeClass('oculta-conteudo').addClass('exibe-conteudo');
            $('#id-button-finalize-purchase').removeClass('exibe-conteudo').addClass('oculta-conteudo');
        });

        $('#id-form-card').submit(function (event) {
            event.preventDefault();
            finalizarCompra();
        });

        $('#form-button-cancel').click(function () {
            window.location.reload(true);
        });

    });
}()
