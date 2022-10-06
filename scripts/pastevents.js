console.log(data);
let containerCards = document.getElementById("containerCardsPast")
console.log(containerCards);
for (let event of data.events){
    if (event.date < data.ocurrentevents){

    let card = document.createElement("article")
    card.classname = "card" 
    card.style = "width: 25rem"
    card.innerHTML =
    `
    <img
    src="${event.image}"
    class="card-img-top p-2"
    alt="${event.name}"
    height="60%"
  />
  <h5 class="card-title text-center">${event.name}</h5>
  <p class="card-text text-center">${event.description}</p>
  <div class="d-flex justify-content-evenly">
  <p>Precio US$ ${event.price}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  `
    containerCards.appendChild(card)
}
}