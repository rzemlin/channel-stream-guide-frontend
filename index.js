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
      const newChannel = new Channel (channel, channel.attributes)
      document.querySelector('#channels-container').innerHTML += newChannel.renderChannelCard()
      }) 
     editButton()
       document.querySelector('#update-channel').addEventListener('submit', (e) => updateFormHandler(e));
       document.querySelectorAll("#deleteButton").forEach((btn) => btn.addEventListener("click", deleteChannel))
       
       //console.log("Submit button recognized")
       //debugger  
        //document.querySelectorAll("#deleteButton").forEach((btn) => btn.addEventListener("click", deleteChannel))
  })
}


      
function editButton(){
  document.querySelectorAll('#editButton').forEach( (button) => button.addEventListener('click', e => {
      console.log("edit button click recognized")
      const id = parseInt(e.target.dataset.id); //this locks in the id
      const channel = Channel.findById(id);
      document.querySelector('#update-channel').innerHTML += channel.renderUpdateForm();
  }));
}

function updateFormHandler(e) { 
  console.log("patchFetchEnabled")
  e.preventDefault()
  const id = parseInt(e.target.dataset.id);
  const channel = Channel.findById(id);
  const name = e.target.querySelector('#input-name').value; 
  const img_url = e.target.querySelector('#input-img_url').value;
  const description = e.target.querySelector('#input-description').value;
  const genre_id = parseInt(e.target.querySelector('#genre').value); //parseInt to get value as integer
  //debugger
  patchChannel(channel, name, img_url, description, genre_id)
}

function patchChannel(channel, name, img_url, description, genre_id){
  console.log("Sending patch request");
  let bodyJSON = {name, img_url, description, genre_id}
  fetch(`http://localhost:3000/api/v1/channels/${channel.id}`,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Accept: 'application/json', //optional but why not?
      },
      body: JSON.stringify(bodyJSON), // convert to string
  })
  .then(response => response.json())
  .then(updatedChannel => {
      console.log(updatedChannel);
      if (updatedChannel.errors != undefined){
          // if (kdramas == !kdramas.errors == []){
               console.log(updatedChannel.errors)
               //debugger
               alert(updatedChannel.errors)
           } else {
               //debugger
               alert("Submitted")
           }
           const editedChannel = new Channel(updatedChannel.data, updatedChannel.data.attributes)
               document.querySelector(`#channel-${channel.id}`).remove()
               //debugger
               console.log("outdated card removed")
               document.querySelector('#channels-container').innerHTML += editedChannel.renderChannelCard()
               console.log("New card with new data")
               //debugger
               document.querySelector('#update-channel-form').remove()
               
               editButton()
               document.querySelectorAll("#deleteButton").forEach((btn) => btn.addEventListener("click", deleteChannel));
               //debugger
               console.log("Do the buttons work? ")
               document.getElementById("create-channel-form").reset();
       
          })
        }
        
        function deleteChannel(e) {
          console.log("Delete Function Called")
          const id = parseInt(e.target.dataset.id);
          fetch(`http://localhost:3000/api/v1/channel/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
              }
          })
          .then((res) => res.json())
          .then((channel) => {
              console.log("deleted")
              //debugger
              document.querySelector(`#channel-${channel.id}`).remove()
          });
        }


function createFormHandler(e) {
  console.log("in create")
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
     .then(channel => {
      const channelData = channel.data
      let newChannel = new Channel (channel.data, channel.data.attributes)
      document.querySelector('#channels-container').innerHTML += newChannel.renderChannelCard();
      console.log("in post fetch")
      editButton()
      console.log("buttons work?")

      document.querySelectorAll("#deleteButton").forEach((btn) => btn.addEventListener("click", deleteChannel));
      console.log("Buttons Work?")
      document.getElementById("create-channel-form").reset();
      console.log("Form reset")

    })
  }

    function loginFormHandler(e) {
      e.preventDefault()
      const emailInput = e.target.querySelector("#login-email").value
      const pwInput = e.target.querySelector("#login-password").value
      loginFetch(emailInput, pwInput)
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
        renderUserProfile()
      })
    }
    
    function renderUserProfile() {
      console.log(localStorage.getItem('jwt_token'));
    }
     