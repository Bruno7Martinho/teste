// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar navegação
    inicializarNavegacao();
    
    // Inicializar comportamento dos selects de descrição
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('descricao')) {
            const inputManual = e.target.parentElement.querySelector('.descricao-manual');
            if (e.target.value === 'outro') {
                inputManual.style.display = 'block';
            } else {
                inputManual.style.display = 'none';
            }
        }
    });
    
    // Inicializar formulário de despesa
    const formDespesa = document.getElementById('form-despesa');
    if (formDespesa) {
        formDespesa.addEventListener('submit', function(e) {
            e.preventDefault();
            registrarDespesa();
        });
    }

    // Inicializar dados
    atualizarTodasAsTabelas();
    atualizarContadores();
    atualizarFinanceiro();
});

// Função para atualizar todas as tabelas
function atualizarTodasAsTabelas() {
    atualizarTabelaOrcamentos();
    atualizarTabelaCarrosEntrada();
    atualizarTabelaCarrosOficina();
    atualizarTabelaServicosCompletos();
    atualizarTabelaAtividades();
    atualizarTabelaDespesas();
}