"use strict";

var videosList = document.querySelector('.videosList'),
    profileImg = document.querySelector('.profile'),
    usersList = document.querySelector('.usersList');
var user = window.localStorage.getItem('user');
user = user ? JSON.parse(user) : {};
if (user.userImg) profileImg.src = '../upload/uploadedImages/' + user.userImg;

function videosRenderer(array, username, userImg) {
  var string = "";
  array.map(function (video) {
    string += " <li class=\"video\">\n        <div class=\"videoWrapper\">\n            <video controls>\n             <source src=".concat('../upload/uloadedVideos' + video.video_link, " type=\"video/*\">\n            </video>\n        </div>\n        <div class=\"userTextsWrapper\">\n            <div class=\"userTextsWrap\">\n                <span class=\"userNameWrap\">\n                    <img class=\"userImg\" src=").concat('../upload/uloadedImages' + video.user.userImg, " alt=\"img\">\n                    <p class=\"videoName\">").concat(video.title, "</p>\n                </span>\n                <p class=\"userName\">").concat(video.user.username[0].toUpperCase() + video.user.username.slice(1, video.user.username.length), "</p>\n            </div>\n            <div class=\"downloadWrap\">\n            <a class=\"download\" href=\"download?link=").concat(video.video_link, "\">\n                 <img src=\"../public/img/download.svg\" alt=\"download\" class=\"downlodImg\" width=\"30\" height=\"30\">\n                </a>\n            </div>\n        </div>\n    </li>");
  });
  videosList.innerHTML = string;
}

function usersRenderer(array) {
  var string = "<li class=\"items focused\" data_id=\"main\" style=\"border-bottom: 3px solid gray; padding-bottom: 25px;\">\n           <button class=\"buttons\">\n              <img class=\"img\" src=\"../public/img/home.svg\" alt=\"home\">\n              <p class=\"text\">Home</p>\n           </button>\n        </li>";
  array.map(function (user) {
    string += " <li class=\"items\"  data-id=".concat(user.user_id, ">\n             <button class=\"buttons\">\n                <img class=\"imag\" src=").concat('../upload/uloadedImages' + user.userImg, " alt=\"home\">\n                <p class=\"text\">").concat(user.username, "</p>\n             </button>\n          </li>");
  });
  usersList.innerHTML = string;
  var usersItems = document.querySelectorAll('.channel');
  usersItems.forEach(function (usersItem) {
    usersItem.addEventListener('click', function () {
      usersItems.forEach(function (usersItem) {
        usersItem.classList.remove('active');
      });
      usersItem.classList.add('active');

      if (usersItem.dataset.id) {
        var currentUser = array.find(function (user) {
          return user.user_id == usersItem.dataset.id;
        });
        videosRenderer(currentUser.videos, currentUser.username, currentUser.userImg);
      } else getData();
    });
  });
}

function getData() {
  var response;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request('/videos'));

        case 2:
          response = _context.sent;
          videosRenderer(response);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getUsers() {
  var response;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(request('/users'));

        case 2:
          response = _context2.sent;
          usersRenderer(response);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

getData();
getUsers();