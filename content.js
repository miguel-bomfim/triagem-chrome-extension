const trLines = document.getElementsByTagName("tr");

function getAgendamentoData() {

let agendamentoItems = [];

for (var i = 0; i < trLines.length; i++) {
  var item = trLines[i];

  agendamentoItems.push(item.innerText);
}
return agendamentoItems
}

const pageContent = document.body.innerText;

const agendamentoData = getAgendamentoData()

const getAnaliseData = () => {
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

function createTextA(textAreaContent) {
  const textArea = document.createElement('textarea')

  textArea.setAttribute('style', "height: 350px; width: 560px;background-image: url('https://serramorena.com.br/wp-content/uploads/2024/07/logo.webp');background-repeat: no-repeat;background-position: right bottom;background-size: 125px;border-width: 5px;border-radius: 20px;border-color: lightgrey;padding: 8px;margin-left: auto;margin-right: auto;display: block;")
  textArea.textContent = textAreaContent

  document.body.prepend(textArea)
  
}

function printData (declarationBody) {
  var mywindow = window.open('', 'Declaração', 'height=600,width=900');
  mywindow.document.write('<html><head><title>Declaração de recebimento</title></head>');
  mywindow.document.write(declarationBody)
  mywindow.document.write('</body></html>');
  mywindow.print();
  mywindow.close();

  return true;    
}


// Send the content to the popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAgendamentoData") {
      sendResponse({ content: agendamentoData, analiseData: getAnaliseData() });
    }

    if (request.action === "createTextArea") {
      createTextA(request.content)
    }

    if (request.action === "printDeclaration") {
      printData(request.content)
    }
});


