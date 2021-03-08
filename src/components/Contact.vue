<template>
<li class="flex contacts" @click="createOnetoOneRoom">
    <div class="flex-1">
        <img loading="lazy" :src="avatar" class="contact-avatar" />
    </div>
    <div class="flex-6">
        <p>
            {{ username }} <br />
            <span v-if="isCreatingRoom">
                creating..
            </span>
        </p>
    </div>
</li>
</template>

<script>
export default {
    name: "Contact",
    props: {
        username: {
            type: String,
            default: "username",
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            default: "onetoone",
        },
    },
    data() {
        return {
            isCreatingRoom: false,
        };
    },
    methods: {
        createOnetoOneRoom() {
            const vm = this;
            if (vm.mode === "onetoone") {
                vm.isCreatingRoom = true;
                vm.qiscus
                    .chatTarget(vm.userId)
                    .then(function (room) {
                        vm.isCreatingRoom = false;
                        vm.$router.push(`/room?roomId=${room.id}&title=${room.name}`);
                    })
                    .catch(function (error) {
                        vm.isCreatingRoom = false;
                        console.error("error create room: ", error);
                    });
            }
        },
    },
};
</script>
