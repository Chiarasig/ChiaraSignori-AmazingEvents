/* let containerCards = document.getElementById("containerCards")
let checkbox = document.getElementById("checkBoxes")
 */

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
/* 
 let inputSearch = document.getElementById("inputSearch")
 async function fetchApi(){ 
   try {
     var data = await fetch('https://mind-hub.up.railway.app/amazing')
          data = await data.json()
    } catch(error) {
      console.error(error)
    } 
    let events = search(data.events) 
     printCards(events)
     let categories = new Set(events.map(element => element.category))
     categories = [...categories]
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
     printCategories(events,categories)
//filtro search
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
  printCards (filterArray)
  return filterArray
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
 */



const containerCards = document.getElementById("containerCards")
const checkbox = document.getElementById ("checkBoxes")
const inputSearch = document.getElementById("inputSearch")
let events;
fetch("https://mind-hub.up.railway.app/amazing")
  .then(data => data.json())
  .then(res => {
    events = res.events
    createdCheckbox(events,checkbox)
    printCards(events, containerCards)
    inputSearch.addEventListener("keyup", filtering)
    checkbox.addEventListener("change", filtering)
  })
  .catch(error => console.log(error))
 

  //funciones


  //función para crear checkbox
  function createdCheckbox (events, container){
    let fn = events => events.category
    let eventsCheck = new Set (events.filter( fn ).map( fn ))
    eventsCheck.forEach( category =>{
      container.innerHTML += `
      <label class="d-inline-flex  p-1" for="${category}">
          <input class=" m-1 checkbox" type="checkbox" id="${category}" name="letter" value="${category}"> ${category}
      </label>
      `
    })
  }

  //función para crear cards
function createdCards (events){
  let card = document.createElement("article")
  card.classname = "card" 
  card.style = "width: 25rem"
  card.innerHTML = `
  <img
  src=${events.image}
  class="card-img-top p-2"
  alt="Picture of ${events.name}"
  height="60%"
  />
  <h5 class="card-title text-center">${events.name}</h5>
  <p class="card-text text-center">${events.description}</p>
  <div class="d-flex justify-content-evenly">
  <p>Precio US$ ${events.price}</p>
  <a href="./pages/details.html?id=${events._id}" class="btn btn-danger">Details</a>
  </div>
  `
  return card
}

//función para imprimir las cards
function printCards (events, container){
  container.innerHTML = " "
  let fragment = document.createDocumentFragment()
  events.forEach(events => fragment.appendChild (createdCards(events)))
  container.appendChild(fragment)
  if (events.length === 0){
    containerCards.innerHTML = `
    <h1>We did not get results in your search, please try again</h1>
    `
}}

  //función para filtrar
  function filtering (){
    let checked = [...document.querySelectorAll('.checkbox:checked')].map(element => element.value)
    let filterCheckbox = events.filter (event => checked.includes (event.category) || checked.length === 0)
    let filterSearch = filterCheckbox.filter(event => event.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
    printCards(filterSearch, containerCards)
  }
  
  