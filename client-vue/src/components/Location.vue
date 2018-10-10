<script>
export default {
  name: 'location',
  props: {
    location: { type: Object, default: () => {}},
  },
  render(h) {
    return (
      <div class={'location'}>
        <div class={'name'}
          onClick={() => this.$emit('click', this.location.id)}>
          {this.location.name}
        </div>
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