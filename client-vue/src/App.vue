<script>
import Sidebar from './components/Sidebar';
import AddLocationForm from './components/AddLocationForm';
import Location from './components/Location';
import LocationDetails from './components/LocationDetails';
import Map from './components/Map';

import { ALL_LOCATIONS_QUERY } from './graphql/queries';
import {
  UPDATE_LOCATION,
  ADD_LOCATION,
  REMOVE_LOCATION,
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
    handleItemClick(id) {
      this.locations = this.locations.map(l => {
        const showDetails = l.showDetails
          ? false
          : id === l.id
            ? true
            : false;
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
    async handleAddNew(variables) {
      const { data } = await this.$apollo.mutate({
        mutation: ADD_LOCATION,
        variables,
        update: (store, { data: { addLocation } }) => {
          const data = store.readQuery({ query: ALL_LOCATIONS_QUERY });
          data.locations.push(addLocation);
          store.writeQuery({
            query: ALL_LOCATIONS_QUERY,
            data,
          });
          this.showAddMenu = false;
        },
      });
    },
    $locations() {
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
        ? <AddLocationForm onSubmit={this.handleAddNew}/>
        : null;
    }
  },
  data() {
    return {
      locations: [],
      showAddMenu: false,
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
              onClick={() => this.showAddMenu = !this.showAddMenu}>
              Add Location
            </button>
            {this.$addNewForm()}
          </div>
          {this.$locations()}
        </Sidebar>
        <Map locations={this.locations} />
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
</style>
