<template>
  <LoginView/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginView from './components/LoginView.vue'

@Options({
  components: {
    LoginView
  },
})
export default class App extends Vue {
  
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