+ function () {
    
    document.getElementById('button-login').onclick = function(){
        let usuario1 = JSON.parse(localStorage.getItem("teste"));
        let nome = usuario1.name;
        let nome_digitado = document.querySelector('input[name="input-login-email"]').value;
        let senha = usuario1.password;
        let senha_digitada = document.querySelector('input[name="input-login-password"]').value;

        if(nome == nome_digitado){
            if(senha == senha_digitada){
                document.getElementById('div-login').style.display = 'none';
                document.getElementById('div-current-user').style.display = 'block';
                //corrigir alteração de nome
                document.getElementById('div-current-user > +p').innerHTML= nome;
            }
            else{
                alert('Senha incorreta');
            }
        }
        else{
            alert('Email incorreto');
        }
        
    }
   
   
   
    /*  Quando o botão de novo cadastro é acionado a div de login é escondida e a de 
        cadastro é exibida - Também é mudado o titulo <h1> da página;
    */
    document.getElementById('button-new-account').onclick = function(){
        document.getElementById('div-login').style.display = 'none';
        document.getElementById('div-create-account').style.display = 'block';
        document.getElementById('title-pag-login').innerHTML = 'Cadastro novo usuário';

    }

    //evita o envio do formulário;
    //acessa o form através da tag e posição;
    document.getElementsByTagName('form')[0].onsubmit = function (e) {
        e.preventDefault();
    };

    document.getElementsByTagName('form')[1].onsubmit = function (e) {
        e.preventDefault();
    };

    document.getElementById('button-create-new-account').onclick = function () {
        //após o click no botão é pego o valor de cada input através do queryseletor usando o name;
        let name_user = (document.querySelector('input[name="input-name-user"]').value);
        let birthday_user = (document.querySelector('input[name="input-date-of-birth"]').value);
        let adress_user = (document.querySelector('input[name="input-adress-user"]').value);
        let city_user = (document.querySelector('input[name="input-city-user"]').value);
        let email_user = (document.querySelector('input[name="input-email-adress"]').value);
        let password_user = (document.querySelector('input[name="input-password"]').value);
        let password_confirm = (document.querySelector('input[name="input-password-confirm"]').value);

        //objeto criado para representar o usuário cadastrado
        let usuario = {
            name: name_user,
            birthday: birthday_user,
            adress: adress_user,
            city: city_user,
            email: email_user,
            password: password_user
        }

        //armazenado no local storage utilizando JSON;
        localStorage.setItem("teste", JSON.stringify(usuario));


        /*  Esconde a barra de cadastro após o cadastro ser feito;
            Muda para tela de login e muda o titulo;
         */
        document.getElementById('div-create-account').style.display = 'none';
        document.getElementById('div-login').style.display = 'block';
        document.getElementById('title-pag-login').innerHTML = 'Acesse sua conta';

        
    }
    
}()