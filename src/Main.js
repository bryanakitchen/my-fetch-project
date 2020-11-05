import './App.css';
import React from 'react';
import fetch from 'superagent';
import ArtistRender from './ArtistRender.js';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
  
  state = {
      artistData: [],
  }

  componentDidMount = async () => {
    const response = await fetch.get(`https://mighty-gorge-08883.herokuapp.com/artists`);
    await this.setState({ artistData: response.body });
  }

  render() {
    return (
      <>
        <Link to="/Create" className="links">Go to Artist Form</Link>
        <div className="group">
            {
            this.state.artistData.map(artist => 
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
      </>
    )
  }
}

// genre={artist.genre} NOT genre_id!!!