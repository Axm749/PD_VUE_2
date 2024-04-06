<template>
  <div>
    <v-card class="pa-5">
      <h1>Электропитание</h1>

      <v-text-field
        type="number"
        outlined
        required
        clearable
        label="Напряжение аккумуляторных батарей (В)"
        :rules="getRules"
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
        :rules="getRules"
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
        :rules="getRules"
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
        :rules="getRules"
        hide-details="auto"
        max=1
        min=0.8
        oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
        v-model.number="kpd"
        class="mt-5"
      />
      <v-text-field
        type="number"
        :disabled="self === false"
        outlined
        clearable
        label="Макс. суммарная мощность нагрузой (Вт)"
        :rules="getRules"
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
      <v-btn @click="startPowerAct" color="primary" class="mt-5">Старт</v-btn>
    </v-card>

    <!-- уведомление об ошибке -->
    <v-snackbar v-model="snackbar" :timeout="getTimeOut">
      {{ getErrorText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="accent" text v-bind="attrs" @click="snackbar = false">
          ОК
        </v-btn>
      </template>
    </v-snackbar>

    <v-card class="pa-5 mt-5" v-show="started">
      <h2>Время работы устройства:</h2>
      <p>
        <strong>{{ getTimeWork }}, ч.</strong>
      </p>
      <v-btn @click="started = false" class="mt-2">скрыть</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "power_vue",
  computed:{
        ...mapGetters('mySHD',['getWats']),
        ...mapGetters('myPower', 
        [
            'getVoultage', 
            'getCapacity', 
            'getBatteries', 
            'getKpd',
            'getPower',
            'getTimeWork',
            'getStarted',
            'getSnackbar',
            'getTimeOut',
            'getSelf',
            'getRules',
            'getErrorText',
        ]
        ),
        voultage:{
            get() {
                console.log('get', this.getVoultage)
                return this.getVoultage
            },
            async set(value){
                console.log('set', value)
                await this.setVoultageAct(value)
            }
        },
        capacity:{
            get() {
                console.log('get', this.getCapacity)
                return this.getCapacity
            },
            async set(value){
                console.log('set', value)
                await this.setCapacityAct(value)
            }
        },
        batteries:{
            get() {
                console.log('get', this.getBatteries)
                return this.getBatteries
            },
            async set(value){
                console.log('set', value)
                await this.setBatteriesAct(value)
            }
        },
        kpd:{
            get() {
                console.log('get', this.getKpd)
                return this.getKpd
            },
            async set(value){
                console.log('set', value)
                await this.setKpdAct(value)
            }
        },
        power:{
            get() {
              if(this.getSelf){
                console.log('get', this.getPower)
                return this.getPower
              }
              else{
                console.log('get', this.getWats)
                return this.getWats
              }

            },
            async set(value){
                console.log('set', value)
                await this.setPowerAct(value)
            }
        },
        self:{
            get() {
                console.log('get', this.getSelf)
                return this.getSelf
            },
            async set(value){
                console.log('set', value)
                await this.setSelfAct(value)
            }
        },
        started:{
            get() {
                console.log('get', this.getStarted)
                return this.getStarted
            },
            async set(value){
                console.log('set', value)
                await this.setStartedAct(value)
            }
        },
        snackbar:{
            get() {
                console.log('get', this.getSnackbar)
                return this.getSnackbar
            },
            async set(value){
                console.log('set', value)
                await this.setSnackbarAct(value)
            }
        },
    },
  methods: {
    ...mapActions('myPower', 
        [
            'setVoultageAct',
            'setCapacityAct',
            'setBatteriesAct',
            'setKpdAct',
            'setPowerAct',
            'startPowerAct',
            'setSelfAct',
            'setStartedAct',
            'setSnackbarAct'
        ]
        ),
  },
};
</script>

<style></style>
