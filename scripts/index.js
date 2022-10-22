let containerCards = document.getElementById("containerCards")
let checkbox = document.getElementById("checkBoxes")


/* //entrada texto input

let search = document.getElementById("inputSearch");
search.addEventListener("keyup", (cambiosDelEvento) => {
  let inputUser = cambiosDelEvento.target.value;
  let filtro = [];
  if (listCheck.length !== 0) {
    filtro = listCheck.filter((objetoEvento) =>
    objetoEvento.name.toLowerCase().includes(inputUser.toLowerCase())
    );
  }else{
    filtro = data.events.filter((objetoEvento) =>
    objetoEvento.name.toLowerCase().includes(inputUser.toLowerCase())
    )}
    containerCards.innerHTML = "";
    printCard(filtro, containerCards);
  });
  */

 let inputSearch = document.getElementById("inputSearch")
 async function fetchApi(){ 
   try {
     let answer = await fetch('https://mind-hub.up.railway.app/amazing')
     let data = await answer.json()
     let events = data.events
     printCards(events)
     let categories = new Set(events.map(element => element.category))
     categories = [...categories]
     printCategories(events,categories)
     inputSearch.addEventListener("input", function (event){
       const searchString = event.target.value.toLowerCase()
       const filteredCharacters = events.filter((character) => {
        return (character.name.toLowerCase().includes(searchString))
       }); if (filteredCharacters.length === 0){
        containerCards.innerHTML = `
        <h1>We did not get results in your search, please try again</h1>
        `
        return []
    }
       printCards(filteredCharacters)
    })
    } catch(error) {
      console.error(error)
    }
  }
  fetchApi()
  
  function printCards(array) {
    containerCards.innerHTML = ""
    array.forEach(event =>{
    containerCards.innerHTML +=
      `
      <article class="card" style="width: 25rem">
      <img
      src=${event.image}
            class="card-img-top p-2"
            alt=${event.name}
            height="60%"
          />
          <h5 class="card-title text-center">${event.name}</h5>
          <p class="card-text text-center">${event.description}</p>
          <div class="d-flex justify-content-evenly">
          <p>Precio US$ ${event.price}</p>
          <a href="./pages/details.html?id=${event._id}" class="btn btn-danger">Details</a>
          </div>
          </article>
          `
  })
}

function printCategories (arrayEvents,arrayCat) {
  checkbox.innerHTML = ""
  arrayCat.forEach(cat =>{
  checkbox.innerHTML +=
    `      
    <label class="d-inline-flex  p-1" for="${cat.toLowerCase()}">
    <input class=" m-1 checkbox" type="checkbox" id="${cat.toLowerCase()}" name="letter" value="${cat.toLowerCase()}">${cat}
    </label>
    
    `
  })
  let checks = document.querySelectorAll('.checkbox')
  checks.forEach(cadaCheck => {
    cadaCheck.addEventListener('click',() => search(arrayEvents))
  })
}

function search(array) {
  let checks = document.querySelectorAll('.checkbox:checked')
  let filterArray = []
  checks.forEach(cadaCategoria => {
    let newArray = array.filter(cadaEvento => cadaEvento.category.toLowerCase() === cadaCategoria.value)
    filterArray = filterArray.concat(newArray)
  })
  if (filterArray.length===0) { 
    filterArray = array
  }
  printCards(filterArray)
}

//filtros cruzados
