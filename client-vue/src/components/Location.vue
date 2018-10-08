<script>
export default {
  name: 'Location',
  props: {
    location: { type: Object, default: () => {}},
    showDetails: { type: Boolean, default: false },
  },
  methods: {
    genDetails() {
      return this.showDetails
        ? <div>
            <textarea ref="description" value={this.location.description} />
            <div>
              <button
                onClick={() => this.$emit('saveClicked', {
                  id: this.location.id,
                  description: this.$refs.description.value,
                })}>
                Save
              </button>
            </div>
          </div>
        : null;
    },
  },
  render(h) {
    return (
      <div class={'location'}>
        <div class={'name'} onClick={() => this.$emit('click', this.location.id)}>
          {this.location.name}
        </div>
        {this.genDetails()}
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