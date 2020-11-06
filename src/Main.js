import './App.css';
import React from 'react';
import ArtistRender from './ArtistRender.js';
import { Link } from 'react-router-dom';
import { getAllArtists } from './APIUtils';

export default class Main extends React.Component {
  
  state = {
      artistData: [],
  }

  componentDidMount = async () => {
    const artistData = await getAllArtists();
// need await?
    this.setState({ artistData });
  }

  render() {
    return (
      <>
        <Link to="/create" className="links">Go to Artist Form</Link>
        <Link to="/artists/:id" className="links">Go to Detail Page</Link>
        <div className="group">
            {
            this.state.artistData.map(artist => 
            { return (
            <Link to={`artists/${artist.id}`} >
            <ArtistRender 
            uniqueId={artist.id}
            artistName={artist.name} 
            firstAlbum={artist.first_album} 
            onTour={artist.on_tour}
            genre={artist.genre}
            ownerId={artist.owner_id} />
            </Link>
            )
            })
            }
        </div>
      </>
    )
  }
}

// genre={artist.genre} NOT genre_id!!!