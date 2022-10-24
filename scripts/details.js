const detailHTML = document.getElementById("detail");
let event;
async function getEventDetails() {
  let id = location.search.slice(4);
  let response = await fetch(`https://mind-hub.up.railway.app/amazing/${id}`);
  let data = await response.json();
  let event = data.event;
  printDetails(event, detailHTML);
}
getEventDetails();

function printDetails(events, container) {
  let array;
  if (events.assistance !== undefined) {
    array = ["Assistance", events.assistance];
  } else {
    array = ["Estimate", events.estimate];
  }
  container.innerHTML = `
  <article class="d-flex flex-column container-fluid mt-5 mb-5 shadow p-3 p-2 text-dark" style="width: 35%;">
    <h5 class="text-center text-warning bg-dark fst-italic"> ${events.name} </h5>
    <img
    src= "${events.image}",
    alt=${events.name}
    />
    <p class="text-center pt-3 fst-italic">${events.description}</p>
    <div class="d-flex justify-content-evenly flex-wrap font-monospace">
      <p>Category: ${events.category}</p>
      <p>Date: ${(new Date(events.date)).getDate()}/${(new Date(events.date)).getMonth()}/${(new Date(events.date)).getFullYear()}</p>
      <p>Price: ${events.price}</p>
    </div>
    <div class="d-flex justify-content-evenly flex-wrap font-monospace">
      <p>Capacity: ${events.capacity}</p>
      <p>${array[0]}: ${array[1]}</p>
      <p>Place: ${events.place}</p>
    </div>
  </article>
  `;
}
