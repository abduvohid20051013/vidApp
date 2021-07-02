const videosList = document.querySelector('.videosList'),
    profileImg = document.querySelector('.profile'),
    usersList = document.querySelector('.usersList')

let user = window.localStorage.getItem('user')
user = user ? JSON.parse(user) : {}

if (user.userImg) profileImg.src = '../upload/uploadedImages/' + user.userImg

function videosRenderer(array, username, userImg) {
    let string = ""
    array.map(video => {
        string +=
            ` <li class="video">
                <div class="videoWrapper">
                    <video controls  src=${'../upload/uploadedVideo/' + video.video_link} type="video/*">
                      
                    </video>
               </div>
              <div class="userTextsWrapper">
                 <div class="userTextsWrap">
                    <span class="userNameWrap">
                        <img class="userImg" src=${'../upload/uploadedImages/' + video.user.userImg} alt="img">
                        <p class="videoName">${video.title}</p>
                    </span>
                    <p class="userName">${video.user.username[0].toUpperCase() + video.user.username.slice(1, video.user.username.length)}</p>
                 </div>
                 <div class="downloadWrap">
                    <a class="download" href="download?link=${video.video_link}">
                       <img src="../public/img/download.svg" alt="download" class="downlodImg" width="30" height="30">
                    </a>
                 </div>
              </div>
           </li>`
    })
    videosList.innerHTML = string
}

function usersRenderer(array) {
    let string =
        `<li class="items focused" data_id="main" style="border-bottom: 3px solid gray; padding-bottom: 25px; padding-top: 25px; margin-bottom:10px;">
           <button class="buttons">
              <img class="img" src="../public/img/home.svg" alt="home">
              <p class="text">Home</p>
           </button>
        </li>`
    array.map(user => {
        string +=
            ` <li class="items"  data-id=${user.user_id}>
             <button class="buttons">
                <img class="imag" src=${'../upload/uploadedImages/' + user.userImg} alt="home">
                <p class="text">${user.username}</p>
             </button>
          </li>`

    })
    usersList.innerHTML = string
    const usersItems = document.querySelectorAll('.items')
    usersItems.forEach((usersItem) => {
        usersItem.addEventListener('click', () => {
            usersItems.forEach((usersItem) => {
                usersItem.classList.remove('focused')
            })
            usersItem.classList.add('focused')
            if (usersItem.dataset.id) {
                let currentUser = array.find(user => user.user_id == usersItem.dataset.id)
                videosRenderer(currentUser.videos, currentUser.username, currentUser.userImg)
            } else getData()
        })
    })
}


async function getData() {
    let response = await request('/videos')
    videosRenderer(response)
}
async function getUsers() {
    let response = await request('/users')
    usersRenderer(response)
}
getData()
getUsers()