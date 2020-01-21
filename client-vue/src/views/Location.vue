<script>
import { LOCATION_QUERY } from "@/graphql/queries";
import { MULTIPLE_UPLOAD } from "@/graphql/mutations";
import GoogleMap from "@/components/Map.vue";
import ImageInput from "@/components/ImageInput.vue";
import CloudinaryImage from "@/components/CLImage.vue";

export default {
  components: { GoogleMap, ImageInput, CloudinaryImage },
  data: () => ({
    location: null
  }),
  apollo: {
    location: {
      query: LOCATION_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  methods: {
    async handleFilesAdded(fileList) {
      const variables = { id: this.location.id, files: fileList };
      await this.$apollo.mutate({
        variables,
        mutation: MULTIPLE_UPLOAD,
        update: async (store, { data }) => {
          const query = store.readQuery({
            query: LOCATION_QUERY,
            variables: { id: this.location.id }
          });
          query.location.images = [
            ...this.location.images,
            ...data.multipleUpload.images
          ];
          console.log(query);
        }
      });
    }
  },
  render() {
    return (
      <div>
        <h1>{this.$route.params.name}</h1>
        {!this.location ? null : (
          <div>
            <p>{this.location.description}</p>
            <div class="location-map">
              <google-map locations={[this.location]} />
            </div>
            <image-input onFilesAdded={this.handleFilesAdded} />
            {this.location.images.map(img => (
              <cloudinary-image
                style={{
                  height: "200px",
                  width: "200px"
                }}
                public_id={img}
                lazy-load
              />
            ))}
          </div>
        )}
      </div>
    );
  }
};
</script>

<style scoped>
.location-map {
  width: 20vw;
  height: 20vh;
}
</style>


