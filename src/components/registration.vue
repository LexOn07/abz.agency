<template>
<form class="registration">
    <h1 @click="a">Register to get a work</h1>
    <p>Attention! After successful registration and alert, update the<br>list of users in the block from the top</p>
    <div class="registration__block">
        <abzInput v-for="(block, idx) in abzInput.length - 1" :key="idx" :type="abzInput[idx].type" @valid="addValidData" class="registration__input" />
        <div class="registration__position-block">
            <span class="registration__position-title">Select your position</span>
            <br>
            <div class="registration__position" v-for="(item, i) in positionList.positions" :key="i"><input :id="i + '_radio'" type="radio" name="position" @click="positionInput = item.id" :value="item.id" /><label :for="i + '_radio'" class="registration__position-span">
                    <div class="registration__position-image"></div>{{item.name}}
                </label></div>
        </div>
        <abzInput :type="abzInput[3].type" @valid="addValidData" class="registration__input" />
        <div class="registration__button-block"><button type="button" @click="postData" :disabled="allDataValid ? null : 'disabled'" class="registration__button">Sing up now</button></div>
    </div>
</form>
</template>

<script>
import abzInput from './abzInput.vue'

export default {
    name: 'registration',
    components: {
        abzInput,
    },
    methods: {
        async postData() {
            let data = new FormData()
            if (this.allDataValid && this.positionInput !== "") {
                this.abzInput.forEach(element => {
                    if (element.type == "file") {
                        data.append('photo', element.validData)
                    } else {
                        data.append(element.type, element.validData)
                    }
                });
                data.append('position_id', 3) //отключено для тестов
                try {
                    const result = await fetch(this.urlPost, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Token': this.token
                        }
                    })
                    await this.$emit("singUpClick")
                    if(result.status == 201){
                        await alert("У нас всё получилось! Посмотри выше!")
                    }else{
                        await alert("Что то пошло не так! Попробуй еще разок!")
                    }
                } catch (err) {
                    console.error('Error: ', err);
                }
            }
        },
        addValidData(e) {
            this.abzInput.find(input => input.type == e.obj.type).validData = e.data
            this.allDataValid = !this.abzInput.some(element => {
                return element.validData == ""
            })
        }
    },
    data() {
        return {
            urlPositions: "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
            urlToken: "https://frontend-test-assignment-api.abz.agency/api/v1/token",
            urlPost: "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            token: "",
            positionList: {},
            positionInput: 0,
            allDataValid: false,
            abzInput: [{
                    id: 0,
                    type: "name",
                    validData: ""
                },
                {
                    id: 1,
                    type: "email",
                    validData: ""
                },
                {
                    id: 2,
                    type: "phone",
                    validData: ""
                },
                {
                    id: 3,
                    type: "file",
                    validData: ""
                }
            ]

        }
    },
    async mounted() {
        try {
            const responsePosition = await fetch(this.urlPositions)
            this.positionList = await responsePosition.json()
            const responseToken = await fetch(this.urlToken)
            const result = await responseToken.json()
            this.token = result.token
        } catch(err) {
            console.error('Error: ', err);
        }
    }
}
</script>

<style lang="scss" scoped>
.registration {   
    &__input {
        margin: 0 25%;
        margin-bottom: -6px;
        min-height: 96px;
    }
    &__position-title {
        display: inline-block;
        margin: 0 25%;
        margin-top: 25px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
    }
    &__position {
        margin: 11px 25%;
        font-size: 14px;
    }

    &__position-span {
        margin-left: 8px;
        letter-spacing: 0.3px;
    }

    &__position-image {
        float: left;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-image: url("../assets/radio.webp");
        background-size: cover;
        background-repeat: no-repeat;
    }
    &__position-block {

        margin-bottom: 20px;
    }
    &__block {
        @include grid-width(4, 6);
        margin: 0;
        margin-right: 15px;
    }
    &__button {
        display: block;
        margin: 18px auto;
    }
    &__button-block {
        padding-left: 15px;
    }
        background-color: $colorBackground;
        min-height: 1105px;
        max-width: 1170px;
    &__position-radio {
        display: inline-block;
        width: 100%;
        margin-right: 8px;
        margin-top: 2px;
    }    
}
h1 {
    text-align: center;
    margin-top: 30px;
    font-size: 51px;
}
p {
    text-align: center;
    margin-top: -14px;
    margin-bottom: 26px;
}
input {
    display: none;
}
input:checked+label div {
    background-image: url("../assets/radio__check.webp");
    background-size: cover;
    background-repeat: no-repeat;
}

input+label div:hover {
    background-color: rgba(200, 200, 200, 0.6);
    background-blend-mode: multiply;
    cursor: pointer;
}


@media screen and (max-width: $mediaTable) {
    .registration{
        &__input{
          margin: 0 10%;
          margin-bottom: -6px;
          margin-left: 132px;
        }
        &__position-block{
          width: 200px;
          margin-left: 132px;
          margin-bottom: 19px;
        }
        &__position-title{
          margin: 0;
          margin-top: 23px;
          margin-bottom: 10px;
        }
        &__position{
          margin: 11px 0;
        }
        &__button-block{
          margin-left: -15px;
        }
        &__block{
          margin: 0;
        }
        margin-top: 110px;
    }
    h1 {
        font-size: 41px;
    }
    p {
        margin-top: -8px;
    }
}
@media screen and (max-width: $mediaMobile) {
    .registration{
        &__input{
            margin: 1px 10px;
        }        
        &__position-block{
          margin-left: 15px;
        }
        padding-right: 15px;
    }
    h1{
        font-size: 31px;
        margin-top: 190px;
    }
    p{
        font-size: 16px;
        margin-bottom: 30px;
    }
}
</style>
