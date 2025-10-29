// Orçamentos functions
function adicionarProduto() {
    const container = document.getElementById('produtos');
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = ` 
        <select class="descricao form-control">
            <option value="">Selecione a peça ou serviço</option>
            <optgroup label="Peças">
                <option>Porta Dianteira Esquerda</option>
                <option>Porta Dianteira Direita</option>
                <option>Porta Traseira Esquerda</option>
                <option>Porta Traseira Direita</option>
                <option>Parachoque Dianteiro</option>
                <option>Parachoque Traseiro</option>
                <option>Capô</option>
                <option>Farol Esquerdo</option>
                <option>Farol Direito</option>
                <option>Lanterna Esquerda</option>
                <option>Lanterna Direita</option>
                <option>Alma Dianteira</option>
                <option>Painel Frontal</option>
            </optgroup>
            <optgroup label="Serviços de Mão de Obra">
                <option>Mão de Obra - Funilaria</option>
                <option>Mão de Obra - Pintura</option>
                <option>Mão de Obra - Polimento</option>
                <option>Mão de Obra - Desmontagem</option>
                <option>Mão de Obra - Montagem</option>
                <option>Mão de Obra - Alinhamento de Chassi</option>
                <option>Mão de Obra - Substituição de Parachoque</option>
                <option>Mão de Obra - Solda</option>
                <option>Mão de Obra - Revisão</option>
                <option>Mão de Obra - Lavagem Completa</option>
            </optgroup>
            <option value="outro">Outro serviço (digite manualmente)</option>
        </select>
        <input type="text" class="descricao-manual form-control" placeholder="Descreva o serviço" style="display:none; margin-top: 5px;" />
        <input placeholder="Quantidade" type="number" class="quantidade form-control" />
        <input placeholder="Valor Unitário" type="number" class="valor form-control" />
        <button class="btn btn-danger" onclick="removerProduto(this)">Remover</button>
    `;
    container.appendChild(div);
}

function removerProduto(button) {
    const produto = button.parentElement;
    produto.remove();
}

