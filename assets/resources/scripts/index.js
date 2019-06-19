//Module Pattern 
+ function () {
$(document).ready(function () {
    //ativa o sidenav mobile
    $('.sidenav').sidenav();

        /*
            Variavel recebe o valor do sessionStorage 
            **sessionStorage**
        */
        let nome_usuario = sessionStorage.getItem('display_name');

        /*
            Exibe o nome do usuário caso seja diferente de null
            **$().html**
        */
        if (nome_usuario != null) {
            $('.a-menu-login').html('<i class="material-icons left">person_pin</i>' + nome_usuario);
        }

        let msg_coupon = 'Parabéns curioso :p , você ganhou R$5,00 de desconto!\n';
        msg_coupon += 'use o cupom "ganhei5" no seu carrinho.';
        
        /*
            Cupom de desconto exibido no console
            ** Temporizador setTimeOut**
        */
        setTimeout(console.log(msg_coupon),1);

        /*
            Classe para representar o objeto pedido
            **Classe do ES6 (JS6)**
        */
        class Order {
            constructor() {
                this.order_list = [];
            }

            add(product) {
                this.order_list.push(product);
            }
        };

        /*
            Classe para representar o objeto pedido
            **Classe do ES6 (JS6)**
        */
        class Product {
            constructor(id_product, button_click) {
                this.id_product = id_product;
                this.button_click = button_click;
                this.amount = 0;
            }

            add() {
                this.amount += 1;
            }

            remove() {
                this.amount += - 1;
            }
        };

        //variáveis de controle do pedido
        //variáveis para armazer id de botões
        let current_order;
        let product_unit = 0;
        let id_card_content;
        let id_button_add;
        let id_button_remove;
        let id_button_buy;
      
        /*
            Função que verifica qual botão de expandir contéudo foi clicado
            **click() - split() - attr() - parent() - siblings() - find() - next()**
            **JSON - getItem sessionStorage - For in - css() - text() -slideUp()**
            **slideToggle()**  
        */
        $('.btn-floating').click(function () {    
            //existe no pedido
            let exists_on_request = false;

            //id do botão flutuante clicado
            let id_button_floating = '#' + $(this).attr('id');
            let break_id = id_button_floating.split('-');
            
            //id´s do contéudo e dos botões de cada product
            id_card_content = '#' + $(this).parent().siblings().attr('id');
            id_button_add= '#' + $(id_card_content).find('button').attr('id');
            id_button_remove = '#' + $(id_button_add).next().attr('id');
            id_button_buy = '#' + $(id_button_remove).next().attr('id');
            
            //pedido armazenado no sessionStorage
            let order_in_session_storage= JSON.parse(sessionStorage.getItem('pedido'));

            //verifica se o product existe no pedido
            if((order_in_session_storage === null) || (order_in_session_storage.order_list.length === 0)){
                product_unit = 0;
            }else{
                for(let i in order_in_session_storage.order_list){
                    if(order_in_session_storage.order_list[i].button_click == id_button_add){
                        product_unit = order_in_session_storage.order_list[i].amount;
                        exists_on_request = true;
                    }
                }
            }

            //se existir exibe os botões de remover e comprar
            if(exists_on_request){
                $(id_button_buy).css('display', 'block');
                $(id_button_remove).css('display', 'block');    
            }else{
                //se não existe quantidade torna-se zero e oculta-se os botões de remover e comprar
                product_unit = 0;
                $(id_button_buy).css('display', 'none');
                $(id_button_remove).css('display', 'none');
            }
           
           //armazena o primeiro filho do card_content atual
           let aux_id_card_content = $(id_card_content).find(' > p')[1];
           $(aux_id_card_content).text('Seu pedido: ' + product_unit);
           
           //Procura pelo botão flutuante que foi clicado
           //Oculta divs abertas e exibe a que foi clicada
            switch (break_id[2]) {
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

        //Variavéis de controle do produto
        let product;
        let new_id_product = 1;
        let list_products = [];

        /*
            Função para incrementar quantidade, remover e comprar
            **click() - attr() - split() - closest() - find() - push() - for in**
        */
        $('.card-content > button').click(function () {
            let id_button = '#' + $(this).attr('id');
            let divide_button_id = id_button.split('-');
            let there_is_product = false;
            
            //div pai dos botões (adicionar, remover, comprar)
            id_card_content = '#' + $(this).closest('div').attr('id');

            switch(divide_button_id[1]){
                case 'add':
                    id_button_add = id_button;
                    id_button_remove = '#' + $(id_button_add).find('+button').attr('id');
                    id_button_buy = '#' + $(id_button_remove).find('+button').attr('id');
                    id_card_content += '> +p';

                    if(list_products.length === 0){
                        product = new Product(new_id_product, id_button_add);
                        list_products.push(product);
                        there_is_product = true;
                        new_id_product++;
                    }else{
                        for(i in list_products){
                            if(list_products[i].button_click === id_button_add){
                                there_is_product = true;
                                product = list_products[i];
                            }
                        }
                    }
                    
                    if(there_is_product){
                        addProduct(product);
                    }else{
                        product = new Product(new_id_product, id_button_add);
                        list_products.push(product);
                        addProduct(product);
                        new_id_product++;
                    }

                    break;
                    case 'remove':
                    id_button_remove = id_button;
                    id_card_content += '> +p';
                    
                    for(let i in list_products){
                        if(list_products[i].button_click == id_button_add){
                            product = list_products[i];
                        }
                    }

                    remover(product);
                    break;

                case 'buy':
                    id_button_buy = id_button;
                    buyProduct(product);
                    break;
                
                default:
                    break;
            }    
        });
        
        /*
            Função para alterar exibição de quantidade do product
            **css() - text() - confirm()**
        */
        function addProduct(product) {
            $(id_button_remove).css('display', 'block');
            $(id_button_buy).css('display', 'block');
            product_unit++;

            if (product_unit <= 6) {
                $(id_card_content).text('Seu pedido: ' + product_unit);
                product.add();
            }
            else {
                product_unit = 6;
                window.confirm('Limite máximo atingido... (6 unidades)')
            }
        };

        /*
            Função que decrementa a quantidade exibida no card do produto
            Cancela efeitos de notificação de produto no carrinho (icones de sino)
            **console.log() - JSON - For in - sessionStorage - text() - css()**
            **html() - clearInterval()** 
        */
        function remover(product) {
            let list_order;
            console.log('id produto atual '+product.id_product)
            
            if (product_unit > 0) {
                product_unit--;
                
                if(current_order == undefined){
                    product.remove();
                }else{
                   for(let i in current_order.order_list){
                        if(current_order.order_list[i].button_click == id_button_add){
                            product.remove();
                            list_order = JSON.parse(sessionStorage.getItem('pedido'));
                            list_order.order_list[i].amount = product_unit;
                            current_order.order_list[i].amount = product_unit;
                    
                            sessionStorage.setItem('pedido', JSON.stringify(list_order));
                        }
                    }
                }
                $(id_card_content).text('Seu pedido: ' + product_unit);
            }

            if (product_unit <= 0) {
                $(id_button_buy).css('display', 'none');
                $(id_button_remove).css('display', 'none');
                $(id_card_content).text('Seu pedido: ' + product_unit);

                if (current_order != undefined) {
                    removeProductList(product);
                    sessionStorage.setItem('pedido', JSON.stringify(current_order));
                }

                list_order = JSON.parse(sessionStorage.getItem('pedido'));
                
                if(list_order.order_list.length == 0){
                    clearInterval(animation_key1);
                    clearInterval(animation_key2);
                    animation = false;
                    
                    $('.i-icon-cart').html('<i class="material-icons left">shopping_cart</i>'+'Carrinho');
                }
            }

        };

        /*  
            Função de animação de notificação
            Determina o icone de sino tocando
            **html()**
        */
        function animationNotificationActive() {
             $('.i-icon-cart').html('<i class="material-icons left">notifications_active</i>'+'Carrinho');
        };

        /*  
            Função de animação de notificação
            Determina o icone de sino default
            **html()**
        */
        function animationNotificationDisabled() {
             $('.i-icon-cart').html('<i class="material-icons left">notifications</i>'+'Carrinho');
        };

        /*
            Variáveis de controle de criação de objetos pedido e produto
        */
        let create_order = false;
        let is_empety_order_list = true;
        let animation = false;
        let animation_key1;
        let animation_key2;

        /*
            Cria um objeto pedido caso não exista um criado
            **setInterval() - sessionStorage() JSON - For in**
        */
        function buyProduct(product){
            let existe = false;
            if (create_order == false) {
                current_order = new Order();
                create_order = true;
            }
           
            //Modifica o icone no menu de carrinho
            if (animation == false) {
                animation_key1 = setInterval(animationNotificationActive, 500);
                animation_key2 = setInterval(animationNotificationDisabled, 1000);
                animation = true;
            }

            if (is_empety_order_list) {
                current_order.add(product);
                sessionStorage.setItem('pedido', JSON.stringify(current_order));
                is_empety_order_list = false;
            } else {
                for(let i in current_order.order_list){
                    if(current_order.order_list[i].id_product == product.id_product){
                        removeProductList(product);
                        current_order.add(product);
                        existe = true;
                    }
                }

                if(existe == false){
                    current_order.add(product);
                    existe = false;
                }

                //armazena o pedido no sesseionStorage;
                sessionStorage.setItem('pedido', JSON.stringify(current_order));
            }
        };
        
        /*
            Função para remover um produto da lista
            **sessionStorage() - JSON parse -  splice() - For in**
        */
        //Remove o product da lista de pedido
        function removeProductList(product) {
            //converte os dados salvos no sessionStorage
            let list = JSON.parse(sessionStorage.getItem('pedido'));
           
            //verifica se existe um product no pedido com o id do product atual
            for (let i = 0; i < list.order_list.length; i++) {
                if (list.order_list[i].id_product == product.id_product) {
                    current_order.order_list.splice(i, 1);
                }
            } 
        };
    });
}();
