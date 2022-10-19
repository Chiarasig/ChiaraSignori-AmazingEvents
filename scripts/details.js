let eventId=new URL(window.location.href).searchParams.get('id') //query param, para tomar del lado del detail, se toma la url 
//window location y lo convertimos a una url para que sea interpretada por js y con "searchParam" obtiene todo los parametros
//que traiga despues del signo de interrogación (son parametros)
let detailView = document.getElementById('viewDetail')

let eventDetail = data.events.filter(object =>
    object._id == eventId
)

let evento = eventDetail[0]
detailView.innerHTML =
`
<article class="d-flex flex-column container-fluid mt-5 mb-5 shadow p-3 p-2 text-dark" style="width: 35%;">
<h5 class="text-center text-warning bg-dark fst-italic">${evento.name}</h5>
<img
  src= "${evento.image}",
  alt=${evento.name}
/>
<p class="text-center pt-3 fst-italic">${evento.description}</p>
<div class="d-flex justify-content-evenly flex-wrap font-monospace">
  <p>Category: ${evento.category}</p>
  <p>Date: ${evento.date}</p>
  <p>Price: ${evento.price}</p>
</div>
<div class="d-flex justify-content-evenly flex-wrap font-monospace">
  <p>Capacity: ${evento.capacity}</p>
  <p>Assistance: ${evento.assistance}</p>
  <p>Place: ${evento.place}</p>
</div>
</article>
          `;