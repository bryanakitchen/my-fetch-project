import React from 'react';
import fetch from 'superagent';

const theOnlyUser = {
    userId: 1
};

export default class Create extends React.Component {
    
    state = {
        genres: []
    }

    componentDidMount = async () => {
        const response = await request.get(`https://mighty-gorge-08883.herokuapp.com/genres`);

        this.setState({ genres: response.body });
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
    
        await request
            .post(`https://mighty-gorge-08883.herokuapp.com/artists`)
            .send(newArtist);
    // direct user home to see the updated list with their new banjo.
        this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({ genreId: e.target.value});
    }

    render() {
        return (
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
                    <select onChange={this.handleChange}>
                        {/* <opion value="">Select a Genre</opion> */}
                        {
                        this.state.genres.map(genre => 
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>)
                        }
                    </select>
                    {/* <label>
                        Owner Id
                        <input>
                        </input>
                    </label> */}
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
// form and drop down


