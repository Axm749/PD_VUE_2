<template>
  <v-app>
    
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
    //
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
    padding: 20px;
    width: 100%;
    height: 100%;
    background-size: 200% 200%;
    background-image: linear-gradient( 0deg, #2ebf91, #4286f4);
    animation: bg 7s ease infinite;
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
</style>
