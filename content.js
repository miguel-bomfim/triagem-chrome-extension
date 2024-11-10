
const mailGroups = {
  "be8": {
	"principais": "eduardo.martins@be8energy.com, fernando.jantchc@be8energy.com",
	"emCopy": "Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, Lider Triagem <triagem.imbituba@serramorena.com.br>, PAULO NUNES <paulo.nunes@serramorena.com.br>",
	"emCopyReprov": "andre.gomes@bureauveritas.com, celso.toshimitsu@bureauveritas.com, Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, esnildo.matias@bureauveritas.com, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, gabriela.klein@bureauveritas.com, Lider Triagem <triagem.imbituba@serramorena.com.br>, luciano.gomes@bureauveritas.com, magnun.pereira@bureauveritas.com, PAULO NUNES <paulo.nunes@serramorena.com.br>, rodrigo.pacheco@bureauveritas.com"
  },

  "viterra": {
	"principais": "diego.leite@viterra.com, marco.rolim@viterra.com, maringa.logistica@viterra.com, rodrigo.santos@viterra.com, saopaulo.logistica@viterra.com",
	"emCopy": "Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, Lider Triagem <triagem.imbituba@serramorena.com.br>, PAULO NUNES <paulo.nunes@serramorena.com.br>",
	"emCopyReprov": "andre.gomes@bureauveritas.com, celso.toshimitsu@bureauveritas.com, Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, esnildo.matias@bureauveritas.com, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, gabriela.klein@bureauveritas.com, Lider Triagem <triagem.imbituba@serramorena.com.br>, luciano.gomes@bureauveritas.com, magnun.pereira@bureauveritas.com, marco.rolim@viterra.com, PAULO NUNES <paulo.nunes@serramorena.com.br>, qualidade@viterra.com, Raphael Jabbour <Raphael.Jabbour@viterra.com>, rodrigo.pacheco@bureauveritas.com"
  },

  "olam": {
	"principais": "fiscalcoe.br@olamagri.com, kaique.alves@olamagri.com, log.br@olamagri.com, oga_maringa@olamagri.com",
	"emCopy":  "Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, Lider Triagem <triagem.imbituba@serramorena.com.br>, PAULO NUNES <paulo.nunes@serramorena.com.br>",
	"emCopyReprov": "andre.gomes@bureauveritas.com, celso.toshimitsu@bureauveritas.com, Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, esnildo.matias@bureauveritas.com, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, gabriela.klein@bureauveritas.com, Lider Triagem <triagem.imbituba@serramorena.com.br>, luciano.gomes@bureauveritas.com, magnun.pereira@bureauveritas.com, PAULO NUNES <paulo.nunes@serramorena.com.br>, rodrigo.pacheco@bureauveritas.com"
  },

  "safras": {
	"principais": "jefferson.valle@safrasagroindustria.com, john.siqueira@safrasagroindustria.com, logistica@safrasagroindustria.com",
	"emCopy":  "",
	"emCopyReprov": "andre.gomes@bureauveritas.com, celso.toshimitsu@bureauveritas.com, Controle <controle@serramorena.com.br>, DANIEL ALVES <daniel.alves@serramorena.com.br>, esnildo.matias@bureauveritas.com, Flavio Controle Serra Morena <flavio.souza@serramorena.com.br>, gabriela.klein@bureauveritas.com, Lider Triagem <triagem.imbituba@serramorena.com.br>, luciano.gomes@bureauveritas.com, magnun.pereira@bureauveritas.com, PAULO NUNES <paulo.nunes@serramorena.com.br>, rodrigo.pacheco@bureauveritas.com"
  }
}

const greetingMessage = () => {
    let h = new Date().getHours()
    if (h < 12) return 'Bom dia!'
    if (h >= 12 && h < 18) return 'Boa tarde!'
    else if (h >= 18 && h < 24) return 'Boa noite!'
}

let date = `${("0" +  new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}`

const trLines = document.getElementsByTagName("tr");

function getAgendamentoData() {

let agendamentoItems = [];

for (var i = 0; i < trLines.length; i++) {
  var item = trLines[i];

  agendamentoItems.push(item.innerText);
}
return agendamentoItems
}

const motorista = getAgendamentoData().find((element) => element.includes('Motorista'))
const motoraNome = motorista.split('\t')[1].match(/[a-zA-Z]+/gu).join(" ")

const motoraCpf = motorista.split('\t')[1].match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)[0]


const comitente = getAgendamentoData().find((element) =>
  element.includes("Comitente")
);

