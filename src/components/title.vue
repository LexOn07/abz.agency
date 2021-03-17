<template>
<div class="title">
    <div class="title__content">
        <h1>Test assignment<br>for Frontend<br>Developer position</h1>
        <p>We kindly remind you that your test assignment should be submitted
            as a link to github/bitbucket repository. <span>Please be patient, we consider
            and respond to every application that meets minimum requirements.
            We look forward to your submission. Good luck! The photo has to scale
            in the banner area on the different screens</span></p>
        <button class="title__button">Sing up now</button>
    </div>
    <picture>
        <source media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)" srcset="../assets/banner@2x.webp" />
        <source media="(max-width: 770px) and (min-width: 460px)"  srcset="../assets/banner-table.webp" />
        <source media="(max-width: 480px)"  srcset="../assets/banner-mobile.webp" />
        <source srcset="../assets/banner.webp" />
        <img class="title__image" src="../assets/banner-old.jpg" alt="banner" />
    </picture>
</div>
</template>

<script>
export default {
    name: 'title',
}
</script>

<style lang="scss" scoped>
.title {
    margin-top: $nav-height;
    color: $colorTextTitle;
    &__image {
        width: none;
        height: 600px;
    }

    &__content {
        position: absolute;
        padding: 0 30px;
        padding-top: 75px;
    }

    &__button {
        margin-top: 18px;
    }
}
h1 {
    text-transform: uppercase;
    font-variant-ligatures: inherit;
    margin-bottom: 24px
}
p{
  padding-right: 215px;
}

@media screen and (min-width: 1028px) {
    .title__image {
        width: 100%;
    }
    p{
        padding-right: 615px;
    }
}

@media screen and (max-width: $mediaTable) {
    .title__image{
        height: 500px;
    }
    .title__content{
        padding-top: 32px;
    }
    h1{
        margin-bottom: 29px
    }
    p{
        padding-right: 215px;
    }    
}
@media screen and (max-width: 640px) {
    h1{
        margin-bottom: 10px
    }
    p{
        padding-right: 0px;
    }    
}
@media screen and (max-width: $mediaMobile) {
    .title {
        &__content{
          padding: 0 15px;
        }
        &__button{
          display: block;
          margin: 25px auto;
        }
        margin-top: calc(#{$nav-height} - 20px);
    }
    h1{
      text-align: center;
      margin-top: 70px;
      margin-bottom: 18px;
    }
    p{
      text-align: center;
      padding: 0;
    }
    span{
      display: none;
    }
}
</style>
