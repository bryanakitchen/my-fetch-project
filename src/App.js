import './App.css';
import React from 'react';
import fetch from 'superagent';
import ArtistRender from './ArtistRender.js';

export default class App extends React.Component {
  
  state = {
      artistData: '',
  }


  componentDidMount = async () => {
    const response = await fetch.get(`https://mighty-gorge-08883.herokuapp.com/artists`);
      // if one state is empty, it will just ignore or show all
      // console.log(response.body.results)
      this.setState({ artistData: response.results });
  }


  render() {
    return (
      <div>
              {
          this.props.artistData.length === 0
          // if artistData is 0, return this gif
          ? <iframe src="https://giphy.com/embed/HtqFbL7el09oY" width="480" height="358" frameBorder="0" title="hereismytitle" className="giphy-embed" allowFullScreen></iframe>
          :
          // else show me the money
          <div className="group"> 
          {
          this.props.artistData.map(artist => 
          { return (
          <ArtistRender 
          uniqueId={artist.id}
          artistName={artist.name} 
          firstAlbum={artist.first_album} 
          onTour={artist.on_tour}
          genre={artist.genre}
          ownerId={artist.owner_id} />
          )
          })
          }
          </div>
      }

      </div>
    )
  }
}
