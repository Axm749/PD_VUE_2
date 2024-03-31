(function(){"use strict";var t={1193:function(t,e,s){var a=s(5471),l=s(8505),i=s(8738),o=s(2822),r=s(8461),n=s(4519),_=s(9366),c=s(9456),u=s(673),d=function(){var t=this,e=t._self._c;return e(l.A,[e("div",{class:0==t.$vuetify.theme.dark?"body_light":"body_dark"},[t.regularView?t._e():e("div",{class:!0===t.noMargins?"ma-0":"ma-5"},[e("div",{class:!0===t.noMargins?"mt-5":"mt-5 module_bg"},[e("shd",{on:{Power:t.getpower,Usli:t.getUsli}})],1),e("div",{class:!0===t.noMargins?"mt-5":"mt-5 module_bg"},[e("power",{ref:"npower"})],1),e("div",{class:!0===t.noMargins?"mt-5":"mt-5 module_bg"},[e("condition",{ref:"nusli"})],1)]),t.regularView?e("div",{class:!0===t.noMargins?"ma-0":"ma-5 module_bg"},[e(_.A,{attrs:{multiple:"",accordion:"",tile:""}},[e(o.A,[e(n.A,[e("h2",[t._v(" СХД ")])]),e(r.A,[e("div",{staticClass:"module_bg"},[e("shd",{on:{Power:t.getpower,Usli:t.getUsli}})],1)])],1),e(o.A,[e(n.A,[e("h2",[t._v("электропитание")])]),e(r.A,[e("div",{staticClass:"module_bg"},[e("power",{ref:"npower"})],1)])],1),e(o.A,[e(n.A,[e("h2",[t._v("охлаждение")])]),e(r.A,[e("div",{staticClass:"module_bg"},[e("condition",{ref:"nusli"})],1)])],1)],1)],1):t._e(),e("div",{class:!0===t.noMargins?"ma-0 mt-12":"ma-5 mt-12 module_bg"},[e(_.A,{attrs:{accordion:""}},[e(o.A,[e(n.A,{scopedSlots:t._u([{key:"actions",fn:function(){return[e(c.A,[t._v(" mdi-cog ")])]},proxy:!0}])},[e("h2",[t._v("Дополнительно")])]),e(r.A,[e(i.A,{attrs:{info:"","hide-details":"",label:"Использовать альтернативное отображение"},model:{value:t.regularView,callback:function(e){t.regularView=e},expression:"regularView"}}),e(i.A,{attrs:{info:"","hide-details":"",label:"Убрать отступы"},model:{value:t.noMargins,callback:function(e){t.noMargins=e},expression:"noMargins"}}),e(u.A,{attrs:{inset:"",label:"Тёмная тема","persistent-hint":""},model:{value:t.$vuetify.theme.dark,callback:function(e){t.$set(t.$vuetify.theme,"dark",e)},expression:"$vuetify.theme.dark"}})],1)],1)],1)],1)])])},h=[],m=s(375),p=s(1689),g=s(9940),v=function(){var t=this,e=t._self._c;return e("div",[e(p.A,{staticClass:"pa-5"},[e("h1",[t._v("Электропитание")]),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"Напряжение аккумуляторных батарей (В)",rules:t.rule,"hide-details":"auto"},model:{value:t.voultage,callback:function(e){t.voultage=t._n(e)},expression:"voultage"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"Емкость аккумуляторной батареи (А/ч)",rules:t.rule,"hide-details":"auto"},model:{value:t.capacity,callback:function(e){t.capacity=t._n(e)},expression:"capacity"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",clearable:"",required:"",label:"Кол-во аккумуляторных батарей в цепи (шт.)",rules:t.rule,"hide-details":"auto"},model:{value:t.batteries,callback:function(e){t.batteries=t._n(e)},expression:"batteries"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"КПД преобразователя в долях (0,8 - 1,0)",rules:t.rule,"hide-details":"auto"},model:{value:t.kpd,callback:function(e){t.kpd=t._n(e)},expression:"kpd"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",disabled:!1===t.self,outlined:"",clearable:"",label:"Макс. суммарная мощность нагрузой (Вт)",rules:t.rule,"hide-details":"auto"},model:{value:t.power,callback:function(e){t.power=t._n(e)},expression:"power"}}),e(i.A,{staticClass:"mt-5",attrs:{info:"","hide-details":"",label:"Ввести вручную?"},model:{value:t.self,callback:function(e){t.self=e},expression:"self"}}),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.start}},[t._v("Старт")])],1),e(p.A,{directives:[{name:"show",rawName:"v-show",value:t.started,expression:"started"}],staticClass:"pa-5 mt-5"},[e("h2",[t._v("Время работы устройства:")]),e("p",[e("strong",[t._v(t._s(t.result)+", ч.")])]),e(m.A,{staticClass:"mt-2",on:{click:function(e){t.started=!1}}},[t._v("скрыть")])],1)],1)},b=[],f={name:"power_vue",data:()=>({voultage:"...",power:"...",kpd:"...",batteries:"...",capacity:"...",result:0,self:!1,started:!1,rule:[t=>!!t||"Необходимо заполнить это поле."]}),methods:{start(){this.started=!0,this.self?(this.result=.1*Math.ceil(10*this.voultage*this.capacity*this.batteries*this.kpd*.85/this.power),console.log("Время работы устройства:   ",this.result," ч")):(this.power="",this.power=localStorage.getItem("wats"),this.result=.1*Math.ceil(10*this.voultage*this.capacity*this.batteries*this.kpd*.85/this.power),console.log("Время работы устройства:   ",this.result," ч"))},getPower(){return this.power=localStorage.getItem("wats")}}},k=f,A=s(1656),y=(0,A.A)(k,v,b,!1,null,null,null),C=y.exports,x=s(4089),w=s(7563),P=s(3021),M=function(){var t=this,e=t._self._c;return e("div",[e(p.A,{staticClass:"pa-5"},[e("h1",[t._v("Система хранения данных")]),e(g.A,{staticClass:"mt-5",attrs:{outlined:"",type:"number",required:"",clearable:"",label:"Количество устройств",rules:t.rule,"hide-details":"auto"},model:{value:t.users,callback:function(e){t.users=t._n(e)},expression:"users"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Дни хранения",rules:t.rule,"hide-details":"auto"},model:{value:t.days,callback:function(e){t.days=t._n(e)},expression:"days"}}),e(i.A,{staticClass:"mt-5",attrs:{info:"","hide-details":"",label:"Узел не стандартный?"},model:{value:t.standart,callback:function(e){t.standart=e},expression:"standart"}}),e(i.A,{staticClass:"mt-5",attrs:{info:"","hide-details":"",label:"Система гиперконвергентна?"},model:{value:t.converg,callback:function(e){t.converg=e},expression:"converg"}}),t.standart?[e(x.A,{attrs:{transition:"dialog-bottom-transition",width:"80%",scrollable:!1,"aria-hidden":"true"},scopedSlots:t._u([{key:"activator",fn:function({props2:s}){return[e(m.A,t._b({staticClass:"mt-2 mt-5",attrs:{width:"100%",color:"primary"},on:{click:t.getStores}},"v-btn",s,!1),[e(c.A,[t._v("mdi-cog")]),t._v(" Настройки узла ")],1)]}}],null,!1,2276829313),model:{value:t.dialog2,callback:function(e){t.dialog2=e},expression:"dialog2"}},[e("div",{staticClass:"module_bg"},[e(p.A,{staticClass:"pa-5"},[e("h1",[t._v("параметры дисковых хранилищ узлов")]),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Объём диска (Тбайт)",rules:t.rule,"hide-details":"auto"},model:{value:t.capacity,callback:function(e){t.capacity=t._n(e)},expression:"capacity"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Количество дисков",rules:t.rule,"hide-details":"auto"},model:{value:t.discs,callback:function(e){t.discs=t._n(e)},expression:"discs"}})],1)],1)])]:t._e(),t.converg?[e(x.A,{attrs:{transition:"dialog-bottom-transition",width:"80%","aria-hidden":"true"},scopedSlots:t._u([{key:"activator",fn:function({props1:s}){return[e(m.A,t._b({staticClass:"mt-2 mt-5",attrs:{width:"100%",color:"primary"},on:{click:t.getConverg}},"v-btn",s,!1),[e(c.A,[t._v("mdi-cog")]),t._v(" Настройки сервера ")],1)]}}],null,!1,2636888309),model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[e("div",{staticClass:"module_bg"},[e(p.A,{staticClass:"pa-5",attrs:{outlined:""}},[e("h1",[t._v("Доп. сервера")]),t._l(t.convServParam,(function(s,a){return e("div",{key:a,staticClass:"mt-5 inCardTab"},[e(g.A,{staticClass:"mt-2",attrs:{required:"",outlined:"",clearable:"",label:"название","prepend-icon":"mdi-table-column",placeholder:"hello",rules:t.rule,"hide-details":"auto"},model:{value:s.title,callback:function(e){t.$set(s,"title",e)},expression:"server.title"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",required:"",outlined:"",clearable:"","prepend-icon":"mdi-counter",label:"количество (шт)",rules:t.rule,"hide-details":"auto"},model:{value:s.count,callback:function(e){t.$set(s,"count",e)},expression:"server.count"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",required:"",outlined:"",clearable:"","prepend-icon":"mdi-disc-player",label:"объём (ГБ)",rules:t.rule,"hide-details":"auto"},model:{value:s.volume,callback:function(e){t.$set(s,"volume",e)},expression:"server.volume"}}),e(m.A,{staticClass:"mt-5 ml-2 mb-2",attrs:{color:"error"},on:{click:function(e){return t.deleteItem(s,a)}}},[e(c.A,[t._v("mdi-trash-can")]),t._v(" удалить ")],1)],1)})),e(m.A,{staticClass:"ma-5",attrs:{color:"primary"},on:{click:t.extendConvServParamList}},[t._v("добавить")])],2)],1)])]:t._e(),e(w.A,{staticClass:"mt-5",staticStyle:{"margin-top":"10px"},attrs:{required:"",density:"comfortable","hide-details":"",outlined:"",items:t.options,"item-text":"name","item-value":"value",label:"Выберите режим"},model:{value:t.options.value,callback:function(e){t.$set(t.options,"value",e)},expression:"options.value"}}),e(g.A,{directives:[{name:"show",rawName:"v-show",value:"user"==t.options.value,expression:"options.value == 'user'"}],ref:"mBRRef",staticClass:"mt-5",staticStyle:{"margin-bottom":"20px"},attrs:{required:"",type:"number",flat:"",outlined:"",clearable:"",label:"Мбит/сек",rules:t.rule,"hide-details":"auto"},model:{value:t.mBR,callback:function(e){t.mBR=t._n(e)},expression:"mBR"}}),"video"==t.options.value?[e(x.A,{staticClass:"mt-5",attrs:{novalidate:"",width:"auto","aria-hidden":"true"},scopedSlots:t._u([{key:"activator",fn:function({props:s}){return[e(m.A,t._b({staticClass:"mt-5 mr-5",attrs:{"max-width":"100%",color:"primary"},on:{click:t.getVideo}},"v-btn",s,!1),[e(c.A,[t._v("mdi-cog")]),t._v(" Дополнительно ")],1)]}}],null,!1,667846470),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e("video1",{on:{cam_bitrate:t.getMbrVideo}})],1)]:t._e(),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.start}},[t._v("Старт")])],2),e(p.A,{directives:[{name:"show",rawName:"v-show",value:t.started,expression:"started"}],staticClass:"pa-5 mt-5"},[e("p",[t._v("Требуемый объём для хранения видеоданных "),e("strong",[t._v(t._s(t.volume)+" TiB")])]),e("p",[t._v(" Требуемый объём СХД с учетом перевода TiB в Тбайт "),e("strong",[t._v(t._s(t.volume1)+" Тбайт")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.converg,expression:"converg"}]},[e("p",[t._v("Объём с резервным копированием "),e("strong",[t._v(t._s(t.volume2)+" Тбайт")])]),e("p",[t._v("С учетом резерва требуемая от СХД полезная ёмкость составит "),e("strong",[t._v(t._s(t.volume3)+" Тбайт;")])])]),e("p",[t._v("Узлов без резервирования "),e("strong",[t._v(t._s(t.usli)+" шт;")])]),e("p",[t._v("Узлов с резервированием "),e("strong",[t._v(t._s(t.usli+2)+" шт.")])]),e(m.A,{staticClass:"mt-2 mr-5",attrs:{disabled:""}},[t._v("сохранить (WIP)")]),e(m.A,{staticClass:"mt-2",on:{click:function(e){t.started=!1}}},[t._v("скрыть")])],1),e(P.A,{attrs:{timeout:t.timeout},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(m.A,t._b({attrs:{color:"blue",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.errorText)+" ")])],1)},S=[],R=(s(4114),function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"module_bg"},[e(p.A,{staticClass:"pa-5"},[e("h1",[t._v("Видео (битрейт и PPM)")]),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Число зон PPM",rules:t.rule,"hide-details":"auto"},model:{value:t.PPM_zones,callback:function(e){t.PPM_zones=t._n(e)},expression:"PPM_zones"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Высота установки камеры (м)",rules:t.rule,"hide-details":"auto"},model:{value:t.Cam_height,callback:function(e){t.Cam_height=t._n(e)},expression:"Cam_height"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Угол наклона камеры (градусы)",rules:t.rule,"hide-details":"auto"},model:{value:t.cam_angle,callback:function(e){t.cam_angle=t._n(e)},expression:"cam_angle"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Вертикальный угол обзора объектива (градусы)",rules:t.rule,"hide-details":"auto"},model:{value:t.Vertical_cam_angle,callback:function(e){t.Vertical_cam_angle=t._n(e)},expression:"Vertical_cam_angle"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Горизонтальный угол обзора объектива (градусы)",rules:t.rule,"hide-details":"auto"},model:{value:t.Horizontal_cam_angle,callback:function(e){t.Horizontal_cam_angle=t._n(e)},expression:"Horizontal_cam_angle"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Дальность обзора (м)",rules:t.rule,"hide-details":"auto"},model:{value:t.Camera_reach,callback:function(e){t.Camera_reach=t._n(e)},expression:"Camera_reach"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Разрешение по горизонтали (пикселей)",rules:t.rule,"hide-details":"auto"},model:{value:t.Resolution_X,callback:function(e){t.Resolution_X=t._n(e)},expression:"Resolution_X"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Разрешение по вертикали (пикселей)",rules:t.rule,"hide-details":"auto"},model:{value:t.Resolution_Y,callback:function(e){t.Resolution_Y=t._n(e)},expression:"Resolution_Y"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",disabled:!1===t.self,outlined:"",clearable:"",label:"Средняя доля сжатия с кодаком (0,0 - 1,0)",rules:t.rule,"hide-details":"auto"},model:{value:t.kodak,callback:function(e){t.kodak=e},expression:"kodak"}}),e(i.A,{staticClass:"mt-5",attrs:{info:"","hide-details":"",label:"Ввести вручную?"},model:{value:t.self,callback:function(e){t.self=e},expression:"self"}}),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.start}},[t._v("Старт")])],1),t.started?e(p.A,{staticClass:"pa-5 mt-5"},[e("h2",[t._v("Вывод для раздела видео")]),t._l(t.PPM_zones,(function(s){return e("div",{key:s},[e("p",[t._v("PPM в зоне номер "+t._s(s)+" равняется "+t._s(t.PPM[s])+", а пикселей в этой зоне "+t._s(t.result[s].toFixed(0)))]),e("p",[t._v("Покрываемая площадь "+t._s((+t.S[s]).toFixed(0))+" м^2")])])})),e("p",[t._v("Полученный битрейт для камеры: "+t._s(t.final_mBR)+" Mb/s")]),e(m.A,{staticClass:"mt-5",on:{click:function(e){t.started=!1}}},[t._v("скрыть")])],2):t._e()],1),e("div",{staticClass:"module_bg mt-5"},[e(p.A,{staticClass:"pa-5"},[e("h2",[t._v("Обратный расчет битрейта")]),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Плотность изображения (пикселей/м^2)",rules:t.rule,"hide-details":"auto"},model:{value:t.plot,callback:function(e){t.plot=t._n(e)},expression:"plot"}}),e(g.A,{staticClass:"mt-5",attrs:{flat:"",type:"number",required:"",outlined:"",clearable:"",label:"Покрываемая площадь (м^2)",rules:t.rule,"hide-details":"auto"},model:{value:t.square,callback:function(e){t.square=t._n(e)},expression:"square"}}),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.addZone}},[t._v("Добавить зону")]),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.resetZone}},[t._v("Сбросить зоны")])],1),e(p.A,{directives:[{name:"show",rawName:"v-show",value:t.analog,expression:"analog"}],staticClass:"mt-5 pa-5"},[e("h2",[t._v("Вывод для аналогового расчета видеонаблюдения")]),e("p",[t._v("Битрейт при аналоговом расчете видеонаблюдения "+t._s(t.final_mBR)+" Mb/s")]),e(m.A,{staticClass:"mt-5",on:{click:function(e){t.analog=!1}}},[t._v("скрыть")])],1)],1)])}),O=[],T={name:"video_vue",data:()=>({PPM_zones:2,Cam_height:3,cam_angle:60,Vertical_cam_angle:50,Horizontal_cam_angle:80,Camera_reach:25,Resolution_X:1920,Resolution_Y:1080,plot:"...",square:"...",kodak:.15,self:!1,started:!1,analog:!1,rule:[t=>!!t||"Необходимо заполнить это поле."],Angle_Height_LowFieldOfView:0,L_blind:0,dx:0,d:0,S:[1],f:0,Total:0,Total_Resolution:0,i:1,bottom:0,top:0,PPM:[1],Outer_angle:0,Real_L_max:0,accept:!1,mBr:0,final_mBR:0,L_big:0,Temp_f_big:0,L_small:0,Temp_f_small:0,HIPOTENUSE:0,HIPOTENUSE1:0,result:[1],pixelscount:0}),methods:{start(){this.Total=0,this.result[this.i]=0,this.mBr=0,this.final_mBR=0,this.d=0,this.started=!0;let t=30;for(this.check_len(),this.Angle_Height_LowFieldOfView=+this.cam_angle-+this.Vertical_cam_angle/2,console.log(this.Angle_Height_LowFieldOfView),this.L_blind=(+this.Cam_height*Math.tan(this.Angle_Height_LowFieldOfView*Math.PI/180)).toFixed(5),console.log(this.L_blind),+this.Camera_reach-this.L_blind<=0&&alert("Ошибка!"),this.L_blind<0&&alert("Ошибка!"),this.get_dx(),this.Total_Resolution=+this.Resolution_X*+this.Resolution_Y,this.i=1;this.i<+this.PPM_zones+1;this.i++)console.log(`____________________current cycle №${this.i}____________________`),console.log("____________________f_param____________________"),this.get_f(),console.log("____________________d_param____________________"),this.get_d(),console.log("____________________Bottom____________________"),this.get_Wigth1(),console.log("____________________Top____________________"),this.get_Wigth2(),console.log("____________________S_param____________________"),this.trap(),console.log("____________________Total_PPM____________________"),this.PPM_from_S(),this.Total+=+this.Total_Resolution*+this.d,console.log("total",this.Total),this.result[this.i]=+this.Total_Resolution*+this.d,this.mBr=(+this.Total*t*+this.kodak).toFixed(5),console.log(`Our bit rate: ${(this.mBr/1048576).toFixed(5)}`),this.final_mBR=(+this.mBr/1048576).toFixed(2),localStorage.setItem("Bitrate",this.final_mBR),this.$emit("cam_bitrate",this.final_mBR)},degtoRad(t){return console.log(`We got: ${t} deegrees.`),t*(Math.PI/180)},radtoDeg(t){return console.log(`We got: ${t} radians.`),t*(180/Math.PI)},get_dx(){this.dx=(+this.Camera_reach-this.L_blind)/+this.PPM_zones,console.log(`dx we calculated: ${this.dx}`)},get_f(){console.log("asdad",this.L_blind),console.log(this.dx),this.L_big=+this.L_blind+ +this.dx*+this.i,console.log(`L_big calculated: ${this.L_big}`),this.Temp_f_big=180*Math.atan(+this.L_big/+this.Cam_height)/Math.PI,console.log(`Temp_f_big calculated: ${this.Temp_f_big}`),this.L_small=+this.L_blind+ +this.dx*(+this.i-1),console.log(`L_small calculated: ${this.L_small}`),this.Temp_f_small=180*Math.atan(+this.L_small/+this.Cam_height)/Math.PI,console.log(`Temp_f_small calculated: ${this.Temp_f_small}`),+this.Camera_reach<(+this.L_blind+ +this.dx*+this.i)/+this.Cam_height&&console.log(` Something ain't right. ${(+this.L_blind+ +this.dx*+this.i)/+this.Cam_height} is bigger than ${+this.Camera_reach}`),this.f=+this.Temp_f_big-+this.Temp_f_small,console.log(`f we got from calculations: ${this.f}`)},get_Wigth1(){this.HIPOTENUSE=Math.sqrt((+this.L_blind+ +this.i*+this.dx)*(+this.L_blind+ +this.i*+this.dx)+ +this.Cam_height*+this.Cam_height),console.log(`HIPOTENUSE: ${this.HIPOTENUSE} !!!`),this.bottom=(2*+this.HIPOTENUSE*Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180)).toFixed(5),console.log(`width we got: ${this.bottom}`)},get_Wigth2(){this.HIPOTENUSE1=Math.sqrt((+this.L_blind+(+this.i-1)*+this.dx)*(+this.L_blind+(+this.i-1)*+this.dx)+ +this.Cam_height*+this.Cam_height),console.log(`HIPOTENUSE: ${this.HIPOTENUSE1} !!!`),console.log("tan",Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180)),console.log("hor",this.Horizontal_cam_angle),this.top=(2*+this.HIPOTENUSE1*Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180)).toFixed(5),console.log(`width we got: ${this.top}`)},get_d(){this.d=(this.f/this.Vertical_cam_angle).toFixed(5),console.log(`the calculation of d param: ${this.d}`)},trap(){console.log(this.top),this.S[this.i]=(+this.top*+this.dx+(+this.bottom-+this.top)/2*+this.dx).toFixed(5),console.log(`S we got: ${this.S[this.i]}`)},PPM_from_S(){this.PPM[this.i]=(+this.Total_Resolution*+this.d/+this.S[this.i]).toFixed(5),console.log(`PPM of zone ${+this.i} is equal to: ${+this.PPM[this.i]}`),console.log("Pixels in that zone: "+ +this.Total_Resolution*+this.d)},check_len(){if(this.Outer_angle=this.cam_angle+this.Vertical_cam_angle/2,this.Real_L_max=(this.Cam_height*Math.tan(this.Outer_angle*Math.PI/180)).toFixed(5),console.log(`Результаты функции CHECK_LEN Outer: ${this.Outer_angle}, Real L_max: ${this.Real_L_max}`),this.Outer_angle>=90)return console.log("All good."),0;this.Camera_reach>=this.Real_L_max&&(this.accept=confirm(`при введенных параметрах, реальная максимальная дальность будет ${this.Real_L_max},\n                значит какие-то параметры введены неверно. Вы хотите продолжить с реальной максимальной дальностью?`),!0===this.accept?(console.log("Продолжаем с тем, что есть, хорошо."),this.Camera_reach=this.Real_L_max,console.log(this.Camera_reach)):alert("Ну типо ошибка, да?"))},addZone(){this.started=!1,this.analog=!0;let t=30;this.pixelscount=+this.plot*+this.square,this.final_mBR+=this.pixelscount*t*+this.kodak/1048576,localStorage.setItem("Bitrate",+this.final_mBR)},resetZone(){this.started=!1,localStorage.setItem("Bitrate",Number("0")),this.final_mBR=0,this.pixelscount=0}}},B=T,U=(0,A.A)(B,R,O,!1,null,null,null),I=U.exports,$={name:"shd_vue",components:{video1:I},data(){return{snackbar:!1,timeout:2500,errorText:"Неверно введены данные или они отсутствуют",convServParam:[{id:0,title:"сервер управления",count:1,volume:300},{id:1,title:"сервер архивного управления",count:1,volume:300},{id:2,title:"сервер сопряжения",count:3,volume:600},{id:3,title:"сервер ситуационного видеонаблюдения",count:1,volume:300},{id:4,title:"сервер другой",count:3,volume:7680}],sumItUpAnswer:0,started:!1,volume3:0,volume2:0,volume1:0,volume:0,mBR1:0,mBR:"...",wats:"",users:"...",usli:0,days:"...",capacity:"...",discs:"...",standart:!1,converg:!1,dialog:!1,dialog1:!1,dialog2:!1,video:!1,rule:[t=>!!t||"Необходимо заполнить это поле."],options:[{name:"Локальная вычислительная сеть",value:"local"},{name:"Системы телефонии",value:"phone"},{name:"Система видеонаблюдения",value:"video"},{name:"Ручной режим",value:"user"}],convergChecked:!1}},methods:{extendConvServParamList(){this.convServParam.push({id:this.convServParam.length,title:"type idk",count:1,volume:0})},deleteItem:function(t,e){if(this.convServParam[e]===t)this.convServParam.splice(e,1);else{let e=this.convServParam.indexOf(t);this.convServParam.splice(e,1)}},sumItUp(){return this.sumItUpAnswer=0,this.convServParam.forEach((t=>{this.sumItUpAnswer+=t.count*t.volume})),console.log(`${this.sumItUpAnswer} ГБ      ${this.sumItUpAnswer/1024} ТБ`),this.sumItUpAnswer},getMbrVideo(){return this.video=!0,this.mBR=localStorage.getItem("Bitrate")},getVideo(){!1===this.dialog?(this.dialog=!0,this.convergChecked=!0):this.dialog=!1},getConverg(){!1===this.dialog1?(this.dialog1=!0,this.convergChecked=!0):this.dialog1=!1},getStores(){!1===this.dialog2?(this.dialog2=!0,this.standart=!0):this.dialog2=!1},start(){this.started=!0,this.getMbr(),this.Volume(),this.converg&&this.Converg(),this.Standart(),this.Power()},Power(){this.converg?(this.wats=1e3*(this.usli+2),localStorage.setItem("wats",null),localStorage.setItem("wats",this.wats),this.$emit("Power",this.wats)):(this.wats=700*(this.usli+2),localStorage.setItem("wats",null),localStorage.setItem("wats",this.wats),this.$emit("Power",this.wats))},Volume(){this.volume=this.mBR1*+this.users*+this.days*3600*24,this.volume=Math.ceil(this.volume/8e6),this.volume1=Math.ceil(this.volume/.85/.9095)},Converg(){let t=0,e=0;this.convergChecked?(t=this.sumItUp()/1024,e=Math.ceil(2*t/.85),this.volume2=Math.ceil(e+2*this.volume1),this.volume3=Math.ceil(2*this.volume1+e)/.8):(this.volume2=Math.ceil(2*this.volume1),this.volume3=Math.ceil(this.volume2/.7))},getMbr(){this.mBR1=0,"local"==this.options.value&&(this.mBR1=5),"phone"==this.options.value&&(this.mBR1=.1),"video"==this.options.value&&(this.video?this.mBR1=this.mBR:this.mBR1=8),"user"==this.options.value&&(this.mBR1+=this.mBR)},Standart(){if(this.standart?this.converg?this.usli=Math.ceil(this.volume3/this.discs/this.capacity):this.usli=Math.ceil(this.volume1/this.discs/this.capacity):this.converg?this.usli=Math.ceil(this.volume3/7/4):this.usli=Math.ceil(this.volume1/15/8),console.log(this.usli),console.log(!!this.usli),!this.usli)return this.snackbar=!0,void(this.started=!1);localStorage.setItem("usli",this.usli),localStorage.setItem("usli",this.usli+2),this.$emit("Usli",this.usli)}}},q=$,L=(0,A.A)(q,M,S,!1,null,null,null),H=L.exports,E=function(){var t=this,e=t._self._c;return e("div",[e(p.A,{staticClass:"pa-5"},[e("h1",[t._v("Система охлаждения")]),e(i.A,{staticClass:"mt-2",attrs:{label:"Расчёт в Вт?"},model:{value:t.WatOpt,callback:function(e){t.WatOpt=e},expression:"WatOpt"}}),e(g.A,{staticClass:"mt-2",attrs:{disabled:0==t.Usli_self,type:"number",outlined:"",required:"",clearable:"",label:"Количество узлов СХД (шт)",rules:t.rule,"hide-details":"auto"},model:{value:t.Usli_shd,callback:function(e){t.Usli_shd=t._n(e)},expression:"Usli_shd"}}),e(i.A,{staticClass:"mt-5",attrs:{info:"","hide-details":"",label:"Ввести вручную?"},model:{value:t.Usli_self,callback:function(e){t.Usli_self=e},expression:"Usli_self"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:!0===t.WatOpt?t.heatlabel1:t.heatlabel2,rules:t.rule,"hide-details":"auto"},model:{value:t.Heat,callback:function(e){t.Heat=t._n(e)},expression:"Heat"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"Усреднённое тепловыделение в процентах",rules:t.rule,"hide-details":"auto"},model:{value:t.K_sred,callback:function(e){t.K_sred=t._n(e)},expression:"K_sred"}}),e(i.A,{staticClass:"mt-5",attrs:{label:"Использовать коммутаторы видеонаблюдения?"},on:{change:t.komutat_Opt}}),t.komutat_opt?e("div",[e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"Колличество коммутаторов ядра",rules:t.rule,"hide-details":"auto"},model:{value:t.count_yadr,callback:function(e){t.count_yadr=t._n(e)},expression:"count_yadr"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:!0===t.WatOpt?t.komutat_yadrlabel1:t.komutat_yadrlabel2,rules:t.rule,"hide-details":"auto"},model:{value:t.komutat_yadr,callback:function(e){t.komutat_yadr=t._n(e)},expression:"komutat_yadr"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:"Колличество коммутаторов доступа",rules:t.rule,"hide-details":"auto"},model:{value:t.count_dost,callback:function(e){t.count_dost=t._n(e)},expression:"count_dost"}}),e(g.A,{staticClass:"mt-5",attrs:{type:"number",outlined:"",required:"",clearable:"",label:!0===t.WatOpt?t.komutat_dostlabel1:t.komutat_dostlabel2,rules:t.rule,"hide-details":"auto"},model:{value:t.komutat_dost,callback:function(e){t.komutat_dost=t._n(e)},expression:"komutat_dost"}})],1):t._e(),e(g.A,{staticClass:"mt-2",attrs:{type:"number",outlined:"",required:"",clearable:"",label:1==t.WatOpt?t.condition_label1:t.condition_label2,rules:t.rule,"hide-details":"auto"},model:{value:t.condition,callback:function(e){t.condition=t._n(e)},expression:"condition"}}),e(m.A,{staticClass:"mt-5",attrs:{color:"primary"},on:{click:t.start}},[t._v("Старт")])],1),e(p.A,{directives:[{name:"show",rawName:"v-show",value:t.started,expression:"started"}],staticClass:"pa-5 mt-5"},[e("h2",[t._v("Необходимое число кондиционеров: ")]),e("p",[e("strong",[t._v(t._s(t.final_result)+" шт.")])]),e(m.A,{staticClass:"mt-2",on:{click:function(e){t.started=!1}}},[t._v("скрыть")])],1)],1)},V=[],N={name:"my-condition",data:()=>({started:!1,final_result:0,komutat_opt:!1,Usli_self:!1,Usli_shd:"...",K_sred:"...",WatOpt:!0,heatlabel2:"Максимальное тепловыделение от 1 узла (BTU/hr)",heatlabel1:"Максимальное тепловыделение от 1 узла (Bт)",Heat:"...",komutat_yadrlabel2:"Тепловыделение коммутатора ядра (BTU/hr)",komutat_yadrlabel1:"Тепловыделение коммутатора ядра (Bт)",komutat_yadr:"...",count_yadr:"...",komutat_dostlabel2:"Тепловыделение коммутатора доступа (BTU/hr)",komutat_dostlabel1:"Тепловыделение коммутатора доступа (Bт)",komutat_dost:"...",count_dost:"...",condition_label2:"Мощность кондиционера (BTU/hr)",condition_label1:"Мощность кондиционера (Вт)",condition:"...",rule:[t=>!!t||"Необходимо заполнить это поле."]}),methods:{start(){this.started=!0;let t=0;0==this.komutat_opt&&(this.komutat_yadr=0,this.komutat_dost=0,this.count_yadr=0,this.count_dost=0,this.komutat_klast=0),console.log(this.WatOpt),0==this.WatOpt?(t=this.Heat*this.K_sred/100*this.Usli_shd/3.41+(this.count_yadr*this.komutat_yadr+this.count_dost*this.komutat_dost)/3.41,console.log("result",t),console.log("Heat",this.Heat),console.log("K_sred",this.K_sred),console.log("Usli_shd",this.Usli_shd),console.log("komutat_dost",this.komutat_dost),console.log("komutat_opt",this.komutat_opt),console.log("Condition",this.condition),this.final_result=Math.ceil(t/(this.condition/3.41))):(t=this.Heat*(this.K_sred/100)*this.Usli_shd,t+=this.count_yadr*this.komutat_yadr+this.count_dost*this.komutat_dost,console.log("result",t),console.log("Heat",this.Heat),console.log("K_sred",this.K_sred),console.log("Usli_shd",this.Usli_shd),console.log("komutat_dost",this.komutat_dost),console.log("komutat_opt",this.komutat_opt),console.log("Condition",this.condition),this.final_result=Math.ceil(t/this.condition))},getusli(){return this.Usli_shd=localStorage.getItem("usli"),console.log(this.Usli_shd),this.Usli_shd},komutat_Opt(){0==this.komutat_opt?this.komutat_opt=!0:this.komutat_opt=!1,this.komutat_opt,this.komutat_opt,0==this.komutat_opt?(this.komutat_yadr=0,this.komutat_dost=0,this.count_yadr=0,this.count_dost=0):(this.komutat_yadr="...",this.komutat_dost="...",this.count_yadr="...",this.count_dost="...")}}},z=N,F=(0,A.A)(z,E,V,!1,null,null,null),W=F.exports,K={name:"App",components:{shd:H,power:C,condition:W},data:()=>({regularView:!1,noMargins:!1}),methods:{getpower(){this.$refs.npower.getPower()},getUsli(){this.$refs.nusli.getusli()}}},j=K,X=(0,A.A)(j,d,h,!1,null,null,null),Y=X.exports,Z=s(5453),G=s(3689);a.Ay.use(Z.A);var D=new Z.A({breakpoint:{mobileBreakpoint:"sm"},theme:{themes:{light:{primary:G.A.blue.lighten1,secondary:G.A.lightGreen.lighten2,accent:G.A.green.accent1,error:G.A.red.darken2,success:G.A.lightGreen.lighten2},dark:{primary:G.A.red.lighten1,secondary:G.A.red.lighten2,accent:G.A.red.accent1,error:G.A.grey.darken2,success:G.A.red.lighten2}}}});a.Ay.config.productionTip=!1,new a.Ay({vuetify:D,render:t=>t(Y)}).$mount("#app")}},e={};function s(a){var l=e[a];if(void 0!==l)return l.exports;var i=e[a]={exports:{}};return t[a].call(i.exports,i,i.exports,s),i.exports}s.m=t,function(){var t=[];s.O=function(e,a,l,i){if(!a){var o=1/0;for(c=0;c<t.length;c++){a=t[c][0],l=t[c][1],i=t[c][2];for(var r=!0,n=0;n<a.length;n++)(!1&i||o>=i)&&Object.keys(s.O).every((function(t){return s.O[t](a[n])}))?a.splice(n--,1):(r=!1,i<o&&(o=i));if(r){t.splice(c--,1);var _=l();void 0!==_&&(e=_)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[a,l,i]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var l,i,o=a[0],r=a[1],n=a[2],_=0;if(o.some((function(e){return 0!==t[e]}))){for(l in r)s.o(r,l)&&(s.m[l]=r[l]);if(n)var c=n(s)}for(e&&e(a);_<o.length;_++)i=o[_],s.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return s.O(c)},a=self["webpackChunknew_project_vue2"]=self["webpackChunknew_project_vue2"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[504],(function(){return s(1193)}));a=s.O(a)})();
//# sourceMappingURL=app.8149eb4c.js.map