function salvarOrcamento() {
    const cliente = document.getElementById('cliente').value;
    const data = document.getElementById('data').value;
    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modeloCarro').value;
    
    if (!cliente || !data || !placa || !modelo) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Calcular valor total
    let valorTotal = 0;
    const produtos = document.querySelectorAll('.produto');
    let servicoPrincipal = '';
    
    produtos.forEach((produto, index) => {
        const descricao = produto.querySelector('.descricao').value;
        const descricaoManual = produto.querySelector('.descricao-manual').value;
        const quantidade = parseFloat(produto.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(produto.querySelector('.valor').value) || 0;
        
        if (index === 0) {
            servicoPrincipal = descricaoManual || descricao;
        }
        
        valorTotal += quantidade * valor;
    });

    if (valorTotal === 0) {
        alert('Por favor, adicione pelo menos um produto/serviço com valor!');
        return;
    }

    // Criar novo orçamento
    const novoOrcamento = {
        id: gerarId(orcamentos),
        cliente: cliente,
        veiculo: modelo,
        placa: placa,
        valor: valorTotal,
        status: "pending",
        servico: servicoPrincipal,
        data: data
    };

    orcamentos.push(novoOrcamento);
    salvarDados();
    
    // Limpar formulário
    document.getElementById('cliente').value = '';
    document.getElementById('data').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('modeloCarro').value = '';
    document.getElementById('observacoes').value = '';
    document.getElementById('produtos').innerHTML = `
        <div class="produto">
            <select class="descricao form-control">
                <option value="">Selecione a peça ou serviço</option>
                <optgroup label="Peças">
                    <option>Porta Dianteira Esquerda</option>
                    <option>Porta Dianteira Direita</option>
                    <option>Porta Traseira Esquerda</option>
                    <option>Porta Traseira Direita</option>
                    <option>Parachoque Dianteiro</option>
                    <option>Parachoque Traseiro</option>
                    <option>Capô</option>
                    <option>Farol Esquerdo</option>
                    <option>Farol Direito</option>
                    <option>Lanterna Esquerda</option>
                    <option>Lanterna Direita</option>
                    <option>Alma Dianteira</option>
                    <option>Painel Frontal</option>
                </optgroup>
                <optgroup label="Serviços de Mão de Obra">
                    <option>Mão de Obra - Funilaria</option>
                    <option>Mão de Obra - Pintura</option>
                    <option>Mão de Obra - Polimento</option>
                    <option>Mão de Obra - Desmontagem</option>
                    <option>Mão de Obra - Montagem</option>
                    <option>Mão de Obra - Alinhamento de Chassi</option>
                    <option>Mão de Obra - Substituição de Parachoque</option>
                    <option>Mão de Obra - Solda</option>
                    <option>Mão de Obra - Revisão</option>
                    <option>Mão de Obra - Lavagem Completa</option>
                </optgroup>
                <option value="outro">Outro serviço (digite manualmente)</option>
            </select>
            <input type="text" class="descricao-manual form-control" placeholder="Descreva o serviço" style="display:none; margin-top: 5px;" />
            <input placeholder="Quantidade" type="number" class="quantidade form-control" />
            <input placeholder="Valor Unitário" type="number" class="valor form-control" />
            <button class="btn btn-danger" onclick="removerProduto(this)">Remover</button>
        </div>
    `;

    // Atualizar tabelas
    atualizarTabelaOrcamentos();
    atualizarContadores();
    
    alert('Orçamento salvo com sucesso!');
}

function aprovarOrcamento(button) {
    const row = button.closest('tr');
    const orcamentoId = parseInt(row.getAttribute('data-id'));
    
    // Encontrar o orçamento
    const orcamentoIndex = orcamentos.findIndex(o => o.id === orcamentoId);
    if (orcamentoIndex !== -1) {
        // Atualizar status do orçamento
        orcamentos[orcamentoIndex].status = "approved";
        
        // Adicionar à lista de carros para entrar
        const orcamento = orcamentos[orcamentoIndex];
        const hoje = new Date();
        const dataEntrada = new Date(hoje);
        dataEntrada.setDate(hoje.getDate() + 2); // Agendar para 2 dias a partir de hoje
        
        const novoCarroEntrada = {
            id: gerarId(carrosEntrada),
            cliente: orcamento.cliente,
            veiculo: orcamento.veiculo,
            placa: orcamento.placa,
            servico: orcamento.servico,
            data: dataEntrada.toISOString().split('T')[0],
            valor: orcamento.valor,
            orcamentoId: orcamento.id
        };
        
        carrosEntrada.push(novoCarroEntrada);
        salvarDados();
        
        // Atualizar todas as tabelas
        atualizarTodasAsTabelas();
        atualizarContadores();
        
        alert('Orçamento aprovado! Carro adicionado à lista de entrada.');
    }
}

function recusarOrcamento(button) {
    const row = button.closest('tr');
    const orcamentoId = parseInt(row.getAttribute('data-id'));
    
    // Encontrar o orçamento
    const orcamentoIndex = orcamentos.findIndex(o => o.id === orcamentoId);
    if (orcamentoIndex !== -1) {
        // Atualizar status do orçamento
        orcamentos[orcamentoIndex].status = "rejected";
        salvarDados();
        
        // Atualizar tabelas
        atualizarTabelaOrcamentos();
        atualizarContadores();
        
        alert('Orçamento recusado!');
    }
}

function atualizarTabelaOrcamentos() {
    const tbody = document.getElementById('orcamentos-pendentes');
    tbody.innerHTML = '';
    
    orcamentos.forEach(orcamento => {
        if (orcamento.status === 'pending') {
            const row = document.createElement('tr');
            row.setAttribute('data-id', orcamento.id);
            row.innerHTML = `
                <td>${orcamento.cliente}</td>
                <td>${orcamento.veiculo}</td>
                <td>${orcamento.placa}</td>
                <td>R$ ${orcamento.valor.toFixed(2)}</td>
                <td><span class="status-badge status-pending">Pendente</span></td>
                <td>
                    <button class="btn btn-success" onclick="aprovarOrcamento(this)">Aprovar</button>
                    <button class="btn btn-danger" onclick="recusarOrcamento(this)">Recusar</button>
                </td>
            `;
            tbody.appendChild(row);
        }
    });
}