<template>
    <div class="module_bg">
    <v-card class="pa-5">
        <h1>Система охлаждения</h1>
        
        <v-checkbox 
            label="Расчёт в Вт?" 
            v-model="WatOpt"
            class="mt-2"
        />
        <v-text-field
            :disabled="Usli_self == false "
            type="number"
            outlined
            required
            clearable
            label="Количество узлов СХД (шт)"
            :rules="rule"
            hide-details="auto"
            v-model.number="Usli_shd"
            class="mt-2"
        />
        <v-checkbox 
            info
            hide-details
            label="Ввести вручную?" 
            v-model="Usli_self"
            class="mt-5"
        />
        
        
        <v-text-field
            type="number"
            outlined
            required
            clearable
            :label="WatOpt==true ? heatlabel2: heatlabel1"
            :rules="rule"
            hide-details="auto"
            v-model.number="Heat"
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Усреднённое тепловыделение в процентах"
            :rules="rule"
            hide-details="auto"
            v-model.number="K_sred"
            class="mt-5"
        />
        <v-checkbox 
            label="Использовать коммутаторы видеонаблюдения?" 
            v-on:change="komutat_Opt"
        />

        <div v-if="komutat_opt">
            <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Колличество коммутаторов ядра"
            :rules="rule"
            hide-details="auto"
            v-model.number="count_yadr"
        ></v-text-field>
        <br>
        <v-text-field
            type="number"
            outlined
            required
            clearable
            :label="WatOpt==true ? komutat_yadrlabel2: komutat_yadrlabel1"
            :rules="rule"
            hide-details="auto"
            v-model.number="komutat_yadr"
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Колличество коммутаторов доступа"
            :rules="rule"
            hide-details="auto"
            v-model.number="count_dost"
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            required
            clearable
            :label="WatOpt==true ? komutat_dostlabel2: komutat_dostlabel1"
            :rules="rule"
            hide-details="auto"
            v-model.number="komutat_dost"
            class="mt-5"
        />
    </div>
        <v-text-field
            type="number"
            outlined
            required
            clearable
            :label="WatOpt==true ? condition_label2: condition_label1"
            :rules="rule"
            hide-details="auto"
            v-model.number="condition"
        />
        <v-btn 
            @click="start" 
            color="primary"
            class="mt-5"
        >Старт</v-btn>

    </v-card>
    <v-card
        class="pa-5 mt-5"
        v-show="started"
    >
        <h2>Необходимое число кондиционеров: </h2>
        <p><strong>{{ final_result }} шт.</strong></p>
        <v-btn
          @click="started=false"
          class="mt-2"
        >скрыть</v-btn>
    </v-card>
    </div>
</template>

<script>
    export default {
        name: 'my-condition',
        data:() =>({
            started: false,
            final_result:0,
            komutat_opt: false,
            Usli_self: false,
            WatOpt: false,
            Usli_shd: '...',
            count_yadr:'...',
            count_dost:'...',
            Heat: '...',
            useWats: false,
            K_sred: '...',
            heatlabel2:'Максимальное тепловыделение от 1 узла (BTU/hr)',
            heatlabel1:'Максимальное тепловыделение от 1 узла (Bт)',
            rule: [
            value => !!value || 'Необходимо заполнить это поле.',
    ],                       //Правила для текстовых полей
            komutat_yadrlabel2:'Тепловыделение коммутатора ядра (BTU/hr)',
            komutat_yadrlabel1:'Тепловыделение коммутатора ядра (Bт)',
            komutat_yadr:'...',
            komutat_dostlabel2:'Тепловыделение коммутатора доступа (BTU/hr)',
            komutat_dostlabel1:'Тепловыделение коммутатора доступа (Bт)',
            komutat_dost:'...',
            condition:'...',
            condition_label2:'Мощность кондиционера (BTU/hr)',
            condition_label1:'Мощность кондиционера (Вт)',
        }),
        methods:{
            start(){
                this.started = true
                let result = 0;
                if(this.komutat_opt==false){
                    this.komutat_yadr = 0
                    this.komutat_dost = 0
                    this.count_yadr=0
                    this.count_dost=0
                }
                if(this.useWats==false){
                    result = (
                        (this.Heat*this.K_sred/100*this.Usli_shd)
                        /3.41 +this.komutat_klast/3.41
                        +(this.count_yadr*this.komutat_yadr+this.count_dost*this.komutat_dost)
                        /3.41
                        )
                    console.log('result', result)
                    console.log('Heat', this.Heat)
                    console.log('K_sred', this.K_sred)
                    console.log('Usli_shd', this.Usli_shd)
                    console.log('komutat_dost', this.komutat_dost)
                    console.log('komutat_opt', this.komutat_opt)
                    console.log('Condition', this.condition)
                    // console.log('Condition', result)
                    this.final_result= Math.ceil(result/this.condition)
                }else{
                    result = (
                        (this.Heat*this.K_sred/100*this.Usli_shd)
                        +this.komutat_klast+
                        (this.count_yadr*this.komutat_yadr+this.count_dost*this.komutat_dost)
                    )
                    console.log('result', result)
                    console.log('Heat', this.Heat)
                    console.log('K_sred', this.K_sred)
                    console.log('Usli_shd', this.Usli_shd)
                    console.log('komutat_dost', this.komutat_dost)
                    console.log('komutat_opt', this.komutat_opt)
                    console.log('Condition', this.condition)
                    this.final_result= Math.ceil(result/this.condition)
                }
            },
            getusli(){
                this.Usli_shd = localStorage.getItem('usli')
                console.log(this.Usli_shd)
                return this.Usli_shd
            },
            komutat_Opt(){
                
                if(this.komutat_opt==false){
                    this.komutat_opt = true
                }else{ this.komutat_opt = false}

                this.komutat_opt != this.komutat_opt
                if(this.komutat_opt==false){
                    this.komutat_yadr = 0
                    this.komutat_dost = 0
                    this.count_yadr=0
                    this.count_dost=0
                }else{
                    this.komutat_yadr = '...'
                    this.komutat_dost = '...'
                    this.count_yadr='...'
                    this.count_dost='...'
                } 
            },
        },
    }
</script>

<style>

</style>