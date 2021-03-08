<template>
<div class="list-chats">
    <ul>
        <li v-for="(chat, idx) in listMessage" :key="idx">
            <chat :message="chat.message" :email="chat.username_real" :time="chat.timestamp" :chat-object="chat" />
        </li>
    </ul>
</div>
</template>

<script>
import Chat from '@/components/Chat.vue'

export default {
    name: 'ListChat',
    components: {
        Chat
    },
    props: {
        listMessage: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style>

</style>
