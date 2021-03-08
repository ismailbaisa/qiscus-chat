<template>
  <div style="height: 100%; position: relative">
    <top-navbar :is-main-frame="false" />
    <ul v-if="contactList.length > 0" class="list-chats">
      <li>
        <button
          class="button-group-2"
          @click="isShowGroupForm = true"
        >
          Create Group Chat
        </button>
      </li>
      <contact
        v-for="(contact, idx) in contactList"
        :key="idx"
        :username="contact.username"
        :userId="contact.email"
        :avatar="contact.avatar_url"
      />
      <li class="flex flex-ai-c flex-jc-c">
        <button class="button-load" @click="nextPage">
          {{ loadMoreText }}
        </button>
      </li>
    </ul>
    <form-group-chat v-if="isShowGroupForm">
      <button class="button-close"
        @click="isShowGroupForm = false"
      >
        x
      </button>
    </form-group-chat>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import Contact from "@/components/Contact.vue";
import FormGroupChat from "@/components/FormCreateGroupChat";

export default {
  name: "NewChat",
  components: {
    TopNavbar,
    Contact,
    FormGroupChat,
  },
  data() {
    return {
      perPage: 20,
      page: 1,
      contactList: [],
      loadMoreText: "Load more",
      isShowGroupForm: false,
    };
  },
  mounted() {
    this.loadContactList();
  },
  methods: {
    loadContactList() {
      const vm = this;
      vm.qiscus
        .getUsers("", vm.page, vm.limit)
        .then(function({ meta, users }) {
          vm.loadMoreText = "Load more";
          vm.contactList = [...vm.contactList, ...users];
        })
        .catch(function(error) {
          vm.loadMoreText = "Try again";
          console.error(error);
        });
    },
    nextPage() {
      this.page += 1;
      this.loadMoreText = "Loading..";
      this.loadContactList();
    },
  },
};
</script>

<style></style>
