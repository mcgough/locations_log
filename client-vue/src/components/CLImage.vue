<script>
const CLOUD_PATH = 'https://res.cloudinary.com/mcgough-dan/image/upload/q_auto,f_auto'

export default  {
  name: 'cloundinary-image',
  props: {
    public_id: { type: String, required: true },
    lazyLoad: { type: Boolean, default: false },
  },
  created() {
    this.url = this.lazyLoad
        ? CLOUD_PATH + ',w_5/' + this.public_id
        : CLOUD_PATH + '/' + this.public_id;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.url = CLOUD_PATH + '/' + this.public_id;
      };
      img.src = CLOUD_PATH + '/' + this.public_id;
    });
  },
  render(h) {
    return (
      <img
        style={{ width: '100%' }}
        src={this.url} />
    );
  },
  data: () => ({
    url: '',
  }),
}
</script>
