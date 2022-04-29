const endPoint = "http://localhost:3000/api/v1/channels"

document.addEventListener("DOMContentLoaded", () => {
getChannels()

const createChannelForm = document.querySelector("#create-channel-form")
  createChannelForm.addEventListener("submit", (e) => createFormHandler(e))

})


function getChannels() {
    fetch(endPoint)
.then(response => response.json())
.then(channel => {
    channel.data.forEach(channel => {
     render(channel)
      })
      .catch(err => console.log(err))
  })
}

function render(channel) {
  const channelsMarkup = `
        
  <div data-id=${channel.id}>
    <img src=${channel.attributes.image_url} height="200" width="250">
    <h3>${channel.attributes.name}</h3>
    <p>${channel.attributes.genre.name}</p>
    <button data-id=${channel.id}>edit</button>
  </div>
  <br><br>`;

  document.querySelector('#channels-container').innerHTML += channelsMarkup
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
      //debugger
      const channelData = channel.data
      // debugger
      //const channelsMarkup = `
      //<div data-id=${channel.id}>
      //  <img src=${channel.image_url} height="200" width="250">
      //  <h3>${channel.name}</h3>
      //  <p>${channel.genre.name}</p>
      //  <button data-id=${channel.id}>edit</button>
      //</div>
      //<br><br>`;
    
      //document.querySelector('#channels-container').innerHTML += channelsMarkup
      render(channelData)
    })
}