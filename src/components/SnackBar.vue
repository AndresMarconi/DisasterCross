<template>
    <div class="mySnackbar" v-show="$store.state.snackBar">
      <h3 role="alert">{{$store.state.snackText}}</h3>
    </div>
</template>

<script>
export default {
  name: "snackbar",
};
</script>

<style scoped>
  .mySnackbar{
    position: absolute;
    top: 10vh;
    left: 40vw;
    background-color: black;
    color: azure;
    min-width: 20vw;
    min-height: 8vh;
    border-radius: 5%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>