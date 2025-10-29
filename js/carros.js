// Carros functions
function confirmarEntrada(button) {
    const row = button.closest('tr');
    const carroId = parseInt(row.getAttribute('data-id'));
    
    // Encontrar o carro
    const carroIndex = carrosEntrada.findIndex(c => c.id === carroId);
    if (carroIndex !== -1) {
        const carro = carrosEntrada[carroIndex];
        
        // Adicionar à lista de carros na oficina
        const novoCarroOficina = {
            id: gerarId(carrosOficina),
            cliente: carro.cliente,
            veiculo: carro.veiculo,
            placa: carro.placa,
            servico: carro.servico,
            status: "pending",
            previsao: carro.data,
            valor: carro.valor,
            entradaId: carro.id
        };
        
        carrosOficina.push(novoCarroOficina);
        
        // Remover da lista de entrada
        carrosEntrada.splice(carroIndex, 1);
        salvarDados();
        
        // Atualizar todas as tabelas
        atualizarTodasAsTabelas();
        atualizarContadores();
        
        alert('Entrada confirmada! Carro movido para a oficina.');
    }
}

function cancelarEntrada(button) {
    const row = button.closest('tr');
    const carroId = parseInt(row.getAttribute('data-id'));
    
    // Encontrar o carro
    const carroIndex = carrosEntrada.findIndex(c => c.id === carroId);
    if (carroIndex !== -1) {
        // Remover da lista de entrada
        carrosEntrada.splice(carroIndex, 1);
        salvarDados();
        
        // Atualizar tabelas
        atualizarTabelaCarrosEntrada();
        atualizarContadores();
        
        alert('Entrada cancelada!');
    }
}

function atualizarStatusCarro(button, novoStatus) {
    const card = button.closest('.card');
    const carroId = parseInt(card.getAttribute('data-id'));
    
    // Encontrar o carro
    const carroIndex = carrosOficina.findIndex(c => c.id === carroId);
    if (carroIndex !== -1) {
        if (novoStatus === 'completed') {
            // Mover para serviços completos
            const carro = carrosOficina[carroIndex];
            const hoje = new Date();
            const dataFormatada = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;
            
            const novoServicoCompleto = {
                id: gerarId(servicosCompletos),
                data: dataFormatada,
                cliente: carro.cliente,
                veiculo: carro.veiculo,
                placa: carro.placa,
                servico: carro.servico,
                valor: carro.valor,
                carroId: carro.id
            };
            
            servicosCompletos.push(novoServicoCompleto);
            
            // Remover da lista de carros na oficina
            carrosOficina.splice(carroIndex, 1);
            salvarDados();
            
            // Atualizar todas as tabelas
            atualizarTodasAsTabelas();
            atualizarContadores();
            atualizarFinanceiro();
            
            alert('Carro movido para serviços completos!');
        } else {
            // Apenas atualizar o status
            carrosOficina[carroIndex].status = novoStatus;
            salvarDados();
            atualizarTabelaCarrosOficina();
        }
    }
}

function atualizarTabelaCarrosEntrada() {
    const tbody = document.getElementById('carros-entrada-lista');
    tbody.innerHTML = '';
    
    carrosEntrada.forEach(carro => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', carro.id);
        row.innerHTML = `
            <td>${carro.cliente}</td>
            <td>${carro.veiculo}</td>
            <td>${carro.placa}</td>
            <td>${carro.servico}</td>
            <td><input type="date" value="${carro.data}" class="form-control" onchange="atualizarDataEntrada(${carro.id}, this.value)"></td>
            <td>R$ <input type="number" value="${carro.valor}" class="form-control" style="width: auto; display: inline;" onchange="atualizarValorEntrada(${carro.id}, this.value)"></td>
            <td>
                <button class="btn" onclick="confirmarEntrada(this)">Confirmar Entrada</button>
                <button class="btn btn-danger" onclick="cancelarEntrada(this)">Cancelar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function atualizarTabelaCarrosOficina() {
    const container = document.getElementById('carros-oficina-grid');
    container.innerHTML = '';
    
    carrosOficina.forEach(carro => {
        const statusText = carro.status === 'pending' ? 'Aguardando' : 'Em Andamento';
        const statusClass = carro.status === 'pending' ? 'status-pending' : 'status-in-progress';
        const buttonText = carro.status === 'pending' ? 'Iniciar Serviço' : 'Marcar como Concluído';
        const buttonAction = carro.status === 'pending' ? 'in-progress' : 'completed';
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', carro.id);
        card.innerHTML = `
            <div class="card-header">${carro.veiculo} - ${carro.placa}</div>
            <div class="card-body">
                <p><strong>Cliente:</strong> ${carro.cliente}</p>
                <p><strong>Serviço:</strong> ${carro.servico}</p>
                <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
                <p><strong>Previsão:</strong> <input type="date" value="${carro.previsao}" class="form-control" style="width: auto; display: inline;" onchange="atualizarPrevisaoCarro(${carro.id}, this.value)"></p>
                <p><strong>Valor:</strong> R$ <input type="number" value="${carro.valor}" class="form-control" style="width: auto; display: inline;" onchange="atualizarValorCarro(${carro.id}, this.value)"></p>
                <button class="btn" onclick="atualizarStatusCarro(this, '${buttonAction}')">${buttonText}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function atualizarTabelaServicosCompletos() {
    const tbody = document.getElementById('servicos-completos-lista');
    tbody.innerHTML = '';
    
    servicosCompletos.forEach(servico => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', servico.id);
        row.innerHTML = `
            <td>${servico.data}</td>
            <td>${servico.cliente}</td>
            <td>${servico.veiculo}</td>
            <td>${servico.placa}</td>
            <td>${servico.servico}</td>
            <td>${servico.valor.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Funções auxiliares para atualizar dados
function atualizarDataEntrada(id, novaData) {
    const carroIndex = carrosEntrada.findIndex(c => c.id === id);
    if (carroIndex !== -1) {
        carrosEntrada[carroIndex].data = novaData;
        salvarDados();
    }
}

function atualizarValorEntrada(id, novoValor) {
    const carroIndex = carrosEntrada.findIndex(c => c.id === id);
    if (carroIndex !== -1) {
        carrosEntrada[carroIndex].valor = parseFloat(novoValor);
        salvarDados();
    }
}

function atualizarPrevisaoCarro(id, novaPrevisao) {
    const carroIndex = carrosOficina.findIndex(c => c.id === id);
    if (carroIndex !== -1) {
        carrosOficina[carroIndex].previsao = novaPrevisao;
        salvarDados();
    }
}

function atualizarValorCarro(id, novoValor) {
    const carroIndex = carrosOficina.findIndex(c => c.id === id);
    if (carroIndex !== -1) {
        carrosOficina[carroIndex].valor = parseFloat(novoValor);
        salvarDados();
        atualizarFinanceiro();
        atualizarContadores();
    }
}