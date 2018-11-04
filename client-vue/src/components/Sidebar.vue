<script>
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
  overflow-y: scroll;
}
.title {
  font-size: 3em;
  text-transform: uppercase;
  margin: 3rem auto 2rem;
}
</style>
