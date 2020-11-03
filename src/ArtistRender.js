import React from 'react';

export default class ArtistRender extends React.Component {
    render() {
        return (
            <div>
                {/* <h3 className="name">{this.props.name}</h3> */}
                {/* <img className="picture" src={this.props.url} alt={this.props.name} ></img> */}
                <p className="unique-id">{this.props.uniqueId}</p>
                <p className="artist-name">Artist: {this.props.artistName}</p>
                <p className="first-album">Year of First Album: {this.props.firstAlbum}</p>
                <p className="on-tour">On Tour: {this.props.onTour}</p>
                <p className="genre">Genre: {this.props.genre}</p>
                <p className="owner-id">Owner Id: {this.props.ownerId}</p>

            </div>
        )
    }
}
