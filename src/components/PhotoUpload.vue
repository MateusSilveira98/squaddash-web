<template>
  <div class="photoUpload">
    <div class="image">
      <img :src="imgLink" :alt="alt">
    </div>
    <div class="caption">
      <label class="addImage" :disabled="disableButton">
        {{uploadButtonText}}
        <input
          type="file"
          accept="image/*"
          @change="onFileChange($event)"
          class="file"
          :disabled="disableButton"
        >
      </label>
      <a @click="removeImage()" class="removeImage">{{removeButtonText}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: "" },
    alt: { type: String, default: "photo" },
    uploadButtonText: { type: String, default: "Upload" },
    removeButtonText: { type: String, default: "Remove" },
    disableButton: { type: Boolean, default: false },
    noPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/mateus-costa/image/upload/v1556203484/wtt/sem-foto.jpg"
    }
  },
  data() {
    return {
      imgLink: ""
    };
  },
  watch: {
    src(value) {
      this.imgLink = value;
    }
  },
  methods: {
    onFileChange(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = e => {
        this.imgLink = e.target.result;
        this.$emit("upload", file, this.imgLink);
      };
      reader.readAsDataURL(file);
      document.getElementsByClassName("file")[0].value = "";
    },
    removeImage() {
      this.$emit("remove", "");
      this.imgLink = this.noPhoto;
      document.getElementsByClassName("file")[0].value = "";
    }
  },
  mounted() {
    this.imgLink = this.src ? this.src : this.noPhoto;
  }
};
</script>

<style lang='scss'>
.photoUpload {
  max-width: 25%;
  .image {
    margin-bottom: 10px;
    text-align: center;
    img {
      max-width: 100%;
      height: 200px;
    }
  }
  .file {
    display: none;
  }
  .caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .addImage,
  .removeImage {
    border-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    padding: 0.5em 1em;
    text-align: center;
    font-size: 1rem;
    &:active {
      font-size: 0.9rem;
    }
  }
  .addImage {
    background-color: #118fe4;
    color: #fff;
    position: relative;
    &:hover {
      background-color: #127bc0;
    }
    &:active {
      box-shadow: 0px 1px #0d0f0171;
    }
  }
  .removeImage {
    background-color: #e8e8e8;
    color: #363636;
    &:hover {
      background-color: #b9b9b9;
    }
    &:active {
      box-shadow: 0px 1px #0d0f0171;
    }
  }
}
@media all and (max-width: 480px) {
  .photoUpload {
    width: 100%;
  }
}
@media all and (max-width: 767px) {
  .photoUpload {
    max-width: 100%;
  }
}
</style>
