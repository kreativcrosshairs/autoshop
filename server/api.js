module.exports = (app, config) => {
    app.get('/api/', (req, res) => {
        res.send('API Works');
    });
}