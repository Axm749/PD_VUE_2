<template>
  <v-app>
    <div :class="$vuetify.theme.dark==false ? 'body_light' : 'body_dark'">
      <!-- шапка при необходимости -->
      
      <!-- настройки -->
      <div 
        :class="noMargins === true ? 'ma-0' : 'ma-5 module_bg'"
      >
        <v-expansion-panels
            accordion
            tile
          >
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2>Расчет СХД</h2>
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
                  v-model="irregularView"
                  @change="saveTheme"
                />
                <v-checkbox
                  info
                  hide-details
                  label="Убрать отступы"
                  v-model="noMargins"
                  @change="saveTheme"
                />

                <v-switch
                  v-model="$vuetify.theme.dark"
                  inset
                  @change="saveTheme"
                  label="Тёмная тема"
                  persistent-hint
                />

              </v-expansion-panel-content>
            </v-expansion-panel>
          
        </v-expansion-panels>
      </div>
      
      
      <!-- основной вид -->
      <div 
        v-if="!irregularView"
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
          <cooling
            ref="nusli"
          />
        </div>
      </div>

      <!-- альтернативный вид -->
      <div 
        v-if="irregularView"
        :class="noMargins === true ? 'ma-0 mt-5' : 'ma-5 module_bg'"
      >
        <v-expansion-panels
          multiple
          accordion
          tile
        >
          <v-expansion-panel
            eager
          >
            <v-expansion-panel-header><h2> СХД </h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div :class="noMargins=== true ? 'module_bg' : 'mx-n5'">
                <shd
              />
              </div>
              
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel eager>
            <v-expansion-panel-header><h2>электропитание</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div :class="noMargins=== true ? 'module_bg' : 'mx-n5'">
                <power
                  ref="npower"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel eager>
            <v-expansion-panel-header><h2>охлаждение</h2></v-expansion-panel-header>
            <v-expansion-panel-content>
              <div :class="noMargins=== true ? 'module_bg' : 'mx-n5'">
                <cooling
                  ref="nusli"
                />
              </div>
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
import cooling from './components/cooling.vue'
// import condition from './components/condition.vue'


export default {
  name: 'App',

  components: {
    shd,
    power,
    cooling,
  },

  data: () => ({
    irregularView: true,
    noMargins: true,
  }),

  methods:{
    getpower(){
      this.$refs.npower.getPower()
    },
    getUsli(){
      this.$refs.nusli.getusli()
    },
    saveTheme(){
      localStorage.setItem('PD_VUE_DARK_THEME', this.$vuetify.theme.dark)
      localStorage.setItem('PD_VUE_NO_PADDING', this.noMargins)
      localStorage.setItem('PD_VUE_IRREGULAR_VIEW', this.irregularView)
      console.log('saved theme')
    }    
  },
  mounted(){
      if(localStorage.getItem('PD_VUE_DARK_THEME')=='true'){
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }

      if(localStorage.getItem('PD_VUE_NO_PADDING')=='true'){
        this.noMargins = true
      } else {
        this.noMargins = false
      }

      if(localStorage.getItem('PD_VUE_IRREGULAR_VIEW')=='true'){
        this.irregularView = true
      } else {
        this.irregularView = false
      }


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
  /* background-image: linear-gradient( 0deg, #2ebf91, #4286f4); */
  background-image: linear-gradient( 120deg, #33691E, #4DD0E1);
  height: 100%;
  background-size: 200% 200%;
  animation: bg 5s ease infinite;
}

.body_dark{
  background-image: linear-gradient( 120deg, #e7c255, #fcdb04fb);
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
  border-radius: 0px;
  padding: 2px;
  margin-top: 20px;
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.127); */
  /* margin: 5px; */
}

.inCardTab{
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  padding: 5px;
}


</style>
