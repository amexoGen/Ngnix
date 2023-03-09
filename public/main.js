const from = document.querySelector('#from');
const to = document.querySelector('#to');
const msg = document.querySelector('#msg');
const subject = document.querySelector('#subject');
const submit = document.querySelector('#submit');


const showSuccess = document.querySelector('.success-sent');
const form = document.querySelector('.form');

const minP = document.querySelector('#minP');
const minL = document.querySelector('#minI');


submit.onclick = start 

async function start() {
    minP.style.display = 'none'
    minL.style.display = 'flex'

    const dataBody = {to: to.value, msg: msg.value, subject: subject.value}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataBody)
    }

    const url = await fetch('/api/smtp', options)
    const json = await url.json()
    console.log(json)

    setTimeout(() => {
        showSuccess.style.display = 'flex'
        form.style.display = 'none'
    }, 2000);
}