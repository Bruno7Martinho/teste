// Dashboard functions
function atualizarTabelaAtividades() {
    const tbody = document.getElementById('atividades-recentes');
    tbody.innerHTML = '';
    
    // Combinar atividades recentes de diferentes fontes
    const atividades = [];
    
    // Adicionar orçamentos recentes
    orcamentos.slice(-3).forEach(orcamento => {
        atividades.push({
            tipo: 'Orçamento',
            descricao: `${orcamento.veiculo} - ${orcamento.placa}`,
            detalhe: orcamento.servico,
            status: orcamento.status,
            data: orcamento.data
        });
    });
    
    // Adicionar carros na oficina recentes
    carrosOficina.slice(-3).forEach(carro => {
        atividades.push({
            tipo: 'Oficina',
            descricao: `${carro.veiculo} - ${carro.placa}`,
            detalhe: carro.servico,
            status: carro.status,
            data: carro.previsao
        });
    });
    
    // Ordenar por data (mais recente primeiro) e pegar as 3 mais recentes
    atividades.sort((a, b) => new Date(b.data) - new Date(a.data));
    const atividadesRecentes = atividades.slice(0, 3);
    
    atividadesRecentes.forEach(atividade => {
        let statusBadge = '';
        if (atividade.status === 'pending') {
            statusBadge = '<span class="status-badge status-pending">Pendente</span>';
        } else if (atividade.status === 'in-progress') {
            statusBadge = '<span class="status-badge status-in-progress">Em Andamento</span>';
        } else if (atividade.status === 'approved') {
            statusBadge = '<span class="status-badge status-approved">Aprovado</span>';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${atividade.descricao}</td>
            <td>${atividade.detalhe}</td>
            <td>${statusBadge}</td>
            <td>${atividade.data}</td>
            <td>
                <button class="btn btn-warning" onclick="editarAtividade(this)">Editar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editarAtividade(button) {
    // Implementar edição de atividade se necessário
    alert('Funcionalidade de edição em desenvolvimento');
}