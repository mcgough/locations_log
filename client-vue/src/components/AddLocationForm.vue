<script>
export default {
  name: 'add-location-form',
  computed: {
    formData() {
      return {
        name: this.$refs.name.value,
        description: this.$refs.description.value,
        coords: {
          lat: 43.999,
          lng: -123.434,
        }
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit('submit', this.formData);
    }
  },
  render() {
    return (
      <form 
        onSubmit={(e) => this.handleSubmit(e)}
        class={'add-new'}>
        <input
          ref="name"
          type={'text'}
          value={this.addNewName}
          placeholder={'Name'}/>
        <textarea
          ref="description"
          value={this.addNewDescription}
          placeholder={'Description'} />
        <button type={'submit'}>Add New</button>
      </form>
    )
  }
}
</script>

<style scoped>
.add-new > * {
  margin-bottom: .5rem;
}
</style>