<<script>
export default {
  name: 'image-input',
  render() {
    return (
      <input
        ref="imageInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={e => this.$emit('filesAdded', e.target.files)} />
    )
  }
}
</script>
