import Vue from "vue"
import Vuex from 'vuex'

import storeSHD from './modules/storeSHD'
import storePower from './modules/storePower'
import storeVideo from './modules/storeVideo'

Vue.use(Vuex)

export default new Vuex.Store({
    
    modules:{
        mySHD: storeSHD,
        myPower: storePower,
        myVideo: storeVideo,
    }
})