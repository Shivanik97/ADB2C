<template>
  <div v-if="isLoggedIn">
    <button @click="logOut">Log Out</button>
    <p>Welcome, {{ username }}</p>
  </div>
  <div v-else @click="logIn">
    <button>Log In</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { msalInstance } from "../services/msal";
import { AuthError } from "@azure/msal-browser";
@Options({
  components: {
  },
})
export default class App extends Vue {
  isLoggedIn = false;
  username = "";

  async logIn() {
    try {
      msalInstance.loginPopup().then(response => {
        this.isLoggedIn = true; // Set authenticated flag to true
        this.username = response.account.username;
        // Set username to the logged-in user's username
      })
    } catch (err) {
      const authErr = err as AuthError;
      if (authErr) {
        if (authErr.errorCode == "user_cancelled") {
          return;
        }
      }
      console.error({ err });
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