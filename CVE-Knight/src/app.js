const fs = require('fs');
const path = require('path');
const  {fetchApi, fetchApiByParams}  = require('./api/data');


exports.app = async(req, res, parsedUrl) => {
    let filePath = path.join(__dirname, 'public', 'index.html'); // Default file path
    if (parsedUrl.pathname !== '/') {
        filePath = path.join(__dirname, 'public', parsedUrl.pathname);
    }
    if (!path.extname(filePath)) {
        filePath += '.html';
    }
    if (parsedUrl.pathname === '/api/data') {
        const data = await fetchApi(req, res);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data), 'utf-8');
        return;
    }
    if (parsedUrl.pathname === '/search' && 'query' in parsedUrl.query) {
        const data = await fetchApiByParams(req, res, parsedUrl);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data), 'utf-8');
        return;
    }  
    // here i´m getting the file extension
    const ext = path.extname(filePath);
    // here i´m setting the content type
    const mimeType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
    };

    fs.readFile(filePath, async (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // File not found, send 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                // Some server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error', 'utf-8');
            }
        } else {
            // Here i´m sending the file content
            res.writeHead(200, { 'Content-Type': mimeType[ext] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
        
    });
};
