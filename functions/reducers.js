export const eMailGroupReducer = (str) => {
    const regex = /(\w+)\s*=\s*\[\s*([\s\S]*?)\s*\]/g; 
    const result = {};
    let match;

    while ((match = regex.exec(str)) !== null) {
        const key = match[1].trim();
        const valuesString = match[2];
        
        const values = valuesString
            .split('\n')
            .map(value => value.trim())
            .filter(value => value.length > 0 && value !== '"');

        result[key] = values;
    }

    return result;
}

export const clientReducer = (client) => {
    return client.split('-')[1].split('(')[0].trim()
};

export const produtoReducer = (prod) => {
    const prodLowerCase = prod.split("-")[1].trim().toLowerCase();
    const firstToUpper =
      prodLowerCase.charAt(0).toUpperCase() + prodLowerCase.slice(1);
    const match = firstToUpper.match(/[a-zA-Z\s]+/);
    return match ? match[0].trim() : "";
};

export const itemReducer = (item) => {
    return item?.split(":")[1].trim();
  };

export const nfeCteReducer = (nfeCte) => {
    if (nfeCte[0].toLowerCase().includes('s/') || nfeCte[0].toLowerCase().includes('s /') || nfeCte[0].toLowerCase().includes('sem') || nfeCte[0].toLowerCase().includes('carga')) {
      return 'Carga própria'
    } else {
    return nfeCte.map((element) => element.match(/\d+/g)).join('/')
    }
    };

export const pesoReducer = (p) => {
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

export function formatarComitente(str) {
  const match = str.match(/\t(\d+)\s*-\s*([A-Za-z0-9]+)/);

  if (match) {
    // Concatenate the number and the word (converted to lowercase)
    const resultado = match[1] + match[2].toLowerCase();
    return resultado
  } 

}
