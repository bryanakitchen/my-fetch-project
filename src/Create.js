import React from 'react';
import request from 'superagent';

const theOnlyUser = {
    userId: 1
};

export default class Create extends React.Component {
    
    state = {
        genres: []
    }

    // method on a class
    getAllGenres = async () => {
        const response = await request.get(`https://mighty-gorge-08883.herokuapp.com/genres`);
        this.setState({ genres: response.body });
    }

    componentDidMount = async () => {
        this.getAllGenres()
        // const response1 = await request.get(`https://mighty-gorge-08883.herokuapp.com/artists`);
        // this.setState({ artists: response1.body });
      }    
    
    handleSubmit = async (e) => {
        e.preventDefault();
    
        const newArtist = {
            name: this.state.artistName,
            first_album: this.state.albumYear,
            on_tour: this.state.tourStatus,
            genre_id: this.state.genreId,
            owner_id: theOnlyUser.userId,
        };
        console.log(newArtist);

        await request
            .post(`https://mighty-gorge-08883.herokuapp.com/artists`)
            .send(newArtist);
    // direct user home to see the updated list with their new artist.
        this.props.history.push('/');
    }

    handleSubmitGenre = async (e) => {
        e.preventDefault();
    
        const newGenre = {
            name: this.state.genreName,
        };

        await request
        .post(`https://mighty-gorge-08883.herokuapp.com/genres`)
        .send(newGenre);
        
        this.getAllGenres()
        this.setState({ genreName: ''});
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ genreId: e.target.value});
    }

    render() {
        return (
            <>
                <div>
                    <h2 className="form-header">Add an Artist</h2>
                    <form onSubmit={this.handleSubmit} className="the-form">
                        <label>
                            Artist Name
                            <input onChange={e => this.setState({ artistName: e.target.value})} type="text" />
                        </label>
                        <label>
                            First Album Release Year
                            <input onChange={e => this.setState({ albumYear: e.target.value})} type="number" />
                        </label>
                        <label>
                            On Tour Status (true/false)
                            <input onChange={e => this.setState({ tourStatus: e.target.value})} type="text" />
                        </label>
                        <label>
                            Select Genre
                            <select onChange={this.handleChange}>
                                {
                                this.state.genres.map(genre => 
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>)
                                }
                            </select>
                        </label>
                        <button>Submit</button>
                    </form>
                </div>
                <div>
                    <h2 className="form-header">Add a Genre</h2>
                    <form onSubmit={this.handleSubmitGenre} className="the-form">
                        <label>
                            Genre Name
                            <input onChange={e => this.setState({ genreName: e.target.value})} type="text" value={this.state.genreName} />
                        </label>
                        <button>Submit</button>
                    </form>
                </div>
            </>
        )
    }
}

// {/* <opion value="">Select a Genre</opion> */}