const codigoAgend = getAgendamentoData().find((element) =>
  element.includes("Código")
);

const placa = getAgendamentoData().find((element) => element.includes("Placa"));

const nfe = getAgendamentoData().filter((element) => element.includes("Número NF"));

const emitente = getAgendamentoData().find((element) =>
  element.includes("Emitente")
);

const peso = getAgendamentoData().filter((element) =>
  element.includes("Peso líquido")
);

const produto = getAgendamentoData().find((element) => element.includes("Produto"));

const transportadora = getAgendamentoData().find((element) =>
  element.includes("Transportadora")
);

const cte = getAgendamentoData().filter((element) => element.includes("CTE"));

const itemReducer = (item) => {
  return item?.split(":")[1].trim();
};

const nfeCteReducer = (nfeCte) => {
if (nfeCte[0].toLowerCase().includes('s/') || nfeCte[0].toLowerCase().includes('s /') || nfeCte[0].toLowerCase().includes('sem') || nfeCte[0].toLowerCase().includes('carga')) {
  return 'Carga própria'
} else {
return nfeCte.map((element) => element.match(/\d+/g)).join('/')
}
};

const pesoReducer = (p) => {
  let pesos = 0;

  if (typeof p !== String) {
    for (var i = 0; i < p.length; i++) {
      pesos += parseFloat(p[i].split(":")[1].trim().replace(/\./g, '').replace(',', '.'));
    }

    return Math.floor(pesos).toLocaleString('pt-BR');
  } else {
    parseFloat(p.split(":")[1].trim().toFixed(3));
  }
};

const produtoReducer = (prod) => {
  const prodLowerCase = prod.split("-")[1].trim().toLowerCase();
  const firstToUpper =
    prodLowerCase.charAt(0).toUpperCase() + prodLowerCase.slice(1);
  const match = firstToUpper.match(/[a-zA-Z\s]+/);
  return match ? match[0].trim() : "";
};

const clientReducer = (client) => {
  return client.split('-')[1].split('(')[0].trim()
};
// REDUCERS - END -


// GET ANALISE ITEMS END

function getAnaliseData() {
  const rowsBelow = [];
  const filteredRows = [];
  let targetIndex = -1;

  // Find the index of the target row
  for (let i = 0; i < trLines.length; i++) {
    if (trLines[i].innerText.includes("Dados de análise")) {
      targetIndex = i;
      break;
    }
  }

  // If target row is found, collect all rows below it
  if (targetIndex !== -1) {
    for (let j = targetIndex + 1; j < trLines.length; j++) {
      rowsBelow.push(trLines[j]);
    } 
  }

  for (let i = 0; i < rowsBelow.length; i++) {
    const tds = rowsBelow[i].getElementsByTagName("td");
    let hasRedFont = false;

    // Loop through all <td> elements in the row
    for (let j = 0; j < tds.length; j++) {
      const fontTags = tds[j].getElementsByTagName("font");

      // Check if any <font> tag has the color attribute set to "red"
      for (let k = 0; k < fontTags.length; k++) {
        if (fontTags[k].getAttribute("color") === "red") {
          hasRedFont = true;
          break;
        }
      }

      if (hasRedFont) {
        break;
      }
    }

    // Add the row to the filteredRows if it contains red font
    if (hasRedFont) {
      filteredRows.push(rowsBelow[i].innerText);
    }
  }

  return filteredRows;
};

const getPluralSingular = () => {
  if (getAnaliseData().length > 1) {
	return 'Motivos'
} else {
	return 'Motivo'
}

}

function sendMailData() {

// E-mail message model:
const mailmessage = `mailto:${mailGroups[clientReducer(comitente).split(" ")[0].toLowerCase()].principais}?cc=${mailGroups[clientReducer(comitente).split(" ")[0].toLowerCase()].emCopyReprov}&subject=${date}%20-%20REPROVADO%20-%20${clientReducer(comitente)}%20%28${produtoReducer(produto).toUpperCase()}%29%20-%20000&body=${greetingMessage()}<br><br>Abaixo dados da carga refugada:<br><br>Código: ${itemReducer(codigoAgend)}<br>Placa: ${itemReducer(placa)}<br>NF-e: ${nfeCteReducer(nfe)}<br>Emitente: ${itemReducer(emitente).split("-").slice(1).join("-").trim()}<br>Peso: ${pesoReducer(peso)} Kgs<br>Produto: ${produtoReducer(produto)}<br>Transportadora: ${itemReducer(transportadora).split("-").slice(1).join("-").trim()}<br>CT-e: ${nfeCteReducer(cte)}<br><b>${getAnaliseData() .map((refugo) => {
    const item = refugo.split("\t");
    const lowerCase = item[0].toLowerCase();
    return `${
      lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
    }: ${item[1].replace(/\s/g, "")}`;
  }).join("<br>")}<br>
${getPluralSingular()}: ${getAnaliseData()
    .map((refugo) => {
      const item = refugo.split("\t");
      const lowerCase = item[0].toLowerCase();
      return `${lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)}`;
    })
    .join(getAnaliseData().length === 2 ? " e " : ", ")}</b><br><br>Aguardamos instruções de como proceder.<br><br>Atenciosamente,<br><br><br>`

