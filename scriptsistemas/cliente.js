document.addEventListener("DOMContentLoaded", function () {
    const listaCliente = document.getElementById("lista-cliente");
    const listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    listaCadastros.forEach((cadastro, index) => {
        const div = document.createElement("div");
        div.classList.add("cliente-card");
        div.dataset.index = index; // Adiciona o índice do animal como um atributo de dados
        div.innerHTML = `
            <img src="${cadastro.animal.imagem}" alt="Imagem do animal">
            <h3 class="animal-nome">${cadastro.animal.paciente}</h3>
            <h5 class="tutor-nome">${cadastro.guardiao.tutor}<h5>
            <p><strong class="data-cadastro">Data de Cadastro:</strong> ${cadastro.animal.dataCadastro}</p>
            <button class="remover-animal">Remover</button>
        `;
        listaCliente.appendChild(div);

        // Adiciona o evento de clique para exibir os detalhes do animal
        div.addEventListener("click", function () {
            exibirDetalhesAnimal(cadastro, index);
        });

        // Adiciona o evento de clique para remover o animal
        div.querySelector(".remover-animal").addEventListener("click", function () {
            removerAnimal(index);
        });
    });
});

function removerAnimal(index) {
    try {
        let listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
        listaCadastros.splice(index, 1);
        localStorage.setItem("cadastros", JSON.stringify(listaCadastros));

        const animalCard = document.querySelectorAll(".cliente-card")[index];
        animalCard.parentElement.removeChild(animalCard);
        // Recarregue a lista de animais aqui para atualizar os índices, se necessário
    } catch (error) {
        console.error("Erro ao remover animal:", error);
        alert("Ocorreu um erro ao remover o animal.");
    }
}

function exibirDetalhesAnimal(cadastro, index) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>

            <!-- animal -->
            <h2 class="title-modal">Animal</h2>
            <div class="row">
                <p><strong class="label-modal">Paciente:</strong><input type="text" id="modal-name" value="${cadastro.animal.paciente}" /></p>
                <p><strong class="label-modal">Espécie:</strong> <input type="text" id="modal-species" value="${cadastro.animal.especie}" /></p>
                <p><strong class="label-modal">Sexo:</strong> <input type="text" id="modal-gender" value="${cadastro.animal.sexo}" /></p>
                <p><strong class="label-modal">Raça:</strong> <input type="text" id="modal-breed" value="${cadastro.animal.raca}" /></p>
            </div>
            <div class="row">
                <p><strong class="label-modal">Idade:</strong> <input type="number" id="modal-age" value="${cadastro.animal.idade}" /></p>
                <p><strong class="label-modal">Microchip:</strong> <input type="text" id="modal-microchip" value="${cadastro.animal.microchip}" /></p>
                <p><strong class="label-modal">Porte:</strong> <input type="text" id="modal-size" value="${cadastro.animal.porte}" /></p>
                <p><strong class="label-modal">Pelagem:</strong> <input type="text" id="modal-fur" value="${cadastro.animal.pelagem}" /></p>
                <p><strong class="label-modal">Data de Nascimento:</strong> <input type="date" id="modal-birthDate" value="${cadastro.animal.dataNasc}" /></p>
            </div>
            <div class="row">
                <p><strong class="label-modal">Predisposição a Doenças:</strong> 
                    <select id="modal-diseasePredisposition">
                        <option value="sim" ${cadastro.animal.predisposicao === "sim" ? "selected" : ""}>Sim</option>
                        <option value="não" ${cadastro.animal.predisposicao === "não" ? "selected" : ""}>Não</option>
                    </select>
                    ${cadastro.animal.predisposicao === "sim" ? `<p><strong class="label-modal">Descrição da Doença:</strong> <textarea id="modal-diseaseDescription">${cadastro.animal.doenca}</textarea></p>` : ""}
                </p>
                <p><strong class="label-modal">Cuidados Especiais:</strong>
                    <select id="modal-specialCare">
                        <option value="sim" ${cadastro.animal.cuidados === "sim" ? "selected" : ""}>Sim</option>
                        <option value="não" ${cadastro.animal.cuidados === "não" ? "selected" : ""}>Não</option>
                    </select>
                    ${cadastro.animal.cuidados === "sim" ? `<p><strong class="label-modal">Descrição do Cuidado:</strong> <textarea id="modal-careDescription">${cadastro.animal.cuidadoDesc}</textarea></p>` : ""}
                </p>
            </div>

            <h2 class="title-modal">Tutor</h2>
            <!-- tutor -->
            <div class="row">
                <p><strong class="label-modal">Nome:</strong><input type="text" id="modal-tutor" value="${cadastro.guardiao.tutor}" /></p>
                <p><strong class="label-modal">Endereço:</strong><input type="text" id="modal-endereco" value="${cadastro.guardiao.endereco}" /></p>
                <p><strong class="label-modal">E-mail:</strong><input type="text" id="modal-email" value="${cadastro.guardiao.email}" /></p>
            </div>
            <div class="row">
                <p><strong class="label-modal">CPF:</strong><input type="text" id="modal-cpf" value="${cadastro.guardiao.cpf}" /></p>
                <p><strong class="label-modal">RG:</strong><input type="text" id="modal-rg" value="${cadastro.guardiao.rg}" /></p>
                <p><strong class="label-modal">Telefone:</strong><input type="text" id="modal-telefone" value="${cadastro.guardiao.telefone}" /></p>
            </div>

            <!-- botão -->
            <button id="saveChanges">Salvar Alterações</button>
        </div>
    `;

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
}