document.addEventListener("DOMContentLoaded", function () {
    const listaCliente = document.getElementById("lista-cliente");
    const listaAnimais = JSON.parse(localStorage.getItem("animais")) || [];

    listaAnimais.forEach((animal, index) => {
        const div = document.createElement("div");
        div.classList.add("cliente-card");
        div.dataset.index = index; // Adiciona o índice do animal como um atributo de dados
        div.innerHTML = `
            <img src="${animal.imagem}" alt="Imagem do animal">
            <h3 class="animal-nome">${animal.paciente}</h3>
            <p><strong class="data-cadastro">Data de Cadastro:</strong> ${animal.dataCadastro}</p>
            <button class="remover-animal">Remover</button>
        `;
        listaCliente.appendChild(div);

        // Adiciona o evento de clique para exibir os detalhes do animal
        div.addEventListener("click", function () {
            exibirDetalhesAnimal(animal, index);
        });

        // Adiciona o evento de clique para remover o animal
        div.querySelector(".remover-animal").addEventListener("click", function () {
            removerAnimal(index);
        });
    });
});

function removerAnimal(index) {
    let listaAnimais = JSON.parse(localStorage.getItem("animais")) || [];
    listaAnimais.splice(index, 1); // Remove o animal do array
    localStorage.setItem("animais", JSON.stringify(listaAnimais)); // Atualiza o localStorage
    
    // Remove o card do animal da página
    const animalCard = document.querySelectorAll(".cliente-card")[index];
    animalCard.remove();
}

function exibirDetalhesAnimal(animal, index) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p><strong>Nome:</strong><input type="text" id="modal-name" value="${animal.paciente}" /></p>
            <p><strong>Espécie:</strong> <input type="text" id="modal-species" value="${animal.especie}" /></p>
            <p><strong>Sexo:</strong> <input type="text" id="modal-gender" value="${animal.sexo}" /></p>
            <p><strong>Raça:</strong> <input type="text" id="modal-breed" value="${animal.raca}" /></p>
            <p><strong>Idade:</strong> <input type="number" id="modal-age" value="${animal.idade}" /></p>
            <p><strong>Microchip:</strong> <input type="text" id="modal-microchip" value="${animal.microchip}" /></p>
            <p><strong>Porte:</strong> <input type="text" id="modal-size" value="${animal.porte}" /></p>
            <p><strong>Pelagem:</strong> <input type="text" id="modal-fur" value="${animal.pelagem}" /></p>
            <p><strong>Data de Nascimento:</strong> <input type="date" id="modal-birthDate" value="${animal.dataNasc}" /></p>
            <p><strong>Predisposição a Doenças:</strong> 
                <select id="modal-diseasePredisposition">
                    <option value="sim" ${animal.predisposicao === "sim" ? "selected" : ""}>Sim</option>
                    <option value="não" ${animal.predisposicao === "não" ? "selected" : ""}>Não</option>
                </select>
                ${animal.predisposicao === "sim" ? `<p><strong>Descrição da Doença:</strong> <textarea id="modal-diseaseDescription">${animal.doenca}</textarea></p>` : ""}
            </p>
            <p><strong>Cuidados Especiais:</strong>
                <select id="modal-specialCare">
                    <option value="sim" ${animal.cuidados === "sim" ? "selected" : ""}>Sim</option>
                    <option value="não" ${animal.cuidados === "não" ? "selected" : ""}>Não</option>
                </select>
                ${animal.cuidados === "sim" ? `<p><strong>Descrição do Cuidado:</strong> <textarea id="modal-careDescription">${animal.cuidadoDesc}</textarea></p>` : ""}
            </p>
            <button id="saveChanges">Salvar Alterações</button>
        </div>
    `;

    const closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", () => modal.remove());

    document.body.appendChild(modal);

    document.getElementById("saveChanges").addEventListener("click", () => {
        animal.paciente = document.getElementById("modal-name").value;
        animal.especie = document.getElementById("modal-species").value;
        animal.sexo = document.getElementById("modal-gender").value;
        animal.raca = document.getElementById("modal-breed").value;
        animal.idade = document.getElementById("modal-age").value;
        animal.microchip = document.getElementById("modal-microchip").value;
        animal.porte = document.getElementById("modal-size").value;
        animal.pelagem = document.getElementById("modal-fur").value;
        animal.dataNasc = document.getElementById("modal-birthDate").value;
        animal.predisposicao = document.getElementById("modal-diseasePredisposition").value;
        animal.cuidados = document.getElementById("modal-specialCare").value;

        // Agora salva as descrições também
        animal.doenca = document.getElementById("modal-diseaseDescription") ? document.getElementById("modal-diseaseDescription").value : animal.doenca;
        animal.cuidadoDesc = document.getElementById("modal-careDescription") ? document.getElementById("modal-careDescription").value : animal.cuidadoDesc;

        const animalList = JSON.parse(localStorage.getItem("animais")) || [];
        animalList[index] = animal;
        localStorage.setItem("animais", JSON.stringify(animalList));

        document.querySelectorAll(".cliente-card")[index].querySelector(".animal-nome").textContent = animal.paciente;
        alert("Dados atualizados com sucesso!");
        modal.remove();
    });
}

