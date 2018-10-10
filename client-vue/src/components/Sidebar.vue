<script>
import Location from './Location';
import { ADD_NEW_LOCATION } from './../graphql/mutations';
import { ALL_LOCATIONS_QUERY } from './../graphql/queries';

export default {
  name: 'sidebar',
  props: {
    title: String,
  },
  render(h) {
    return (
      <div class={'sidebar'}>
        <div class={'title'}>{this.title}</div>
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