const data = {
        title: 'Enviar Email',
        url: mailmessage
    };

chrome.runtime.sendMessage({ action: 'updateHref', data: data });

}


function updateData() {
sendMailData();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateData') {
   updateData();
 }
});	


function createTextA() {
const textArea = document.createElement('textarea')

textArea.setAttribute('style', "height: 385px; width: 556px;margin: 32px")

textArea.textContent = 
  `${greetingMessage()}\n
Abaixo dados da carga refugada:\n
Código: ${itemReducer(codigoAgend)}
Placa: ${itemReducer(placa)}
NF-e: ${nfeCteReducer(nfe)}
Emitente: ${itemReducer(emitente).split("-").slice(1).join("-").trim()}
Peso: ${pesoReducer(peso)} Kgs
Produto: ${produtoReducer(produto)}
Transportadora: ${itemReducer(transportadora)
    .split("-")
    .slice(1)
    .join("-")
    .trim()}
CT-e: ${nfeCteReducer(cte)}
${getAnaliseData()
  .map((refugo) => {
    const item = refugo.split("\t");
    const lowerCase = item[0].toLowerCase();
    return `${
      lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
    }: ${item[1].replace(/\s/g, "")}`;
  })
  .join("\n")}
${getPluralSingular()}: ${getAnaliseData()
    .map((refugo) => {
      const item = refugo.split("\t");
      const lowerCase = item[0].toLowerCase();
      return `${lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)}`;
    })
    .join(getAnaliseData().length === 2 ? " e " : ", ")}.\n
Aguardamos instruções de como proceder.\n
Atenciosamente,\n
\n
\n
${date} - REPROVADO - ${produtoReducer(comitente).toUpperCase()} (${produtoReducer(produto).toUpperCase()}) - 0
`
;


document.body.prepend(textArea)

}


function printData () {
    var mywindow = window.open('', 'Declaração', 'height=600,width=900');
        mywindow.document.write('<html><head><title>Declaração de recebimento</title></head>');


mywindow.document.write(`<body style="padding:64px;display: flex;flex-direction: column;font-family: arial;height: 25cm;"><h1 style="font-size:15pt;text-align:center;text-decoration:underline;">DECLARAÇÃO DE RECEBIMENTO DE DOCUMENTAÇÃO</h1><h2 style="font-size:15pt;text-align:center;margin-top:64px;">RECEBI A DOCUMENTAÇÃO NECESSÁRIA PARA RETORNO COM A CARGA, REFERENTE À RECUSA DO CLIENTE.</h2> <div style="    margin-top: 64px;    align-self: flex-start;">    <div style="text-align:right;display:flex;flex-direction:column;font-size: 15pt;"><p style="    margin: 0;">NOTA FISCAL: ${nfeCteReducer(nfe)}</p><p style="    margin: 0;">CT-E: ${nfeCteReducer(cte)}</p></div> </div>    <div style="    text-align: center;    flex-grow: 2;    align-content: flex-end;    font-size: 15pt;">    <span>______________________________________</span>    <p style="    text-transform: uppercase;    margin: 16px 0 0;">${motoraNome}</p>    <p style="    margin: 0;">CPF: ${motoraCpf}</p>    <p style="    margin: 0;">Placa: ${itemReducer(placa)}</p>    <br>        <br>    <div style="padding-top: 24px;"><span style="    margin-right: 1em;">Data/hora:</span><span style="    margin-right: 1em;">____/____/____</span><span>____:____</span></div></div></body>`)

        mywindow.document.write('</body></html>');
        mywindow.print();
        mywindow.close();

        return true;    
}






chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'createTextArea') {
   createTextA();
 }

  if (message.action === 'printDeclaration') {

 printData();
 }
});
























