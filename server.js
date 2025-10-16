const express = require('express');
const path = require('path');
const app = express();

const distFolder = path.join(__dirname, 'dist/front-bd2/browser');

app.use(express.static(distFolder, { maxAge: '1y', etag: false }));

app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});