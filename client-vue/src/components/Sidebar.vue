<script>
import Location from './Location';
import { ADD_NEW_LOCATION } from './../graphql/mutations';
import { ALL_LOCATIONS_QUERY } from './../graphql/queries';

export default {
  name: 'Sidebar',
  props: {
    title: String,
  },
  data() {
    return {
      showAddMenu: false,
    };
  },
  methods: {
    async handleAddNew(e) {
      e.preventDefault();
      const [name, description] = [...e.target];
      const { data } = await this.$apollo.mutate({
        mutation: ADD_NEW_LOCATION,
        variables: {
          name: name.value,
          description: description.value,
          coords: {
            lat: 43.999,
            lng: -123.434,
          },
        },
        update: (store, { data: { addNewLocation } }) => {
          const data = store.readQuery({ query: ALL_LOCATIONS_QUERY });
          data.locations.push(addNewLocation);
          store.writeQuery({
            query: ALL_LOCATIONS_QUERY,
            data,
          });
        },
      });
    },
    genAddNewForm() {
      return this.showAddMenu
        ? <form 
            onSubmit={(e) => this.handleAddNew(e)}
            class={'add-new'}>
            <input
              type={'text'}
              value={this.addNewName}
              placeholder={'Name'}/>
            <textarea
              value={this.addNewDescription}
              placeholder={'Description'} />
            <button type={'submit'}>Add New</button>
          </form>
        : null;
    },
  },
  render(h) {
    return (
      <div class={'sidebar'}>
        <div class={'title'}>{this.title}</div>
        <div class={'menu'}>
          <button
            class={'show-add-new'}
            onClick={() => this.showAddMenu = !this.showAddMenu}>
            Add Location
          </button>
          {this.genAddNewForm()}
        </div>
        { this.$slots.default }
      </div>
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.sidebar {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  max-width: 600px;
  border-right: 1px solid;
  background: #fff;
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
form.add-new {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
.title {
  font-size: 3em;
  text-transform: uppercase;
  margin: 3rem auto 2rem;
}
</style>
