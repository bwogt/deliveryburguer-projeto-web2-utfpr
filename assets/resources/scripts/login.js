//Module Pattern
'use strict';
(function () {
    //ativa o sidenav mobile
    $(document).ready(function () {
        $('.sidenav').sidenav();
        $('.modal').modal();
        $('input[name="input-adress-user"]').mask('00000-000');
    });

    /*
        Exibe se houve click na página de login 
        **addEventListener no onload**
    */
    window.onload = function () {
        document.addEventListener('click', function () {
            console.log('Click!');
        });
    };

    let couponMessage = 'Parabéns curioso :p , você ganhou R$5,00 de desconto!\n';
    couponMessage += 'use o cupom "ganhei5" no seu carrinho.';

    /*
     Função que escreve no console
    */
    function printConsole(message) {
        console.log(message);
    }

    /*
         Passagem da função de escrever no console como parametro
         Quando invocado escreve algo no console
         **Passagem de uma função como parâmetro**
    */
    function runPrintConsole(printConsole, message) {
        printConsole(message);
    }

    //Execução da função de escrever cupom de desconto no console
    runPrintConsole(printConsole, couponMessage);

    //Função para retornar o id do elemento
    function $id(id) {
        return document.getElementById(id);
    }

    /*
        Função para limpar inputs dos forms da tela de login
        **Função Flecha - Arrow Function - querySeletorAll**
    */
    let clearInputsForms = () => {
        let inputsForms = document.querySelectorAll('input');

        for (let i = 0; i < inputsForms.length; i++) {
            inputsForms[i].value = '';
        }
    };

    /*
        Tela de Login
        **Função anônima sem argumento - getElementById**
    */
    let screenLogin = function () {
        $id('div-current-user').style.display = 'none';
        $id('div-create-account').style.display = 'none';
        clearInputsForms();
        $id('div-login').style.display = 'block';
        $id('div-modal-user-data').style.display = 'none';
        $id('title-pag-login').innerHTML = 'Acesse sua conta';
    };

    /*
        Tela de usuário atual
        **Função anônima com argumento**
    */
    let screenCurrentUser = function (userOnline) {
        $id('div-login').style.display = 'none';
        $id('div-current-user').style.display = 'block';
        $id('div-modal-user-data').style.display = 'block';
        $id('title-pag-login').innerHTML = 'Usuário: ' + userOnline;
    };

    /*
         Tela de Criação de conta
         **getElementById - textContent**
    */
    function screenCreateAccount() {
        $id('div-login').style.display = 'none';
        $id('div-create-account').style.display = 'block';
        $id('title-pag-login').textContent = 'Cadastro novo usuário';
    }

    /*
        Função para verificar se existe um usuário logado
        **Função com nome - getElementsByClassName - innerHTML - leitura sessionStorage**
    */
    function userIsOnline() {
        //Nome do usuário no sessionStorage
        let userOnline = sessionStorage.getItem('display_name');

        //verifica se tem usuário logado 
        if (userOnline !== null) {
            document.getElementsByClassName('a-menu-login')[0].innerHTML = '<i class="material-icons left">' +
                'person_pin</i>' + userOnline;

            screenCurrentUser(userOnline);
        }
        else {
            sessionStorage.setItem('logado', false);
            document.getElementsByClassName('a-menu-login').textContent = 'Entrar';
            screenLogin();
        }
    }

    //Sempre que a página é carregada está função é executada
    userIsOnline();

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
        Só aceita números
        Função anônima com argumento
        ** Evento de teclado - usar charCode ou keyCode**
        **Event** 
    */
    let banKey = function (e) {
        if ((e.keyCode > 21) && (e.keyCode < 48)) {
            e.preventDefault();
            console.log('Código da tecla na tabela ASCII: ' + e.keyCode);
        } else {
            if ((e.keyCode > 57) && (e.keyCode < 112)) {
                e.preventDefault();
                console.log('Código da tecla na tabela ASCII: ' + e.keyCode);
            } else {
                if (e.keyCode > 123) {
                    e.preventDefault();
                    console.log('Código da tecla na tabela ASCII: ' + e.keyCode);
                }
            }
        }
    };

    /*
        Não permite letras e caracteres especiais no input senha do login
        **Evento de onkeydown - getElementsByName** 
    */
    document.getElementsByName('input-login-password')[0].onkeydown = function (e) {
        banKey(e);
    };

    /*
        Não permite letras e caracteres especiais no cadatro da senha
        **Evento de onkeydown - uso de getElementsByName** 
    */
    document.getElementsByName('input-register-password')[0].onkeydown = function (e) {
        banKey(e);
    };

    /* 
        Validação do input email na tela de login
        **Validação tradicional - getElementsByName - evento blur**
        **indexOf - StringTemplate - alert - setAttribute**
    */
    document.getElementsByName('input-login-email')[0].onblur = function () {
        let valor = this.value,
            firstPoint = valor.indexOf('.'),
            firstAt = valor.indexOf('@'),
            contAt = 0,
            valido = true;

        if (this.value.length === 0) {
            valido = false;
        } else {
            if (firstPoint === -1 || firstAt === -1) {
                valido = false;
            } else {
                for (let i = firstAt; i < valor.length; i++) {
                    if (valor[i] === '@') {
                        contAt++;
                    }
                }

                if ((contAt === 0) || (contAt > 1)) {
                    valido = false;
                }

                if (firstPoint < 7) {
                    valido = false;
                }
            }
        }

        if (!valido) {
            this.value = 'example@example.com';
            let mensagem = `Campo email não pode ser vazio\nSeu email precisa conter um "@"\n` +
                `Seu email deve conter no mínimo um "."`;

            window.alert(mensagem);

            this.setAttribute('style', 'border-bottom: 1px solid red');
            this.focus();

        } else {
            if (this.value !== 'example@example.com') {
                this.setAttribute('style', 'border-bottom: 1px solid green');
            }
        }
    };

    /*
        Validação do input de senha da tela de login
        **Validação tradicional - getElementsByName - setAtribute - focus - onblur**
    */
    document.getElementsByName('input-login-password')[0].onblur = function () {
        if (this.value.length === 0) {
            this.focus();
            this.setAttribute('style', 'border-bottom: 1px solid red');
        }
    };

    /*
        Login do usuário atráves do evento de click no botão de login
        **JSON com localStorage - querySelector - split - sessionStorage**
        **acesso via hierarquia de objetos - focus - setAttribute - evento de click**
    */
    $id('button-login').onclick = function () {
        let userData = JSON.parse(localStorage.getItem('user1')),
            registrationEmail = userData.email,
            typedEmail = document.querySelector('input[name="input-login-email"]').value,
            registrationPassword = userData.password,
            typedPassword = document.querySelector('input[name="input-login-password"]').value;

        //verifica se email e senha são idênticas ao do objeto usuário salvo no local storage
        if (typedEmail === registrationEmail) {
            if (typedPassword === registrationPassword) {

                let firstName = userData.name;
                firstName = firstName.split(' ');
                firstName = firstName[0];

                screenCurrentUser(firstName);

                sessionStorage.setItem('display_name', firstName);
                sessionStorage.setItem('logado', true);

                userIsOnline();
                clearInputsForms();
            }
            else {
                window.alert('Senha incorreta');
                document.forms[0].elements[1].focus();
                document.forms[0].elements[1].setAttribute('style', 'border-bottom: 1px solid red');
            }
        }
        else {
            window.alert('Email incorreto');
            document.forms[0].elements[0].focus();
        }
    };

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
    };

    /*  
        Quando o botão de novo cadastro é acionado a div de login é escondida e a de 
        cadastro é exibida - Também é mudado o titulo <h1> da página;
        **evento de click**
    */
    $id('button-new-account').onclick = function () {
        screenCreateAccount();

    };

    /*
        Função para criação de novo usuário
        **onsubmit - querySelector - Objeto literal - localStorage - JSON**
    */
    //evento capturado quando o botão de novo usuário é acionado
    $id('form-create-user').onsubmit = function () {
        //após o click no botão é pego o valor de cada input através do queryseletor usando o name;
        let nameUser = document.querySelector('input[name="input-name-user"]').value,
            adressUser = document.querySelector('input[name="input-adress-user"]').value,
            adressNumber = document.querySelector('input[name="input-adress-number-user"]').value,
            cityUser = document.querySelector('input[name="input-city-user"]').value,
            emailUser = document.querySelector('input[name="input-email-adress"]').value,
            passwordUser = document.querySelector('input[name="input-register-password"]').value;

        //objeto criado para representar o usuário cadastrado
        let user = {
            name: nameUser,
            adress: adressUser,
            adressNumber: adressNumber,
            city: cityUser,
            email: emailUser,
            password: passwordUser
        };

        //armazenado no localStorage utilizando JSON;
        localStorage.setItem('user1', JSON.stringify(user));

        //recarrega a página
        window.location.reload(true);
    };

    /*
        Cancelar a criação de usuário
        **evento de click**
    */
    $id('button-cancel-new-account').onclick = function () {
        //recarrega a página
        window.location.reload(true);
    };

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
        **validação html5**
    */
    document.querySelector('input[name="input-name-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Digite seu nome completo utilizando as regras do exemplo');
            this.value = 'Use Maiúsculo nas iniciais ex: [J]osé, e minúsculo em conectores ' +
                'ex: [de]/[dos], ex: José Fernando, José de Paula';
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
        **validação html5**
    */
    document.querySelector('input[name="input-adress-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Seu CEP deve conter 8 dígitos, ex: 85070-000');
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
        **validação html5**
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
        **validação html5**
    */
    document.querySelector('input[name="input-city-user"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Digite o nome da sua cidade utilizando as regras do exemplo');
            this.value = 'Use Maiúsculo nas iniciais ex: [G]uarapuava, e minúsculo em conectores ' +
                'ex: [de]/[dos], ex: Guarapuava, São Paulo';
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
        **validação html5**
    */
    document.querySelector('input[name="input-email-adress"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Informe um email valido igual ao do exemplo');
            this.value = 'Deve ser minúsculo, conter um "@" e pelo menos um "." ' +
                ', ex: teste@teste.com';
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Mensagem customizadas para erros de padrões no fórmulario de cadastro de usuário
        **querySelector - addEventListener - valueMissing**
        **validação html5**
    */
    document.querySelector('input[name="input-register-password"]').addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Mínimo 4 dígitos máximo 8');
        } else {
            this.setCustomValidity('');
        }
    });

    /*
        Informações do usuário cadastrado
        **Função anônima com retorno**
    */
    let userInformation = function () {
        let user = JSON.parse(localStorage.getItem('user1'));
        let displayText = `Nome: ${user.name}<br>`;
        displayText += `Cep: ${user.adress}<br>`;
        displayText += `Número da residência: ${user.adressNumber}<br>`;
        displayText += `Cidade: ${user.city}<br>`;
        displayText += `Email: ${user.email}`;
        return displayText;
    };

    /*
        Exibe os dados no modal quando o botão é clicado
        **Acesso via referência DOM pelo id do elemento HTML - innerHTML**
    */
    buttonModal.onclick = function () {
        let dataUser = userInformation();
        $id('p-information-user').innerHTML = dataUser;
    };

})();