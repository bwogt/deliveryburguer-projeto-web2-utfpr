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
            constructor(id_produto, button_click) {
                this.id_produto = id_produto;
                this.button_click = button_click;
                this.amount = 0;
            }

            adiciona() {
                this.amount += 1;
            }

            remove() {
                this.amount += - 1;
            }
        }

        //variáveis de controle do pedido
        let current_order;
        let product_unit = 0;
        let id_card_content;
        let id_button_add;
        let id_button_remove;
        let id_button_buy;
      
        //exibe e oculta o conteudo do card de produtos
        $('.btn-floating').click(function () {    
            let existe_no_pedido = false;
            let id_button_floating = '#' + $(this).attr('id');
            let divide_id = id_button_floating.split('-');
            
            //id´s do contéudo e dos botões de cada produto
            id_card_content = '#' + $(this).parent().siblings().attr('id');
            id_button_add= '#' + $(id_card_content).find('button').attr('id');
            id_button_remove = '#' + $(id_button_add).next().attr('id');
            id_button_buy = '#' + $(id_button_remove).next().attr('id');
            
            let application_web = JSON.parse(sessionStorage.getItem('pedido'))
           
            //verifica se o produto existe no pedido
            if((application_web == null) || (application_web.order_list.length == 0)){
                product_unit = 0;
            }else{
                for(let i in application_web.order_list){
                    if(application_web.order_list[i].button_click == id_button_add){
                        product_unit = application_web.order_list[i].amount;
                        existe_no_pedido = true;
                    }
                }
            }
            
            //se existir exibe os botões de remover e comprar
            if(existe_no_pedido){
                $(id_button_buy).css('display', 'block');
                $(id_button_remove).css('display', 'block');    
            }else{
                //se não existe quantidade torna-se zero e oculta-se os botões de remover e comprar
                product_unit = 0;
                $(id_button_buy).css('display', 'none');
                $(id_button_remove).css('display', 'none');
            }
           
           let aux_id_card_content = $(id_card_content).find(' > p')[1];
           $(aux_id_card_content).text('Seu pedido: ' + product_unit);
           
           //Procura pelo botão flutuante que foi clicado
           //Oculta divs aberts e exibe a que foi clicada
            switch (divide_id[2]) {
                case 'hamb1':
                    $('.card-content').slideUp('fast')
                    $('#card-content-hamb1').slideToggle('fast');
                   break;

                case 'hamb2':
                    $('.card-content').slideUp('fast')
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
        })

        //Armazena o id do botão clicado
        let produto;
        let new_id_produto = 1;
        let lista_produtos = [];

        //Identifica qual botão foi clicado
        //Realiza uma ação referente ao botão clicado
        $('.card-content > button').click(function () {
            let id_button = '#' + $(this).attr('id');
            let aux = id_button;
            let divide_button_id = id_button.split('-');
            let existe_produto = false;
            

            //div pai dos botões (adicionar, remover, comprar)
            id_card_content = '#' + $(this).closest('div').attr('id');

            switch(divide_button_id[1]){
                case 'add':
                    id_button_add = id_button;
                    aux  += ' + button';
                    id_button_remove = '#' + $(aux).attr('id');
                    aux = id_button_remove + ' + button';
                    id_button_buy = '#' + $(aux).attr('id');
                    id_card_content += '> +p';

                    if(lista_produtos.length == 0){
                        produto = new Product(new_id_produto, id_button_add);
                        lista_produtos.push(produto);
                        existe_produto = true;
                        new_id_produto++;
                    }else{
                        for(i in lista_produtos){
                            if(lista_produtos[i].button_click == id_button_add){
                                existe_produto = true;
                                produto = lista_produtos[i];
                            }
                        }
                    }
                    
                    if(existe_produto){
                        adicionar(produto);
                    }else{
                        produto = new Product(new_id_produto, id_button_add);
                        lista_produtos.push(produto);
                        adicionar(produto);
                        new_id_produto++;
                    }

                    break;
                 case 'remove':
                    id_button_remove = id_button;
                    id_card_content += '> +p';
                    
                    for(let i in lista_produtos){
                        if(lista_produtos[i].button_click == id_button_add){
                            produto = lista_produtos[i];
                        }
                    }

                    remover(produto);
                    break;

                case 'buy':
                    id_button_buy = id_button;
                    comprarProduto(produto);
                    break;
                
                default:
                    break;
            }    
        })
        
        //Função para alterar exibição de quantidade do produto
        function adicionar(produto) {
            $(id_button_remove).css('display', 'block');
            $(id_button_buy).css('display', 'block');
            product_unit++;

            if (product_unit <= 6) {
                $(id_card_content).text('Seu pedido: ' + product_unit);
                produto.adiciona();
            }
            else {
                product_unit = 6;
                window.alert('Limite máximo atingido... (6 unidades)')
            }
        }

        //decrementa a quantidade exibida no card do produto
        //cancela efeitos de notificação de produto no carrinho
        function remover(produto) {
            let teste_remove;
            console.log('id produto atual '+produto.id_produto)
            
            if (product_unit > 0) {
                product_unit--;
                
                if(current_order == undefined){
                    produto.remove();
                }else{
                   for(let i in current_order.order_list){
                        if(current_order.order_list[i].button_click == id_button_add){
                            produto.remove();
                            teste_remove = JSON.parse(sessionStorage.getItem('pedido'));
                            teste_remove.order_list[i].amount = product_unit;
                            current_order.order_list[i].amount = product_unit;
                    
                            sessionStorage.setItem('pedido', JSON.stringify(teste_remove));
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
                    removeProductList(produto);
                    sessionStorage.setItem('pedido', JSON.stringify(current_order));
                }

                teste_remove = JSON.parse(sessionStorage.getItem('pedido'));
                
                if(teste_remove.order_list.length == 0){
                    clearInterval(chave1);
                    clearInterval(chave2);
                    animation = false;
                    document.getElementById('teste').innerHTML='shopping_cart';
                }
            }

        }

        //Função de animação de notificação
        //Determina o icone de sino tocando
        //verificar*************
        function notificacao1() {
            document.getElementById('teste').innerHTML = 'notifications_active';
        }

        //Função de animação de notificação
        //Determina o icone de sino default
        //verificar*************
        function notificacao2() {
            document.getElementById('teste').innerHTML = 'notifications';
        }

        //Variáveis de controle de criação de objetos pedido e produto
        let create_order = false;
        let is_empety_order_list = true;
        let animation = false;
        let chave1;
        let chave2;
        let id_div_button;

        //Cria um objeto pedido caso não exista um criado
        //Modifica o icone no menu de carrinho
        function comprarProduto(produto){
            /*
            Encontrar e resolver o bug do produto sobreescrevendo outro
            */
            let existe = false;
            if (create_order == false) {
                current_order = new Order();
                create_order = true;
            }

            if (animation == false) {
                chave1 = setInterval(notificacao1, 500);
                chave2 = setInterval(notificacao2, 1000);
                animation = true;
            }

            if (is_empety_order_list) {
                current_order.adiciona(produto);
                sessionStorage.setItem('pedido', JSON.stringify(current_order));
                is_empety_order_list = false;
            } else {
                for(let i in current_order.order_list){
                    if(current_order.order_list[i].id_produto == produto.id_produto){
                        removeProductList(produto);
                        //order.adiciona(produto);
                        current_order.adiciona(produto);
                        existe = true;
                    }
                }

                if(existe == false){
                    //current_order.adiciona(produto);
                    current_order.adiciona(produto);
                    existe = false;
                }

                //armazena o pedido no sesseionStorage;
                sessionStorage.setItem('pedido', JSON.stringify(current_order));
            }
        }
        
        //Remove o produto da lista de pedido
        function removeProductList(produto) {
            console.log('removido produto de id: '+produto.id_produto)
            //converte os dados salvos no sessionStorage
            let list = JSON.parse(sessionStorage.getItem('pedido'));
            //verifica se existe um produto no pedido com o id do produto atual
            for (let i = 0; i < list.order_list.length; i++) {
                if (list.order_list[i].id_produto == produto.id_produto) {
                    current_order.order_list.splice(i, 1);
                }
            } 
        }
    });
}();
