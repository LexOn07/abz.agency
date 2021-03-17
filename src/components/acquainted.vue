<template>
<div class="acquainted">
    <h1>Let's get acquainted</h1>
    <div class="acquainted__content">
        <div class="acquainted__image">
            <img src="../assets/man-laptop.svg" alt="man-laptop">
        </div>
        <div class="acquainted__text">
            <h2>I am cool frontend developer</h2>
            <p class="acquainted__text-first">We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.</p>
            <p class="acquainted__text-last">If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.</p>
            <button class="acquainted__button flatButton">Sing up now</button> 
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'acquainted'
}
</script>

<style lang="scss" scoped>
.acquainted {
    &__content {
        display: flex;
    }
    &__image {
        @include grid-width(5, 12);
        display: flex;
        align-items: center;
        justify-content: center
    }
    &__text {
        @include grid-width(7, 12);
    }
    &__button{
        text-align: left;
        margin: 5px -5px;
    }
    background-color: $colorBackground;
    margin: 0 15px;
    margin-top: 147px;
    margin-right: -1px;
    margin-bottom: -10px;
    min-height: 580px;
}
h1 {
    text-align: center;
    margin-bottom: 47px;
}
img {
    width: 100%;
    padding-top: 5px;
    transform: scale(0.88, 0.88);
}
p{
    text-align: justify;
    text-align-last: left;
}
.acquainted__text-first {
    margin-bottom: 25px;
}
@media screen and (max-width: $mediaTable) {
    .acquainted{
        &__image{
            align-items: start;
            margin: 0;
            flex-basis: 40%
        }
        &__text {
            @include grid-width(4, 6);
        }
        &__text-last{
            word-spacing: -1px
        }
        margin-top: 108px;
        min-height: 552px;
    }
    img{
        padding-top: 13px;
        transform: scale(0.9, 0.9);
    }
}
@media screen and (max-width: $mediaMobile) {
    .acquainted {
        &__content{
            flex-direction: column;
        }
        &__text{
            margin: 0;
            margin-right: 15px;
        }
        &__button{
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            text-align: center;
        }
        margin-top: 70px;
        min-height: 795px;
    }
    h1{
        margin-bottom: 5px;
    }
    h2{
        margin-top: 15px;
    }
    p{
        word-spacing: -1px;
    }
    img{
        transform: scale(0.88, 0.88);
    }
    
}
</style>
