Initial Set Up
Make sure you create a separate directory and a separate GitHub repository for the frontend.

Tip: you can open up a new tab in terminal command + t if you'd like to have your rails server up and running in another tab.

Create a new folder for the frontend: mkdir notes_frontend && cd $_ (The cd $_ command will move you into the folder you've just created)

In the new folder you create you should touch index.html and mkdir src in which you will add your JavaScript files. At minimum you should have a file called index.js inside of the src folder.

In index.html, you need to add some HTML. Text editors will often have a shortcut for creating a blank HTML document. In Atom you can begin typing "html" and then press tab to auto-generate the starter HTML.

Setup Frontend Files
The first step is getting the list of notes to show up on the page. Translating that to more technical language, we need to:

1 - Fire off an AJAX fetch request to the index route (i.e GET '/syllabuses')

2 - Use the response JSON to append elements to the DOM.

Let's be sure not to overcomplicate our approach, we can (and will) refactor later. At the same time, we don't want to be debugging the routes in our Rails application trying to figure why our server isn't responding when it turns out we forgot to include a script tag linking src/index.js in index.html. Speaking of which, don't forget to add <script src="src/index.js" charset="utf-8"></script> to the head of your index.html

This may sound silly but step 1 should be:

/* src/index.js */
document.addEventListener('DOMContentLoaded', () => {
  alert('LOADED');
});
Until you see the alert, don't move forward. What would be some reasons you might not see the alert? You can also console.log("in index.js") in index.js file.

A Note on CORS
Before we make our first fetch request, we need to talk about something called Cross Origin Resource Sharing (CORS):

Basically, CORS is a security feature that prevents API calls from unknown origins. For example, if someone tried to use some malicious JavaScript to steal your bank information and your bank allowed API calls from anywhere, this could be a bad news bears?????? situation.
Let's say your bank is hosted on https://bankofamerica.com but a clever hacker tried to impersonate you and send a request with an origin of https://couponvirus.org. Ideally, your bank would reject requests from unknown origins such as couponvirus.org and only allow requests from trusted origins or domains like bankofamerica.com
Navigate to your backend, in your Gemfile uncomment gem 'rack-cors' This will allow us to setup Cross Origin Resource Sharing (CORS) in our API.
Run bundle.
Inside of config/initializers/cors.rb uncomment the following code:
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
(This snippet is from the documentation for the rack-cors gem.)

Inside the allow block, origins '*' means we are allowing requests from all origins and are allowing [:get, :post, :patch, :delete] requests to the API. Read this if you need a refresher on HTTP methods.

This may come as a shock but the config.api_only = true option found in config/application.rb tells our app that it is going to be an API only. In other words, our API will not generate any HTML and instead will return JSON. The frontend is responsible for taking that JSON, formatting the data, and generating HTML to show to the user. Read this if you want to review what JSON is and why we use it.

For now, we will leave the origins open. Later on, we can change this to only allow requests from the address of the frontend repo??????localhost:8000 or www.myapp.com for example.

Now let's fetch the syllabi (from our Rails API index route, Ex: 'http://localhost:3000/api/v1/syllabuses')

GET Request
Fetch JSON
Let's save ourselves trouble in the future and add this to the top of our index.js

const endPoint = <YOUR_ENDPOINT>

/* index.js */
const endPoint = "http://localhost:3000/api/v1/syllabuses";

document.addEventListener('DOMContentLoaded', () => {
  getSyllabi()
});

function getSyllabi() {
  fetch(endPoint)
    .then(res => res.json())
    .then(json => console.log(json));
}
If you see the notes printed to the console, you're good to move forward.

Render JSON
The next step is getting the syllabi added to the DOM. No problem, add an empty <div> or <ul> element to index.html and go ahead and add each syllabus title, along with an edit button. We'll give the button a data-id in case we want to implement edit functionality in the future.

/* src/index.js */
document.addEventListener('DOMContentLoaded', () => {
  const endPoint = "http://localhost:3000/api/v1/notes"
  getSyllabi()
})


function getSyllabi() {
  fetch(endPoint)
    .then(res => res.json())
    .then(syllabi => {
      // remember our JSON data is a bit nested due to our serializer
      syllabi.data.forEach(syllabus => {
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
        const syllabusMarkup = `
          <div data-id=${syllabus.id}>
            <img src=${syllabus.attributes.image_url} height="200" width="250">
            <h3>${syllabus.attributes.title}</h3>
            <p>${syllabus.attributes.category.name}</p>
            <button data-id=${syllabus.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#syllabus-container').innerHTML += syllabusMarkup
      })
    })
}
There are many ways to do this. The above snippet is not super pretty, but it works.

Source: JavaScript Rails API Project Setup

POST Request
Now that we've made a GET request we're familiar with how to GET data from the server but what about SENDING data to the server? Let's walk through it!

The key differences are in order to POST data to the server, you might need to get some input from the user. To collect this we're going to use a HTML form.

<div class="form-container">

  <form id="create-syllabus-form" style="">
    <h3>Create a Syllabus!</h3>

    <input id='input-title' type="text" name="title" value="" placeholder="Enter your syllabus name..." class="input-text">
    <br><br>
    <textarea id='input-description' name="description" rows="8" cols="80" value="" placeholder="Enter your syllabus description..."></textarea>
    <br><br>
    <input id='input-url' type="text" name="image" value="" placeholder="Enter your syllabus image URL..." class="input-text">
    <br><br>

    <select id="categories" name="categories">
      <option value="1">Art</option>
      <option value="2">Tech</option>
      <option value="3">Science</option>
    </select>
    <br><br>

    <input id= 'create-button' type="submit" name="submit" value="Create New Syllabus" class="submit">
  </form>

</div>
We'll use this form to allow a visitor to the site to create a syllabus using our app.

Submit Event
In the DOMContentLoaded event listener we can find the form on the DOM and attach a submit event listener to the form element.

document.addEventListener('DOMContentLoaded', () => {
  getSyllabi()

  let createSyllabusForm = document.querySelector('#create-syllabus-form')

  createSyllabusForm.addEventListener('submit', (e) => createFormHandler(e))
});
Form Handler
Gather all the input values and pass it to your function to execute the post fetch.

function createFormHandler(e) {
  e.preventDefault()
  const titleInput = document.querySelector('#input-title').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryInput = document.querySelector('#categories').value
  const categoryId = parseInt(categoryInput)
  postSyllabus(titleInput, descriptionInput, imageInput, categoryInput)
}
POST fetch request
function postSyllabus(title, description, image_url, category_id) {
  // confirm these values are coming through properly
  console.log(title, description, image_url, category_id);
  // build body object
  let bodyData = {title, description, image_url, category_id}

  fetch(endPoint, {
    // POST request
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(syllabus => {
    console.log(syllabus);
    const syllabusData = syllabus.data
    // render JSON response
    const syllabusMarkup = `
    <div data-id=${syllabus.id}>
      <img src=${syllabusData.attributes.image_url} height="200" width="250">
      <h3>${syllabusData.attributes.title}</h3>
      <p>${syllabusData.attributes.category.name}</p>
      <button data-id=${syllabusData.id}>edit</button>
    </div>
    <br><br>`;

    document.querySelector('#syllabus-container').innerHTML += syllabusMarkup;
  })
}
Render Created Data
Refactor your code to make it more DRY and implement a render function you can reuse in multiple places.

function render(syllabus) {
  const syllabusMarkup = `
          <div data-id=${syllabus.id}>
            <img src=${syllabus.attributes.image_url} height="200" width="250">
            <h3>${syllabus.attributes.title}</h3>
            <p>${syllabus.attributes.category.name}</p>
            <button data-id=${syllabus.id}>edit</button>
          </div>
          <br><br>`;

  document.querySelector('#syllabus-container').innerHTML += syllabusMarkup;
}
PART 4 Notes
Implement .catch() in fetch requests to handle errors.