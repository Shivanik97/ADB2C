<template>
  <button v-if="isLoggedIn" @click="logOut">Log Out</button>
  <button v-else @click="logIn">Log In</button>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import {msalInstance}from "./services/msal";
import {AuthError} from "@azure/msal-browser";
@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  isLoggedIn = false;
  async logIn() {
    try {
      await msalInstance.loginPopup();
      this.isLoggedIn = true;
    } catch (err) {
      const authErr = err as AuthError;
      if (authErr) {
        if (authErr.errorCode == "user_cancelled") {
          return;
        }
      }
      console.error({err});
    }
  }
  async logOut() {
    await msalInstance.logoutPopup();
    this.isLoggedIn = false;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>