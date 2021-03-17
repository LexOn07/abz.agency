<template>
<div class="header">
    <div class="header__image ">
        <img src="../assets/logo.svg" alt="logo">
    </div>
    <div class="header__space "></div>
    <div class="header__link ">
        <a>About me</a>
        <a>Relationships</a>
        <a>Requirements</a>
        <a>Users</a>
        <a>Sign Up</a>
    </div>
</div>
</template>

<script>
export default {
    name: 'header'
}
</script>

<style lang="scss" scoped>
.header {
    &__image {
    @include grid-width(2, 12);
    margin-left: 30px;
    }
    &__space {
        @include rubber();
    }
    &__link {
        @include grid-width(6, 12);
        text-align: end;
    }
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    max-width: 1110px;
    width: 100%;
    height: $nav-height;
    padding: 0 30px;
    background-color: $colorBackgroundGrey;
    z-index: 999;
}
@media screen and (max-width: $mediaMobile) {
    .header {
        &__image{
            margin-left: 15px;
            margin-top: 7px;
        }
        height: calc(#{$nav-height} - 20px);
    }
    
}
</style>
