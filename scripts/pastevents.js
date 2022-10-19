let containerCards = document.getElementById("containerCards")
function printCard (array, container){
  array.forEach(evento =>{
    if (evento.date < data.currentevents)
    container.innerHTML += 
    `
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
              <a href="../pages/details.html?id=${evento._id}" class="btn btn-primary">Go somewhere</a>
            </div>
          </article>
          `
    
  })
}
printCard (data.events, containerCards)

//codigo checkbox

let categorias = document.getElementById("boxes");

let checkbox = new Set(data.events.map((evento) => evento.category));

checkbox = [...checkbox];

checkbox.forEach((nombreCategoria) => {
  categorias.innerHTML += `
    <div class="form-check">
        <input class="form-check-input" id="${nombreCategoria}" type="checkbox">
        <label class="form-check-label">${nombreCategoria}</label>
    </div>
    `;
  console.log(checkbox);
});

let listCheck = [];

categorias.addEventListener(`click`, (e) => {
  if (e.target.checked) {
    listCheck = listCheck.concat(
      data.events.filter((evento) =>
        evento.category.toLowerCase().includes(e.target.id.toLowerCase())
      )
    );
    containerCards.innerHTML = "";
    printCard(listCheck, containerCards);
  } else if (!e.target.checked) {
    listCheck = listCheck.filter(
      (evento) =>
        !evento.category.toLowerCase().includes(e.target.id.toLowerCase())
    );
    containerCards.innerHTML = "";
    printCard(listCheck, containerCards);
  }
  if (listCheck.length === 0) {
    printCard(data.events, containerCards);
  }
});

//entrada texto input

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
