<script>
import Sidebar from './components/Sidebar';
import Location from './components/Location';
import Map from './components/Map';

import { ALL_LOCATIONS_QUERY } from './graphql/queries';
import { UPDATE_LOCATION } from './graphql/mutations';

export default {
  name: 'app',
  components: {
    Sidebar,
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
  },
  data() {
    return {
      locations: [],
    };
  },
  apollo: {
    locations: {
      query: ALL_LOCATIONS_QUERY,
    }
  },
  render(h) {
    return (
      <div id="app">
        <Sidebar title={'Locations'}>
          {this.locations.map(l =>
              <Location
                key={l.id}
                location={l}
                showDetails={l.showDetails}
                onSaveClicked={this.updateLocation}
                onClick={() => this.handleItemClick(l.id)} />
          )}
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
