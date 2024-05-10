let pgame_id = []



const generateGameProduct = function (gamesArray) {
  const row = document.getElementById('game-row')
  gamesArray.forEach((pgame) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column" >
        <img src="${pgame.imageUrl}" class="card-img-top" alt="Game Cover" id="card">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${pgame.name}</h5>
          <h5 class="card-title">Prodotto da: ${pgame.brand}</h5>
          <p class="card-text">${pgame.description}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary text-light">${pgame.price}€</button>

            <button type="button" class="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#goToModal">
            Modifica
          </button>
          </div>
        </div>
      </div>
      `   
      row.appendChild(newCol)
      pgame_id.push(pgame._id);
      console.log(pgame_id)
      let cardImgDetails = document.getElementsByClassName('card-img-top');
      let cardImgDetailsArr = Array.from(cardImgDetails)
      console.log(cardImgDetails)
      cardImgDetailsArr.forEach((img, i) => {
      img.addEventListener('click', function() {
      location.assign(`detailofgame.html?gameID=${pgame_id[i]}`)
      })})

      let changeProductModals = document.getElementsByClassName('btn-primary');
      let changeProductModalsArr = Array.from(changeProductModals)
      console.log(changeProductModalsArr)
      changeProductModalsArr.forEach((sing, i) => {
        sing.addEventListener('click', function() {
        location.assign(`backoffice.html?gameID=${pgame_id[i]}`)})
})

    })  
  }
 
const getProductGame = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGVkNzgxODQ0MjAwMTUzNzU4YjEiLCJpYXQiOjE3MTUzMzA3NzUsImV4cCI6MTcxNjU0MDM3NX0.DFpWA34Uh7quNK-5hwxa0DVqwOoLLkkatSzk1U7j8WM'
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((array) => {
      console.log('ARRAY!', array)
      generateGameProduct(array)
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getProductGame()
