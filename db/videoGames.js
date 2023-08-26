const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query('SELECT * FROM videoGames;');
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE
    try {
        const { title, genre, release_date } = body;
        const { rows: [newVideoGame] } = await client.query(`
            INSERT INTO videoGames (title, genre, release_date, name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, genre, release_date, description, price, inStock, isPopular, imgUr]);
        return newVideoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE


    const setClauses = fieldKeys.map((key, index) => `${key} = $${index + 2}`).join(', ');

    const values = [id, ...fieldKeys.map(key => fields[key])];

    try {
        const { rows: [updatedVideoGame] } = await client.query(`
            UPDATE videoGames
            SET ${setClauses}
            WHERE id = $1
            RETURNING *;
        `, values);
        return updatedVideoGame;
    } catch (error) {
        throw error;
    }

}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
    try {
        const { rows: [deletedVideoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);
        return deletedVideoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}