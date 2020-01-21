<script>
export default {
  name: "image-preview",
  props: ["imgs"],
  methods: {
    buildImgTile(imgData) {
      return (
        <img class={"tile-preview"} src={window.URL.createObjectURL(imgData)} />
      );
    }
  },
  render(h) {
    const tiles = this.imgs.length ? this.imgs.map(this.buildImgTile) : null;
    return <div class={"image-preview-wrapper"}>{tiles}</div>;
  }
};
</script>

<style scoped>
.image-preview-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.tile-preview {
  height: 50px;
  width: 50px;
  margin-left: 5px;
}
.tile-preview:first-of-type {
  margin-left: 0;
}
</style>