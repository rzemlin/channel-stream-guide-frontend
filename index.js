const endPoint = "http://localhost:3000/api/v1/channels"

document.addEventListener("DOMContentLoaded", () => {
getChannels()

const createChannelForm = document.querySelector("#create-channel-form")
  createChannelForm.addEventListener("submit", (e) => createFormHandler(e))

})


function getChannels() {
    fetch(endPoint)
.then(response => response.json())
.then(channels => {
    channels.data.forEach(channels => {
     
        const channelsMarkup = `
        
          <div data-id=${channels.id}>
            <img src=${channels.attributes.image_url} height="200" width="250">
            <h3>${channels.attributes.name}</h3>
            <p>${channels.attributes.genre.name}</p>
            <button data-id=${channels.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#channels-container').innerHTML += channelsMarkup
      })
  })
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
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
    })
     .then(response => response.json())
     .then(channel => {
       console.log(channel);
      
       const channelData = channel.data.attributes
       const channelsMarkup = `
        
          <div data-id=${channel.id}>
            <img src=${channelData.image_url} height="200" width="250">
            <h3>${channelData.name}</h3>
            <p>${channelData.genre.name}</p>
           <button data-id=${channelData.id}>edit</button>
          </div>
         <br><br>`;

         document.querySelector('#channels-container').innerHTML += channelsMarkup
  })
}