<template>
<li class="room flex flex-ai-c">
    <router-link tag="div" class="flex-1" :to="`/info?roomInfo=${roomId}`">
        <img loading="lazy" :src="roomAvatar" class="contact-avatar">
    </router-link>
    <router-link tag="div" :to="`/room?roomId=${roomId}&title=${roomTitle}`" class="flex flex-jc-sb flex-6">
        <div class="room-content">
            <p>
                {{ roomTitle }}
            </p>
            <p>
                {{ lastMessageFormated }}
            </p>
        </div>
        <div class="flex flex-ai-c flex-jc-sb flex-fd-c">
            <p class="room-date">
                {{ lastDateFormated }}
            </p>
            <div v-if="notif > 0" class="room-notif flex flex-ai-c flex-jc-c">
                <p>
                    {{ notif }}
                </p>
            </div>
        </div>
    </router-link>

</li>
</template>

<script>
export default {
    name: 'Room',
    props: {
        roomTitle: {
            type: String,
            default: 'Title',
            required: false
        },
        lastMessage: {
            type: String,
            default: 'last message',
            required: false
        },
        roomId: {
            type: Number,
            required: true
        },
        roomAvatar: {
            type: String,
            required: false
        },
        lastDate: {
            type: String,
            default: '1/1/1990',
            required: false
        },
        notif: {
            type: Number,
            default: 0
        }
    },
    computed: {
        lastDateFormated() {
            const today = new Date().toLocaleDateString()
            const theDate = new Date(this.lastDate).toLocaleDateString()
            if (today === theDate) {
                return new Date(this.lastDate).toLocaleTimeString()
            } else {
                return new Date(this.lastDate).toLocaleDateString()
            }
        },
        lastMessageFormated() {
            if (this.lastMessage.includes('[file]')) {
                return 'file'
            } else {
                return this.lastMessage
            }
        }
    }
}
</script>

<style>

</style>
