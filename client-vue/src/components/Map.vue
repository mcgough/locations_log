<script>
import GoogleMapsKey from './../keys';

export default {
  name: 'google-map',
  components: {},
  props: {
    locations: { type: Array, default: () => [] },
  },
  data() {
    return {
      map: null,
      mapMarkers: null,
    }
  },
  async mounted() {
    await this.loadScript();
    this.mapInit();
    console.log('firing')
  },
  methods: {
    mapInit() {
      this.map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 4,
          center: this.locations[0].coords
        }
      )
      this.mapMarkers = this.locations.map(l => 
        new google.maps.Marker({
          position: l.coords,
          map: this.map,
        })
      );
    },
    async loadScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapsKey}`
        script.onload = () => {
          return resolve(true);
        },
        document.body.appendChild(script)
    });
    },
  },
  render(h) {
    return (
      <div id={'map'}></div>
    );
  }
}
</script>

<style scoped>
  #map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>