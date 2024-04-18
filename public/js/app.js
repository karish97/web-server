console.log('client-side JS file is loaded!');

function endpoint(location) {
    const url = `http://localhost:3000/weather?location=${location}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.innerText = data.error;
                console.log(data.error);
            } else {
                messageOne.innerText = data.forecast;
                messageTwo.innerText = data.address;
                console.log(data.forecast);
                console.log(data.address);
            }
            return data;
        })
    });
}

const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMessage = document.querySelector('#error-message');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

form.addEventListener('submit', (event) => {
    errorMessage.innerText = '';
    messageOne.innerText = '';
    messageTwo.innerText = '';
    event.preventDefault();
    const location = input.value;
    endpoint(location);
});