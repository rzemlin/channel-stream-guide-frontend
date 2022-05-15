const endPoint = "http://localhost:3000/api/v1/channels"

document.addEventListener("DOMContentLoaded", () => {
  console.log("content is loaded")

  getChannels()

const createChannelForm = document.querySelector("#create-channel-form")
  createChannelForm.addEventListener("submit", (e) => createFormHandler(e))

const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener("submit", (e) => loginFormHandler(e))

})


function getChannels() {
    fetch(endPoint)
.then(response => response.json())
.then(channel => {
    channel.data.forEach(channel => {
      let newChannel = new Channel (channel, channel.attributes)
      document.querySelector('#channels-container').innerHTML += newChannel.renderChannelCard()
      })  
  })
}

function loginFormHandler(e) {
  e.preventDefault()
  const emailInput = document.querySelector("#login-email").value
  const passwordInput = document.querySelector("#login-password").value
  loginFetch(emailInput, passwordInput)
}

function loginFetch(email, password) {
  const bodyData = {user: { email, password} }

  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(json => {
    localStorage.setItem('jwt_token', json.jwt)
    //debugger
    //renderUserProfile()
    console.log(json);
    document.getElementById("login-form").reset();
    alert("Welcome, You")
    renderUserProfile()
  })
}

function renderUserProfile() {
  console.log(localStorage.getItem('jwt_token'));
}

function createFormHandler(e) {
    e.preventDefault()
     const nameInput = document.querySelector("#input-name").value
     const descriptionInput = document.querySelector("#input-description").value
     const urlInput = document.querySelector("#input-url").value
     const genreId = parseInt(document.querySelector("#genre").value)
     postFetch(nameInput, descriptionInput, urlInput, genreId)
}

function postFetch(name, description, img_url, genre_id) {
   bodyData = {name, description, img_url, genre_id}
  fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyData)
    })
     .then(response => response.json())
     //debugger
     .then(channel => {
        console.log(channel);
       // debugger
      const channelData = channel.data
       // debugger
       // const channelsMarkup = `
       // <div data-id=${channel.id}>
       //  <img src=${channel.image_url} height="200" width="250">
       //  <h3>${channel.name}</h3>
       //  <p>${channel.genre.name}</p>
       //  <button data-id=${channel.id}>edit</button>
       //</div>
       //<br><br>`;
    
      //document.querySelector('#channels-container').innerHTML += channelsMarkup
      let newChannel = new Channel (channel.data, channel.data.attributes)
      document.querySelector('#channels-container').innerHTML += newChannel.renderChannelCard()
    })
}