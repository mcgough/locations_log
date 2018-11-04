<script>
import GoogleMapsKey from './../keys';

export default {
  name: 'google-map',
  components: {},
  props: {
    locations: { type: Array, default: () => [{ coords: { lat: 0, lng: 0 }}] },
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
      if (!arr) return;
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
          center: this.locations.length
            ? this.locations.coords
            : { lat: 0, lng: 0 },
        }
      )
      if (this.locations) {
        this.locations.forEach(this.addMarker);
      }
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
    goToLocation({ coords }) {
      this.map.setCenter(coords);
      this.map.setZoom(8);
    },
    addClickEvent() {
      this.map.addListener('click', (e) => {
        const coords = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        console.log(coords);
      });
    },
    removeClickEvent() {
      google.maps.event.clearListeners(this.map, 'click');
    },
    async loadScript() {
      return new Promise((resolve, reject) => {
        const scripts = document.querySelector('script[title="Google Map"]');
        console.log(scripts);
        if (scripts && scripts.length) resolve(true);
        const script = document.createElement("script");
        window.mapLoaded = () => {
          console.log('map script loaded');
          return resolve(true);
        }
        script.async = true;
        script.defer = true;
        script.title = 'Google Map'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapsKey}&callback=mapLoaded`;
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