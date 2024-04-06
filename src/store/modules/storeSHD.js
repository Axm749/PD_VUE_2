'use-strict'

function sumItUp(state){
    state.sumItUpAnswer = 0
    state.convServParam.forEach( servParam => {
        state.sumItUpAnswer += (servParam.count*servParam.volume)
    })
    console.log( `${state.sumItUpAnswer} ГБ      ${state.sumItUpAnswer/1024} ТБ`)
    return state.sumItUpAnswer
}

export default{
    namespaced: true,
    state:{
        MBr: '...',
        mBR1:0,
        capacity: '...',
        days: '...',
        users: '...',
        discs: '...',
        MainVolume:0,
        MainVolumeTbait:0,
        RezervVolume:0,
        UsefulVolume:0,
        usli: 0, //Кол-во узлов
        wats:'...',
        shdStarted: false,
        convServParam: [
            {id: 0, title: `сервер управления`, count: 1, volume: 300},
            {id: 1, title: `сервер архивного управления`, count: 1, volume: 300},
            {id: 2, title: `сервер сопряжения`, count: 3, volume: 600},
            {id: 3, title: `сервер ситуационного видеонаблюдения`, count: 1, volume: 300},
            {id: 4, title: `сервер архивное видеонаблюдение`, count: 3, volume: 7680}
          ], 
        options: [
            { name: "Локальная вычислительная сеть", value: "local" },
            { name: "Системы телефонии", value: "phone" },
            { name: "Система видеонаблюдения", value: "video" },
            { name: "Ручной режим", value: "user" },
          ], //Выбор режимов
        rule: [(value) => !!value || "Необходимо заполнить это поле."], //Правила для текстовых полей
        sumItUpAnswer: 0, //объём всех серверов вместе взятых, ГБ
        video: false, //Параметр, отвечающий за использование битрейта с видеонаблюдения
        converg: false,
        standart: false, //Параметр, отвечающий за стандартные/нестандартные узлы(по умолчанию стандартные узлы)
        convergChecked: false,
        dialogVideo: false,
        dialogConverg:false,
        dialogStore:false,
        snackbar: false,      // окошко об ошибке
        timeout: 2500,
        errorText: 'Неверно введены данные или они отсутствуют',     
    },
    mutations:{
        setMBrMut:(state, data) =>{
            state.MBr = data
        },
        setCapacityMut:(state, data) =>{
            state.capacity = data
        },
        setDaysMut:(state, data) =>{
            state.days = data
        },
        setUsersMut:(state, data) =>{
            state.users = data
        },
        setDiscsMut:(state, data) =>{
            state.discs = data
        },
        setConvergOptMut:(state, data)=>{
            state.converg = data
        },
        setStandartOptMut:(state, data)=>{
            state.standart = data
        },
        setSnackbarMut:(state, data)=>{
            state.snackbar = data
        },
        setShdStartedMut:(state, data)=>{
            state.shdStarted = data
        },
        setWatsMut:(state, data)=>{
            state.wats = data
        },

        extendConvServParamListMut:(state)=>{
            state.convServParam.push({
              id: state.convServParam.length, 
              title: `type idk`, 
              count: 1, 
              volume: 0,
            }) 
            // console.log(this.convServParam)
        },
        deleteItemMut:(state, item, index)=> {
            if(state.convServParam[index] === item) { 
            // The template passes index as the second parameter to avoid indexOf, 
            // it will be better for the performance especially for one large array
            // (because indexOf actually loop the array to do the match)
            state.convServParam.splice(index, 1)
              // console.log(this.convServParam)
            } else {
              let found = state.convServParam.indexOf(item)
              state.convServParam.splice(found, 1)
            }
        },
         // суммарный объём всех серверов в гиперконвергентной вкладке
        setVideoDialogMut:(state)=> {
            if (state.dialogVideo === false) {
                state.dialogVideo = true;
            } else {
                state.dialogVideo = false;
            }
        }, //Ф-ция, отвечающая за вкладку с видеонаблюдением
         //Ф-ция, отвечающая за вкладку с видеонаблюдением
        setConvergDialogMut:(state)=>{
            if (state.dialogConverg === false) {
                state.dialogConverg = true;
                state.convergChecked = true
          } else {
            state.dialogConverg = false;
          }
        },
        setStoresDialogMut:(state)=>{
            if (state.dialogStore === false) {
                state.dialogStore = true;
                state.standart = true
          } else {
            state.dialogStore = false;
          }
        },
        getMbr:(state)=> {
            state.shdStarted = true
            state.mBR1 = 0;
            if (state.options.value == "local") {
              //Локальные вычислительные сети
              console.log('Local')
              return state.mBR1 = 5;
            }
            if (state.options.value == "phone") {
              //Системы телефонии
              console.log('Phone')
              return state.mBR1 = 0.1;
            }
            if (state.options.value == "video") {
              //Система видеонаблюденя
              console.log('Video')
              if (state.video) {
                console.log('video< mBr',state.MBr)
                return state.mBR1 = state.MBr;
              } else {
                return state.mBR1 = 8;
              }
            }
            
            if (state.options.value == "user") {
              //Ручной режим
              console.log('User')
              return state.mBR1 += state.MBr;
            }
        }, //Ф-ция, присваивающая значение битрейта при разных режимах
        getVolume:(state)=> {
            state.MainVolume = state.mBR1 * +state.users * +state.days * 3600 * 24;
            // console.log("volume", this.volume);
            console.log('MainVolume1', state.MainVolume)

            state.MainVolume = Math.ceil(state.MainVolume / 8000000);
            // console.log("Рассчитанный объём в TiB:   ", this.volume);
            console.log('MainVolume2', state.MainVolume)

            state.MainVolumeTbait = Math.ceil(state.MainVolume / 0.85 / 0.9095);
            console.log('MainVolumeTbait', state.MainVolumeTbait)

            // console.log("Рассчитанный объём, переведённый в Tбайт:   ", this.volume1);
        }, //Ф-ция, рассчитывающая объём СХД без учёта резерва
        getConverg:(state)=> {
            if(state.converg){
            let server_volume =0
            let disc_group =0
            if(state.convergChecked){
            console.log('converg')
            server_volume = sumItUp(state)/1024
            console.log('объём сервера (ТБ)', server_volume)
            
            disc_group = Math.ceil(server_volume*2 / 0.85);
            state.RezervVolume = Math.ceil(disc_group+2*state.MainVolumeTbait)
            // console.log('Объём с резервным копированием', this.volume2)
    
            state.UsefulVolume= Math.ceil(2*state.MainVolumeTbait + disc_group)/0.8
            // console.log(
            //   "С учетом резерва требуемая от СХД полезная ёмкость",
            //   this.volume3,
            //   " Тбайт"
            // )
            }
            else{
                state.RezervVolume= Math.ceil(state.MainVolumeTbait*2)
                // console.log('Объём с резервным копированием   ', this.volume2)
                state.UsefulVolume = Math.ceil(state.RezervVolume/0.7)
                // console.log('учетом резерва требуемая от СХД полезная ёмкость', this.volume3)
            }
        }
        }, //Ф-ция, учитывающая объём СХД с резервом (при гиперконвергентной системе)
        setMbrVideoMut:(state)=> {
            // console.log("cams_Mbr", (this.mBr = localStorage.getItem("Bitrate")));
            state.video = true;
            console.log('local Mbr',+localStorage.getItem("Bitrate"))
            return (state.MBr = +localStorage.getItem("Bitrate"));
        }, //Ф-ция, отвечающая за присвоение битрейта от видеокамер
        getStandart:(state) =>{
            if (!state.standart){
              // стандартные узлы
              if (state.converg){
                // гиперконвергентные системы
                console.log('not standart, converg')
                console.log('usefullVolume', state.UsefulVolume)
                state.usli = Math.ceil(state.UsefulVolume / 7 / 4);
              } else {
                // обычные системы
                console.log('not standart, not converg')
                console.log('MainVolumeTbait', state.MainVolumeTbait)

                state.usli = Math.ceil(state.MainVolumeTbait / 15 / 8);
              }
            } else{
              // свои узлы
              if (state.converg){ 
                console.log('standart, converg')

                // гиперконвергентные системы
                state.usli = Math.ceil(state.UsefulVolume / state.discs / state.capacity);
              } else {
                console.log('standart, not converg')

                // здесь не важно, какой тип системы, ведь оно учитывалось в объёме
                state.usli = Math.ceil(state.MainVolumeTbait / state.discs / state.capacity);
              }
              if (!state.usli || isNaN(state.usli)) {
                state.snackbar = true;
                state.started = false;
                return;
              }
      
            }
            console.log(state.usli);
            console.log(!!state.usli);
            if (!state.usli){
              state.snackbar = true
              state.started = false
              return
            }
        }, //Ф-ция, рассчитывающа число узлов для различных типов систем и узлов
        getShdPower:(state)=> {
            if (state.converg) {
              //Мощность при гиперконвергентной системе
              state.wats = (state.usli + 2) * 1000;
              // console.log(this.wats);
            } else {
              //Мощность при негиперконвергентной системе
              state.wats = (state.usli + 2) * 700;
              // console.log(this.wats);
            }
        }, //Ф-ция, передающая параметр мощности в зависимости от типа системы
    },
    actions:{
        setMBrAct:({commit}, value) =>{
            commit("setMBrMut", value)
        },
        setCapacityAct:({commit}, value) =>{
            commit("setCapacityMut", value)
        },
        setDaysAct:({commit}, value) =>{
            commit("setDaysMut", value)
        },
        setUsersAct:({commit}, value) =>{
            commit("setUsersMut", value)
        },
        setDiscsAct:({commit}, value) =>{
            commit("setDiscsMut", value)
        },
        setWatsAct:({commit}, value)=>{
            commit("setWatsMut", value)
        },
        setShdStartedAct:({commit}, value)=>{
            commit("setShdStartedMut", value)
        },
        setVideoDialogAct:({commit})=>{
            commit("setVideoDialogMut")
        },
        setConvergDialogAct:({commit})=>{
            commit("setConvergDialogMut")
        },
        setStoresDialogAct:({commit})=>{
            commit("setStoresDialogMut")
        },
        setConvergOptAct:({commit}, value)=>{
            commit("setConvergOptMut",value)
        },
        setStandartOptAct:({commit}, value)=>{
            commit("setStandartOptMut", value)
        },
        setSnackbarAct:({commit}, value)=>{
            commit('setSnackbarMut', value)
        },
        setMbrVideoAct:({commit})=>{
            commit("setMbrVideoMut")
        },
        extendConvServParamListAct:({commit})=>{
            commit("extendConvServParamListMut")
        },
        deleteItemAct:({commit}, server, index)=>{
            commit("deleteItemMut", server, index)
        },
        StartShdAct:({commit})=>{
            commit("getMbr")
            commit("getVolume")
            commit("getConverg")
            commit("getStandart")
            commit("getShdPower")
        },
    },
    getters:{
        getMBr:(state)=>{
            console.log(state.MBr)
            return state.MBr
        },
        getCapacity:(state)=>{
            console.log(state.capacity)
            return state.capacity
        },
        getDays:(state)=>{
            console.log(state.days)
            return state.days
        },
        getUsers:(state)=>{
            console.log(state.users)
            return state.users
        },
        getDiscs:(state)=>{
            console.log(state.discs)
            return state.discs
        },
        getWats:(state)=>{
            console.log(state.wats)
            return state.wats
        },
        getConvServParams:(state) =>{
            return state.convServParam
        },
        getOptions:(state)=>{
            console.log(state.options.value)
            return state.options
        },
        getRule:(state)=>{
            return state.rule
        },
        getConvergOpt:(state)=>{
            return state.converg
        },
        getStandartOpt:(state)=>{
            return state.standart
        },
        getSnackbar:(state)=>{
            return state.snackbar
        },
        getVideoDialog:(state)=>{
            return state.dialogVideo
        },
        getConvergDialog:(state)=>{
            return state.dialogConverg
        },
        getStoresDialog:(state)=>{
            return state.dialogStore
        },
        getStartedShd:(state)=>{
            return state.shdStarted
        },
        getTimeout:(state)=>{
            return state.timeout
        },
        getErrorText:(state)=>{
            return state.errorText
        },
        getMainVolume:(state)=>{
            return state.MainVolume
        },
        getMainVolumeTbait:(state)=>{
            return state.MainVolumeTbait
        },
        getRezervVolume:(state)=>{
            return state.RezervVolume
        },
        getUsefullVolume:(state)=>{
            return state.UsefulVolume
        },
        getUsliShd:(state)=>{
            return state.usli
        },
        getWats:(state)=>{
            return state.wats
        },
    },
}