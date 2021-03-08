import QiscusSDK from 'qiscus-sdk-core'
import Emitter from './emitter';
const qiscus = new QiscusSDK();
qiscus.init({
  AppId: 'sdksample',
  options: {
    loginSuccessCallback: function(authData) {
      Emitter.$emit('qiscus::login-success', authData)
    },
    loginErrorCallback: function(errorData) {
      Emitter.$emit('qiscus::login-error', errorData)
    },
    newMessagesCallback: function(messages) {
      messages.forEach(function(it) {
        Emitter.$emit('qiscus::new-message', it)
      })
    },
    groupRoomCreatedCallback(data) {},
  },
  mode: 'wide', // widget | wide
});

if (localStorage.getItem('authData')) {
  const userData = JSON.parse(localStorage.getItem('authData'));
  qiscus.setUserWithIdentityToken({ user: userData });
}

export default qiscus