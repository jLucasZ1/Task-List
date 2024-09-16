const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const ListaCompleta = document.querySelector('.list-task');
const errorMessage = document.createElement('p'); // Cria o elemento para mensagem de erro
errorMessage.style.color = 'red';  // Define o estilo da mensagem de erro
errorMessage.style.display = 'none';  // Esconde inicialmente
input.parentElement.appendChild(errorMessage);  // Adiciona a mensagem abaixo do campo de input

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
    const inputValue = input.value.trim();
    
    if (inputValue === '') {
        // Exibe a mensagem de erro se o campo estiver vazio
        errorMessage.textContent = 'A tarefa não pode estar vazia!';
        errorMessage.style.display = 'block';
    } else {
        // Se não estiver vazio, adicione a nova tarefa
        minhaListaDeItens.push({
            tarefa: inputValue,
            concluida: false
        });

        input.value = '';
        errorMessage.style.display = 'none';  // Esconde a mensagem de erro
        mostrarTarefas();
    }
}

function mostrarTarefas() {
    let NovaLi = '';

    minhaListaDeItens.forEach((item, posicao) => {
        NovaLi = NovaLi + `
        <li class="task ${item.concluida ? 'done' : ''}">
            <img src="./img/checked.png" alt="concluir.tarefa" onclick='concluirTarefa(${posicao})'/>
            <p>${item.tarefa}</p>
            <img src="./img/delete.png" alt="deletar.tarefa" onclick='deletarItem(${posicao})'/>
        </li>
        `;
    });

    ListaCompleta.innerHTML = NovaLi;
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
}

function recarregartarefas() {
    const tarefasdolocalstorage = localStorage.getItem('lista');
    if (tarefasdolocalstorage) {
        minhaListaDeItens = JSON.parse(tarefasdolocalstorage);
    }
    mostrarTarefas();
}

button.addEventListener('click', adicionarNovaTarefa);

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarNovaTarefa();
    }
});

window.addEventListener('load', recarregartarefas);

// MODO DARK OR LIGHT //

const toggleSwitch = document.querySelector('#toggle');

toggleSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
