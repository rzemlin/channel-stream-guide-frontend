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
    const titleInput = document.querySelector("#input-title").value
    const descriptionInput = document.querySelector("#input-description").value
    const img_urlInput = document.querySelector("#input-url").value
    const genreId = parseInt(document.querySelector("#genre").value)
    postFetch(titleInput, descriptionInput, img_urlInput, genreId)
}

function postFetch(title, description, img_url, genre_id) {
console.log(title, description, img_url, genre_id)

}