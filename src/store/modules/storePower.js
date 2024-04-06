'use-strict'

import storeSHD from "./storeSHD"

export default{
    namespaced: true,
    state:{
        voultage: '...',
        capacity: '...',
        batteries: '...',
        kpd: '...',
        power: '...',
        TimeWork: 0,
        started: false,
        snackbar: false,
        timeout: 2500,
        self: false, //Параметр, отвечающий за ручной ввод мощности для питания СХД
        rule: [(value) => !!value || "Необходимо заполнить это поле."], //Правила для текстовых полей
        errorText: "Неверно введены данные или они отсутствуют",
    },
    mutations:{
        setVoultageMut:(state, data) =>{
            state.voultage = data
        },
        setCapacityMut:(state, data) =>{
            state.capacity = data
        },
        setBatteriesMut:(state, data) =>{
            state.batteries = data
        },
        setKpdMut:(state, data) =>{
            state.kpd = data
        },
        setPowerMut:(state, data) =>{
            state.power = data
        },
        startPowerMut:(state)=> {
            if(!state.self){state.power = storeSHD.state.wats}
            state.started =true
            state.TimeWork = (state.voultage*state.capacity*state.batteries*state.kpd*0.85/state.power).toFixed(2)
            console.log('sdadasd',state.TimeWork)
            console.log(state.snackbar)
            console.log('wats in shd',storeSHD.state.wats)
            if (!state.TimeWork || isNaN(state.TimeWork)|| state.TimeWork == Infinity) {
                state.snackbar = true;
                state.started = false;
                return;
              }
        },
        setSelfMut:(state,data)=>{
            state.self = data
        },
        setStartedMut:(state, data)=>{
            state.started = data
        },
        setSnackbarMut:(state, data)=>{
            state.snackbar = data
        }
    },
    actions:{
        setVoultageAct:({commit}, value) =>{
            commit("setVoultageMut", value)
        },
        setCapacityAct:({commit}, value) =>{
            commit("setCapacityMut", value)
        },
        setBatteriesAct:({commit}, value) =>{
            commit("setBatteriesMut", value)
        },
        setKpdAct:({commit}, value) =>{
            commit("setKpdMut", value)
        },
        setPowerAct:({commit}, value) =>{
            commit("setPowerMut", value)
        },
        startPowerAct:({commit}) =>{
            commit("startPowerMut")
        },
        setSelfAct:({commit}, value)=>{
            commit('setSelfMut', value)
        },
        setStartedAct:({commit}, value)=>{
            commit('setStartedMut', value)
        },
        setSnackbarAct:({commit}, value)=>{
            commit('setSnackbarMut', value)
        }
    },
    getters:{
        getVoultage:(state)=>{
            return state.voultage
        },
        getCapacity:(state)=>{
            return state.capacity
        },
        getBatteries:(state)=>{
            return state.batteries
        },
        getKpd:(state)=>{
            return state.kpd
        },
        getPower:(state)=>{
            return state.power
        },
        getTimeWork:(state)=> {
            return state.TimeWork
        },
        getStarted:(state)=> {
            return state.started
        },
        getSnackbar:(state)=>{
            return state.snackbar
        },
        getTimeOut:(state)=>{
            return state.timeout
        },
        getSelf:(state)=>{
            return state.self
        },
        getRules:(state)=>{
            return state.rule
        },
        getErrorText:(state)=>{
            return state.errorText
        }
    },
}