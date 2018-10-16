console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
    api: process.env.API,
    id: process.env.APP_ID
};

exports.ombd = {
    api: process.env.OMBD_API,
    key: process.env.KEY
};
