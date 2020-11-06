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
        artistYear: 0,
        artistTour: false,
    }

    componentDidMount = async () => {
        const genres = await getAllGenres();
        const artist = await getSingleArtist(this.props.match.params.id);
        
        const matchGenre = genres.find((genre) => {
            return genre.id === artist.genre_id
        })

        this.setState({ 
            artistData: artist,
            genres: genres,
            matchGenre: matchGenre,
            artistName: artist.name,
            artistYear: artist.first_album,
            artistTour: artist.on_tour,
         })
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
    
        await updateArtist( 
            this.props.match.params.id, 
            {
            name: this.state.artistName,
            first_album: this.state.artistYear,
            on_tour: this.state.artistTour,
            genre_id: this.state.genreId,
            owner_id: theOnlyUser.userId,
        })
    // direct user home to see the updated list with their new artist.
        this.props.history.push('/');
    }

    // handleChange = (e) => {
    //     this.setState({ genreId: e.target.value});
    // }

    render() {
        console.log(this.state.artistTour)
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
                            <input value={this.state.artistYear} onChange={e => this.setState({ artistYear: e.target.value})} type="number" />
                        </label>
                        <label>
                            On Tour Status
                            <input 
                            checked={this.state.artistTour} 
                            onChange={e => this.setState({ artistTour: e.target.checked})} type="checkbox" name="booger" />
                        </label>
                        <label>
                            Select Genre
                            <select onChange={e => this.setState({ genreId: e.target.value})}>
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
