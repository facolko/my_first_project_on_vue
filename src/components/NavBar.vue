<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar_btns">
      <my-button @click="$router.push('/Posts')">Посты</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/About')"
        >О сайте</my-button
      >
      <my-button style="margin-left: 20px" @click="$router.push('/Store')"
        >Store</my-button
      >
      <my-button style="margin-left: 20px" @click="$router.push('/Composition')"
        >Composition</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightblue;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar_btns {
  margin-left: auto;
}
</style>
