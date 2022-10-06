console.log(data);
let containerCards = document.getElementById("containerCards")
console.log(containerCards);
for (let events of data.events){
    
    let card = document.createElement("article")
    card.classname = "card" 
    card.style = "width: 25rem"
    card.innerHTML =
    `
    <img
    src="${events.image}"
    class="card-img-top p-2"
    alt="${events.name}"
    height="60%"
  />
  <h5 class="card-title text-center">${events.name}</h5>
  <p class="card-text text-center">${events.description}</p>
  <div class="d-flex justify-content-evenly">
  <p>Precio US$ ${events.price}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  `
    containerCards.appendChild(card)
}
