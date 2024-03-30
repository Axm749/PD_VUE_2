<template>
    <div class="module_bg">
    <v-card class="pa-5">
        <h1>Электропитание</h1>

        
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Напряжение аккумуляторных батарей (В)"
            :rules="rule"
            hide-details="auto"
            v-model.number="voultage"
            class="mt-5"
        />
        
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="Емкость аккумуляторной батареи (А/ч)"
            :rules="rule"
            hide-details="auto"
            v-model.number="capacity"
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            clearable
            required
            label="Кол-во аккумуляторных батарей в цепи (шт.)"
            :rules="rule"
            hide-details="auto"
            v-model.number="batteries"
            class="mt-5"
        />
        <v-text-field
            type="number"
            outlined
            required
            clearable
            label="КПД преобразователя в долях (0,8 - 1,0)"
            :rules="rule"
            hide-details="auto"
            v-model.number="kpd"
            class="mt-5"
        />
        <v-text-field
            type="number"
            :disabled="self === false "
            outlined
            clearable
            label="Макс. суммарная мощность нагрузой (Вт)"
            :rules="rule"
            hide-details="auto"
            v-model.number="power"
            class="mt-5"
        />
        <v-checkbox 
            info
            hide-details
            label="Ввести вручную?" 
            v-model="self"
            class="mt-5"
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
        <h2>Время работы устройства:</h2>
        <p>{{ result }}, ч</p>
   </v-card>
  </div>
</template>

<script>
    export default{
        name: 'power_vue',
        data: () =>({
            voultage: '...', //Напряжение аккумуляторных батарей
            power: '...',    //Мощность для питания СХД
            kpd: '...',      //КПД баттарей
            batteries: '...',//Кол-во батарей
            capacity: '...', //Ёмкость батарей
            result:0,        //Параметр, отвечающий за вывод результата раздела электропитания
            self: false,     //Параметр, отвечающий за ручной ввод мощности для питания СХД
            started: false,  //Параметр, отвечающий за вывод результатов работы электропитания после нажатия "Старт"
            rule: [
            value => !!value || 'Необходимо заполнить это поле.',
    ],                       //Правила для текстовых полей
        }),
        methods:{
            start(){
                
                this.started = true
                if(this.self){ //Расчёт при ручном вводе
                    this.result =this.voultage*this.capacity*this.batteries*this.kpd*0.85/this.power
                    console.log("Время работы устройства:   ", this.result, " ч");
                }else{         //Расчёт при автоматическом вводе
                    this.power = ''
                    this.power = localStorage.getItem('wats')
                    this.result =this.voultage*this.capacity*this.batteries*this.kpd*0.85/this.power
                    console.log("Время работы устройства:   ", this.result, " ч"); 
                }
            },              //Ф-ция старт
            getPower(){
                return this.power = localStorage.getItem('wats')
            }               //Ф-ция, отвечающая за приём параметра мощности из раздела СХД
        }
    }
</script>

<style>

</style>