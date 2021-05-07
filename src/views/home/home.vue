<!--
 * @Description:  home page
 * @Author: bjl
 * @Date: 2021-04-26 10:55:34
 * @LastEditTime: 2021-05-07 14:12:44
 * @LastEditors: bjl
-->

<template>
  <section class="bj-page">
    <h3>welcome!</h3>
    <figure class="img-wrap">
     <img src="@/assets/images/welcome.png" alt="">
    </figure>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .bj-page {
    height: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 28px;
      padding: 15px;
      color: #ffd04b;
    }
    .img-wrap {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    img {
      width: 450px;
    }
  }
  
</style>
