const {createServer} = require('http');
const {parse} = require('url');

const {app}= require('./src/app');

const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    app(req, res, parsedUrl);
    });

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    });
