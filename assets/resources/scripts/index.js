//Module Pattern 
+ function () {
    'use strict';
    $(document).ready(function () {
        //ativa o sidenav mobile
        $('.sidenav').sidenav();

        /*
            Variavel recebe o valor do sessionStorage 
            **sessionStorage**
        */
        let nameUser = sessionStorage.getItem('display_name');

        /*
            Exibe o nome do usuário caso seja diferente de null
            **$().html**
        */
        if (nameUser !== null) {
            $('.a-menu-login').html('<i class="material-icons left">person_pin</i>' + nameUser);
        }

        let couponMenssage = 'Parabéns curioso :p , você ganhou R$5,00 de desconto!\n';
        couponMenssage += 'use o cupom "ganhei5" no seu carrinho.';

        /*
            Cupom de desconto exibido no console
            ** Temporizador setTimeOut**
        */
        setTimeout(console.log(couponMenssage), 1);

        /*
            Classe para representar o objeto pedido
            **Classe do ES6 (JS6)**
        */
        class Order {
            constructor() {
                this.orderList = [];
            }

            add(product) {
                this.orderList.push(product);
            }
        }

        /*
            Classe para representar o objeto pedido
            **Classe do ES6 (JS6)**
        */
        class Product {
            constructor(idProduct, buttonClick) {
                this.idProduct = idProduct;
                this.buttonClick = buttonClick;
                this.amount = 0;
            }

            add() {
                this.amount += 1;
            }

            remove() {
                this.amount += - 1;
            }
        }

        //variáveis de controle do pedido
        //variáveis para armazer id de botões
        let productUnit = 0,
            currentOrder,
            idCardContent,
            idButtonAdd,
            idButtonRemove,
            idButtonBuy;

        /*
            Função que verifica qual botão de expandir contéudo foi clicado
            **click() - split() - attr() - parent() - siblings() - find() - next()**
            **JSON - getItem sessionStorage - For in - css() - text() -slideUp()**
            **slideToggle()**  
        */
        $('.btn-floating').click(function () {
            //existe no pedido
            let existsOnRequest = false;

            //id do botão flutuante clicado
            let idButtonFloating = '#' + $(this).attr('id'),
                breakId = idButtonFloating.split('-');

            //id´s do contéudo e dos botões de cada product
            idCardContent = '#' + $(this).parent().siblings().attr('id');
            idButtonAdd = '#' + $(idCardContent).find('button').attr('id');
            idButtonRemove = '#' + $(idButtonAdd).next().attr('id');
            idButtonBuy = '#' + $(idButtonRemove).next().attr('id');

            //pedido armazenado no sessionStorage
            let orderInSessionStorage = JSON.parse(sessionStorage.getItem('pedido'));

            //verifica se o product existe no pedido
            if ((orderInSessionStorage === null) || (orderInSessionStorage.orderList.length === 0)) {
                productUnit = 0;
            } else {
                for (let i in orderInSessionStorage.orderList) {
                    if (orderInSessionStorage.orderList[i].buttonClick === idButtonAdd) {
                        productUnit = orderInSessionStorage.orderList[i].amount;
                        existsOnRequest = true;
                    }
                }
            }

            //se existir exibe os botões de remover e comprar
            if (existsOnRequest) {
                $(idButtonBuy).css('display', 'block');
                $(idButtonRemove).css('display', 'block');
            } else {
                //se não existe quantidade torna-se zero e oculta-se os botões de remover e comprar
                productUnit = 0;
                $(idButtonBuy).css('display', 'none');
                $(idButtonRemove).css('display', 'none');
            }

            //armazena o primeiro filho do card_content atual
            let auxIdCardContent = $(idCardContent).find(' > p')[1];
            $(auxIdCardContent).text('Seu pedido: ' + productUnit);

            //Procura pelo botão flutuante que foi clicado
            //Oculta divs abertas e exibe a que foi clicada
            switch (breakId[2]) {
                case 'hamb1':
                    $('.card-content').slideUp('fast');
                    $('#card-content-hamb1').slideToggle('fast');
                    break;

                case 'hamb2':
                    $('.card-content').slideUp('fast');
                    $('#card-content-hamb2').slideToggle('fast');
                    break;

                case 'hamb3':
                    $('.card-content').slideUp('fast');
                    $('#card-content-hamb3').slideToggle('fast');
                    break;

                case 'drink1':
                    $('.card-content').slideUp('fast');
                    $('#card-content-drink1').slideToggle('fast');
                    break;

                case 'drink2':
                    $('.card-content').slideUp('fast');
                    $('#card-content-drink2').slideToggle('fast');
                    break;

                case 'drink3':
                    $('.card-content').slideUp('fast');
                    $('#card-content-drink3').slideToggle('fast');
                    break;

                default:
                    break;
            }
        });

        let animation = false,
            animationKey1,
            animationKey2;

        /*  
            Função de animação de notificação
            Determina o icone de sino tocando
            **html()**
        */
        function animationNotificationActive() {
            $('.a-icon-cart').html('<i class="material-icons left">'+
            'notifications_active</i>' + 'Carrinho');
        }

        /*  
            Função de animação de notificação
            Determina o icone de sino default
            **html()**
        */
        function animationNotificationDisabled() {
            $('.a-icon-cart').html('<i class="material-icons left">notifications</i>' + 'Carrinho');
        }

        /*
           Função para remover um produto da lista
           **sessionStorage() - JSON parse -  splice() - For in**
       */
        //Remove o product da lista de pedido
        function removeProductList(product) {
            //converte os dados salvos no sessionStorage
            let list = JSON.parse(sessionStorage.getItem('pedido'));

            //verifica se existe um product no pedido com o id do product atual
            for (let i = 0; i < list.orderList.length; i++) {
                if (list.orderList[i].idProduct === product.idProduct) {
                    currentOrder.orderList.splice(i, 1);
                }
            }
        }

        /*
            Função para alterar exibição de quantidade do product
            **css() - text() - confirm()**
        */
        function addProduct(product) {
            $(idButtonRemove).css('display', 'block');
            $(idButtonBuy).css('display', 'block');
            productUnit++;

            if (productUnit <= 6) {
                $(idCardContent).text('Seu pedido: ' + productUnit);
                product.add();
            }
            else {
                productUnit = 6;
                window.confirm('Limite máximo atingido... (6 unidades)');
            }
        }

        /*
            Função que decrementa a quantidade exibida no card do produto
            Cancela efeitos de notificação de produto no carrinho (icones de sino)
            **console.log() - JSON - For in - sessionStorage - text() - css()**
            **html() - clearInterval()** 
        */
        function remover(product) {
            let listOrder;
            console.log('id produto atual ' + product.idProduct);

            if (productUnit > 0) {
                productUnit--;

                if (currentOrder === undefined) {
                    product.remove();
                } else {
                    for (let i in currentOrder.orderList) {
                        if (currentOrder.orderList[i].buttonClick === idButtonAdd) {
                            product.remove();
                            listOrder = JSON.parse(sessionStorage.getItem('pedido'));
                            listOrder.orderList[i].amount = productUnit;
                            currentOrder.orderList[i].amount = productUnit;

                            sessionStorage.setItem('pedido', JSON.stringify(listOrder));
                        }
                    }
                }
                $(idCardContent).text('Seu pedido: ' + productUnit);
            }

            if (productUnit <= 0) {
                $(idButtonBuy).css('display', 'none');
                $(idButtonRemove).css('display', 'none');
                $(idCardContent).text('Seu pedido: ' + productUnit);

                if (currentOrder !== undefined) {
                    removeProductList(product);
                    sessionStorage.setItem('pedido', JSON.stringify(currentOrder));
                }

                listOrder = JSON.parse(sessionStorage.getItem('pedido'));

                if (listOrder.orderList.length === 0) {
                    clearInterval(animationKey1);
                    clearInterval(animationKey2);
                    animation = false;

                    $('.a-icon-cart').html('<i class="material-icons left">' +
                        'shopping_cart</i>' + 'Carrinho');
                }
            }

        }

        /*
               Variáveis de controle de criação de objetos pedido e produto
           */
        let createOrder = false,
            isEmpetyOrderList = true;

        /*
            Cria um objeto pedido caso não exista um criado
            **setInterval() - sessionStorage() JSON - For in**
        */
        function buyProduct(product) {
            let existe = false;

            if (!createOrder) {
                currentOrder = new Order();
                createOrder = true;
            }

            //Modifica o icone no menu de carrinho
            if (!animation) {
                animationKey1 = setInterval(animationNotificationActive, 500);
                animationKey2 = setInterval(animationNotificationDisabled, 1000);
                animation = true;
            }

            if (isEmpetyOrderList) {
                currentOrder.add(product);
                sessionStorage.setItem('pedido', JSON.stringify(currentOrder));
                isEmpetyOrderList = false;

            } else {
                for (let i in currentOrder.orderList) {
                    if (currentOrder.orderList[i].idProduct === product.idProduct) {
                        removeProductList(product);
                        currentOrder.add(product);
                        existe = true;
                    }
                }

                if (!existe) {
                    currentOrder.add(product);
                    existe = false;
                }

                //armazena o pedido no sesseionStorage;
                sessionStorage.setItem('pedido', JSON.stringify(currentOrder));
            }
        }

        //Variavéis de controle do produto
        let newIdProduct = 1,
            product,
            listProducts = [];

        /*
            Função para incrementar quantidade, remover e comprar
            **click() - attr() - split() - closest() - find() - push() - for in**
        */
        $('.card-content > button').click(function () {
            let idButton = '#' + $(this).attr('id'),
                divideButtonId = idButton.split('-'),
                thereIsProduct = false;

            //div pai dos botões (adicionar, remover, comprar)
            idCardContent = '#' + $(this).closest('div').attr('id');

            switch (divideButtonId[1]) {
                case 'add':
                    idButtonAdd = idButton;
                    idButtonRemove = '#' + $(idButtonAdd).find('+button').attr('id');
                    idButtonBuy = '#' + $(idButtonRemove).find('+button').attr('id');
                    idCardContent += '> +p';

                    if (listProducts.length === 0) {
                        product = new Product(newIdProduct, idButtonAdd);
                        listProducts.push(product);
                        thereIsProduct = true;
                        newIdProduct++;

                    } else {
                        for (let i in listProducts) {
                            if (listProducts[i].buttonClick === idButtonAdd) {
                                thereIsProduct = true;
                                product = listProducts[i];
                            }
                        }
                    }

                    if (thereIsProduct) {
                        addProduct(product);
                    } else {
                        product = new Product(newIdProduct, idButtonAdd);
                        listProducts.push(product);
                        addProduct(product);
                        newIdProduct++;
                    }

                    break;
                case 'remove':
                    idButtonRemove = idButton;
                    idCardContent += '> +p';

                    for (let i in listProducts) {
                        if (listProducts[i].buttonClick === idButtonAdd) {
                            product = listProducts[i];
                        }
                    }

                    remover(product);
                    break;

                case 'buy':
                    idButtonBuy = idButton;
                    buyProduct(product);
                    break;

                default:
                    break;
            }
        });
    });
}();
