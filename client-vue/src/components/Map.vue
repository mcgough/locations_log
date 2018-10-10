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
      mapMarkers: [],
    }
  },
  async mounted() {
    await this.loadScript();
    this.mapInit();
  },
  watch: {
    locations(arr) {
      if (arr.length && this.map) {
        this.deleteMarkers();
        arr.forEach(this.addMarker);
        this.mapMarkers.forEach(l => l.setMap(this.map));
      }
    },
  },
  methods: {
    mapInit() {
      this.map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 4,
          center: this.locations[0].coords || { lat: 0, lng: 0 },
        }
      )
      this.locations.forEach(this.addMarker);
    },
    addMarker({ coords }) {
      const marker = new google.maps.Marker({
        position: coords,
        map: this.map,
      });
      this.mapMarkers.push(marker);
    },
    setMapOnAll(map) {
      this.mapMarkers.forEach(m => m.setMap(map));
    },
    clearMarkers() {
      this.setMapOnAll(null);
    },
    showMarkers() {
      this.setMapOnAll(this.map);
    },
    deleteMarkers() {
      this.clearMarkers();
      this.mapMarkers = [];
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