const urlContentid = new URLSearchParams(location.search)
console.log(urlContentid)
const gameId = urlContentid.get('gameID')
console.log(gameId)
let gametoChange
const modifySingleGame = function() {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${gameId}`,{
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGVkNzgxODQ0MjAwMTUzNzU4YjEiLCJpYXQiOjE3MTUzMzA3NzUsImV4cCI6MTcxNjU0MDM3NX0.DFpWA34Uh7quNK-5hwxa0DVqwOoLLkkatSzk1U7j8WM'
    },
})
.then((response) => {
    if(response.ok) {
        console.log(response)
        return response.json()
    } else {
        switch(response.status) {
            case 400:
                throw new Error('La risorsa richiesta non è stata trovata');
            case 404:
                throw new Error('Risorsa non trovata');
            case 418:
                throw new Error('La risorsa richiesta non è stata trovata');
            default:
                throw new Error('Errore non gestito')
        }
    }
})
.then((arrsingGame) =>{
    console.log('Recupato il prodotto!', arrsingGame)
    let nameInput = document.getElementById('name')
    let descriptionInput = document.getElementById('description') 
    let brandInput = document.getElementById('brand')
    let imageUrlInput = document.getElementById('imageUrl')
    let priceInput = document.getElementById('price')
    nameInput.value = arrsingGame.name
    descriptionInput.value = arrsingGame.description
    brandInput.value = arrsingGame.brand
    imageUrlInput.value = arrsingGame.imageUrl
    priceInput.value = arrsingGame.price

    gametoChange = arrsingGame
})
.catch((err) => {
    console.log('ERRORE', err)
})
}

if(gameId) {
    modifySingleGame();
    document.getElementsByClassName('btn-primary')[0].innerText = 'MODIFICA!'
}

class GameProduct {
    constructor(_name, _description, _brand, _imageUrl, _price) {
      this.name = _name
      this.description = _description
      this.brand = _brand
      this.imageUrl = _imageUrl,
      this.price = _price
    }
  }
  // creo la classe per inserire i prodotti


const submitProduct = function (e) {
    e.preventDefault()

    const nameInput = document.getElementById('name') 
    const descriptionInput = document.getElementById('description') 
    const brandInput = document.getElementById('brand') 
    const imageUrlInput = document.getElementById('imageUrl') 
    const priceInput = document.getElementById('price') 
  
    const gameProductFromForm = new GameProduct(
      nameInput.value,
      descriptionInput.value,
      brandInput.value,
      imageUrlInput.value,
      priceInput.value
    )
  
    console.log('PRODOTTO DA INVIARE ALLE API', gameProductFromForm)

    let urlAPI = 'https://striveschool-api.herokuapp.com/api/product/'
    let diffMethod = 'POST'

    if(gameId) {
        urlAPI = 'https://striveschool-api.herokuapp.com/api/product/' + gametoChange._id;
        diffMethod = 'PUT'
    }
    fetch(urlAPI, {
        method: diffMethod,
        body: JSON.stringify(gameProductFromForm),
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZGVkNzgxODQ0MjAwMTUzNzU4YjEiLCJpYXQiOjE3MTUzMzA3NzUsImV4cCI6MTcxNjU0MDM3NX0.DFpWA34Uh7quNK-5hwxa0DVqwOoLLkkatSzk1U7j8WM'
        },
    })
    .then((response) => {
        if(response.ok) {
            let message;
            if(!gameId) {
                message = 'Articolo creato correttamente!';
            } else {
                message = 'Articolo modificato correttamente!';
            }
            alert(message)
        } else {
            switch(response.status) {
                case 400:
                    throw new Error('La risorsa richiesta non è stata trovata');
                case 404:
                    throw new Error('Risorsa non trovata');
                case 418:
                    throw new Error('La risorsa richiesta non è stata trovata');
                default:
                    throw new Error('Errore non gestito')
            }
        }
    })
    .catch((err) => {
        console.log('ERRORE', err)
        alert(err)
    })
}
 let forminsertProduct = document.getElementById('forminsertProduct')
 forminsertProduct.addEventListener('submit', submitProduct)