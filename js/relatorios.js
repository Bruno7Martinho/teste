// Relatórios Financeiros
let relatorioData = {
    meses: [],
    receitas: [],
    despesas: [],
    lucros: []
};

// Inicializar dados de exemplo para relatórios
function inicializarDadosRelatorios() {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const anoAtual = new Date().getFullYear();
    
    relatorioData.meses = meses.map((mes, index) => `${mes}/${anoAtual}`);
    
    // Gerar dados aleatórios para demonstração
    relatorioData.receitas = meses.map(() => Math.floor(Math.random() * 20000) + 10000);
    relatorioData.despesas = meses.map(() => Math.floor(Math.random() * 10000) + 5000);
    relatorioData.lucros = relatorioData.receitas.map((receita, index) => receita - relatorioData.despesas[index]);
}

// Gerar relatório completo
function gerarRelatorio() {
    const anoSelecionado = document.getElementById('ano-relatorio').value;
    const mesSelecionado = document.getElementById('mes-relatorio').value;
    
    // Filtrar dados baseado na seleção
    const dadosFiltrados = filtrarDadosRelatorio(anoSelecionado, mesSelecionado);
    
    // Atualizar interface
    atualizarResumoMensal(dadosFiltrados);
    atualizarTabelaReceitas(dadosFiltrados);
    atualizarTabelaDespesas(dadosFiltrados);
    atualizarGraficoLucro(dadosFiltrados);
    atualizarIndicadores(dadosFiltrados);
}

// Filtrar dados para o relatório
function filtrarDadosRelatorio(ano, mes) {
    // Em uma implementação real, isso viria do Firebase
    // Por enquanto, usaremos os dados de exemplo
    
    if (mes === 'todos') {
        return {
            meses: relatorioData.meses,
            receitas: relatorioData.receitas,
            despesas: relatorioData.despesas,
            lucros: relatorioData.lucros
        };
    } else {
        const mesIndex = parseInt(mes) - 1;
        return {
            meses: [relatorioData.meses[mesIndex]],
            receitas: [relatorioData.receitas[mesIndex]],
            despesas: [relatorioData.despesas[mesIndex]],
            lucros: [relatorioData.lucros[mesIndex]]
        };
    }
}

// Atualizar resumo mensal
function atualizarResumoMensal(dados) {
    const totalReceita = dados.receitas.reduce((sum, val) => sum + val, 0);
    const totalDespesa = dados.despesas.reduce((sum, val) => sum + val, 0);
    const totalLucro = totalReceita - totalDespesa;
    const margemLucro = totalReceita > 0 ? ((totalLucro / totalReceita) * 100).toFixed(1) : 0;
    
    const resumoHTML = `
        <div class="stats-grid">
            <div class="stat-card receita">
                <h3>R$ ${totalReceita.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
                <p>Total Receita</p>
            </div>
            <div class="stat-card despesa">
                <h3>R$ ${totalDespesa.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
                <p>Total Despesas</p>
            </div>
            <div class="stat-card lucro">
                <h3>R$ ${totalLucro.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
                <p>Lucro Líquido</p>
            </div>
            <div class="stat-card">
                <h3>${margemLucro}%</h3>
                <p>Margem de Lucro</p>
            </div>
        </div>
    `;
    
    document.getElementById('resumo-mensal').innerHTML = resumoHTML;
}

