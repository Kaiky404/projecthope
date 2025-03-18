document.addEventListener("DOMContentLoaded", function () {
    const listaCliente = document.getElementById("lista-cliente");
    const listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    listaCadastros.forEach((cadastro, index) => {
        const div = document.createElement("div");
        div.classList.add("cliente-card");
        div.dataset.index = index;

        div.innerHTML = `
            <h3 class="title-modal-main">Histórico Médico de ${cadastro.animal.paciente}</h3>
            <div class="naoModificavel">
                <h2 class="title-modal">Informações Basicas do Animal</h2>
                <div class="row">
                    <p id="modal-name"><strong class="label-modal">Paciente:</strong>${cadastro.animal.paciente}</p>
                    <p id="modal-species"><strong class="label-modal">Espécie:</strong>${cadastro.animal.especie}</p>
                    <p id="modal-breed"><strong class="label-modal">Raça:</strong>${cadastro.animal.raca}</p>
                    <p id="modal-gender"><strong class="label-modal">Sexo:</strong>${cadastro.animal.sexo}</p>
                    <p id="modal-age"><strong class="label-modal">Idade:</strong> ${cadastro.animal.idade}</p>
                    <p id="modal-size"><strong class="label-modal">Porte:</strong> ${cadastro.animal.porte}</p>
                    <p id="modal-fur"><strong class="label-modal">Pelagem:</strong> ${cadastro.animal.pelagem}</p>
                </div>
                <h2 class="title-modal">Informações Basicas do Tutor</h2>
                <div class="row">
                    <p id="modal-tutor"><strong class="label-modal">Nome:</strong>${cadastro.guardiao.tutor}</p>
                    <p id="modal-cpf"><strong class="label-modal">CPF:</strong>${cadastro.guardiao.cpf}</p>
                    <p id="modal-endereco"><strong class="label-modal">Endereço:</strong>${cadastro.guardiao.endereco}</p>
                </div>
            </div>
            <h2 class="title-modal">Histórico Médico</h2>
            <div class="row">
                <p><strong class="label-modal">Doença Anteriores:</strong><input type="textarea" id="modal-doencaAnt" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.doencaAnt || ''}" /></p>
                <p><strong class="label-modal">Tratamentos Realizados:</strong><input type="textarea" id="modal-tratamentoAnt" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.tratamentoAnt || ''}" /></p>
                <p><strong class="label-modal">Histórico de Vacinação:</strong><input type="textarea" id="modal-histVacina" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.histVacina || ''}" /></p>
            </div>
            <h2 class="title-modal">Outros</h2>
            <div class="row">
                <p><strong class="label-modal">sintomas atuais e queixas apresentadas:</strong><input type="text" id="modal-anamnese" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.anamnese || ''}" /></p>
                <p><strong class="label-modal">Exame Físico:</strong><input type="textarea" id="modal-examFisico" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.examFisico || ''}" /></p>
                <p><strong class="label-modal">Diagnóstico:</strong><input type="textarea" id="modal-diagnostico" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.diagnostico || ''}" /></p>    
            </div>
            <h2 class="title-modal">Tratamento</h2>
            <div class="row">
                <p><strong class="label-modal">Prescrição de Medicamentos:</strong><input type="textarea" id="modal-prescMedicamentos" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.prescMedicamentos || ''}" /></p>
                <p><strong class="label-modal">Procedimentos Realizados:</strong><input type="textarea" id="modal-procedRealizado" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.procedRealizado || ''}" /></p>
                <p><strong class="label-modal">Orientações ao Tutor:</strong><input type="textarea" id="modal-orientacoes" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.orientacoes || ''}" /></p>
                <p><strong class="label-modal">Evolução Clínica:</strong><input type="textarea" id="modal-evoClinica" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.evoClinica || ''}" /></p>
            </div>
            <h2 class="title-modal">Profissional</h2>
            <div class="row">
                <p><strong class="label-modal">Nome do Profissional:</strong><input type="text" id="modal-nomeProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.nomeProfissional || ''}" /></p>
                <p><strong class="label-modal">RA do Profissional:</strong><input type="text" id="modal-raProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${cadastro.animal.paciente}`))?.raProfissional || ''}" /></p>
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
            doencaAnt: document.getElementById("modal-doencaAnt").value,
            tratamentoAnt: document.getElementById("modal-tratamentoAnt").value,
            histVacina: document.getElementById("modal-histVacina").value,
            anamnese: document.getElementById("modal-anamnese").value,
            examFisico: document.getElementById("modal-examFisico").value,
            diagnostico: document.getElementById("modal-diagnostico").value,
            prescMedicamentos: document.getElementById("modal-prescMedicamentos").value,
            procedRealizado: document.getElementById("modal-procedRealizado").value,
            orientacoes: document.getElementById("modal-orientacoes").value,
            evoClinica: document.getElementById("modal-evoClinica").value,
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
