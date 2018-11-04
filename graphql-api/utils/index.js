const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload_stream = cloudinary.uploader.upload_stream({ tags: 'test-image' })

module.exports = {
  stringifyID: obj => {
    Object.assign(obj, { id: ObjectId(obj._id).toString() });
    return obj;
  },
  uploadImg: (img) => {
    return new Promise(async (resolve, reject) => {
      const image = await img;
      const IMG_PATH = '../../uploads/' + image.filename;
      const fstream = fs.createWriteStream(IMG_PATH);
      const stream = image.createReadStream();
      stream.pipe(fstream);
      fstream.on('finish', async () => {
        const { public_id } = await cloudinary.uploader.upload(IMG_PATH, { tags: 'Is this working?' });
        fs.unlinkSync(IMG_PATH);
        resolve(public_id);
      });
    });
  }
};
