+function(){
    let logado1 = sessionStorage.getItem('logado');
    let existe_pedido = JSON.parse(sessionStorage.getItem('pedido'));

    if(logado1 == 'false'){
        alert('É necessário estar logado para acessar seu carrinho... \nVocê sera redirecionado para a página de login');
        window.location.href = 'login.html'
    }else{
        let nome_usuario = JSON.parse(localStorage.getItem('user1'));
        nome_usuario = nome_usuario.name.split(' ');
        nome_usuario = nome_usuario[0];

        document.getElementById('a-menu-login').textContent = nome_usuario;
    }
    
    let produtos = JSON.parse(sessionStorage.getItem('pedido'));
    let total_pedido = 0; 
    
    for(let i = 0; i < produtos.order_list.length; i++){
        let id_button_add = produtos.order_list[i].button_click;
        let exibicao;
        let total_produto;
        
        
        switch (id_button_add){
            case '#button-add-unit-hamb1': 
                total_produto = parseInt(produtos.order_list[i].amount) * 12.90;
                total_pedido += total_produto;
                
                exibicao = `Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                exibicao += `Preço unitario: R$12.90<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;

                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML = exibicao;
                break;
            
            case '#button-add-unit-hamb2': 
                total_produto = parseInt(produtos.order_list[i].amount) * 15.90;
                total_pedido += total_produto;

                exibicao = `Duplo Hamburguer Tradicional<br> Queijo Cheddar e molho especial.<br>`;
                exibicao += `Preço unitario: R$15.90<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;
                
                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;
            
            case '#button-add-unit-hamb3': 
            total_produto = parseInt(produtos.order_list[i].amount) * 20.00;
            total_pedido += total_produto;

                exibicao = `Triplo Hamburguer Tradicional<br> Queijo, Alface, Pickles, Tomate, Cebola e molho especial.<br>`;
                exibicao += `Preço unitario: R$20.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;

                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink1': 
            total_produto = parseInt(produtos.order_list[i].amount) * 4.00;
            total_pedido += total_produto;

                exibicao = `Refrigerante<br> Lata de 350Ml.<br>`;
                exibicao += `Preço unitario: R$4.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;
                
                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink2': 
            total_produto = parseInt(produtos.order_list[i].amount) * 7.00;
            total_pedido += total_produto;

                exibicao = `Refrigerante<br> Garrafa 2L.<br>`;
                exibicao += `Preço unitario: R$7.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;
                
                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;

            case '#button-add-unit-drink3': 
            total_produto = parseInt(produtos.order_list[i].amount) * 11.00;
            total_pedido += total_produto;
                exibicao = `Cerveja<br> Garrafa 1l.<br>`;
                exibicao += `Preço unitario: R$11.00<br>`;
                exibicao += `Quantidade: ${produtos.order_list[i].amount}<br>`;
                exibicao += `Total R$: ${total_produto}`;
                
                document.getElementById('total-compra').innerHTML = 'Total: R$'+total_pedido;
                document.getElementById('p-produtos').innerHTML += '<br><br>' + exibicao;
                break;
        }
       
    }
    
    let usuario = JSON.parse(localStorage.getItem('user1'));
    let endereco_entrega = `Cep: ${usuario.adress}, `;
    endereco_entrega += `Número: ${usuario.adress_number}, `;
    endereco_entrega += `Cidade: ${usuario.city}`;

    document.getElementById('p-endereco-entrega').innerHTML = endereco_entrega;

    document.getElementById('button-payment-money').onclick = function(){
        document.getElementById('button-finalize-purchase').style.display = 'block';
        document.forms[0].style.display = 'none';
    }

    document.getElementById('button-finalize-purchase').onclick = function(){
        document.getElementById('div-meio-pagamento').style.display = 'none';
        document.getElementById('button-finalize-purchase').style.display = 'none';
        document.getElementById('div-compra-finalizada').style.display = 'block';
        
    }

    document.getElementById('button-payment-card').onclick = function(){
        document.forms[0].style.display = 'block';
        document.getElementById('button-finalize-purchase').style.display = 'none';
    }

    document.forms[0].elements[3].onclick = function(e){
        e.preventDefault();
    }

    document.forms[0].elements[4].onclick = function(e){
        window.location.reload(true);
    }
    
    
}()
