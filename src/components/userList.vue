<template>
<div class="user-list">
    <h1>Our cheerful users</h1>
    <p @click="a">Attention! Sorting users by registration date</p>
    <div class="user-list__block">
        <div v-for="(item, i) in cardList" :key="i" class="user-list__card">
            <card :style="tooltip == true ? 'cursor: pointer' : null" :name="item.name" :position="item.position" :email="item.email" :phone="spacePhone(item.phone)" :avatar="item.photo" @tooltip="showTooltip" @textOver="tooltip = false">{{item}}</card>
        </div>
        <button v-show="!showAll" @click="moreUsers" class="user-list__button">Show more</button>
    </div>
    <span ref="tooltip" v-show="tooltip" class="user-list__tooltip">{{tooltipText}}</span>
</div>
</template>

<script>
import card from './card.vue'

export default {
    name: 'userList',
    components: {
        card,
    },
    props: {
        updateList: Boolean
    },
    data() {
        return {
            url: "https://frontend-test-assignment-api.abz.agency/api/v1/users?",
            cardList: [],
            showAll: false,
            tooltip: false,
            tooltipText: ""
        }
    },
    methods: {
        async getUser(all, num, link) { //Получить юзеров в список. num - по сколько юзеров принимать, all - прийнять всех 
            try {
                const response = await fetch(link == null ? this.url + "page=" + 1 + "&count=" + num : link)
                const result = await response.json()
                this.cardList.push(...result.users)
                if (all && result.links.next_url != null) { //next_url - ссылка которую передает сервер на следующие num человек
                    this.getUser(true, 20, result.links.next_url)
                }
            } catch (err) {
                console.error("Somthen wrong: " + err)
            }
        },
        showTooltip(data) {
            this.tooltipText = data.text
            this.tooltip = true //показать tooltip
            this.$refs.tooltip.style.left = data.X + -80 + "px" //**координаты мышки**//
            this.$refs.tooltip.style.top = data.Y + 30 + "px" //**присвоить tooltip**//
        },
        moreUsers() { //Показать весь список юзеров и скрыть кнопку
            this.cardList = []
            this.getUser(true, 20)
            this.showAll = true
        },
        spacePhone(text) { //Сделать отступы у номера телефона юзера
            return text.substring(0, 4) + " " + text.substring(4, 6) + " " + text.substring(6, 9) + " " + text.substring(9, 11) + " " + text.substring(11, 13)
        },
        clearList() {
            this.cardList = []
            this.getUser(false, 6) //Дефолтное значение юзеров
            this.showAll = false
        }
    },
    mounted() {
        this.clearList() //Показать первых юзеров
    },
    watch: {
        updateList() { //Обновляет юзер лист и устанавливает в дефолтное состояние если зарегестрировался новый пользователь
            if (this.updateList == true) {
                this.$emit("updateSuccess") //Вызывает в родителе событие на сброс флага 
                this.clearList()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user-list {
    &__card {
        @include grid-width(4, 12);
    }
    &__tooltip {
        position: absolute;
        color: #fff;
        background-color: #000;
        border-radius: 5px;
        padding: 5px 10px;
        font-family: 'Open Sans', sans-serif;
        font-size: 13px;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.3);
        opacity: 0.8;
    }
    background-color: $colorBackgroundGrey;
    min-height: 1105px;
    max-width: 1170px;
    padding-left: 15px;
    padding-top: 118px;
    .user-list__block {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
}
h1, p {
    text-align: center;
}

h1 {
    margin-bottom: -2px;
}

p {
    margin-bottom: 78px;
}
@media screen and (max-width: $mediaTable) {
    .user-list{
        &__card{
          @include grid-width(2, 6);
          margin: 0;
        }
        &__card:nth-child(3n+2){
          margin: 0 auto;
        }
        &__card:nth-child(3n+1){
          margin-left: 16px;
        }
        &__card:nth-child(3n+3){
          margin-right: 14px;
        }
        &__block{
          margin-top: -2px;
        }
        &__button{
            margin: 30px 0;
        }
        min-height: 942px;
        padding-top: 87px;
    }
    p{
      margin-top: 20px;
    }
}
@media screen and (max-width: 740px) {
    .user-list{
        &__card:nth-child(3n+2){
            margin: 0 auto;
        }
        &__card:nth-child(3n+1){
            margin: 0 auto;
        }
        &__card:nth-child(3n+3){
            margin: 0 auto;
        }
        &__block{
            flex-direction: column;
            align-items: center;
        }
    }    
}
@media screen and (max-width: $mediaMobile) {
    .user-list{
        &__card{
            margin: 56px auto;
        }
        &__card:nth-child(3n+2){
            margin: 46px auto;
        }
        &__card:nth-child(3n+1){
            margin: 0 auto;
        }
        &__card:nth-child(3n+3){
            margin: 0 auto;
        }
        margin-bottom: 150px;
        padding-top: 56px; 
    }
    h1{
        letter-spacing: 0px;
    }
    p{
        margin-top: 10px;
        margin-bottom: 40px;
    }
}
</style>
