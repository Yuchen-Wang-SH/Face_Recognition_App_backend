const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('hash').from('login').where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users').where('email', '=', email)
            .then(users => {
                res.json(users[0]);
            })
            .catch(err => res.status(400).json('unable to get user'));
        } else {
            res.status(400).json('credential problem');
        }
    })
    .catch(err => res.status(400).json('unable to get hash'))
};

module.exports = { handleSignin };