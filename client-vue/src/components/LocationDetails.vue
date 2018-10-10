<script>
export default {
  name: 'location-details',
  props: {
    location: { type: Object, default: () => {}},
  },
  render(h) {
    return (
      <div>
        <textarea ref="description" value={this.location.description} />
        <div>
          <button
            onClick={() => this.$emit('click', {
              id: this.location.id,
              description: this.$refs.description.value,
            })}>
            Save
          </button>
        </div>
      </div>
    );
  },
};
</script>

<style scroped>
.location {
  border-bottom: 1px solid;
  padding: 1rem 0;
}
.name {
  font-size: 1.5rem;
}
</style>