document.addEventListener("DOMContentLoaded", function () {
    const listaCliente = document.getElementById("lista-cliente");
    const listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    
    listaCadastros.forEach((cadastro, index) => {
        const div = document.createElement("div");
        div.classList.add("cliente-card");
        div.dataset.index = index; // Adiciona o índice do animal como um atributo de dados
        div.innerHTML = `
            <h3 class="title-modal-main">Histórico Médico de ${cadastro.animal.paciente}</h3>
            <!-- animal -->
            <h2 class="title-modal">Informações Basicas do Animal</h2>
            <div class="row">
                <p id="modal-name"><strong class="label-modal">Paciente:</strong>${cadastro.animal.paciente}</p>
                <p id="modal-species"><strong class="label-modal">Espécie:</strong>${cadastro.animal.especie}</p>
                <p id="modal-gender"><strong class="label-modal">Sexo:</strong>${cadastro.animal.sexo}</p>
                <p id="modal-breed"><strong class="label-modal">Raça:</strong>${cadastro.animal.raca}</p>
                <p><strong class="label-modal">Data de Cadastro:</strong> ${cadastro.animal.dataCadastro}</p>
            </div>
            <!-- botão -->
            <div class="buttons">
                <button id="saveChanges">Salvar prontuário</button>
                <button id="#">imprimir pdf do prontuário</button>
            </div>
        `;
        listaCliente.appendChild(div);
        
        // Adiciona o evento de clique para exibir os detalhes do animal
        div.addEventListener("click", function () {
            exibirDetalhesAnimal(cadastro, index);
        });
    });
});

const closeButton = modal.querySelector(".close");
closeButton.addEventListener("click", () => modal.remove());

document.body.appendChild(modal);


// função de salvar as alterações
document.getElementById("saveChanges").addEventListener("click", () => {
    // animal
    cadastro.animal.paciente = document.getElementById("modal-name").value;
    cadastro.animal.especie = document.getElementById("modal-species").value;
    cadastro.animal.sexo = document.getElementById("modal-gender").value;
    cadastro.animal.raca = document.getElementById("modal-breed").value;
    cadastro.animal.idade = document.getElementById("modal-age").value;
    cadastro.animal.microchip = document.getElementById("modal-microchip").value;
    cadastro.animal.porte = document.getElementById("modal-size").value;
    cadastro.animal.pelagem = document.getElementById("modal-fur").value;
    cadastro.animal.dataNasc = document.getElementById("modal-birthDate").value;
    cadastro.animal.predisposicao = document.getElementById("modal-diseasePredisposition").value;
    cadastro.animal.cuidados = document.getElementById("modal-specialCare").value;
    // tutor
    cadastro.guardiao.tutor = document.getElementById("modal-tutor").value;
    cadastro.guardiao.endereco = document.getElementById("modal-endereco").value;
    cadastro.guardiao.email = document.getElementById("modal-email").value;
    cadastro.guardiao.cpf = document.getElementById("modal-cpf").value;
    cadastro.guardiao.rg = document.getElementById("modal-rg").value;
    cadastro.guardiao.telefone = document.getElementById("modal-telefone").value;
    
    // Agora salva as descrições também
    cadastro.animal.doenca = document.getElementById("modal-diseaseDescription") ? document.getElementById("modal-diseaseDescription").value : cadastro.animal.doenca;
    cadastro.animal.cuidadoDesc = document.getElementById("modal-careDescription") ? document.getElementById("modal-careDescription").value : cadastro.animal.cuidadoDesc;
    
    const animalList = JSON.parse(localStorage.getItem("cadastros")) || [];
    animalList[index] = cadastro;
    localStorage.setItem("cadastros", JSON.stringify(animalList));
    
    document.querySelectorAll(".cliente-card")[index].querySelector(".animal-nome").textContent = cadastro.animal.paciente;
    alert("Dados atualizados com sucesso!");
    modal.remove();
});
