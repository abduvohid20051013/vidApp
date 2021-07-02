const videonameInput = $('.videoNameInput');
const fileName = $('.videoInputText');



videoUpload.addEventListener('change', () => {
    let file = videoUpload.files[0].name
    file = file.length > 25 ? file.slice(0, 15) + '...' + file.slice(file.length - 5, file.length) : file
    fileName.textContent = "loading..."
})

form.addEventListener('submit', async(e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('title', videonameInput.value)
    formData.append('file', videoUpload.files[0])
    formData.append('time', getTime())
    console.log(formData);
    let response = await fetch('/admin', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response) {
        fileName.textContent = response.message
        setTimeout(() => {
            fileName.textContent = 'Upload a video'
        }, 1000)
        videonameInput.value = null
        fileName.textContent = 'Videod loaded'
    }
})

function getTime() {
    let date = new Date()
    return date
}



function $(e) {
    return document.querySelector(e)
}