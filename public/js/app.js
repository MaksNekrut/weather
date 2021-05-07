const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${search.value}`)
    .then((res) => {
        res.json()
    .then((data) => {
            if(data.error) {
                messageOne.textContent = "this info can't load";
            }else {

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
    .catch(() => messageOne.textContent = "Can not found this location") 
    search.value = '';
})