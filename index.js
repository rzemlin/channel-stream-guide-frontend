const endPoint = "http://localhost:3000/api/v1/channels"

document.addEventListener("DOMContentLoaded", () => {
getChannels()
})

function getChannels() {
    fetch(endPoint)
.then(response => response.json())
.then(channels => {
    channels.data.forEach(channels => {
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
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