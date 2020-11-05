import request from 'superagent';

const URL = 'https://mighty-gorge-08883.herokuapp.com/artists';

export async function getAllGenres() {
    try {
        const response = await request.get(`https://mighty-gorge-08883.herokuapp.com/genres`);
        return response.body; 
    } catch(err) {
        throw err;
    }
} 

export async function getAllArtists() {
    try {
        const response = await request.get(`${URL}`);
        return response.body; 
    } catch(err) {
        throw err;
    }
} 

export async function getSingleArtist(someId) {
    try {
        const response = await request.get(`${URL}/$someId`);
        return response.body; 
    } catch(err) {
        throw err;
    }
} 

export async function createArtist(newArtist) {
    try {
        await request
            .post(`${URL}`)
            .send(newArtist);
        return;
    } catch(err) {
        throw err;
    }
} 

export async function updateArtist(someId, newArtist) {
    try {
        await request
            .put(`${URL}/${someId}`)
            .send(newArtist);
        return;
    } catch(err) {
        throw err;
    }
} 

export async function deleteArtist(someId) {
    try {
        await request
            .delete(`${URL}/${someId}`)
        return;
    } catch(err) {
        throw err;
    }
} 
