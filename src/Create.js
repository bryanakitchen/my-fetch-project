import React, { Component } from 'react'

export default class Create extends Component {
    
    // state = {
    //     artists: []
    // }

    // componentDidMount = async () => {
    //     const response = await fetch.get(`https://mighty-gorge-08883.herokuapp.com/artists`);
    //       this.setState({ artistData: response.body });
    //   }    
    
    render() {
        return (
            <div>
                <form>
                    <label>
                        <input>
                        </input>
                    </label>
                </form>
            </div>
        )
    }
}
// form and drop down


// handleSubmit = async (e) => {
//     e.preventDefault();

//     const newArtist = {
        
//     };

//     await request
//         .post('createURL')
//         .send(newArtist);
// // direct user home to see the updated list with their new banjo.
//     this.props.history.push('/');
// }