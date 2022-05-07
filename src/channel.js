class Channel {

    constructor(channel, channelAttributes) {
      this.id = channel.id
      this.name = channelAttributes.name
      this.description = channelAttributes.description
      this.img_url = channelAttributes.img_url
      this.genre = channelAttributes.genre
      this.service = channelAttributes.service
      Channel.all.push(this)
      // debugger
    }
    
    renderChannelCard() {
         // debugger
        return `
        <div data-id=${this.id}>
          <img src=${this.image_url} height="200" width="250">
          <h3>${this.name}</h3>
          <p>${this.genre.name}</p>
          <button data-id=${this.id}>edit</button>
        </div>
        <br><br>`;
      }
}

Channel.all = [];