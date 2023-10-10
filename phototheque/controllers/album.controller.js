const Album = require("../models/Album");
const path = require("path");

const albums = async (req, res) => {
  const albums = await Album.find();
  console.log(albums);

  res.render("albums", {
    title: "Mes albums",
    albums,
  });
};

const album = async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    // console.log(album);

    res.render("album", {
      title: "Album",
      album,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/404");
  }
};

const addImage = async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);

  console.log(req.files);

  const imageName = req.files.image.name;

  const folderPath = path.join(__dirname, "../public/uploads", idAlbum);
  fstat.mkdirSync(folderPath, { recursive: true });

  const localPath = path.join(folderPath, imageName);
  await req.files.image.mv(localPath);

  album.images.push(imageName);
  await album.save();

  res.redirect(`/albums/${idAlbum}`);
};

const createAlbumForm = (req, res) => {
  res.render("new-album", {
    title: "Nouvel album",
    errors: req.flash("error"),
  });
};

const createAlbum = async (req, res) => {
  try {
    if (!req.body.albumTitle) {
      req.flash("error", "Le titre ne doit pas être vide");
      res.redirect("/albums/create");
      return;
    }

    await Album.create({
      title: req.body.albumTitle,
    });

    res.redirect("/albums");
  } catch (err) {
    console.log(err);
    req.flash("error", "Erreur lors de la création de l'album");
    res.redirect("/albums/create");
  }
};

module.exports = {
  albums,
  album,
  addImage,
  createAlbumForm,
  createAlbum,
};
