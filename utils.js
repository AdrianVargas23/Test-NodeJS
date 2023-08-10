const fs = require('node:fs/promises');

async function readFile(fileName) {
  const data = await fs.readFile(fileName, { encoding: 'utf8' });
  return data;
}

module.exports = {
  readFile,
};
