// Financeiro functions
function calcularLucroMensal() {
    const receita = servicosCompletos.reduce((total, servico) => total + servico.valor, 0);
    const despesasTotal = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    return receita - despesasTotal;
}

function atualizarContadores() {
    // Atualizar contador de carros na oficina
    document.getElementById('count-carros-oficina').textContent = carrosOficina.length;
    
    // Atualizar contador de orçamentos pendentes
    const orcamentosPendentes = orcamentos.filter(o => o.status === 'pending').length;
    document.getElementById('count-orcamentos-pendentes').textContent = orcamentosPendentes;
    
    // Atualizar contador de carros para entrar
    document.getElementById('count-carros-entrada').textContent = carrosEntrada.length;
    
    // Atualizar lucro do mês
    const lucroMensal = calcularLucroMensal();
    const lucroElement = document.getElementById('lucro-mes');
    lucroElement.textContent = `R$ ${lucroMensal.toFixed(2)}`;
    
    // Destacar mudanças
    lucroElement.classList.add('highlight');
    setTimeout(() => {
        lucroElement.classList.remove('highlight');
    }, 2000);
}

function atualizarFinanceiro() {
    const receitaTotal = servicosCompletos.reduce((total, servico) => total + servico.valor, 0);
    const despesasTotal = despesas.reduce((total, despesa) => total + despesa.valor, 0);
    const lucroMensal = receitaTotal - despesasTotal;
    
    // Atualizar elementos com animação
    const elementos = [
        { id: 'lucro-mes-financeiro', valor: lucroMensal },
        { id: 'receita-mes', valor: receitaTotal },
        { id: 'despesas-mes', valor: despesasTotal },
        { id: 'receita-anual', valor: receitaTotal * 12 }
    ];
    
    elementos.forEach(item => {
        const elemento = document.getElementById(item.id);
        elemento.textContent = `R$ ${item.valor.toFixed(2)}`;
        elemento.classList.add('highlight');
        setTimeout(() => {
            elemento.classList.remove('highlight');
        }, 2000);
    });
}

function registrarDespesa() {
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    
    if (categoria && descricao && valor) {
        despesas.push({
            categoria: categoria,
            descricao: descricao,
            valor: valor
        });
        salvarDados();
        
        // Atualizar tabela de despesas
        atualizarTabelaDespesas();
        
        // Atualizar estatísticas financeiras
        atualizarFinanceiro();
        atualizarContadores();
        
        // Limpar formulário
        document.getElementById('form-despesa').reset();
        
        alert('Despesa registrada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function editarDespesa(index) {
    const despesa = despesas[index];
    abrirModal('Editar Despesa', `
        <div class="form-group">
            <label for="edit-despesa-categoria">Categoria:</label>
            <input type="text" id="edit-despesa-categoria" class="form-control" value="${despesa.categoria}">
        </div>
        <div class="form-group">
            <label for="edit-despesa-descricao">Descrição:</label>
            <input type="text" id="edit-despesa-descricao" class="form-control" value="${despesa.descricao || ''}">
        </div>
        <div class="form-group">
            <label for="edit-despesa-valor">Valor:</label>
            <input type="number" id="edit-despesa-valor" class="form-control" value="${despesa.valor}">
        </div>
        <button class="btn btn-success" onclick="salvarEdicaoDespesa(${index})">Salvar</button>
    `);
}

function salvarEdicaoDespesa(index) {
    const categoria = document.getElementById('edit-despesa-categoria').value;
    const descricao = document.getElementById('edit-despesa-descricao').value;
    const valor = parseFloat(document.getElementById('edit-despesa-valor').value);
    
    if (categoria && valor) {
        despesas[index] = {
            categoria: categoria,
            descricao: descricao,
            valor: valor
        };
        salvarDados();
        
        // Atualizar tabelas
        atualizarTabelaDespesas();
        atualizarFinanceiro();
        atualizarContadores();
        
        fecharModal();
        alert('Despesa atualizada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos obrigatórios!');
    }
}

function excluirDespesa(index) {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        despesas.splice(index, 1);
        salvarDados();
        
        // Atualizar tabelas
        atualizarTabelaDespesas();
        atualizarFinanceiro();
        atualizarContadores();
        
        alert('Despesa excluída com sucesso!');
    }
}

function atualizarTabelaDespesas() {
    const tbody = document.getElementById('despesas-categoria');
    tbody.innerHTML = '';
    
    despesas.forEach((despesa, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${despesa.categoria}</td>
            <td>${despesa.valor.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning" onclick="editarDespesa(${index})">Editar</button>
                <button class="btn btn-danger" onclick="excluirDespesa(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}