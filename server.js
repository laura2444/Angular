const express = require('express');
const path = require('path');
const app = express();

const distFolder = path.join(__dirname, 'dist/front-bd2/browser');

// Servir archivos estáticos
app.use(express.static(distFolder, { 
  maxAge: '1y', 
  etag: false 
}));

// Redirigir todas las rutas al index.html (importante para Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Not Found');
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});