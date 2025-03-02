const imagemInput = document.getElementById("imagem-input");
const imagemPreviewImg = document.getElementById("imagem-preview-img");
const imagemLabel = document.querySelector(".imagem-label");

imagemInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagemPreviewImg.src = e.target.result;
            imagemPreviewImg.style.display = "block";
            imagemLabel.classList.add("hidden"); // Adiciona a classe hidden ao label
        };

        reader.readAsDataURL(file);
    } else {
        imagemPreviewImg.src = "";
        imagemPreviewImg.style.display = "none";
        imagemLabel.classList.remove("hidden"); // Remove a classe hidden do label
    }
});











const adcionarCadastro = document.getElementById("adicionar-cadastro");
const meuFormulario = document.getElementById("meuFormulario");

adcionarCadastro.addEventListener("click", function (event) {
    if (!meuFormulario.checkValidity()) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const paciente = document.getElementById("paciente").value;
    const especie = document.getElementById("especie").value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value || "Não informado";
    const raca = document.getElementById("raca").value;
    const idade = document.getElementById("idade").value;
    const microchip = document.getElementById("microchip").value;
    const porte = document.getElementById("porte").value;
    const pelagem = document.getElementById("pelagem").value;
    const dataNasc = document.getElementById("data").value;
    const predisposicao = document.querySelector('input[name="predisposicao"]:checked')?.value || "Não informado";
    const doenca = document.getElementById("doenca").value;
    const cuidados = document.querySelector('input[name="cuidados"]:checked')?.value || "Não informado";
    const cuidadoDesc = document.getElementById("cuidado").value;

    // Criando um objeto com os dados do formulário
    const animal = {
        paciente,
        especie,
        sexo,
        raca,
        idade,
        microchip,
        porte,
        pelagem,
        dataNasc,
        predisposicao,
        doenca,
        cuidados,
        cuidadoDesc,
        imagem: imagemPreviewImg.src,
        dataCadastro: new Date().toLocaleDateString()
    };

    // Recupera a lista do localStorage e adiciona o novo animal
    let listaAnimais = JSON.parse(localStorage.getItem("animais")) || [];
    listaAnimais.push(animal);
    localStorage.setItem("animais", JSON.stringify(listaAnimais));

    // Redireciona para a página "cliente.html"
    window.location.href = "cliente.html";

    // Cria a div do novo animal
    const animalDiv = document.createElement("div");
    animalDiv.classList.add("cliente-card");
    animalDiv.innerHTML = `
        <h3>${animal.paciente}</h3>
        <p><strong>Espécie:</strong> ${animal.especie}</p>
        <p><strong>Sexo:</strong> ${animal.sexo}</p>
        <p><strong>Raça:</strong> ${animal.raca}</p>
        <p><strong>Idade:</strong> ${animal.idade} anos</p>
        <p><strong>Microchip:</strong> ${animal.microchip}</p>
        <p><strong>Porte:</strong> ${animal.porte}</p>
        <p><strong>Pelagem:</strong> ${animal.pelagem}</p>
        <p><strong>Data de Nascimento:</strong> ${animal.dataNasc}</p>
        <p><strong>Predisposição a Doenças:</strong> ${animal.predisposicao} ${animal.predisposicao === "sim" ? ` - ${animal.doenca}` : ""}</p>
        <p><strong>Cuidados Especiais:</strong> ${animal.cuidados} ${animal.cuidados === "sim" ? ` - ${animal.cuidadoDesc}` : ""}</p>
    `;

    // Adiciona a div do novo animal à lista na página "cliente.html"
    document.getElementById("lista-cliente").appendChild(animalDiv);
});
function configurarCampoCondicional(campo) {
    const radioSim = campo.querySelector('[value="sim"]');
    const textarea = campo.querySelector('.textarea-condicional');

    function atualizarVisibilidadeTextarea() {
        if (radioSim.checked) {
            textarea.style.display = 'block';
        } else {
            textarea.style.display = 'none';
        }
    }

    radioSim.addEventListener('change', atualizarVisibilidadeTextarea);
    campo.querySelector('[value="nao"]').addEventListener('change', atualizarVisibilidadeTextarea);
    campo.querySelector('[value="desconhecido"]').addEventListener('change', atualizarVisibilidadeTextarea);

    atualizarVisibilidadeTextarea(); // Inicializa a visibilidade
}

// Aplica a configuração aos campos
configurarCampoCondicional(document.querySelector('.campo.predisposicao'));
configurarCampoCondicional(document.querySelector('.campo.cuidados'));


document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input");
    const selects = document.querySelectorAll(".select");

    inputs.forEach(input => {
        input.addEventListener("change", function () {
            validarInput(input);
        });
    });

    selects.forEach(select => {
        select.addEventListener("change", function () {
            validarSelect(select);
        });
    });

    function validarInput(input) {
        if (input.id === "paciente") {
            input.value.trim().length > 2 ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "microchip") {
            /^\d{15}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "data") {
            validarData(input);
        } else if (input.id === "idade") {
            validarIdade(input);
        } else if (input.id === "raca") {
            validarRaca(input);
        } else if (input.id === "pelagem") { // Adiciona a validação da pelagem
            validarPelagem(input);
        }
    }

    function validarPelagem(input) {
        const valor = input.value.trim();

        if (valor.length > 2) { // Exemplo: pelagem com mais de 2 caracteres
            input.classList.add("correct");
            input.classList.remove("error");
        } else {
            input.classList.add("error");
            input.classList.remove("correct");
        }
    }

    

    function validarData(input) {
        const dataSelecionada = new Date(input.value);
        const dataAtual = new Date();

        if (isNaN(dataSelecionada.getTime())) {
            input.classList.add("error");
            input.classList.remove("correct");
            return;
        }

        const ano = dataSelecionada.getFullYear();

        if (ano < 1900 || ano > dataAtual.getFullYear() || dataSelecionada > dataAtual) {
            input.classList.add("error");
            input.classList.remove("correct");
        } else {
            input.classList.add("correct");
            input.classList.remove("error");
        }
    }

    function validarSelect(select) {
        if (select.value) {
            select.classList.add("selected");
        } else {
            select.classList.remove("selected");
        }
    }

    function validarIdade(input) {
        const valor = input.value.trim();
        const idade = parseInt(valor, 10);

        if (!isNaN(idade) && idade >= 0 && idade <= 100) {
            input.classList.add("correct");
            input.classList.remove("error");
        } else {
            input.classList.add("error");
            input.classList.remove("correct");
        }
    }

    function validarRaca(input) {
        const valor = input.value.trim();

        if (valor.length > 2) {
            input.classList.add("correct");
            input.classList.remove("error");
        } else {
            input.classList.add("error");
            input.classList.remove("correct");
        }
    }
});


