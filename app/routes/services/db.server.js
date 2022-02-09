/*

    Not sure if this is best practice.
    Maybe make it so this doesn't connect
    on each client page load.

    TODO: Change this code up

*/

import mongoose from 'mongoose'

export async function connect() {
    mongoose.connect('mongodb://localhost/remix-spotify')   // Change to the URL you are using
        .then((data) => console.log("Connected to MongoDB"))
        .catch((err) => {
            console.log({
                mongoErr: err
            });
        });
}

const db = mongoose.connection

export default db
