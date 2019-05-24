//Module Pattern
+ function () {
    //Função para limpar inputs dos forms da tela de login
    //Utilização de arrow function
    //Utilizado querySeletorAll
    let clearInputsForms = () => {
        let inpust_forms = document.querySelectorAll('input');

        for (let i = 0; i < inpust_forms.length; i++) {
            inpust_forms[i].value = '';
        }
    }

    //tela de login
    let screenLogin = function () {
        clearInputsForms();
        document.getElementById('div-current-user').style.display = 'none';
        document.getElementById('div-create-account').style.display = 'none';
        document.getElementById('div-login').style.display = 'block';
        document.getElementById('title-pag-login').innerHTML = 'Acesse sua conta';
    }

    //tela de usuário atual
    let screenCurrentUser = (user_online) => {
        document.getElementById('div-login').style.display = 'none';
        document.getElementById('div-current-user').style.display = 'block';
        document.getElementById('title-pag-login').innerHTML = 'Usuário: ' + user_online;
    }

    //tela de cadastro
    function screenCreateAccount() {
        document.getElementById('div-login').style.display = 'none';
        document.getElementById('div-create-account').style.display = 'block';
        document.getElementById('title-pag-login').innerHTML = 'Cadastro novo usuário';
    }

    //sempre quando a página é carregada está função é executada
    userIsOnline();

    //Função para verificar se existe um usuário logado
    function userIsOnline() {
        let user_online = sessionStorage.getItem('display_name');

        if ((user_online != null) && (user_online != undefined)) {
            document.getElementById('a-menu-login').textContent = user_online;
            screenCurrentUser(user_online);

        }
        else {
            document.getElementById('a-menu-login').textContent = 'Entrar';
            screenLogin();
        }
    }



    //evita o envio do formulário;
    //acessa o form através da tag e posição;
    document.getElementsByTagName('form')[0].onsubmit = function (e) {
        e.preventDefault();
    };

    document.getElementsByTagName('form')[1].onsubmit = function (e) {
        e.preventDefault();
    };

    //evento de click no botão login
    document.getElementById('button-login').onclick = function () {
        let user_data = JSON.parse(localStorage.getItem("user1"));
        let registration_email = user_data.email;
        let typed_email = document.querySelector('input[name="input-login-email"]').value;
        let registration_password = user_data.password
        let typed_password = document.querySelector('input[name="input-login-password"]').value;

        //verifica se email e senha são idênticas ao do objeto usuário salvo no local storage
        if (typed_email == registration_email) {
            if (typed_password == registration_password) {
               
                let first_name = user_data.name;
                first_name = first_name.split(" ");
                first_name = first_name[0];
                
                screenCurrentUser(first_name);
                sessionStorage.setItem('display_name', first_name);

                userIsOnline();
                clearInputsForms();
            }
            else {
                alert('Senha incorreta');
            }
        }
        else {
            alert('Email incorreto');
        }

    }

    //quando o botão de sair é clicado esconde-se a div de usuário logado e exibe a de login
    document.getElementById('button-logoff').onclick = function () {
        //remove o usuário logado
        sessionStorage.removeItem('display_name');
        userIsOnline();
        screenLogin();
    }

    /*  Quando o botão de novo cadastro é acionado a div de login é escondida e a de 
        cadastro é exibida - Também é mudado o titulo <h1> da página;
    */
    document.getElementById('button-new-account').onclick = function () {
        screenCreateAccount();
    }

    //evento capturado quando o botão de novo usuário é acionado
    document.getElementById('button-create-new-account').onclick = function () {
        //após o click no botão é pego o valor de cada input através do queryseletor usando o name;
        let name_user = document.querySelector('input[name="input-name-user"]').value;
        let birthday_user = document.querySelector('input[name="input-date-of-birth"]').value;
        let adress_user = document.querySelector('input[name="input-adress-user"]').value;
        let city_user = document.querySelector('input[name="input-city-user"]').value;
        let email_user = document.querySelector('input[name="input-email-adress"]').value;
        let password_user = document.querySelector('input[name="input-password"]').value;
        let password_confirm = document.querySelector('input[name="input-password-confirm"]').value;

        //objeto criado para representar o usuário cadastrado
        let user = {
            name: name_user,
            birthday: birthday_user,
            adress: adress_user,
            city: city_user,
            email: email_user,
            password: password_user
        }

        //armazenado no local storage utilizando JSON;
        localStorage.setItem("user1", JSON.stringify(user));


        //volta para a tela de login
        screenLogin();
    }

    //cancela a criação de um novo usuário e volta para tela de login
    document.getElementById('button-cancel-new-account').onclick = function () {
        screenLogin();
    }

}()