const data = require('../../dummyData');
const fakeDB = {
  locations: [...data.locations],
}

const locations = () => fakeDB.locations;
const location = args => fakeDB.locations.filter(l => l.id === args.id)[0];
const updateLocation = ({ id, description }) => {
  return fakeDB.locations
    .map(l => {
      if (l.id === id) {
        l.description = description;
      }
      return l;
    })
    .filter(l => l.id === id)[0];
};
const addLocation = (location) => {
  fakeDB.locations.push(Object.assign(location, {
    id: fakeDB.locations.length + 1,
  }));
  return fakeDB.locations[fakeDB.locations.length - 1];
};
const removeLocation = ({ id }) => {
  const [removed] = fakeDB.locations.filter(l => l.id === id);
  fakeDB.locations = fakeDB.locations.filter(l => l.id !== id);
  return removed;
};

const resolvers = {
  location,
  locations,
  updateLocation,
  addLocation,
  removeLocation,
};

module.exports = resolvers;