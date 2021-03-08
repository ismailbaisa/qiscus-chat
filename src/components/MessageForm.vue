<template>
  <div class="sender">
    <form v-on:submit.prevent @submit="sendTextMessage">
      <div class="flex flex-ai-c flex-jc-sb" style="100%">
        <div>
          <input ref="uploading" type="file" hidden />
          <button class="upload-button" type="button" @click="Upload">
            Upload
          </button>
        </div>
        <div class="flex flex-ai-c flex-jc-c">
          <input
            type="text"
            placeholder="Type your message here"
            class="input-message"
            v-model="message"
          />
        </div>
        <div>
          <button class="send-button" type="submit">
            Send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Emitter from "@/services/emitter";

export default {
  name: "MessageForm",
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendTextMessage() {
      const vm = this;
      if (vm.message) {
        vm.qiscus
          .sendComment(vm.roomId, vm.message)
          .then(function(comment) {
            vm.message = "";
            Emitter.$emit("qiscus::new-message");
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    },
    Upload() {
      let fileInputElement = this.$refs.uploading;
      fileInputElement.click();
      console.log('still working on it')



    },
  },
};
</script>

<style></style>
