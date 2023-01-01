var cuntrySelctor = document.querySelector("#Country")

function storeContent(data){
  for(var i in Object.keys(data)){
    const option = document.createElement("option")
    option.text = data[i].name.common
    option.value = data[i].name.common
    cuntrySelctor.add(option)
  }

}

//fetch countries
    
fetch("https://restcountries.com/v3.1/all")
.then(response => {
  if(!response.ok){
    throw new Error(`HTTP error: ${response.status}`)
  }
  return response.json()
})
.then( (json) => storeContent(json))
.catch((err) => alert(`Fetch problem: ${err.message}`))

//fetch cities
fetch("/json/cities.json")
.then(response => {
  if(!response.ok){
    throw new Error(`File response erroe:${response.status}`)
  }
  return response.json()
})
.then((json) => setCitis(json))
.catch(err => alert(`Fetch problem: ${err.message}`));

function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function setCitis(data){
  var item = document.querySelector("#Country")
  var setValues = []
  const citySelector = document.querySelector("#City")
  item.addEventListener('change', ()=>{
    if(isNaN(item.value)){
      removeOptions(citySelector)
      var selectedData = data.filter(x=> x.Country == item.value)
      for (var i in Object.keys(selectedData)) { 
        const option = document.createElement("option")
        option.text = selectedData[i].Name
        option.value = selectedData[i].Name
        citySelector.add(option)
      }
      
      
    }
    
  })

         

}