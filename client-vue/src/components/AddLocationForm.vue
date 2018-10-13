<script>
export default {
  name: 'add-location-form',
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit(
        'submit',
        Object.keys(this.$refs)
          .reduce((acc, prop) => { 
            acc[prop] = this.$refs[prop].value;
            return acc;
          }, {})
      );
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
        <slot></slot>
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
form.add-new {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>