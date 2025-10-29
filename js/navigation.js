// Navegação entre páginas
function inicializarNavegacao() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
            
            // Oculta todas as páginas
            pages.forEach(page => page.classList.remove('active'));
            
            // Mostra a página correspondente
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// Modal functions
function abrirModal(titulo, conteudo) {
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-conteudo').innerHTML = conteudo;
    document.getElementById('modal-edicao').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-edicao').style.display = 'none';
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal-edicao');
    if (event.target === modal) {
        fecharModal();
    }
}