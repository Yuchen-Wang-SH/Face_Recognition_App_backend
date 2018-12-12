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

module.exports = { handleImage };