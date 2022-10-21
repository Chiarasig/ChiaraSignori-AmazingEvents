//entrada texto input

/* let search = document.getElementById("inputSearch");
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
}); */
 
//función para traer la información desde un servidor
async function getData() {
  try {
    let answer = await fetch ("https://mind-hub.up.railway.app/amazing?time=past&order=desc")
    let transformData = await answer.json()
    let events = transformData.events
    printCard (events, containerCards)
    let categories = new Set(events.map(element => element.category))
    categories = [...categories]
    printCategories (events, categories, checks)
  } catch (error) {
    console.log(error);
  }
}
console.log(getData());

//función para los checkbox e imprimir categorias
function printCategories (arrayEvents, arrayCategories, idHTML){
  document.querySelector(`#${id}`).innerHTML = ""
  arrayCategories.forEach(category =>{
    document.querySelector(`#${id}`).innerHTML += 
    `
    <label class="d-flex align-items-center p-1" for="${category.toLowerCase()}">
                <input class="d-flex align-items-center m-1 checkbox" type="checkbox" id="${category.toLowerCase()}" name="letter" value="${category.toLowerCase()}">${category}
    </label>
    `
  })
  let checks = document.querySelectorAll(".checkbox")
  checks.forEach(cadaCheck => {
    cadaCheck.addEventListener("click", () => search (arrayEvents)) 
  })
}
//función para buscar esos checkbox clickeados que coinciden con las cards
function search (array) {
  let checks = document.querySelectorAll ("checkbox:checked")
  let filterArray = []
  checks.forEach(cadaCategoria => {
    let newArray = array.filter(cadaEvento => cadaEvento.category.toLowerCase() === cadaCategoria.value)
    filterArray = filterArray.concat(newArray)
  })
  if (filterArray.length === 0){
    filterArray = array
  }
  printCard (filterArray, containerCards)
}

//función para imprimir las cards
function printCard(array, container) {
  array.forEach((evento) => {
    container.innerHTML += `
    <article class="card" style="width: 25rem">
            <img
              src=${evento.image}
              class="card-img-top p-2"
              alt=${evento.name}
              height="60%"
            />
            <h5 class="card-title text-center">${evento.name}</h5>
            <p class="card-text text-center">${evento.description}</p>
            <div class="d-flex justify-content-evenly">
              <p>Precio US$ ${evento.price}</p>
              <a href="../pages/details.html?id=${evento._id}" class="btn btn-danger">Details</a>
            </div>
          </article>
          `;
  });
}