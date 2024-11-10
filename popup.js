import { getActiveTabUrl } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  let activeTab = await getActiveTabUrl();
  const anchor = document.getElementById('sendMail');
  const body = document.getElementsByClassName("extensionBody")[0]

const mailModel = document.getElementById("mailModel")
const printDeclarationButton = document.getElementById('printDeclaration')

function addTextArea() {
   chrome.tabs.sendMessage(activeTab.id, { action: 'createTextArea' }); 
}

function printDeclaration() {
   chrome.tabs.sendMessage(activeTab.id, { action: 'printDeclaration' }); 
}

mailModel.addEventListener("click", addTextArea)
printDeclarationButton.addEventListener("click", printDeclaration)

  chrome.storage.local.get('extractedData', (result) => {
    const data = result.extractedData;


    if (data) {
      // Atualiza o href do elemento âncora
      if (anchor) {
        anchor.href = data.url; // Usa a URL dos dados
        anchor.textContent = data.title; // Atualiza o texto com o título da página
      }
    }

    if (!activeTab.url.includes('triagem/agendamento_por_codigo')) {
      body.style.display = 'none';
    }
  });


});