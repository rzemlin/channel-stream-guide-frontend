class Channel {

    constructor(channel, channelAttributes) {
      this.id = channel.id
      this.name = channelAttributes.name
      this.description = channelAttributes.description
      this.img_url = channelAttributes.img_url
      this.genre = channelAttributes.genre
      this.service = channelAttributes.service
      Channel.all.push(this)
    }
    renderChannelCard() {
      return `
      <div class="col-md-3" id="channel-${this.id}">
        <div class="card mb-4 shadow-sm">
          <img src=${this.img_url} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="editButton" class="edit-btn btn-sm btn-outline-secondary" data-id=${this.id} id="editButton">Edit</button>        
              <button type="button" class="btn btn-sm btn-outline-secondary" data-id=${this.id} id="deleteButton">Delete</button>
            </div>
            
              <small class="text-muted">Genre: ${this.genre.name}</small>
            </div>
        
          </div>
        </div>
      </div>
      `;
      }

      static findById(id) {
        //debugger
        return this.all.find(channel => channel.id == id);
    }
      renderUpdateForm() {
        return `
      <section class="jumbotron text-center">
      <div class="container">
        <form id="update-channel-form" data-id=${this.id} name="${this.id}">
          <div class="form-group">
            <h4>Add Changes Here</h4>
            <label for="channel-name"><p class="site-title">${this.name}</p></label>
            <input type="name" class="form-control" id="input-name" value="" placeholder="Edit spelling or change name">
          </div>
          <div class="form-group">
            <label for="image-source">Image Url</label>
            <input type="img_url" class="form-control" id="input-img_url" value="${this.img_url}" placeholder="${this.img_url}">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea class="form-control" id="input-description" rows="3" value="" placeholder="${this.description}"></textarea>
          </div>
          <div class="form-group">
            <select id="genre" name="Genre">
              <option value="1">Sports</option>
              <option value="2">News</option>
              <option value="3">Drama</option>
              <option value="4">Comedy</option>
              <option value="5">Action</option>
              <option value="6">Entertainment</option>
            </select>
          </div>
          <button type="submit" id="save-btn" class="btn btn-primary">Save Changes</button>
        </form>
        </div>
      </div>
    </section>`
    }
  }


Channel.all = [];