const ytdlp = require('yt-dlp-exec');

// Télécharger une vidéo YouTube
ytdlp('https://youtu.be/AdbrfoxiAtk?si=KzEE_UJVjPzjxSE9', {
  format: 'bestvideo+bestaudio/best', // Choisir la meilleure qualité disponible
  output: './downloads/%(title)s.%(ext)s', // Chemin de sauvegarde
})
  .then(output => console.log('Download successful:', output))
  .catch(error => console.error('Error:', error));