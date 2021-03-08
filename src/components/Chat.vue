<template>
  <div class="flex" :class="{ 'flex-ai-c flex-jc-e ': isAdmin }">
    <div class=" messages flex-ai-c flex-jc-c flex">
      <div v-if="isAdmin">
        <status :status="chatObject.status" />
      </div>
      <div class="messages-content">
        <p class="messages-dates">{{ dateFormat }}</p>
        <p v-if="chatObject.type === 'text'">
          {{ message }}
        </p>
        <a
          v-else-if="chatObject.type === 'file_attachment'"
          :href="chatObject.payload.url"
        >
          <img
            :src="chatObject.payload.url"
            alt="thumbnail"
            style="width: 200px;"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Status from "@/components/MessageStatus";
export default {
  name: "Chat",
  components: {
    Status,
  },
  props: {
    message: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    chatObject: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAdmin() {
      const userData = this.$store.state.userData;
      return userData.email === this.email;
    },
    dateFormat() {
      return new Date(this.time).toLocaleString();
    },
  },
};
</script>

<style></style>
