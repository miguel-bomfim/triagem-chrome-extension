import {
  getActiveTabUrl,
  date,
  greetingMessage,
  getPluralSingular
} from './functions/utils.js';
import {
  eMailGroupReducer,
  clientReducer,
  produtoReducer,
  itemReducer,
  nfeCteReducer,
  pesoReducer,
  formatarComitente
} from './functions/reducers.js';

const fetchEmails = async (client) => {
  const emailGroups = await fetch(`./EMAILS/${client}.txt`).then((res) => res.text()).then((text) => {return text})
  return eMailGroupReducer(emailGroups)
}

  const getPrincipais = async (client) => {
    const { PRINCIPAIS } = await fetchEmails(client)
    return PRINCIPAIS.map((x) => x).join()
}

  const getCopiaReprovados = async (client) => {
    const { EM_COPIA_REPROVADOS } = await fetchEmails(client)
    return EM_COPIA_REPROVADOS .map((x) => x).join()
}

// Deal with the content data 
document.addEventListener('DOMContentLoaded', async () => {
  let activeTab = await getActiveTabUrl();
  const anchor = document.getElementById('sendMail');
  const mailModel = document.getElementById("mailModel")
  const printDeclarationButton = document.getElementById('printDeclaration')

    chrome.tabs.sendMessage(activeTab.id, { action: "getAgendamentoData" }, async (response) => {
      if (response) {
        const agendamento = response.content
        const analiseData = response.analiseData

        const comitente = agendamento.find((element) =>
          element.includes("Comitente")
        );

        console.log(formatarComitente(comitente))

        const produto = agendamento.find((element) => element.includes("Produto"));
        const codigoAgend = agendamento.find((element) =>
          element.includes("Código")
        );
        const placa = agendamento.find((element) => element.includes("Placa"));
        const nfe = agendamento.filter((element) => element.includes("Número NF"));
        const cte = agendamento.filter((element) => element.includes("CTE"));
        const emitente = agendamento.find((element) =>
          element.includes("Emitente")
        );
        const peso = agendamento.filter((element) =>
          element.includes("Peso líquido")
        );
        const transportadora = agendamento.find((element) =>
          element.includes("Transportadora")
        );

        const motorista = agendamento.find((element) => element.includes('Motorista'))
        const motoraNome = motorista.split('\t')[1].match(/[a-zA-Z]+/gu).join(" ")
        const motoraCpf = motorista.split('\t')[1].match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)[0]
        let mgraneisUser = ''
        
        chrome.storage.local.get("username", function (data) {
          if (data.username) {
            mgraneisUser = data.username
          } else {
            console.log("No username found.");
          }
        });


          const mailmessage = `mailto:${await getPrincipais(formatarComitente(comitente))}?cc=${await getCopiaReprovados(formatarComitente(comitente))}&subject=${date}%20-%20REPROVADO%20-%20${clientReducer(comitente)}%20%28${produtoReducer(produto).toUpperCase()}%29%20-%20000&body=${greetingMessage()}<br><br>Abaixo dados da carga refugada:<br><br>Código: ${itemReducer(codigoAgend)}<br>Placa: ${itemReducer(placa)}<br>NF-e: ${nfeCteReducer(nfe)}<br>Emitente: ${itemReducer(emitente).split("-").slice(1).join("-").trim()}<br>Peso: ${pesoReducer(peso)} Kgs<br>Produto: ${produtoReducer(produto)}<br>Transportadora: ${itemReducer(transportadora).split("-").slice(1).join("-").trim()}<br>CT-e: ${nfeCteReducer(cte)}<br><b>${analiseData.map((refugo) => {
            const item = refugo.split("\t");
            const lowerCase = item[0].toLowerCase();
            return `${
              lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
              }: ${item[1].replace(/\s/g, "")}`;
            }).join("<br>")}<br>
            ${getPluralSingular(analiseData)}: ${analiseData
            .map((refugo) => {
              const item = refugo.split("\t");
              const lowerCase = item[0].toLowerCase();
              return `${lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)}`;
            })
            .join(analiseData.length === 2 ? " e " : ", ")}</b><br><br>Aguardamos instruções de como proceder.<br><br>Atenciosamente,<br>${mgraneisUser}<br><br><br>`
        if (anchor) {
          anchor.href = mailmessage
        }

        const hasNFeData = agendamento.filter((item) => item.includes('Número NF')).length > 0 ? true : false
        const hasAnalisysData = agendamento.filter((item) => item.includes('Dados de análise')).length > 0 ? true : false 

        const textAreaContent = 
        `${greetingMessage()}\n
Abaixo dados da carga refugada:\n
Código: ${itemReducer(codigoAgend)}
Placa: ${itemReducer(placa)}
NF-e: ${hasNFeData ? nfeCteReducer(nfe) : ''}
Emitente: ${hasNFeData ? itemReducer(emitente).split("-").slice(1).join("-").trim() : ''}
Peso: ${hasNFeData ? pesoReducer(peso) : ''} Kgs
Produto: ${produtoReducer(produto)}
Transportadora: ${itemReducer(transportadora)
    .split("-")
    .slice(1)
    .join("-")
    .trim()}
CT-e: ${hasNFeData ? nfeCteReducer(cte) : ''}
${hasAnalisysData ? analiseData
  .map((refugo) => {
    const item = refugo.split("\t");
    const lowerCase = item[0].toLowerCase();
    return `${
      lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
    }: ${item[1].replace(/\s/g, "")}`;
  })
  .join("\n") : ''}
${hasAnalisysData ? getPluralSingular(analiseData) : ''}: ${hasAnalisysData ? analiseData
    .map((refugo) => {
      const item = refugo.split("\t");
      const lowerCase = item[0].toLowerCase();
      return `${lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)}`;
    })
    .join(analiseData.length === 2 ? " e " : ", ") : ''}.\n
`
    const printDeclarationBody = `<body style="padding:64px;display: flex;flex-direction: column;font-family: arial;height: 25cm;"><h1 style="font-size:15pt;text-align:center;text-decoration:underline;">DECLARAÇÃO DE RECEBIMENTO DE DOCUMENTAÇÃO</h1><h2 style="font-size:15pt;text-align:center;margin-top:64px;">RECEBI A DOCUMENTAÇÃO NECESSÁRIA PARA RETORNO COM A CARGA, REFERENTE À RECUSA DO CLIENTE.</h2> <div style="    margin-top: 64px;    align-self: flex-start;">    <div style="text-align:right;display:flex;flex-direction:column;font-size: 15pt;"><p style="    margin: 0;">NOTA FISCAL: ${nfeCteReducer(nfe)}</p><p style="    margin: 0;">CT-E: ${nfeCteReducer(cte)}</p></div> </div>    <div style="    text-align: center;    flex-grow: 2;    align-content: flex-end;    font-size: 15pt;">    <span>______________________________________</span>    <p style="    text-transform: uppercase;    margin: 16px 0 0;">${motoraNome}</p>    <p style="    margin: 0;">CPF: ${motoraCpf}</p>    <p style="    margin: 0;">Placa: ${itemReducer(placa)}</p>    <br>        <br>    <div style="padding-top: 24px;"><span style="    margin-right: 1em;">Data/hora:</span><span style="    margin-right: 1em;">____/____/____</span><span>____:____</span></div></div></body>`

        function addTextArea() {
          chrome.tabs.sendMessage(activeTab.id, { action: 'createTextArea', content: textAreaContent}); 
        }

        function printDeclaration() {
          chrome.tabs.sendMessage(activeTab.id, { action: 'printDeclaration', content: printDeclarationBody }); 
       }

        mailModel.addEventListener("click", addTextArea)
        printDeclarationButton.addEventListener("click", printDeclaration)


      }
    });
});
