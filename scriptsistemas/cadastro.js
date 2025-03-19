const imagemInput = document.getElementById("imagem-input");
const imagemPreviewImg = document.getElementById("imagem-preview-img");
const imagemLabel = document.querySelector(".imagem-label");

// evento dispara quando arquivo é selecionado
imagemInput.addEventListener("change", function () {
    // obtém o arquivo selecionado pelo user, o 0(zero) indica a primeira imagem
    const file = this.files[0];
    // verifica se arquivo foi selecionado
    if (file) {
        const reader = new FileReader();
        
        // função pra aparecer a imagem e sumir o label
        reader.onload = function (e) {
            imagemPreviewImg.src = e.target.result;
            imagemPreviewImg.style.display = "block";
            imagemLabel.classList.add("hidden");
        };
        reader.readAsDataURL(file);
        // some com a imagem e limpa src, remove classe hidden do label
    } else {
        imagemPreviewImg.src = "";
        imagemPreviewImg.style.display = "none";
        imagemLabel.classList.remove("hidden");
    }
});


const adcionarCadastro = document.getElementById("adicionar-cadastro");
const meuFormulario = document.getElementById("meuFormulario");
const meuFormulario2 = document.getElementById("meuFormulario2");

adcionarCadastro.addEventListener("click", function (event) {
    // checar se o campos dos forms estão validos
    if (!meuFormulario.checkValidity() || !meuFormulario2.checkValidity()) {
        event.preventDefault();
        alert("Por favor, preencha todos os campos corretamente em ambos os formulários.");
        return;
    }
    // campos do formulário do animal
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
    // campos do formulário do tutor
    const tutor = document.getElementById("tutor").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    
    
    //objeto com os dados do animal
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
    // objeto com os dados do tutor
    const guardiao = {
        tutor,
        email,
        telefone,
        endereco
    };
    // juntando os objetos em um
    const cadastro = {
        animal,
        guardiao
    }
    
    
    // Recupera a lista do localStorage e adiciona o novo cadastro
    let listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    listaCadastros.push(cadastro);
    localStorage.setItem("cadastros", JSON.stringify(listaCadastros));
    
    
    // Redireciona para a página "cliente.html"
    window.location.href = "cliente.html";
    
    // Cria a div do novo animal
    const animalDiv = document.createElement("div");
    animalDiv.classList.add("cliente-card");
    animalDiv.innerHTML = `
        <!-- animal -->
        <h3>${cadastro.animal.paciente}</h3>
        <p><strong>Espécie:</strong> ${cadastro.animal.especie}</p>
        <p><strong>Sexo:</strong> ${cadastro.animal.sexo}</p>
        <p><strong>Raça:</strong> ${cadastro.animal.raca}</p>
        <p><strong>Idade:</strong> ${cadastro.animal.idade} anos</p>
        <p><strong>Microchip:</strong> ${cadastro.animal.microchip}</p>
        <p><strong>Porte:</strong> ${cadastro.animal.porte}</p>
        <p><strong>Pelagem:</strong> ${cadastro.animal.pelagem}</p>
        <p><strong>Data de Nascimento:</strong> ${cadastro.animal.dataNasc}</p>
        <p><strong>Predisposição a Doenças:</strong> ${cadastro.animal.predisposicao} ${cadastro.animal.predisposicao === "sim" ? ` - ${cadastro.animal.doenca}` : ""}</p>
        <p><strong>Cuidados Especiais:</strong> ${cadastro.animal.cuidados} ${cadastro.animal.cuidados === "sim" ? ` - ${cadastro.animal.cuidadoDesc}` : ""}</p>
        <!-- tutor -->
        <h3>${cadastro.guardiao.tutor}</h3>
        <p><strong>E-mail:</strong> ${cadastro.guardiao.email}</p>
        <p><strong>Telefone:</strong> ${cadastro.guardiao.telefone}</p>
        <p><strong>Endereço:</strong> ${cadastro.guardiao.endereco}</p>
    `;
    
    // Adiciona a div do novo animal à lista na página "cliente.html"
    document.getElementById("lista-cliente").appendChild(animalDiv);
});


// Comportamento de fazer o textarea aparecer ou desaparecer
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
    
    // usando regex na maioria dos campos pra validação, regex que não sei como usar :)
    function validarInput(input) {
        if (input.id === "paciente") {
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "microchip") {
            /^\d{15}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "data") {
            validarData(input);
        } else if (input.id === "idade") {
            validarIdade(input);
        } else if (input.id === "raca") {
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "pelagem") {
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "tutor") {
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "email") {
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "telefone") {
            /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "endereco") {
            /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{5,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
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
});


