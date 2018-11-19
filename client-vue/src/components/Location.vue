<script>
export default {
  name: 'location',
  computed: {
    route() {
      return {
        name: 'location',
        params: {
          name: this.location.name.toLowerCase(),
          id: this.location.id
        },
      };
    }
  },
  props: {
    location: { type: Object, default: () => {}},
  },
  render() {
    return (
      <div class={'location'}>
        <router-link to={this.route}>
          <div class={'name'}>
            {this.location.name}
          </div>
        </router-link>
        <div class={'remove'}
          onClick={() => this.$emit('remove')}>X</div>
        {this.$slots.default} 
      </div>
    );
  },
};
</script>

<style scroped>
.location {
  position: relative;
  border-bottom: 1px solid;
  padding: 1rem 0;
}
.name {
  font-size: 1.5rem;
}
.remove {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>