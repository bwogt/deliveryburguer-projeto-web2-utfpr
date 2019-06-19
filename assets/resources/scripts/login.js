//Module Pattern
+ function () {
    //ativa o sidenav mobile
    $(document).ready(function () {
        $('.sidenav').sidenav();
    });

    //Função para retornar o id do elemento
    function $id(id) {
        return document.getElementById(id);
    }

    /*
        Função para limpar inputs dos forms da tela de login
        **Arrow function - querySeletorAll**
    */
    let clearInputsForms = () => {
        let inpust_forms = document.querySelectorAll('input');

        for (let i = 0; i < inpust_forms.length; i++) {
            inpust_forms[i].value = '';
        }
    }

    /*
        Tela de Login
        **Função anônima - getElementById**
    */
    let screenLogin = function () {
        $id('div-current-user').style.display = 'none';
        $id('div-create-account').style.display = 'none';
        clearInputsForms();
        $id('div-login').style.display = 'block';
        $id('title-pag-login').innerHTML = 'Acesse sua conta';
    }
    
    /*
        Tela de usuário atual
        **Arrow function com passagem de parâmetro**
    */
    let screenCurrentUser = (user_online) => {
        $id('div-login').style.display = 'none';
        $id('div-current-user').style.display = 'block';
        $id('title-pag-login').innerHTML = 'Usuário: ' + user_online;
    }

   /*
        Tela de Criação de conta
        **getElementById - textContent**
   */
    function screenCreateAccount() {
        $id('div-login').style.display = 'none';
        $id('div-create-account').style.display = 'block';
        $id('title-pag-login').textContent = 'Cadastro novo usuário';
    }

    //Sempre que a página é carregada está função é executada
    userIsOnline();

    /*
        Função para verificar se existe um usuário logado
        **Função com nome - getElementsByClassName - innerHTML - leitura sessionStorage**
    */
    function userIsOnline() {
        //Nome do usuário no sessionStorage
        let user_online = sessionStorage.getItem('display_name');

        //verifica se tem usuário logado 
        if (user_online != null) {
            let tags_user = document.getElementsByClassName('a-menu-login');

            //modifica o nome em toda a classe a-menu-login
            for (let i in tags_user) {
                document.getElementsByClassName('a-menu-login')[i].innerHTML = '<i class="material-icons left">person_pin</i>' + user_online;
            }

            screenCurrentUser(user_online);
        }
        else {
            sessionStorage.setItem('logado', false);
            document.getElementsByClassName('a-menu-login').textContent = 'Entrar';
            screenLogin();
        }
    }

    /*
        Evita o envio dos formulário - Acessa o form através da tag e posição
        **getElementsByTagName - event preventDefault()**
    */
    document.getElementsByTagName('form')[0].onsubmit = function (e) {
        e.preventDefault();
    };

    /*
        Evita o envio dos formulário - Acessa o form através da tag e posição
        **getElementsByTagName - event preventDefault()**
    */
    document.getElementsByTagName('form')[1].onsubmit = function (e) {
        e.preventDefault();
    };

    /*
        Não permite letras e caracteres especiais
        **Evento de onkeydown - uso de querySelector** 
    */
    document.querySelector('input[name="input-login-password"]').onkeydown = function(e){
        if((e.keyCode > 21) && (e.keyCode < 48)){
            e.preventDefault();
        }else{
            if((e.keyCode > 57) && (e.keyCode < 112)){
                e.preventDefault();
            }else{
                if(e.keyCode > 123){
                    e.preventDefault();
                }
            }
        }
        
        
    }

    /* 
        Validação do input email na tela de login
        **Validação tradicional - querySelector - evento blur**
        **indexOf - StringTemplate - alert - setAttribute**
    */
    document.querySelector('input[name="input-login-email"]').onblur = function () {
        let valor = this.value;
        let first_com = valor.indexOf('.com');
        let first_at = valor.indexOf('@');
        let cont_at = 0;
        let valido = true;

        if (this.value == '' || null) {
            valido = false;
        }

        for (let i = 0; i < valor.length; i++) {
            if (valor[i] == '@') {
                cont_at++;
            }
        }

        if ((cont_at == 0) || (cont_at > 1)) {
            valido = false;
        }

        if (!((valor.charAt(valor.length - 4) == '.') && (first_com == valor.length - 4))) {
            valido = false;
        }

        if (valido == false) {
            this.value = 'example@example.com';
            let mensagem = `Campo email não pode ser vazio\nSeu email precisa conter um "@"\n` +
                `Seu email precisa conter um ".com" no final`;

            alert(mensagem);

            this.setAttribute('style', 'border-bottom: 1px solid red');
            this.focus();

        } else {
            if (this.value != 'example@example.com') {
                this.setAttribute('style', 'border-bottom: 1px solid green');
            }
        }
    }

    /*
        Validação do input de senha da tela de login
        **Validação tradicional - querySelector - setAtribute - focus - onblur**
    */
    document.querySelector('input[name="input-login-password"]').onblur = function () {
        if (this.value == '' || null) {
            this.focus();
            this.setAttribute('style', 'border-bottom: 1px solid red');
        }
    }
   
    /*
        Login do usuário atráves do evento de click no botão de login
        **JSON com localStorage - querySelector - split - sessionStorage**
        **acesso via hierarquia de objetos - focus - setAttribute - evento de click**
    */
    $id('button-login').onclick = function () {
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
                sessionStorage.setItem('logado', true);

                userIsOnline();
                clearInputsForms();
            }
            else {
                alert('Senha incorreta');
                document.forms[0].elements[1].focus();
                document.forms[0].elements[1].setAttribute('style', 'border-bottom: 1px solid red');
            }
        }
        else {
            alert('Email incorreto');
            document.forms[0].elements[0].focus();
        }
    }

    /*
        Quando o botão de sair é clicado esconde-se a div de usuário logado e exibe a de login
        **sessionStorage remove - setItem - evento de click**
    */
    
    $id('button-logoff').onclick = function () {
        //exclui usuário e pedido do sessionStorage
        sessionStorage.removeItem('display_name');
        //modifica o estado do login 
        sessionStorage.setItem('logado', false);
        sessionStorage.removeItem('pedido');
        
        //recarrega a página
        window.location.reload(true);
    }

    /*  
        Quando o botão de novo cadastro é acionado a div de login é escondida e a de 
        cadastro é exibida - Também é mudado o titulo <h1> da página;
        **evento de click**
    */
    $id('button-new-account').onclick = function () {
        screenCreateAccount();

    }

    /*
        Função para criação de novo usuário
        **onsubmit - querySelector - Objeto literal - localStorage - JSON**
    */
    //evento capturado quando o botão de novo usuário é acionado
    $id('form-create-user').onsubmit = function () {

        //após o click no botão é pego o valor de cada input através do queryseletor usando o name;
        let name_user = document.querySelector('input[name="input-name-user"]').value;
        let adress_user = document.querySelector('input[name="input-adress-user"]').value;
        let adress_number = document.querySelector('input[name="input-adress-number-user"]').value;
        let city_user = document.querySelector('input[name="input-city-user"]').value;
        let email_user = document.querySelector('input[name="input-email-adress"]').value;
        let password_user = document.querySelector('input[name="input-register-password"]').value;

        //objeto criado para representar o usuário cadastrado
        let user = {
            name: name_user,
            adress: adress_user,
            adress_number: adress_number,
            city: city_user,
            email: email_user,
            password: password_user
        }

        //armazenado no localStorage utilizando JSON;
        localStorage.setItem("user1", JSON.stringify(user));



        //recarrega a página
        window.location.reload(true);

    }

    /*
        Cancelar a criação de usuário
        **evento de click**
    */
    $id('button-cancel-new-account').onclick = function () {
        //recarrega a página
        window.location.reload(true);
    }

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-name-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Digite seu nome completo utilizando as regras do exemplo');
            this.value = 'Use Maiúsculo nas iniciais ex: [J]osé, e minúsculo em conectores ex: [de]/[dos], ex: José Fernando, José de Paula'
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-adress-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Seu CEP deve conter 8 dígitos, ex: 85070000 ou 85070-000');
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-adress-number-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Digite o número da sua residência, ex: 1024');
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-city-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Digite o nome da sua cidade utilizando as regras do exemplo');
            this.value = 'Use Maiúsculo nas iniciais ex: [G]uarapuava, e minúsculo em conectores ex: [de]/[dos], ex: Guarapuava, São Paulo'
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-email-adress"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Informe um email valido igual ao do exemplo');
            this.value = 'Deve ser minúsculo conter um @ no meio e ".com" no fim, ex: teste@teste.com'
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
    */
    document.querySelector('input[name="input-register-password"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Mínimo 4 dígitos máximo 8');
        } else {
            this.setCustomValidity('');
        }
    });

}();