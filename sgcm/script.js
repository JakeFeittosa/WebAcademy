let ultimoId = 0;

function carregarProfissionais() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://my-json-server.typicode.com/juniorlimeiras/json/profissionais');
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let dados = JSON.parse(xhr.responseText);

            for (let item of dados) {
                
                inserirProfissional(item);
                // let linha = document.createElement('tr');
                // let id = document.createElement('td');
                // let nome = document.createElement('td');
                // let registro = document.createElement('td');
                // let telefone = document.createElement('td');
                // let email = document.createElement('td');
                // let unidade = document.createElement('td');
                // let especialidade = document.createElement('td');
                // let opcoes = document.createElement('td');

                // id.textContent = item.id;
                // nome.textContent = item.nome;
                // registro.textContent = item.registro;
                // telefone.textContent = item.telefone;
                // email.textContent = item.email;
                // unidade.textContent = item.unidade;
                // especialidade.textContent = item.especialidade;
                // opcoes.innerHTML = `<a class="botao_verde" href="">Editar</a>|<a class="botao_vermelho" href="javascript:void(0)">Excluir</a>`;

                // linha.appendChild(id);
                // linha.appendChild(nome);
                // linha.appendChild(registro);
                // linha.appendChild(telefone);
                // linha.appendChild(email);
                // linha.appendChild(unidade);
                // linha.appendChild(especialidade);
                // linha.appendChild(opcoes);
                // tabela.appendChild(linha);
                if (item.id > ultimoId) {
                    ultimoId = item.id;
                }
            }
        }
        atualizarRodape();
    });
    xhr.send();
}

carregarProfissionais();

let tabela = document.querySelector('table tbody');
let form = document.getElementById('formProfissional');
let btn_enviar = document.querySelector('input[type="submit"]');
let adicionarProf = document.getElementById('adicionarProf');
let btnCancelar = document.getElementById('btnCancelar');

btn_enviar.addEventListener('click', (event) => {
    event.preventDefault();

    let objeto = {
        id: ++ultimoId,
        nome: form.nome.value,
        registro: form.registroConselho.value,
        telefone: form.telefone.value,
        email: form.email.value,
        unidade: form.unidade.options[form.unidade.selectedIndex].label,
        especialidade: form.especialidade.options[form.especialidade.selectedIndex].label
    }

    inserirProfissional(objeto);

    let mensagem = document.getElementById('mensagemConfirmacao');
    mensagem.style.display = 'block';

    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);

    form.style.display = 'none';
    adicionarProf.style.display = 'inline';
    atualizarRodape();
});

const inserirProfissional = (item) => {
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let nome = document.createElement('td');
    let registro = document.createElement('td');
    let telefone = document.createElement('td');
    let email = document.createElement('td');
    let unidade = document.createElement('td');
    let especialidade = document.createElement('td');
    let opcoes = document.createElement('td');

    id.textContent = item.id;
    nome.textContent = item.nome;
    registro.textContent = item.registro;
    telefone.textContent = item.telefone;
    email.textContent = item.email;
    unidade.textContent = item.unidade;
    especialidade.textContent = item.especialidade;

    const btnEditar = document.createElement('a');
    btnEditar.href = "#";
    btnEditar.className = "botao_verde";
    btnEditar.textContent = "Editar";

    const btnExcluir = document.createElement('a');
    btnExcluir.href = "javascript:void(0)";
    btnExcluir.className = "botao_vermelho";
    btnExcluir.textContent = "Excluir";

    opcoes.appendChild(btnEditar);
    opcoes.appendChild(document.createTextNode(" | "));
    opcoes.appendChild(btnExcluir);

    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(registro);
    linha.appendChild(telefone);
    linha.appendChild(email);
    linha.appendChild(unidade);
    linha.appendChild(especialidade);
    linha.appendChild(opcoes);

    tabela.appendChild(linha);

    // Evento excluir (funciona para qualquer linha agora)
    btnExcluir.addEventListener('click', () => {
        linha.remove();
        atualizarRodape();
    });

    // Evento editar
    btnEditar.addEventListener('click', (e) => {
        e.preventDefault();
        if (btnEditar.textContent === "Editar") {
            // Armazena os valores atuais
            let celulas = linha.querySelectorAll('td');
            celulas[1].innerHTML = `<input type="text" value="${celulas[1].textContent}">`;
            celulas[2].innerHTML = `<input type="text" value="${celulas[2].textContent}">`;
            celulas[3].innerHTML = `<input type="text" value="${celulas[3].textContent}">`;
            celulas[4].innerHTML = `<input type="text" value="${celulas[4].textContent}">`;

celulas[5].innerHTML = `
    <select>
        <option ${celulas[5].textContent === 'Pronto Atendimento' ? 'selected' : ''}>Pronto Atendimento</option>
        <option ${celulas[5].textContent === 'UTI' ? 'selected' : ''}>UTI</option>
        <option ${celulas[5].textContent === 'Exames Laboratoriais' ? 'selected' : ''}>Exames Laboratoriais</option>
    </select>
`;

celulas[6].innerHTML = `
    <select>
        <option ${celulas[6].textContent === 'Cardiologia' ? 'selected' : ''}>Cardiologia</option>
        <option ${celulas[6].textContent === 'Infectologia' ? 'selected' : ''}>Infectologia</option>
        <option ${celulas[6].textContent === 'Dermatologia' ? 'selected' : ''}>Dermatologia</option>
        <option ${celulas[6].textContent === 'Pediatria' ? 'selected' : ''}>Pediatria</option>
    </select>
`;


            btnEditar.textContent = "Confirmar edição";
        } else {
            let celulas = linha.querySelectorAll('td');
            celulas[1].textContent = celulas[1].querySelector('input').value;
            celulas[2].textContent = celulas[2].querySelector('input').value;
            celulas[3].textContent = celulas[3].querySelector('input').value;
            celulas[4].textContent = celulas[4].querySelector('input').value;
            celulas[5].textContent = celulas[5].querySelector('select').value;
            celulas[6].textContent = celulas[6].querySelector('select').value;

            btnEditar.textContent = "Editar";
        }
    });

    atualizarRodape();
};

adicionarProf.addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    adicionarProf.style.display = 'none';
});

btnCancelar.addEventListener('click', () => {
    form.style.display = 'none';
    adicionarProf.style.display = 'inline';
});

function atualizarRodape() {
    let total = document.querySelectorAll('table tbody tr').length;
    let rodape = document.getElementById('totalProfissionais');
    if (rodape) {
        rodape.textContent = `Total de profissionais: ${total}`;
    }
}
