// PDF functions
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const cliente = document.getElementById('cliente').value;
    const data = document.getElementById('data').value;
    const placa = document.getElementById('placa').value;
    const modelo = document.getElementById('modeloCarro').value;

    const descricoes = document.querySelectorAll('.descricao');
    const quantidades = document.querySelectorAll('.quantidade');
    const valores = document.querySelectorAll('.valor');
    const descricaoManuais = document.querySelectorAll('.descricao-manual');

    let totalGeral = 0;
    const rows = [];

    for (let i = 0; i < descricoes.length; i++) {
        const desc = descricoes[i].value;
        const manualDesc = descricaoManuais[i].value;
        const qtd = parseInt(quantidades[i].value) || 0;
        const valor = parseFloat(valores[i].value) || 0;
        const total = qtd * valor;

        const descricaoFinal = manualDesc ? manualDesc : desc;

        totalGeral += total;

        if (descricaoFinal) {
            rows.push([descricaoFinal, qtd, `R$ ${valor.toFixed(2)}`, `R$ ${total.toFixed(2)}`]);
        }
    }

    doc.setFontSize(14);
    doc.text('ALEXANDRE REPAROS AUTOMOTIVOS', 105, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.text('CNPJ: 52219997000179', 14, 25);
    doc.text('TELEFONE: (51) 999045187', 14, 32);
    doc.text('ENDEREÇO: Rua Waldemar Boa Vista, 96 - Cohab', 14, 39);

    doc.text(`NOME DO CLIENTE: ${cliente}`, 14, 50);
    doc.text(`DATA: ${data}`, 14, 57);
    doc.text(`NÚMERO DA PLACA: ${placa}`, 14, 64);
    doc.text(`MODELO DO CARRO: ${modelo}`, 14, 71);

    doc.autoTable({
        startY: 80,
        head: [['PRODUTO/DESCRIÇÃO', 'QUANTIDADE', 'VALOR', 'TOTAL']],
        body: rows,
        styles: { halign: 'center' },
        headStyles: { fillColor: [0, 0, 0] },
        theme: 'grid',
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`TOTAL GERAL: R$ ${totalGeral.toFixed(2)}`, 14, finalY);

    const observacoes = document.getElementById('observacoes').value;
    if (observacoes) {
        const obsY = finalY + 10;
        doc.setFontSize(11);
        doc.text("OBSERVAÇÕES:", 14, obsY);

        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); 
        doc.rect(14, obsY + 6, 180, 50); 

        doc.setFontSize(10);
        const splitText = doc.splitTextToSize(observacoes, 180); 
        doc.text(splitText, 14, obsY + 12); 
    }

    doc.save('Orcamento.pdf');
}