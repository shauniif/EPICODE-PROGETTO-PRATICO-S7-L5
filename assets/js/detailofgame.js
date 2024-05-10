
const urlContentid = new URLSearchParams(location.search)
console.log(urlContentid)
const gameId = urlContentid.get('gameID')
console.log(gameId)



let recrateEvent = function(e) {
    let gameName = document.getElementById('name')
      gameName.innerText = e.name
    let gameDescription = document.getElementById('description')
      gameDescription.innerText = e.description
    let gameBrand = document.getElementById('description')
      gameBrand.innerText = e.brand
    let gamePrice = document.getElementById('price')
      gamePrice.innerText = e.price + '€'
    let gameIMG = document.querySelector('.card img')
    gameIMG.setAttribute('src', e.imageUrl)
}
const getpGame = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${gameId}`,{
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGVkNzgxODQ0MjAwMTUzNzU4YjEiLCJpYXQiOjE3MTUzMzA3NzUsImV4cCI6MTcxNjU0MDM3NX0.DFpWA34Uh7quNK-5hwxa0DVqwOoLLkkatSzk1U7j8WM'
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((event) => {
      console.log('DETTAGLI RECUPERATI', event)
      recrateEvent(event)
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getpGame()




const deleteGame = function() {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${gameId}`,{
    method: 'DELETE',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGVkNzgxODQ0MjAwMTUzNzU4YjEiLCJpYXQiOjE3MTUzMzA3NzUsImV4cCI6MTcxNjU0MDM3NX0.DFpWA34Uh7quNK-5hwxa0DVqwOoLLkkatSzk1U7j8WM'
    },
    })
    .then((response) => {
        if (response.ok) {
        alert('Hai eliminato il prodotto')
        location.assign('home.html') // torniamo in home
        } else {
          alert('ERRORE - il prodotto non è stato eliminato correttamente')
        }
      })
      .catch((err) => {
        console.log('ERR', err)
      })
}


let changeModal = function(_function) {
    let buttonModal = document.querySelector('.modal-footer button:last-child')
    buttonModal.addEventListener('click', _function)
}

let deleteButtonModal = document.getElementById('delete-button');
deleteButtonModal.addEventListener('click', function () {
    changeModal(deleteGame) 
}); 

