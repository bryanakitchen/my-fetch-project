import React from 'react';
// import { Link } from 'react-router-dom';
import fetch from 'superagent';
import ArtistRender from './ArtistRender';
import { getAllGenres, createArtist, updateArtist, getSingleArtist } from './APIUtils.js';

const theOnlyUser = {
    userId: 1
};

export default class Detail extends React.Component {
    
    state = {
        genres: [],
        artistData: {},
        matchGenre: 
            {name: '',
            genre_id: 1},
        artistName: '',
    }
// set boolean as false and add radio buttons
    componentDidMount = async () => {
        const genres = await getAllGenres();
        const artist = await getSingleArtist(this.props.match.params.id);
        
        // const genreString = artist.genre;
        
        const matchGenre = genres.find((genre) => {
            return genre.id === artist.genre_id
        })

        this.setState({ 
            artistData: artist,
            genres: genres,
            matchGenre: matchGenre,
            artistName: artist.name,
         })
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
    
        await updateArtist( 
            this.props.match.params.id, 
            {
            name: this.state.artistName,
            first_album: this.state.albumYear,
            on_tour: this.state.tourStatus,
            genre_id: this.state.genreId,
            owner_id: theOnlyUser.userId,
        })
    // direct user home to see the updated list with their new artist.
        this.props.history.push('/');
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ genreId: e.target.value});
    }


    render() {
        console.log(this.state.matchGenre)
        return (
            <div>
                <ArtistRender 
                uniqueId={this.state.artistData.id}
                artistName={this.state.artistData.name} 
                firstAlbum={this.state.artistData.first_album} 
                onTour={this.state.artistData.on_tour}
                genre={this.state.matchGenre.name}
                ownerId={this.state.artistData.owner_id}
                 />

                <h2 className="form-header">Update an Artist</h2>
                    <form onSubmit={this.handleSubmit} className="the-form">
                        <label>
                            Artist Name
                            <input value={this.state.artistName} onChange={e => this.setState({ artistName: e.target.value})} type="text" />
                        </label>
                        <label>
                            First Album Release Year
                            <input value={this.state.artistData.first_album} onChange={e => this.setState({ albumYear: e.target.value})} type="number" />
                        </label>
                        <label>
                            ON TOUR TEST
                                <input 
                                selected={this.state.artistData.on_tour} 
                                 onChange={e => this.setState({ tourStatus: e.target.value})} type="checkbox" name="booger" />
                        </label>
                        <label>
                            On Tour Status (true/false)
                            <input value={this.state.artistData.on_tour} onChange={e => this.setState({ tourStatus: e.target.value})} type="text" />
                        </label>
                        <label>
                            Select Genre
                            <select onChange={this.handleChange}>
                                {
                                this.state.genres.map(genre => 
                                <option 
                                selected={this.state.matchGenre.id === genre.id} 
                                key={genre.id} 
                                value={genre.id}>
                                    {genre.name}
                                </option>)
                                }
                            </select>
                        </label>
                        <button>Update</button>
                    </form>
            </div>
        )
    }
}
