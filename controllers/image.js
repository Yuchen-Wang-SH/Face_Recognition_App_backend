const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'cff3c929d6af4a71887099dc8e032bf3'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = db => (req, res) => {
    const { id, numFaceDetected } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', numFaceDetected)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = { handleImage, handleApiCall };