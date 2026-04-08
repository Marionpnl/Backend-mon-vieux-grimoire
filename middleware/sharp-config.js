const sharp = require('sharp'); 
const path = require('path');

module.exports = (req, res, next) => {
  if (!req.file) return next();

  // Préparation du nom : On prend le nom d'origine, on remplace les espaces par des underscores, et on enlève l'extension d'origine
  const name = req.file.originalname.split(' ').join('_').split('.')[0];
  
  // On crée le nouveau nom : Nom_DateUnique.webp 
  const fileName = `${name}_${Date.now()}.webp`;
  
  // On définit où l'image finale sera stockée physiquement
  const outputPath = path.join('images', fileName);

  // LE TRAITEMENT SHARP
  sharp(req.file.buffer) // On prend l'image qui est encore dans la RAM (buffer)
    .resize({ width: 500 }) 
    .webp({ quality: 80 })  
    .toFile(outputPath)     // On écrit enfin le fichier optimisé sur le disque dur
    .then(() => {
      // On remplace les informations du fichier original par celles du fichier optimisé.
      req.file.path = outputPath;
      req.file.filename = fileName;
      next(); // On passe au contrôleur
    })
    .catch(err => next(err)); 
};