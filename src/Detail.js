import React from 'react';
import ArtistRender from './ArtistRender';
import { getAllGenres, updateArtist, getSingleArtist, deleteArtist } from './APIUtils.js';

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

    handleDelete = async (e) => {
        await deleteArtist(this.props.match.params.id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
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
                        <button onClick={this.handleDelete} className="delete-button">Delete Artist</button>
                        
                    </form>
            </div>
        )
    }
}
