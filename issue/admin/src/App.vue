<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="less">
html{
  background:url(/image/bg12.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body{
  margin: 0;
  padding: 0;

    }
</style>