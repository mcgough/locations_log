<script>
export default {
  name: "add-location-form",
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit(
        "submit",
        Object.keys(this.$refs).reduce((acc, prop) => {
          if (prop === "images") {
            acc[prop] = this.$refs[prop].files;
          } else {
            acc[prop] = this.$refs[prop].value;
          }
          return acc;
        }, {})
      );
      this.clearFields();
    },
    clearFields() {
      Object.keys(this.$refs).forEach(prop => {
        this.$refs[prop].value = "";
      });
    }
  },
  render(h) {
    return (
      <form onSubmit={e => this.handleSubmit(e)} class={"add-new"}>
        <input ref="name" type={"text"} placeholder={"Name"} />
        <textarea ref="description" placeholder={"Description"} />
        <input
          onChange={e => this.$emit("imagesAdded", e)}
          ref="images"
          type="file"
          accept=".jpg, .jpeg, .png"
          multiple
        />
        {this.$slots.default}
        <button type={"submit"}>Add New</button>
      </form>
    );
  }
};
</script>

<style scoped>
.add-new > * {
  margin-bottom: 0.5rem;
}
form.add-new {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>