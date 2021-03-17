<template>
<div class="card">
    <img class="card__avatar" width="70" height="70" src="../assets/photo-cover.webp" :srcset="avatar" onerror="this.srcset = this.src" alt="Photo" loading="lazy" />
    <h2 class="card__text-name" @mousemove="emitTooltip" @mouseleave="$emit('textOver')">{{name}}</h2>
    <p class="card__text-position">{{position}}</p>
    <p class="card__text-email" @mousemove="emitTooltip" @mouseleave="$emit('textOver')">{{email}}</p>
    <p class="card__text-phone">{{phone}}</p>
</div>
</template>

<script>
export default {
    name: 'card',
    props: {
        name: String,
        position: String,
        email: String,
        phone: String,
        avatar: String
    },
    methods: {
        emitTooltip(e) {//эмитим положение мышки при движении на обектах у которых сработал text-overflow
            if (e.target.scrollWidth > 216) {
                this.$emit('tooltip', {
                    X: e.pageX,
                    Y: e.pageY,
                    text: e.target.className == "card__text-email" ? this.email : this.name
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 216px;
    margin: 0 auto;
    margin-bottom: 40px;
}

.card:nth-child(2n+3) {
    margin: 0 calc(100% /2 - 395px);
}

.card__avatar {
    overflow: hidden;
    border-radius: 50px;
    width: 70px;
    height: 70px;
    margin-bottom: -5px;
}

.card__text-name {
    display: block;
    margin-bottom: -8px;
    width: 100%;
    flex-grow: 1;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
}

.card__text-position {
    margin-bottom: -20px;
    flex-grow: 1;
    text-align: center;
}

.card__text-email {
    display: block;
    width: 100%;
    margin-bottom: -12px;
    flex-grow: 1;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.card__text-phone {
    flex-grow: 1;
    text-align: center;
}
@media screen and (max-width: $mediaMobile) {
    .card{
        margin: 0 auto;
        &:nth-child(2n+3) {
            margin: 0 auto
        }
    }
}
</style>
