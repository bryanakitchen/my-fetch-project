import './App.css';
import React from 'react';
import fetch from 'superagent';
import ArtistRender from './ArtistRender.js';

export default class Main extends React.Component {
  
  state = {
      artistData: [],
  }


  componentDidMount = async () => {
    const response = await fetch.get(`https://mighty-gorge-08883.herokuapp.com/artists`);
      console.log(response.body)
      await this.setState({ artistData: response.body });
  }


  render() {
    return (
      <div className="group">
          {
          this.state.artistData.map(artist => 
          { return (
          <ArtistRender 
          uniqueId={artist.id}
          artistName={artist.name} 
          firstAlbum={artist.first_album} 
          onTour={artist.on_tour}
          genre={artist.genre_id}
          ownerId={artist.owner_id} />
          )
          })
          }
      </div>
    )
  }
}

// {
//   this.props.artistData.length === 0
//   // if artistData is 0, return this gif
//   ? <iframe src="https://giphy.com/embed/HtqFbL7el09oY" width="480" height="358" frameBorder="0" title="hereismytitle" className="giphy-embed" allowFullScreen></iframe>
//   :
//   // else show me the data
//   <div className="group"> 
//   {
//   this.props.artistData.map(artist => 
//   { return (
//   <ArtistRender 
//   uniqueId={artist.id}
//   artistName={artist.name} 
//   firstAlbum={artist.first_album} 
//   onTour={artist.on_tour}
//   genre={artist.genre}
//   ownerId={artist.owner_id} />
//   )
//   })
//   }
//   </div>
// }
