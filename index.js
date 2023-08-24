const http = require('node:http');
const path = require('path');
const { readFile } = require('./utils');

const PORT = process.env.PORT || 8080 ;
const availableFiles = ['index.html', 'about.html', 'contact-me.html'];

const server = http.createServer(async (req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});

async function handleRequest(req, res) {
  let fileName = path.basename(req.url);
  const fileExtension = path.extname(req.url);
  if (!fileExtension) {
    fileName = fileName + '.html';
  }

  if (availableFiles.includes(fileName)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const fileData = await readFile(fileName);
    res.end(fileData);
  } else {
    res.statusCode = 404;
    const fileNotFoundTemplate = await readFile('404.html');
    res.end(fileNotFoundTemplate);
  }
}
