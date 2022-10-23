const containerCards = document.getElementById("containerCards")
const checkbox = document.getElementById ("checkBoxes")
const inputSearch = document.getElementById("inputSearch")
let events;
fetch("https://mind-hub.up.railway.app/amazing?time=upcoming")
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
  <a href="../pages/details.html?id=${events.id}" class="btn btn-danger">Details</a>
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
  