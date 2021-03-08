<template>
  <div style="height: 100%">
    <top-navbar />
    <ul v-if="roomList.length > 0" class="list-chats">
      <room
        v-for="(room, index) in roomList"
        :key="index"
        :room-id="room.id"
        :room-title="room.name"
        :room-avatar="room.avatar"
        :last-message="room.last_comment_message"
        :last-date="room.last_comment_message_created_at"
        :notif="room.count_notif"
      />
      <li v-if="roomList.length >= perPage" class="flex flex-ai-c flex-jc-c">
        <button class="button-load" @click="nextPage">
          {{ loadMoreText }}
        </button>
      </li>
    </ul>
    <div
      v-else
      class="flex flex-ai-c flex-jc-c"
      style="height: 100%; text-align: center;"
    >
      <div v-if="!isLoading">
        <h1>
          No Chat
        </h1>
        <router-link to="/new" tag="button" class="button-loading">
          Start Chatting
        </router-link>
      </div>
      <div v-else>
        <h1>
          Loading..
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import TopNavbar from "@/components/TopNavbar.vue";
import Room from "@/components/Room";
import Emitter from "@/services/emitter";
import debounce from "lodash.debounce";

export default {
  name: "DashboardListRoom",
  components: {
    TopNavbar,
    Room,
  },
  data() {
    return {
      perPage: 20,
      page: 1,
      roomList: [],
      loadMoreText: "Load more",
      isLoading: true,
      isLoadMore: false,
    };
  },
  mounted() {
    const vm = this;
    vm.isLoading = true;
    setTimeout(() => {
      vm.loadRooms();
      vm.isLoading = false;
    }, 1000 * 1.5);
    Emitter.$on("qiscus::new-message", (payload) => {
      vm.loadRooms();
    });
  },
  beforeDestroy() {
    Emitter.$off("qiscus::new-message");
  },
  methods: {
    loadRooms: debounce(function() {
      const vm = this;
      vm.loadMoreText = "Loading..";
      vm.qiscus
        .loadRoomList({
          page: vm.page,
          limit: vm.perPage,
          show_empty: false,
        })
        .then((room) => {
          vm.loadMoreText = "Load more";
          if (vm.isLoadMore) {
            vm.roomList = [...vm.roomList, ...room];
          } else {
            vm.roomList = room;
          }
          vm.isLoadMore = false;
        })
        .catch((err) => {
          vm.loadMoreText = "Failed, try again";
          console.error(err);
        });
    }, 400),
    nextPage() {
      this.isLoadMore = true;
      this.page += 1;
      this.loadRooms();
    },
  },
};
</script>
