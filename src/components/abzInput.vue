<template>
<div class="abz-input">
    <label>
        {{lable}}
        <input class="abz-input__input" type="text" v-if="type != 'file'" :placeholder="inputPlaceholder" @focus="focus = true" @blur="focus = false" :style="inputStyle" v-model.trim="value" />
        <input class="abz-input__file" type="file" accept=".jpg, .jpeg" id="file" v-if="type == 'file'" @change="selectFile" />
    </label>
    <label v-if="type == 'file'" for="file">
        <div class="abz-input__file-block" :style="inputStyle">
            <input type="text" class="abz-input__file-name" :placeholder="inputPlaceholder" v-model="value" :style="inputStyle[1]" />
            <div class="abz-input__button">Browse</div>
        </div>
    </label>
    <p class="abz-input__assistive" :style="assistiveStyle">{{assistiveText}}</p>
</div>
</template>

<script>
export default {
    name: 'abz-input',
    props: {
        type: String,
        textLable: String,
        textPlaceholder: String,
    },
    mounted() {
        this.$nextTick(() => {
            this.inputPlaceholder = this.constData.inputType[this.type].placeholder //    Установить
            this.lable = this.constData.inputType[this.type].lable                  //     надписи
            this.assistiveText = this.constData.inputType[this.type].assistiveText  //     из даты
            if (this.type != "phone") {
                this.assistiveStyle = this.constData.allStyle.errorAssistive // Установить всем кроме type phone стили для подсказок инпута
            }
        })
    },
    methods: {
        selectFile(e) { //Выбран файл
            if (e.target.files[0]) {
                this.isValid = false
                this.file = e.target.files[0]
                this.validImage(this.file)
                this.value = e.target.value
            }
        },
        validImage(inputFile) { //Валидация картинки
            let read = new FileReader()
            read.onload = (file) => {
                let img = new Image()
                img.onload = () => { //Если картинка не больше 70х70 и не больше 5 мегабайт
                    if (inputFile.type == "image/jpeg" && inputFile.size < 5242880 && img.height <= 70 && img.width <= 70) {
                        this.isValid = true
                        this.value = inputFile.name
                    }
                }
                img.src = file.target.result
            }
            read.readAsDataURL(inputFile)
        },
        inputError() { //Текст в инпуте не прошел валидацию
            this.inputStyle[1] = this.constData.allStyle.errorStyle[1]
            this.type != "phone" ? this.assistiveText = "Error" : null
        },
        inputSuccess() { //Валидация инпута прошла успешно
            this.inputStyle[1] = this.constData.allStyle.successStyle[1]
            this.assistiveText = ""
        },
        focusShadow() { //Тень при фокусе и вводе с ошибкой
            if (this.isValid && this.value != "") {
                this.inputStyle[0] = this.constData.allStyle.successStyle[0]
            } else if (!this.isValid && this.value != "") {
                this.inputStyle[0] = this.constData.allStyle.errorStyle[0]
            }
        },
        clearStyle() { //Установить стиль в дефолтное состояние(без тени и обводки)
            if (this.value == "") {
                this.inputStyle = []
                this.type != "phone" ? this.assistiveText = "" : null
            }
        },
        emitValid() {
            this.$emit('valid', { //Создает у родителя событие если валидация прошла успешно
                data: this.type == "file" ? this.file : this.value, //Если тип файл передать файл во всех остальных случаях передать значение инпута
                obj: this //Передает родителю ссылку на этот компонент
            })
        }
    },
    watch: {
        value() {
            if (this.type != "file") {
                this.isValid = this.constData.RegExpText[this.type].test(this.value) //Если type не file тогда пройти валидацию текста регулярками
            }
            if (this.isValid) {
                this.inputSuccess()
                this.emitValid()
            } else {
                this.inputError()
            }
            this.clearStyle()
            this.focusShadow()
        },
        focus() {
            if (this.focus) {
                this.focusShadow() //Если есть фокус на объекте установить тень
            } else {
                this.inputStyle[0] = ""
            }
        },
    },
    data() {
        return {
            /************************/
            /*******Константы********/
            /************************/
            constData: {
                allStyle: {
                    successStyle: ['box-shadow: 0px 0px 0px 3px rgba(128, 189, 255, 0.4);', 'border-color: rgba(128, 189, 255, 1);'],
                    errorStyle: ['box-shadow: 0px 0px 0px 3px rgba(200, 100, 70, 0.4);', 'border-color: rgba(200, 100, 70, 1);'],
                    errorAssistive: 'color: rgba(200, 100, 70, 1);'
                },
                RegExpText: {
                    phone: /^[\+]{0,1}380([0-9]{9})$/,
                    name: /^[A-Z]{1}[a-z ]{1,60}$/,
                    email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                    text: /$/ //Костыль для инпута abzInput type="text"
                },
                inputType: {
                    file: {
                        lable: "Photo",
                        placeholder: "Upload your photo"
                    },
                    email: {
                        lable: "Email",
                        placeholder: "Your email"
                    },
                    name: {
                        lable: "Name",
                        placeholder: "Your name"
                    },
                    phone: {
                        lable: "Phone number",
                        placeholder: "+380 XX XXX XX XX",
                        assistiveText: "Enter phone number in open format"
                    },
                    text: {
                        lable: this.textLable,
                        placeholder: this.textPlaceholder
                    }
                }
            },
            /************************/
            /***Переменные  инпута***/
            /************************/
            value: "",
            lable: "",
            file: "",
            focus: false,
            isValid: false,
            inputStyle: [],
            inputPlaceholder: "",
            assistiveText: "",
            assistiveStyle: "",
        }
    },
}
</script>

<style lang="scss" scoped>
.abz-input{
    &__file-name {
        height: 36px;
        width: 90%;
        border-radius: 5px 0px 0px 5px;
        border: none;
        border-right: solid;
        border-width: 1px;
        border-color: $colorInput;
        outline: none;
        font-family: 'PT Sans', 'Open Sans', sans-serif;
        font-size: 12pt;
        line-height: 40px;
        font-weight: 200;
        padding-left: 13px;
    }
    &__file {
        display: none;
    }
    &__button {
        background-color: $colorBackgroundGrey;
        outline: none;
        border-radius: 0px 5px 5px 0px;
        font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
        width: 20%;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__input {
        height: 34px;
        width: 100%;
        margin-right: 50px;
        margin-top: 10px;
        border: solid;
        border-radius: 4px;
        border-width: 1px;
        border-color: $colorInput;
        outline: none;
        font-family: 'PT Sans', 'Open Sans', sans-serif;
        letter-spacing: 1px;
        font-size: 11pt;
        padding-left: 12px;
    }
    &__assistive {
        font-family: 'PT Sans', 'Open Sans', sans-serif;
        letter-spacing: 0.1px;
        font-size: 13px;
        margin-top: 1px;
        margin-left: 2px;
    }
    &__file-block {
        display: flex;
        justify-content: baseline;
        margin-top: 7px;
        margin-right: -17px;
        border: solid;
        border-radius: 5px 5px 5px 5px;
        border-width: 1px;
        border-color: $colorInput;

    }
}
label {
    letter-spacing: -0.2px;
    font-family: 'PT Sans', 'Open Sans', sans-serif;
    font-size: 16px;
}
@media screen and (max-width: $mediaTable) {
    .abz-input__assistive {
        font-size: 12px;
        margin-left: 0px;
    }
}
</style>
