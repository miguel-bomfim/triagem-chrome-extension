export async function getActiveTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
return tab;
}

export const greetingMessage = () => {
    let h = new Date().getHours()
    if (h < 12) return 'Bom dia!'
    if (h >= 12 && h < 18) return 'Boa tarde!'
    else if (h >= 18 && h < 24) return 'Boa noite!'
}

export let date = `${("0" +  new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}`

export const getPluralSingular = (analiseData) => {
  if (analiseData.length > 1) {
	return 'Motivos'
} else {
	return 'Motivo'
}

}