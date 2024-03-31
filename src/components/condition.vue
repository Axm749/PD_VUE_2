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
            :label="WatOpt===true ? heatlabel1: heatlabel2"
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
            class="mt-5"
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
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            required
            clearable
            :label="WatOpt===true ? komutat_yadrlabel1: komutat_yadrlabel2"
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
            :label="WatOpt===true ? komutat_dostlabel1: komutat_dostlabel2"
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
            :label="WatOpt==true ? condition_label1: condition_label2"
            :rules="rule"
            hide-details="auto"
            v-model.number="condition"
            class="mt-2"
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
            started: false,         // вывод результатов расчета (показывать или нет)

            final_result:0,         // количество кондиционеров

            komutat_opt: false,     // опция учета дополнительных коммутаторов
            Usli_self: false,       // дать ли пользователю вводить число узлов СХД
            Usli_shd: '...',        // число узлов СХД

            
            
            

            // useWats: false,
            K_sred: '...',          // Усреднённое тепловыделение в процентах (0-100)

            WatOpt: true,           // использование ваттов как единиц измерения
            // все текстовые приписки к соответствующим полям ввода в зависимости от единиц измерения
            heatlabel2:'Максимальное тепловыделение от 1 узла (BTU/hr)',
            heatlabel1:'Максимальное тепловыделение от 1 узла (Bт)',
            Heat: '...',            // тепловыделение одного узла

            komutat_yadrlabel2:'Тепловыделение коммутатора ядра (BTU/hr)',
            komutat_yadrlabel1:'Тепловыделение коммутатора ядра (Bт)',
            komutat_yadr:'...',     // Тепловыделение коммутатора ядра
            count_yadr:'...',       // Количество коммутаторов ядра

            komutat_dostlabel2:'Тепловыделение коммутатора доступа (BTU/hr)',
            komutat_dostlabel1:'Тепловыделение коммутатора доступа (Bт)',
            komutat_dost:'...',     // Тепловыделение коммутатора доступа
            count_dost:'...',       // Количество коммутаторов доступа

            condition_label2:'Мощность кондиционера (BTU/hr)',
            condition_label1:'Мощность кондиционера (Вт)',
            condition:'...',        // Мощность кондиционера


            rule: [
                value => !!value || 'Необходимо заполнить это поле.',
                ],                  //Правила для текстовых полей
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
                    this.komutat_klast=0
                }

                console.log(this.WatOpt)
                if(this.WatOpt==false){

                    result = (
                        (this.Heat*this.K_sred/100*this.Usli_shd)/3.41 
                        // +this.komutat_klast/3.41
                        +(this.count_yadr*this.komutat_yadr+this.count_dost*this.komutat_dost)/3.41
                        )
                    console.log('result', result)
                    console.log('Heat', this.Heat)
                    console.log('K_sred', this.K_sred)
                    console.log('Usli_shd', this.Usli_shd)
                    console.log('komutat_dost', this.komutat_dost)
                    console.log('komutat_opt', this.komutat_opt)
                    console.log('Condition', this.condition)
                    this.final_result= Math.ceil(result/(this.condition/3.41))
                }else{


                    
                    result = (this.Heat * (this.K_sred/100) * this.Usli_shd)

                    // result += this.komutat_klast

                    result += this.count_yadr * this.komutat_yadr + this.count_dost * this.komutat_dost


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