<template>
  <v-app>
    <div :class="$vuetify.theme.dark==false ? 'body_light' : 'body_dark'">
      <div 
        v-if="!regularView"
        :class="margins === true ? 'ma-0' : 'ma-5'"
      >
        <shd
        @Power="getpower"
        @Usli="getUsli"
        />

        <power
        ref="npower"
        />
        
        <condition
        ref="nusli"
        />
      </div>

      <div 
        v-if="regularView"
        :class="margins === true ? 'ma-0' : 'ma-5'"
      >
        <v-expansion-panels
          class="mt-6"
          multiple
          accordion
          tile
        >
          <v-expansion-panel>
            <v-expansion-panel-header>СХД</v-expansion-panel-header>
            <v-expansion-panel-content
            >
              <shd
                @Power="getpower"
                @Usli="getUsli"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>электропитание</v-expansion-panel-header>
            <v-expansion-panel-content>
              <power
              ref="npower"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>охлаждение</v-expansion-panel-header>
            <v-expansion-panel-content>
              <condition
              ref="nusli"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          
        </v-expansion-panels>
      </div>
      
      <v-card
        :class="margins === true ? 'ma-0 mt-12 pa-5' : 'ma-5 mt-12 pa-5'"
      >
        <h2> 
          <v-icon>mdi-cog</v-icon>
          Дополнительно
        </h2>
        <v-checkbox
          info
          hide-details
          label="Использовать альтернативное отображение"
          v-model="regularView"
        />
        <v-checkbox
          info
          hide-details
          label="Убрать отступы"
          v-model="margins"
        />

        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          label="Тёмная тема"
          persistent-hint
        />
      </v-card>



    </div>
    
    

    

  </v-app>
</template>

<script>

import power from './components/power.vue';
import shd from './components/shd.vue';
import condition from './components/condition.vue'


export default {
  name: 'App',

  components: {
    shd,
    power,
    condition,
  },

  data: () => ({
    regularView: false,
    margins: false,
  }),

  methods:{
    getpower(){
      this.$refs.npower.getPower()
    },
    getUsli(){
      this.$refs.nusli.getusli()
    },
  }
};
</script>

<style>

body{
  margin: 0;
    padding: 0px;
    width: 100%;
    height: 100%;
    background-size: 200% 200%;
    /* background-image: linear-gradient( 0deg, #2ebf91, #4286f4); */
    /* background-image: linear-gradient( 120deg, #1288ab, #e542f4); */
    /* background-image: linear-gradient( 120deg, #33691E, #4DD0E1); */
    /* background-image: linear-gradient( 120deg, var(--v-accent-lighten1), var(--v-accent-lighten2)); */
    animation: bg 5s ease infinite;
}

.body_light{
  background-image: linear-gradient( 120deg, #33691E, #4DD0E1);
  height: 100%;
}

.body_dark{
  background-image: linear-gradient( 120deg, #691e1e, #986e32);
  height: 100%;
}


@keyframes bg {
    0%{
        background-position: 0%, 100%;
        
    }
    50%{
        background-position: 100% 0%;
    }
    100%{
        background-position: 0%, 100%;
    } 
}
/* @keyframes bg {
  to { transform: translate(-50%, -50%) rotate(1turn); }
} */

.container{
    padding: 20px;
    margin-top: 20px;
    width: 90%;
    border-radius: 20px;
    background-color:rgb(245, 244, 248);
}

.theme--light.v-application {
    background: none;
    color: rgba(0, 0, 0, 0.87);
}

input::-webkit-inner-spin-button, input::-webkit-outer-spin-button{
-webkit-appearance: none;
}

.module_bg{
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.127); */
  /* margin: 5px; */
}

.inCardTab{
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  padding: 5px;
}


</style>
