<template>
  <v-app>
    <div :class="$vuetify.theme.dark==false ? 'body_light' : 'body_dark'">
      <!-- основной вид -->
      <div 
        v-if="!regularView"
        :class="noMargins === true ? 'ma-0' : 'ma-5'"
      >
        <div 
          :class="noMargins === true ? 'mt-5' : 'mt-5 module_bg'"
        >
          <shd
            @Power="getpower"
            @Usli="getUsli"
          />
        </div>
        
        <div 
          :class="noMargins === true ? 'mt-5' : 'mt-5 module_bg'"
        >
          <power
            ref="npower"
          />
        </div>
        
        <div 
          :class="noMargins === true ? 'mt-5' : 'mt-5 module_bg'"
        >
          <condition
            ref="nusli"
          />
        </div>
      </div>

      <!-- альтернативный вид -->
      <div 
        v-if="regularView"
        :class="noMargins === true ? 'ma-0' : 'ma-5 module_bg'"
      >
        <v-expansion-panels
          multiple
          accordion
          tile
        >
          <v-expansion-panel>
            <v-expansion-panel-header><h2> СХД </h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="module_bg">
                <shd
                @Power="getpower"
                @Usli="getUsli"
              />
              </div>
              
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header><h2>электропитание</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="module_bg">
                <power
                  ref="npower"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header><h2>охлаждение</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="module_bg">
                <condition
                  ref="nusli"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          
        </v-expansion-panels>
      </div>
      
      <!-- настройки -->
      <div 
        :class="noMargins === true ? 'ma-0 mt-12' : 'ma-5 mt-12 module_bg'"
      >

      
        <v-expansion-panels
            
            accordion
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2>Дополнительно</h2>
                <template v-slot:actions>
                  <v-icon>
                    mdi-cog
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content
              >
                
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
                  v-model="noMargins"
                />

                <v-switch
                  v-model="$vuetify.theme.dark"
                  inset
                  label="Тёмная тема"
                  persistent-hint
                />

              </v-expansion-panel-content>
            </v-expansion-panel>
          
        </v-expansion-panels>
      </div>

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
    noMargins: false,
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
    /* background-size: 200% 200%; */
    /* background-image: linear-gradient( 0deg, #2ebf91, #4286f4); */
    /* background-image: linear-gradient( 120deg, #1288ab, #e542f4); */
    /* background-image: linear-gradient( 120deg, #33691E, #4DD0E1); */
    /* background-image: linear-gradient( 120deg, var(--v-accent-lighten1), var(--v-accent-lighten2)); */
    /* animation: bg 5s ease infinite; */
}

.body_light{
  background-image: linear-gradient( 0deg, #2ebf91, #4286f4);
  /* background-image: linear-gradient( 120deg, #33691E, #4DD0E1); */
  height: 100%;
  background-size: 200% 200%;
  animation: bg 5s ease infinite;
}

.body_dark{
  background-image: linear-gradient( 120deg, #691e1e, #955e20);
  height: 100%;
  background-size: 200% 200%;
  animation: bg 5s ease infinite;
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
  margin-top: 20px;
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.127); */
  /* margin: 5px; */
}

.inCardTab{
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  padding: 5px;
}


</style>
