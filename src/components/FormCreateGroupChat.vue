<template>
  <div class="flex flex-ai-c flex-jc-sb flex-fd-c">
    <div class="group-dialog flex flex-ai-c flex-jc-c flex-fd-c">
      <slot></slot>
      <form
        class="form-group flex flex-ai-c flex-jc-sb"
        v-on:submit.prevent
        @submit="createGroupRoom"
      >
        <input
          type="text"
          placeholder="Group Name"
          name="roomName"
          v-model="roomName"
        />
        <button class="button-group">
          {{ buttonTextCreateGroup }}
        </button>
      </form>

      <ul class="group-list">
        <div
          class="groupies"
          v-for="(contact, idx) in contactList"
          :key="idx"
          @click="addUserId(contact.email)"
        >
          <contact
            :class="{ 'user-picked': selectedUserId.includes(contact.email) }"
            :username="contact.username"
            :userId="contact.email"
            :avatar="contact.avatar_url"
            mode="no"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Contact from "@/components/Contact.vue";

export default {
  name: "FormGroupChat",
  components: {
    Contact,
  },
  data() {
    return {
      roomName: null,
      contactList: [],
      selectedUserId: [],
      buttonTextCreateGroup: "Done",
    };
  },
  mounted() {
    this.loadContactList();
  },
  methods: {
    addUserId(userid) {
      if (!this.selectedUserId.includes(userid)) {
        this.selectedUserId.push(userid);
      } else {
        this.selectedUserId = this.selectedUserId.filter((v) => v !== userid);
      }
    },
    createGroupRoom() {
      const vm = this;
      vm.buttonTextCreateGroup = "Creating Group..";
      vm.qiscus
        .createGroupRoom(vm.roomName.trim(), vm.selectedUserId, {
          avatarURL:
            "https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png",
        })
        .then((room) => {
          vm.buttonTextCreateGroup = "Create Group";
          vm.$router.push(`/room?roomId=${room.id}&title=${room.name}`);
        })
        .catch((error) => {
          vm.buttonTextCreateGroup = "Try Again";
          console.error(error);
        });
    },
    loadContactList() {
      const vm = this;
      vm.qiscus
        .getUsers("", 1, 100)
        .then(function({ meta, users }) {
          vm.contactList = users;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.h-modal {
  height: 70vh;
}</style
>>
