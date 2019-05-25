//Module Pattern 
+ function () {
    //Utilização de Jquery
    //espera o html ser carreado
    $(document).ready(function () {
        //classe que representa um pedido
        class Order {
            constructor() {
                this.order_list = [];
            }

            adiciona(produto) {
                this.order_list.push(produto);
            }
        }

        class Product {
            constructor(id_produto) {
                this.id_produto = id_produto;
                this.amount = 0;
            }

            get idProduto() {
                return this.id_produto;
            }

            set idProduto(id_produto) {
                this.id_produto = id_produto;
            }

            adiciona() {
                this.amount += 1;
            }

            remove() {
                this.amount += - 1;
            }
        }

        //exibe e oculta o conteudo do card hamburguer e bebidas - acesso pelo id
        $('#button-hamb1').click(function () {
            $('#card-content-hamb1').slideToggle('fast');
        })


        //variáveis de controle do pedido
        let cont_hamb1 = 0;
        let hamburguer1 = new Product(1);

        //incrementa a quantidade no pedido - tipo do hamburguer tradicional
        //verifica se atingiu o limite do pedido (6 unidades) do mesmo tipo de hamburguer
        $('#button-add-unit-hamb1').click(function () {
            $('#button-remove-unit-hamb1').css('display', 'block');

            if (cont_hamb1 < 0) {
                cont_hamb1 = 1;
            } else {
                cont_hamb1++;
            }

            if (cont_hamb1 <= 6) {
                $('#card-content-hamb1 > +p').text('Seu pedido: ' + cont_hamb1);
                hamburguer1.adiciona();

                if (cont_hamb1 > 0) {
                    $('#button-buy-item').css('display', 'block');
                }
            }
            else {
                cont_hamb1 = 6;
                window.alert('Limite máximo atingido... (6 unidades)')
            }
        })

        function notificacao1() {
            document.getElementById('teste').innerHTML = 'notifications_active';
        }

        function notificacao2() {
            document.getElementById('teste').innerHTML = 'notifications';
        }

        //decrementa a quantidade exibida no card do produto - tipo do hamburguer tradicional
        $('#button-remove-unit-hamb1').click(function () {
            if (cont_hamb1 > 0) {
                cont_hamb1--;
                hamburguer1.remove();
                $('#card-content-hamb1 > +p').text('Seu pedido: ' + cont_hamb1);
            }

            if (cont_hamb1 == 0) {
                $('#button-buy-item').css('display', 'none');
                $('#button-remove-unit-hamb1').css('display', 'none');
                $('#card-content-hamb1 > +p').text('Seu pedido: ' + cont_hamb1);

                clearInterval(chave1);
                clearInterval(chave2);
                document.getElementById('teste').innerHTML = 'shopping_cart';

                if (new_order != undefined) {
                    new_order.order_list.splice(0, 1);
                    sessionStorage.setItem('pedido', JSON.stringify(new_order));
                }
            }

        })

        let create_order = false;
        let new_order;
        let chave1;
        let chave2;

        $('#button-buy-item').click(function () {
            if (create_order == false) {
                new_order = new Order();
                create_order = true;
            }

            chave1 = setInterval(notificacao1, 500);
            chave2 = setInterval(notificacao2, 1000);
        })

        let existe = false;

        $('#card-content-hamb1 > #button-buy-item').click(function () {
            if (!existe) {
                new_order.adiciona(hamburguer1);
                existe = true;
            } else {
                new_order.order_list.splice(0, 1);
                new_order.adiciona(hamburguer1);
            }

            sessionStorage.setItem('pedido', JSON.stringify(new_order));
        })
    });
}();
