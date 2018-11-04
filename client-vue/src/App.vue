<script>
import Sidebar from './components/Sidebar';
import AddLocationForm from './components/AddLocationForm';
import ImagePreview from './components/ImagePreview';
import Location from './components/Location';
import LocationDetails from './components/LocationDetails';
import Map from './components/Map';

import { ALL_LOCATIONS_QUERY } from './graphql/queries';
import {
  UPDATE_LOCATION,
  ADD_LOCATION,
  REMOVE_LOCATION,
  MULTIPLE_UPLOAD,
} from './graphql/mutations';

export default {
  name: 'app',
  components: {
    Sidebar,
    AddLocationForm,
    Location,
    LocationDetails,
  },
  methods: {
    handleAddNewClick() {
      this.showAddMenu = !this.showAddMenu;
      if (this.showAddMenu) {
        return this.$refs.Map.addClickEvent();
      }
      this.$refs.Map.removeClickEvent()
    },
    updateImagePreview(e) {
      this.previewImages = [...e.target.files];
    },
    handleItemClick(id) {
      this.locations = this.locations.map(l => {
        const showDetails = l.showDetails
          ? false
          : id === l.id
            ? true
            : false;
        if (l.id === id) {
          this.$refs.Map.goToLocation(l);
        }
        return Object.assign(l, { showDetails });
      });
    },
    async updateLocation({ id, description }) {
      await this.$apollo.mutate({
        mutation: UPDATE_LOCATION,
        variables: { id, description },
        update: (store, { data: { updateLocation }}) => {
          const query = ALL_LOCATIONS_QUERY;
          const data = store.readQuery({ query });
          data.locations = data.locations.map(l => {
            if (l.id === id) Object.assign(l, { description});
            return l;
          });
          store.writeQuery({ query, data });
        },
      });  
    },
    async removeLocation(id) {
      await this.$apollo.mutate({
        mutation: REMOVE_LOCATION,
        variables: { id },
        update: (store, { data: { removeLocation }}) => {
          const query = ALL_LOCATIONS_QUERY;
          const data = store.readQuery({ query });
          data.locations = data.locations.filter(l => l.id !== id);
          store.writeQuery({ query, data });
        },
      })
    },
    async addLocation(variables) {
      const { images } = variables;
      variables.files = [...images];
      Object.assign(variables, {
        coords: {
          lat: 46,
          lng: -113.342,
        },
      })
      await this.$apollo.mutate({
        variables,
        mutation: ADD_LOCATION,
        update: async (store, { data: { addLocation } }) => {
          // await this.$apollo.mutate({
          //   mutation: MULTIPLE_UPLOAD,
          //   variables: { images, id: addLocation.id },
          // });
          const data = store.readQuery({ query: ALL_LOCATIONS_QUERY });
          if (!data.locations) {
            data.locations = [];
          }
          data.locations.push(addLocation);
          store.writeQuery({
            data,
            query: ALL_LOCATIONS_QUERY,
          });
          this.showAddMenu = false;
        },
      });
    },
    $locations() {
      if (!this.locations || !this.locations.length) return null;
      return this.locations.map((l) => {
        return (
          <Location
            key={l.id}
            location={l}
            showDetails={l.showDetails}
            onClick={() => this.handleItemClick(l.id)}
            onRemove={() => this.removeLocation(l.id)}>
            {
              l.showDetails
                ? <Location-Details
                    onClick={this.updateLocation}
                    location={l} />
                : null
            }
          </Location>
        )
      });
    },
    $addNewForm() {
      return this.showAddMenu
        ? <AddLocationForm
            onSubmit={this.addLocation}
            onImagesAdded={this.updateImagePreview}>
            <ImagePreview imgs={this.previewImages} />
          </AddLocationForm>
        : null;
    },
    $appLoading() {
      return this.appLoading
        ? <div>Loading... </div>
        : null;
    },
  },
  data() {
    return {
      locations: [],
      showAddMenu: false,
      appLoading: true,
      previewImages: [],
    };
  },
  apollo: {
    locations: {
      query: ALL_LOCATIONS_QUERY,
    },
  },
  render(h) {
    return (
      <div id="app">
        <Sidebar title={'Locations'}>
          <div class={'menu'}>
            <button
              class={'show-add-new'}
              onClick={this.handleAddNewClick}>
              Add Location
            </button>
            {this.$addNewForm()}
          </div>
          {this.$locations()}
        </Sidebar>
        <Map ref="Map" locations={this.locations} />
      </div>
    );
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu {
  border: 1px solid;
  border-right: none;
  border-left: none;
  padding: .75rem 0;
}
button.show-add-new {
  margin: 1rem;
}
</style>