// Atualizar tabela de receitas
function atualizarTabelaReceitas(dados) {
    const tbody = document.getElementById('tabela-receitas');
    tbody.innerHTML = '';
    
    dados.meses.forEach((mes, index) => {
        const ticketMedio = dados.receitas[index] / 10; // Simulando 10 serviços por mês
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mes}</td>
            <td>10</td>
            <td>R$ ${dados.receitas[index].toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>R$ ${ticketMedio.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
        `;
        tbody.appendChild(row);
    });
}

// Atualizar tabela de despesas
function atualizarTabelaDespesas(dados) {
    const tbody = document.getElementById('tabela-despesas');
    tbody.innerHTML = '';
    
    // Calcular totais por categoria (dados simulados)
    const categorias = {
        'Materiais': dados.despesas.reduce((sum, val) => sum + val * 0.4, 0),
        'Salários': dados.despesas.reduce((sum, val) => sum + val * 0.3, 0),
        'Aluguel': dados.despesas.reduce((sum, val) => sum + val * 0.15, 0),
        'Utilidades': dados.despesas.reduce((sum, val) => sum + val * 0.1, 0),
        'Outros': dados.despesas.reduce((sum, val) => sum + val * 0.05, 0)
    };
    
    const totalDespesas = Object.values(categorias).reduce((sum, val) => sum + val, 0);
    
    Object.entries(categorias).forEach(([categoria, valor]) => {
        const percentual = totalDespesas > 0 ? ((valor / totalDespesas) * 100).toFixed(1) : 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${categoria}</td>
            <td>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td>${percentual}%</td>
        `;
        tbody.appendChild(row);
    });
}

// Atualizar gráfico de lucro
function atualizarGraficoLucro(dados) {
    const ctx = document.getElementById('graficoLucroMensal').getContext('2d');
    
    // Destruir gráfico anterior se existir
    if (window.lucroChart) {
        window.lucroChart.destroy();
    }
    
    window.lucroChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dados.meses,
            datasets: [
                {
                    label: 'Receitas',
                    data: dados.receitas,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Despesas',
                    data: dados.despesas,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Lucro',
                    data: dados.lucros,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': R$ ' + context.raw.toLocaleString('pt-BR', {minimumFractionDigits: 2});
                        }
                    }
                }
            }
        }
    });
}

// Atualizar indicadores financeiros
function atualizarIndicadores(dados) {
    const totalReceita = dados.receitas.reduce((sum, val) => sum + val, 0);
    const totalDespesa = dados.despesas.reduce((sum, val) => sum + val, 0);
    const totalLucro = totalReceita - totalDespesa;
    
    // Margem de lucro
    const margemLucro = totalReceita > 0 ? ((totalLucro / totalReceita) * 100).toFixed(1) : 0;
    document.getElementById('indicador-margem').textContent = margemLucro + '%';
    
    // ROI (simplificado)
    const roi = totalDespesa > 0 ? ((totalLucro / totalDespesa) * 100).toFixed(1) : 0;
    document.getElementById('indicador-roi').textContent = roi + '%';
    
    // Crescimento (simulado)
    const crescimento = (Math.random() * 20 - 5).toFixed(1);
    document.getElementById('indicador-crescimento').textContent = crescimento + '%';
    
    // Adicionar cores baseadas nos valores
    const indicadores = [
        { element: 'indicador-margem', value: parseFloat(margemLucro), min: 10, max: 30 },
        { element: 'indicador-roi', value: parseFloat(roi), min: 20, max: 50 },
        { element: 'indicador-crescimento', value: parseFloat(crescimento), min: 0, max: 15 }
    ];
    
    indicadores.forEach(ind => {
        const element = document.getElementById(ind.element).parentElement;
        element.className = 'stat-card ';
        if (ind.value < ind.min) {
            element.classList.add('despesa');
        } else if (ind.value > ind.max) {
            element.classList.add('lucro');
        } else {
            element.classList.add('receita');
        }
    });
}

// Exportar para Excel
function exportarParaExcel() {
    const anoSelecionado = document.getElementById('ano-relatorio').value;
    const mesSelecionado = document.getElementById('mes-relatorio').value;
    
    // Criar dados para exportação
    const dados = filtrarDadosRelatorio(anoSelecionado, mesSelecionado);
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Mês,Serviços Realizados,Receita (R$),Despesas (R$),Lucro (R$)\n";
    
    dados.meses.forEach((mes, index) => {
        const linha = [
            mes,
            '10', // Serviços realizados
            dados.receitas[index].toFixed(2),
            dados.despesas[index].toFixed(2),
            dados.lucros[index].toFixed(2)
        ].join(',');
        csvContent += linha + "\n";
    });
    
    // Criar link de download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_financeiro_${anoSelecionado}_${mesSelecionado}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicializar relatórios quando a página for carregada
function inicializarRelatorios() {
    inicializarDadosRelatorios();
    gerarRelatorio(); // Gerar relatório inicial
}