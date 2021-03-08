<template>
<div class="login flex flex-jc-c flex-ai-c" :class="bghover">
    <div class="nobody" v-if="!bghover">
        ?
    </div>
    <div class="login__content flex flex-jc-c flex-ai-c flex-fd-c">
        <h1>
            {{full}}
        </h1>
        <h2 :style="'color:'+ color">LET'S CHAT!</h2>
        <div class="login__buttons flex flex-fd-c flex-ac-e">
            <button @click="login('Donald', 'Duck', 'Donald Duck')" @mouseover="changeBg('donald', 'Donald Duck')">
                Login as Donald
            </button>
            <button @click="login('Mickey', 'Mouse', 'Mickey Mouse')" @mouseover="changeBg('mickey', 'Mickey Mouse')">
                Login as Mickey
            </button>
            <button @click="login('Goofy', 'Goof', 'Goofy Goof')" @mouseover="changeBg('goofy', 'Goofy Goof')">
                Login as Goofy
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'GetStarted',
    data() {
        return {
            loading: false,
            bghover: '',
            full: 'Hello there.',
            color: 'black',
        }
    },
    beforeCreate() {
        this.$store.dispatch('setPageName', 'Chats')
    },
    methods: {
        login(id, pass, username) {
            const vm = this;
            vm.qiscus.setUser(id, pass, username)
            // vm.qiscus.setUser('guest-101', 'passkey', 'guest-101')
                .then(function () {
                    const userData = vm.qiscus.userData
                    vm.loginButtonText = 'Success'
                    localStorage.setItem('authData', JSON.stringify(userData))
                    vm.$store.dispatch('setLogin', true)
                    vm.$store.dispatch('setUserData', userData)
                    vm.$router.push('/dashboard')
                })
                .catch(function (error) {
                    console.error(error);
                })
        },
        changeBg(nick, full) {
            const vm = this;
            vm.bghover = nick;
            vm.full = full;
            vm.color = 'white';
        }

    }
}
</script>
