// Dados da aplicação
let orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [
    {
        id: 1,
        cliente: "João Silva",
        veiculo: "VW Gol",
        placa: "ABC1234",
        valor: 850.00,
        status: "pending",
        servico: "Martelinho de Ouro",
        data: "2023-10-15"
    },
    {
        id: 2,
        cliente: "Maria Santos",
        veiculo: "Fiat Uno",
        placa: "XYZ5678",
        valor: 1200.00,
        status: "pending",
        servico: "Funilaria Completa",
        data: "2023-10-14"
    }
];

let carrosEntrada = JSON.parse(localStorage.getItem('carrosEntrada')) || [
    {
        id: 1,
        cliente: "Roberto Alves",
        veiculo: "Honda Civic",
        placa: "JKL7890",
        servico: "Reparo de Porta",
        data: "2023-10-18",
        valor: 750.00
    }
];

let carrosOficina = JSON.parse(localStorage.getItem('carrosOficina')) || [
    {
        id: 1,
        cliente: "Carlos Oliveira",
        veiculo: "Chevrolet Onix",
        placa: "DEF9012",
        servico: "Pintura",
        status: "pending",
        previsao: "2023-10-25",
        valor: 850.00
    },
    {
        id: 2,
        cliente: "Ana Pereira",
        veiculo: "Toyota Corolla",
        placa: "GHI3456",
        servico: "Martelinho de Ouro",
        status: "in-progress",
        previsao: "2023-10-18",
        valor: 650.00
    }
];

let servicosCompletos = JSON.parse(localStorage.getItem('servicosCompletos')) || [
    {
        id: 1,
        data: "15/10/2023",
        cliente: "João Silva",
        veiculo: "VW Gol",
        placa: "ABC1234",
        servico: "Martelinho de Ouro",
        valor: 850.00
    },
    {
        id: 2,
        data: "12/10/2023",
        cliente: "Mariana Souza",
        veiculo: "Hyundai HB20",
        placa: "STU9012",
        servico: "Pintura Completa",
        valor: 2500.00
    }
];

let despesas = JSON.parse(localStorage.getItem('despesas')) || [
    { categoria: "Materiais", valor: 3250.00 },
    { categoria: "Salários", valor: 1980.00 },
    { categoria: "Aluguel", valor: 800.00 },
    { categoria: "Utilidades", valor: 200.00 }
];

// Função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
    localStorage.setItem('carrosEntrada', JSON.stringify(carrosEntrada));
    localStorage.setItem('carrosOficina', JSON.stringify(carrosOficina));
    localStorage.setItem('servicosCompletos', JSON.stringify(servicosCompletos));
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

// Função para gerar ID único
function gerarId(array) {
    return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
}