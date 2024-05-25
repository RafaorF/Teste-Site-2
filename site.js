// site.js

// Função para abrir a caixa de diálogo de seleção de impressão
function openModal() {
  document.getElementById('modal').style.display = 'block';
}

// Função para fechar a caixa de diálogo de seleção de impressão
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Função para imprimir uma seção específica
function printSection(sectionId) {
    closeModal(); // Fecha a caixa de diálogo antes de imprimir
    
    // Oculta todas as seções, exceto a selecionada
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Imprime a seção selecionada
    window.print();
    
    // Retorna todas as seções à exibição normal
    sections.forEach(section => {
        section.style.display = '';
    });
}

function logout() {
    window.location = "index.html"; // Muda a URL atual para index.html
  }
  

// Funções para carregar os dados do arquivo JSON quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    console.log('A página index.html foi carregada com sucesso!');
    // Seu código JavaScript adicional pode ser adicionado aqui
    carregarDados();
});

// Função para carregar os dados do arquivo JSON
function carregarDados() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            exibirAnotacoes(data.anotacoes);
            exibirListaCompras(data.lista_compras);
            exibirCompromissos(data.compromissos);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}

// Função para salvar os dados no arquivo JSON
function salvarDados(dados) {
    fetch('dados.json', {
        method: 'PUT', // Atualiza o arquivo JSON
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocorreu um erro ao salvar os dados.');
        }
        console.log('Dados salvos com sucesso.');
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Funções para exibir os dados carregados
function exibirAnotacoes(anotacoes) {
    const anotacoesTextarea = document.getElementById('anotacoes-textarea');
    anotacoesTextarea.value = anotacoes;
}

function exibirListaCompras(listaCompras) {
    const listaItens = document.getElementById('lista-itens');
    listaItens.innerHTML = ""; // Limpar a lista antes de adicionar itens
    listaCompras.forEach(item => {
        const novoItem = document.createElement('li');
        novoItem.textContent = item;
        listaItens.appendChild(novoItem);
    });
}

function exibirCompromissos(compromissos) {
    const listaCompromissos = document.getElementById('lista-compromissos');
    listaCompromissos.innerHTML = ""; // Limpar a lista antes de adicionar compromissos
    compromissos.forEach(compromisso => {
        const novoCompromisso = document.createElement('li');
        novoCompromisso.textContent = compromisso;
        listaCompromissos.appendChild(novoCompromisso);
    });
}

// Funções para obter os dados do usuário
function obterAnotacoes() {
    const anotacoesTextarea = document.getElementById('anotacoes-textarea');
    return anotacoesTextarea.value.trim();
}

function obterListaCompras() {
    const listaItens = document.querySelectorAll('#lista-itens li');
    return Array.from(listaItens).map(item => item.textContent);
}

function obterCompromissos() {
    const listaCompromissos = document.querySelectorAll('#lista-compromissos li');
    return Array.from(listaCompromissos).map(compromisso => compromisso.textContent);
}

// Funções para adicionar itens e compromissos
function adicionarItem() {
    const itemInput = document.getElementById('item-input');
    const itemTexto = itemInput.value.trim();
    if (itemTexto !== '') {
        const listaItens = document.getElementById('lista-itens');
        const novoItem = document.createElement('li');
        novoItem.textContent = itemTexto;
        listaItens.appendChild(novoItem);
        itemInput.value = '';

        // Obtém os dados atuais e adiciona o novo item à lista de compras
        const dadosAtuais = {
            anotacoes: obterAnotacoes(),
            lista_compras: obterListaCompras().concat(itemTexto),
            compromissos: obterCompromissos()
        };
        
        // Salva os dados atualizados no arquivo JSON
        salvarDados(dadosAtuais);
    }
}

function adicionarCompromisso() {
    const compromissoInput = document.getElementById('compromisso-input');
    const compromissoData = new Date(compromissoInput.value);
    if (!isNaN(compromissoData.getTime())) {
        const listaCompromissos = document.getElementById('lista-compromissos');
        const novoCompromisso = document.createElement('li');
        novoCompromisso.textContent = compromissoData.toLocaleString();
        listaCompromissos.appendChild(novoCompromisso);
        compromissoInput.value = '';

        // Obtém os dados atuais e adiciona o novo compromisso à lista de compromissos
        const dadosAtuais = {
            anotacoes: obterAnotacoes(),
            lista_compras: obterListaCompras(),
            compromissos: obterCompromissos().concat(compromissoData.toLocaleString())
        };

        // Salva os dados atualizados no arquivo JSON
        salvarDados(dadosAtuais);
    }
}
