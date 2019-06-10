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

        /****************descobrir um modo de unificar o adicionar, remover e comprar */
        //variáveis de controle do pedido
        let product_unit = 0;
        let id_card_content;
        let existe_teste = false;
       // let hamburguer1 = new Product(1);
        //let hamburguer2 = new Product(2);

        //exibe e oculta o conteudo do card de produtos
        $('.btn-floating').click(function () {    
            let id_button_current = '#' + $(this).attr('id');
            let divide_id = id_button_current.split('-');
            //******encontrar um meio de modificar o product unit a cada vez que o botão flutuante for clicado
            if(current_order == undefined){
                product_unit = 0;
            }else{
                for(i in current_order.order_list){
                    alert(current_order.order_list[i].button_click);
                }
            }
            
            
           
            
            $(id_button_buy).css('display', 'none');
            $(id_button_remove).css('display', 'none');
            $(id_card_content).text('Seu pedido: ' + product_unit);

            

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
        let id_button_add;
        let id_button_remove;
        let id_button_buy;
        let produto;
        let new_id_produto = 1;
        let existe_produto = false;
        let lista_produtos = [];

        //Identifica qual botão foi clicado
        //Realiza uma ação referente ao botão clicado
        $('.card-content > button').click(function () {
            let id_button = '#' + $(this).attr('id');
            let aux = id_button;
            let divide_button_id = id_button.split('-');
            let existe_produto = false;
            let produto_atual;

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

                    if((lista_produtos == null) || (lista_produtos == '')){
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
                        existe_produto = true;
                        new_id_produto++;
                    }

                    existe_produto = false;

                    break;
                
                case 'remove':
                    id_button_remove = id_button;
                    id_card_content += '> +p';
                    
                    remover(produto);
                // remover(hamburguer1);
                    break;

                case 'buy':
                    id_button_buy = id_button;
                    comprarHamburguer(produto);
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
            if (product_unit > 0) {
                product_unit--;
                produto.remove();
                $(id_card_content).text('Seu pedido: ' + product_unit);
            }

            if (product_unit == 0) {
                clearInterval(chave1);
                clearInterval(chave2);
                animation = false;

                $(id_button_buy).css('display', 'none');
                $(id_button_remove).css('display', 'none');
                $(id_card_content).text('Seu pedido: ' + product_unit);

                document.getElementById('teste').innerHTML='shopping_cart';

                if (current_order != undefined) {
                    removeProductList(produto);
                    sessionStorage.setItem('pedido', JSON.stringify(current_order));
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
        let current_order;
        let create_order = false;
        let is_empety_order_list = true;
        let animation = false;
        let chave1;
        let chave2;
        let id_div_button;

        //Cria um objeto pedido caso não exista um criado
        //Modifica o icone no menu de carrinho
        function comprarHamburguer(produto){
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
               //order.adiciona(produto);
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
