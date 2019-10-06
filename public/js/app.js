const weatherForm = document.querySelector('form')
const inputSearch = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = inputSearch.value

    fetch('http://localhost:3000/weather?adress=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent =  data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})