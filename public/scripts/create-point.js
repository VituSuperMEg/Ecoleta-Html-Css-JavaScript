const APIURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'; 

function populateUFs(){
  const ufSelect = document.querySelector('select[name=uf')

  fetch(APIURL)
  .then(res => res.json())
  .then( ufs => {
    for ( const uf of ufs ){
      ufSelect.innerHTML += `<option value="${uf.id}">${uf.nome}</option>`
    }
  })
}
populateUFs();

function getCities(event){
     const citySelect = document.querySelector('select[name="city"]');
     const stateInput = document.querySelector("[name=state]");

     const ufValue = event.target.value;
      
     const indexOfSelectedState = event.target.selectedIndex;

     stateInput.value = event.target.options[indexOfSelectedState].text

     const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
     citySelect.innerHTML =  "<option>Selecione a cidade</option>";

     citySelect.disabled = false;
     fetch(url)
     .then(res => res.json())
     .then(cities => {
       for (const city of cities){
      
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
       }
       citySelect.disabled = false;
     })
   
}
document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


// Itens de coleta
const itemsToColletct = document.querySelectorAll(".items-grid li")

for (const item of itemsToColletct){
  item.addEventListener("click", handleSelectItem)
}
const collectdItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectItem(event) {

  const itemLi = event.target;
  itemLi.classList.toggle('select');
  const itemId = itemLi.dataset.id;
  
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId;
    return itemFound;
  })
  if(alreadySelected >= 0){
     const filterItems = selectedItems.filter(item => {
      const itemIsDiferrent = item != itemId
      return itemIsDiferrent 
     })
     selectedItems = filterItems
  }else {
    selectedItems.push(itemId);
  }
  collectdItems.value = selectedItems
}

