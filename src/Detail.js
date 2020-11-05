import React from 'react';
// import { Link } from 'react-router-dom';
import fetch from 'superagent';
import ArtistRender from './ArtistRender';


export default class Detail extends React.Component {
    
    state = {
        artistData: '',
    }

    componentDidMount = async () => {
        const response = await fetch.get(`https://mighty-gorge-08883.herokuapp.com/artists/${this.props.match.params.id}`);
    console.log(response.body)
        this.setState({ artistData: response.body})
    }
    
    render() {
        return (
            <div>
                <ArtistRender artistData={this.state.artistData} />

                <h2 className="form-header">Update an Artist</h2>
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
        )
    }
}
