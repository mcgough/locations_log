<script>
import CLImage from "./CLImage";

export default {
  name: "location-details",
  props: {
    location: { type: Object, default: () => {} }
  },
  methods: {
    $images() {
      return this.location.images.map(id => (
        <CLImage public_id={id} lazyLoad />
      ));
    }
  },
  render() {
    return (
      <div>
        {this.$images()};
        <textarea ref="description" value={this.location.description} />
        <div>
          <button
            onClick={() =>
              this.$emit("click", {
                id: this.location.id,
                description: this.$refs.description.value
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    );
  }
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