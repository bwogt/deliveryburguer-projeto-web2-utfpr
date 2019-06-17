+function () {
    let logado1 = sessionStorage.getItem('logado');
    let existe_pedido = JSON.parse(sessionStorage.getItem('pedido'));
    let desconto = 0;

    if ((existe_pedido == null) || (existe_pedido.order_list.length == 0)) {
        document.getElementsByClassName('carrinho-inicio-vazio')[0].style.display = 'block';
    } else {
        document.getElementsByClassName('carrinho-inicio-vazio')[0].style.display = 'none';
        let elementos_pedido = document.getElementsByClassName('carrinho-inicio');

        for (let i = 0; i < elementos_pedido.length; i++) {
            elementos_pedido[i].style.display = 'block';
        }

        cupomDeDesconto();
    }

    if (logado1 == 'false') {
        alert('É necessário estar logado para acessar seu carrinho... \nVocê sera redirecionado para a página de login');
        window.location.href = 'login.html';
    } else {
        let nome_usuario = JSON.parse(localStorage.getItem('user1'));
        nome_usuario = nome_usuario.name.split(' ');
        nome_usuario = nome_usuario[0];

        document.getElementById('a-menu-login').textContent = nome_usuario;
    }

    let produtos = JSON.parse(sessionStorage.getItem('pedido'));
    let total_pedido = 0;

    function cupomDeDesconto() {
        let has_a_cupom = window.confirm('Você possui um cupom de desconto? ');

        if (has_a_cupom) {
            let cupom = window.prompt('Digite seu cupom');

            if (cupom === 'ganhei5') {
                window.alert('Você ganhou R$5,00 de desconto na sua compra! ')
                desconto = 5;
            } else {
                let resposta = window.confirm('Cupom inválido...\nDeseja ganhar um cupom?');
                if (resposta) {
                    let email = prompt('Informe um email para recerber promoções: ');
                    if ((email == null) || (email == '')) {
                        window.alert('Nada informado...')
                    } else {
                        window.confirm('Você ganhou R$5,00 de desconto na sua compra! ');
                        desconto = 5;
                    }
                }
            }
        } else {
            let resposta = window.confirm('Deseja ganhar um cupom?');
            if (resposta) {
                let email = window.prompt('Informe um email para recerber promoções: ');
                if ((email == null) || (email == '')) {
                    window.alert('Nada informado...')
                } else {
                    window.confirm('Você ganhou R$5,00 de desconto na sua compra! ');
                    desconto = 5;
                }
            }
        }
    }


    //verifica quais produtos estão no pedido
    //calcula o total 
    //imprime o pedido
    for (let i = 0; i < produtos.order_list.length; i++) {
        let id_button_add = produtos.order_list[i].button_click;
        let exibicao;
        let total_produto;

        switch (id_button_add) {
            case '#button-add-unit-hamb1':
                total_produto = parseInt(produtos.order_list[i].amount) * 12.90;
                total_pedido += total_produto;

                exibicao = `Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                exibicao += `Preço unitario: R$12.90<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML = exibicao;
                break;

            case '#button-add-unit-hamb2':
                total_produto = parseInt(produtos.order_list[i].amount) * 15.90;
                total_pedido += total_produto;

                exibicao = `Hamburguer Duplo Tradicional<br> Queijo Cheddar e molho especial.<br>`;
                exibicao += `Preço unitario: R$15.90<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-hamb3':
                total_produto = parseInt(produtos.order_list[i].amount) * 20.00;
                total_pedido += total_produto;

                exibicao = `Hamburguer Triplo Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                exibicao += `Preço unitario: R$20.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total sem desconto R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink1':
                total_produto = parseInt(produtos.order_list[i].amount) * 4.00;
                total_pedido += total_produto;

                exibicao = `Refrigerante<br> Lata de 350Ml.<br>`;
                exibicao += `Preço unitario: R$4.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink2':
                total_produto = parseInt(produtos.order_list[i].amount) * 7.00;
                total_pedido += total_produto;

                exibicao = `Refrigerante<br> Garrafa 2L.<br>`;
                exibicao += `Preço unitario: R$7.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink3':
                total_produto = parseInt(produtos.order_list[i].amount) * 11.00;
                total_pedido += total_produto;
                exibicao = `Cerveja<br> Garrafa 1l.<br>`;
                exibicao += `Preço unitario: R$11.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto.toFixed(2)}`;

                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;
        }
    }

    //calcula o desconto do total
    total_pedido = total_pedido - desconto;
    //exibe total
    if(desconto > 0){
        document.getElementById('total-compra').innerHTML = 'Total com desconto: R$' + total_pedido.toFixed(2);
    }else{
        document.getElementById('total-compra').innerHTML = 'Total: R$' + total_pedido.toFixed(2);
    }
    
    //Recupera o endereço e o imprime
    let usuario = JSON.parse(localStorage.getItem('user1'));
    let endereco_entrega = `Cep: ${usuario.adress}, `;
    endereco_entrega += `Número: ${usuario.adress_number}, `;
    endereco_entrega += `Cidade: ${usuario.city}`;

    //exibe endereço para entrega
    document.getElementById('p-endereco-entrega').innerHTML = endereco_entrega;

    document.getElementById('button-payment-money').onclick = function () {
        document.getElementById('button-finalize-purchase').style.display = 'block';
        document.forms[0].style.display = 'none';
    }

    function finalizarCompra() {
        let elementos_pedido = document.getElementsByClassName('carrinho-inicio');

        for (let i = 0; i < elementos_pedido.length; i++) {
            elementos_pedido[i].style.display = 'none';
        }

        document.getElementById('div-compra-finalizada').style.display = 'block';
        sessionStorage.removeItem('pedido');
    }

    document.getElementById('button-finalize-purchase').onclick = function () {
        finalizarCompra();
    }

    document.getElementById('button-payment-card').onclick = function () {
        document.forms[0].style.display = 'block';
        document.getElementById('button-finalize-purchase').style.display = 'none';
    }

    document.forms[0].onsubmit = function (e) {
        e.preventDefault();
        finalizarCompra();
    }

    document.forms[0].elements[4].onclick = function (e) {
        window.location.reload(true);
    }

}()
