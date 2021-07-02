const usernameInput = $('.usernameInput');
const emailInput = $('.emailInput');
const passwordInput = $('.passwordInput');
const title = $('.title');
const imgInput = $('.imgInput');
const chooseText = $('.chooseText');
const avtarImg = $('.avtarImg')

imgInput.addEventListener('change', () => {
    let file = imgInput.files[0].name
    file = file.length > 25 ? file.slice(0, 15) + '...' + file.slice(file.length - 5, file.length) : file
    chooseText.textContent = `${file} Img choosen!`
})
form.onsubmit = async(event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('email', emailInput.value)
    formData.append('file', imgInput.files[0])
    let response = await fetch('/register', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response.body) {
        setTimeout(() => {
            window.localStorage.setItem('user', JSON.stringify(response.body))
            window.location = '/admin'
        }, 1000)
    } else {
        console.log('error');
    }
}


function $(e) {
    return document.querySelector(e)
}