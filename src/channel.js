class Channel {

    constructor(channel, channelAttributes) {
      this.id = channel.id
      this.name = channelAttributes.name
      this.description = channelAttributes.description
      this.img_url = channelAttributes.img_url
      this.genre = channelAttributes.genre
      this.service = channelAttributes.service
      Channel.all.push(this)
      console.log(this);
      // debugger
    }
    
    renderChannelCard() {
      return `
      <div class="col-md-3">
        <div class="card mb-4 shadow-sm">
          <img src=${this.img_url} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
              <small class="text-muted">Genre: ${this.genre.name}</small>
            </div>
          </div>
        </div>
      </div>
      `;
         // debugger
        //return `
        //<div data-id=${this.id}>
        //  <img src=${this.image_url} height="200" width="250">
        //  <h3>${this.name}</h3>
        //  <p>${this.genre.name}</p>
        //  <button data-id=${this.id}>edit</button>
        //</div>
        //<br><br>`;
      }
}

Channel.all = [];