document.addEventListener("DOMContentLoaded", function () {
    const listaCliente = document.getElementById("lista-cliente");
    const listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    listaCadastros.forEach((cadastro, index) => {
        const div = document.createElement("div");
        div.classList.add("cliente-card");
        div.dataset.index = index;

        div.innerHTML = `
            <h3 class="title-modal-main">Consulta de ${cadastro.animal.paciente}</h3>
            <div class="naoModificavel">
                <h2 class="title-modal">Informações Basicas do Animal</h2>
                <div class="row">
                    <p id="modal-name"><strong class="label-modal">Paciente:</strong>${cadastro.animal.paciente}</p>
                    <p id="modal-species"><strong class="label-modal">Espécie:</strong>${cadastro.animal.especie}</p>
                    <p id="modal-breed"><strong class="label-modal">Raça:</strong>${cadastro.animal.raca}</p>
                    <p id="modal-gender"><strong class="label-modal">Sexo:</strong>${cadastro.animal.sexo}</p>
                    <p id="modal-size"><strong class="label-modal">Porte:</strong> ${cadastro.animal.porte}</p>
                </div>
                <h2 class="title-modal">Informações Basicas do Tutor</h2>
                <div class="row">
                    <p id="modal-tutor"><strong class="label-modal">Nome:</strong>${cadastro.guardiao.tutor}</p>
                    <p id="modal-endereco"><strong class="label-modal">Endereço:</strong>${cadastro.guardiao.endereco}</p>
                    <p id="modal-telefone"><strong class="label-modal">Endereço:</strong>${cadastro.guardiao.telefone}</p>
                </div>
            </div>
            <h2 class="title-modal">Sobre a consulta</h2>
            <div class="row">
                <p><strong class="label-modal">Data:</strong><input type="date" id="modal-data" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.data || ''}" /></p>
                <p><strong class="label-modal">Horário:</strong><input type="time" id="modal-horario" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.horario || ''}" /></p>
                <p><strong class="label-modal">Tipo da Consulta:</strong><input type="textarea" id="modal-tipoConsulta" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.tipoConsulta || ''}" /></p>
            </div>
            <h2 class="title-modal">Profissional</h2>
            <div class="row">
                <p><strong class="label-modal">Nome do Profissional:</strong><input type="text" id="modal-nomeProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.nomeProfissional || ''}" /></p>
                <p><strong class="label-modal">RA do Profissional (crmv):</strong><input type="text" id="modal-raProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.raProfissional || ''}" /></p>
            </div>

            <div class="buttons">
                <button class="saveProntuario" data-index="${index}">Salvar prontuário</button>
                <button class="imprimir-pdf" data-index="${index}">imprimir pdf do prontuário</button>
            </div>
        `;

        listaCliente.appendChild(div);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("saveProntuario")) {
            const index = event.target.dataset.index;
            salvarProntuario(index);
        }
        if(event.target.classList.contains("imprimir-pdf")){
            const index = event.target.dataset.index;
            imprimirPdf(index);
        }
    });

    function salvarProntuario(index) {
        const cadastro = listaCadastros[index];
        const prontuario = {
            data: document.getElementById("modal-data").value,
            horario: document.getElementById("modal-horario").value,
            tipoConsulta: document.getElementById("modal-tipoConsulta").value,
            nomeProfissional: document.getElementById("modal-nomeProfissional").value,
            raProfissional: document.getElementById("modal-raProfissional").value
        };
        localStorage.setItem(`prontuario-${cadastro.animal.paciente}`, JSON.stringify(prontuario));
    }

    function imprimirPdf(index){
        const cadastro = listaCadastros[index];
        const prontuario = JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`)) || {};
        const dadosParaPdf = {
            animal: cadastro.animal,
            guardiao: cadastro.guardiao,
            prontuario: prontuario
        }
        console.log(dadosParaPdf)
        //implementar a função de impressão aqui!
    }
});
