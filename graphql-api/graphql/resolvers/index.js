const Location = require('../../models/Location');
const Coordinates = require('../../models/Coordinates');
const { GraphQLUpload } = require('graphql-upload');
const { stringifyID, uploadImg } = require('../../utils');
const { ObjectId } = require('mongoose').Types;

const locations = async () => {
  const result = await Location.find({});
  return result.map(stringifyID);
};
const location = async ({ id }) => {
  const result = await Location.findById(ObjectId(id));
  return stringifyID(result); 
}
const updateLocation = async ({ id, description }) => {
  const result = await Location.updateOne({ _id: ObjectId(id), description });
  return stringifyID(result);
};
const addLocation = async (location) => {
  const result = await Location.create(location);
  return stringifyID(result);
};
const removeLocation = async ({ id }) => {
  const result = await Location.findByIdAndRemove({ _id: ObjectId(id) });
  return result;
};

const singleUpload = (obj, { file }) => console.log('SINGLE UPLOAD', obj, file);
const multipleUpload = async (parent, { body }) => {
  const { images, id } = body.variables;
  try {
    const imageIds = await Promise.all(images.map(uploadImg));
    const result = await Location.findByIdAndUpdate(
      ObjectId(id),
      { images: imageIds },
      { new: true },
    );
    return stringifyID(result);
  }
  catch(e) {
    console.log('err', e);
  }
}

const uploads = () => console.log('UPLOADS query'); 

const resolvers = {
  Upload: GraphQLUpload,
  location,
  locations,
  uploads,
  updateLocation,
  addLocation,
  removeLocation,
  singleUpload,
  multipleUpload,
};

module.exports = resolvers;