<template>
    <div>
        <!-- через геометрические параметры -->
        <div class="module_bg">
            <v-card
                class="pa-5"
            >
                    
                <h1>Видео (битрейт и PPM)</h1>
                
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Число зон PPM"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="PPM_zones"
                    class="mt-5"
                />
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Высота установки камеры (м)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Cam_height"
                    class="mt-5"
                />
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Угол наклона камеры (градусы)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="cam_angle"
                    class="mt-5"
                />
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Вертикальный угол обзора объектива (градусы)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Vertical_cam_angle"
                    class="mt-5"
                />
                    <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Горизонтальный угол обзора объектива (градусы)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Horizontal_cam_angle"
                    class="mt-5"
                />
                    <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Дальность обзора (м)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Camera_reach"
                    class="mt-5"
                />
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Разрешение по горизонтали (пикселей)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Resolution_X"
                    class="mt-5"
                />
                    <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Разрешение по вертикали (пикселей)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="Resolution_Y"
                    class="mt-5"
                />
                    <v-text-field
                    type="number"
                    :disabled="self === false "
                    outlined
                    clearable
                    label="Средняя доля сжатия с кодаком (0,0 - 1,0)"
                    :rules="rule"
                    hide-details="auto"
                    v-model="kodak"
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


            <!-- вывод результата -->
            <v-card
                v-if="started"
                class="pa-5 mt-5"
            >
                <h2>Вывод для раздела видео</h2>

                <!-- здесь перерисовать -->
                <div v-for="i in PPM_zones" :key="i">
                    <p>PPM в зоне номер {{i}} равняется {{PPM[i]}}, а пикселей в этой зоне {{(result[i]).toFixed(0)}}</p>
                    <p>Покрываемая площадь {{ (+S[i]).toFixed(0) }} м^2</p>
                </div>


                <p>Полученный битрейт для камеры: {{final_mBR}} Mb/s</p>
                <v-btn 
                    @click="started=false" 
                    class="mt-5"
                >скрыть</v-btn>
            </v-card>
        </div>

        <div class="module_bg mt-5">
            <v-card
                class="pa-5"
            >
                <h2>Обратный расчет битрейта</h2>
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Плотность изображения (пикселей/м^2)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="plot"
                    class="mt-5"
                />
                <v-text-field
                    flat
                    type="number"
                    required
                    outlined
                    clearable
                    label="Покрываемая площадь (м^2)"
                    :rules="rule"
                    hide-details="auto"
                    v-model.number="square"
                    class="mt-5"
                />
                <v-btn 
                    @click="addZone" 
                    color="primary" 
                    class="mt-5"
                >Добавить зону</v-btn>
                <v-btn 
                    @click="resetZone" 
                    color="primary" 
                    class="mt-5"
                >Сбросить зоны</v-btn>

            </v-card>
            <!-- вывод -->
            <v-card
                class="mt-5 pa-5"
                v-show="analog"
            >
                <h2>Вывод для аналогового расчета видеонаблюдения</h2>
                <p>Битрейт при аналоговом расчете видеонаблюдения {{ (final_mBR) }} Mb/s</p>
                <v-btn 
                    @click="analog=false" 
                    class="mt-5"
                >скрыть</v-btn>
            </v-card>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'video_vue',
        data:() =>({
            PPM_zones: 2, //Зоны PPM
            Cam_height:3, //Высота установки камеры
            cam_angle:60, //Угол наклона камеры
            Vertical_cam_angle:50,  //Вертикальный угол обзора камеры
            Horizontal_cam_angle:80,//Горизонтальный угол обзора камеры
            Camera_reach:25,        //Дальность обзора камеры
            Resolution_X:1920,      //Разрешение по горизонтали
            Resolution_Y:1080,      //Разрешение по вертикали
            plot:'...',             //Плотность изображения
            square:'...',           //Покрываемая площадь
            kodak:0.15,             //Параметр кодака
            self:false,             //Параметр, отвечающий за ручной ввод для кодака
            started:false,          //Параметр, отвечающий за вывод результатов работы программы при нажатии "Старт"
            analog:false,           //Параметр, отвечающий за вывод результатов работы программы при аналоговом расчёте
            rule: [
            value => !!value || 'Необходимо заполнить это поле.',
    ],                              //Правила для текстовых полей
            Angle_Height_LowFieldOfView:0,  //Угол, необходимый для рассчёта длины слепой зоны камеры
            L_blind:0,                      //Длина слепой зоны камеры
            dx:0,                           //
            d:0,
            S:[1],
            f:0,
            Total:0,
            Total_Resolution:0,
            i:1,
            bottom:0,
            top:0,
            PPM:[1],
            Outer_angle:0,
            Real_L_max:0,
            accept:false,
            mBr:0,
            final_mBR:0,
            L_big:0,
            Temp_f_big:0,
            L_small:0,
            Temp_f_small:0,
            HIPOTENUSE:0,
            HIPOTENUSE1:0,
            result:[1],
            pixelscount:0,
        }),

        methods:{
            start(){
                this.Total = 0
                this.result[this.i]=0
                this.mBr = 0
                this.final_mBR = 0
                this.d=0
                
                this.started = true

                let FPS = 30;
                this.check_len()
                this.Angle_Height_LowFieldOfView = +this.cam_angle-(+this.Vertical_cam_angle/2)
                console.log(this.Angle_Height_LowFieldOfView)

                this.L_blind = (+this.Cam_height*Math.tan(this.Angle_Height_LowFieldOfView*Math.PI/180)).toFixed(5)
                console.log(this.L_blind)
                if((+this.Camera_reach - this.L_blind) <=0){
                    alert ('Ошибка!')
                }if (this.L_blind <0){
                    alert('Ошибка!')
                }
                this.get_dx()
                this.Total_Resolution = +this.Resolution_X*+this.Resolution_Y
                for (this.i = 1; this.i < +this.PPM_zones+1; this.i++){
        console.log(`____________________current cycle №${this.i}____________________`);
        console.log(`____________________f_param____________________`);
        this.get_f();
        console.log(`____________________d_param____________________`);
        this.get_d();
        console.log(`____________________Bottom____________________`);
        this.get_Wigth1();
        //bottom
        console.log(`____________________Top____________________`);
        this.get_Wigth2();
        //top
        console.log(`____________________S_param____________________`);
        this.trap();
        console.log(`____________________Total_PPM____________________`);
        this.PPM_from_S()

        
        
        this.Total += (+this.Total_Resolution * +this.d)
        console.log('total',this.Total)
        this.result[this.i]= +this.Total_Resolution * +this.d
        this.mBr = (+this.Total * FPS * +this.kodak).toFixed(5)
        console.log(`Our bit rate: ${(this.mBr/(1024*1024)).toFixed(5)}`);
        this.final_mBR = (+this.mBr/(1024*1024)).toFixed(2)
        localStorage.setItem('Bitrate', this.final_mBR)
        this.$emit('cam_bitrate', this.final_mBR)
    }
        },

        degtoRad(degrees) {
                console.log(`We got: ${degrees} deegrees.`)
                return degrees * (Math.PI/180)
        },
        radtoDeg(radians) {
            console.log(`We got: ${radians} radians.`)
            return radians * (180/Math.PI);
        },

        get_dx(){
         this.dx = (+this.Camera_reach - this.L_blind) / +this.PPM_zones
         console.log(`dx we calculated: ${this.dx}`)
        },
        get_f(){
            console.log('asdad',this.L_blind)
            console.log(this.dx)
            this.L_big = +this.L_blind + (+this.dx * +this.i)
        console.log(`L_big calculated: ${this.L_big}`)
        this.Temp_f_big = Math.atan(+this.L_big / +this.Cam_height)*180/Math.PI
        console.log(`Temp_f_big calculated: ${this.Temp_f_big}`)
        this.L_small = (+this.L_blind + (+this.dx * (+this.i - 1)))
        console.log(`L_small calculated: ${this.L_small}`)
        this.Temp_f_small = Math.atan(+this.L_small / +this.Cam_height)*180/Math.PI
        console.log(`Temp_f_small calculated: ${this.Temp_f_small}`)

    if (+this.Camera_reach < ((+this.L_blind + (+this.dx * +this.i))/+this.Cam_height)){
        console.log(` Something ain't right. ${((+this.L_blind + (+this.dx * +this.i))/+this.Cam_height)} is bigger than ${+this.Camera_reach}`)
    }

    this.f = +this.Temp_f_big -+ this.Temp_f_small
    console.log(`f we got from calculations: ${this.f}`)
        },
        
        get_Wigth1(){
    this.HIPOTENUSE = Math.sqrt(((+this.L_blind+(+this.i) * +this.dx)*(+this.L_blind+(+this.i) * +this.dx))+(+this.Cam_height*+this.Cam_height));
    console.log(`HIPOTENUSE: ${this.HIPOTENUSE} !!!`);
    this.bottom = (2 * +this.HIPOTENUSE * Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180)).toFixed(5)
    console.log(`width we got: ${this.bottom}`)
        },
        get_Wigth2(){
    this.HIPOTENUSE1 = Math.sqrt(((+this.L_blind+(+this.i-1) * +this.dx)*(+this.L_blind+(+this.i-1) * +this.dx))+(+this.Cam_height*+this.Cam_height));
    console.log(`HIPOTENUSE: ${this.HIPOTENUSE1} !!!`);
    console.log('tan',Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180))
    console.log('hor', this.Horizontal_cam_angle)
    this.top = (2 * +this.HIPOTENUSE1 * Math.tan(+this.Horizontal_cam_angle/2*Math.PI/180)).toFixed(5)
    console.log(`width we got: ${this.top}`)
        },
        get_d(){
        this.d = (this.f/this.Vertical_cam_angle).toFixed(5)
        console.log(`the calculation of d param: ${this.d}`);
        },
        trap(){
        console.log(this.top)
        this.S[this.i] = (+this.top * +this.dx + ((+this.bottom - +this.top) / 2) * +this.dx).toFixed(5)
        console.log(`S we got: ${this.S[this.i]}`)
        
        },
        PPM_from_S(){
        this.PPM[this.i] = ((+this.Total_Resolution * +this.d) / +this.S[this.i]).toFixed(5);
        console.log(`PPM of zone ${+this.i} is equal to: ${+this.PPM[this.i]}`);
        console.log(`Pixels in that zone: ${+this.Total_Resolution * +this.d}`)
        },
        check_len(){
    this.Outer_angle = ( this.cam_angle + (this.Vertical_cam_angle/2))
    this.Real_L_max = (this.Cam_height * Math.tan(this.Outer_angle*Math.PI/180)).toFixed(5)
    console.log(`Результаты функции CHECK_LEN Outer: ${this.Outer_angle}, Real L_max: ${this.Real_L_max}`);
    if (this.Outer_angle >= 90){
        console.log(`All good.`)
        return 0
    } if ( this.Camera_reach >= this.Real_L_max){
        this.accept = confirm(`при введенных параметрах, реальная максимальная дальность будет ${this.Real_L_max},
         значит какие-то параметры введены неверно. Вы хотите продолжить с реальной максимальной дальностью?`)
        if ( this.accept === true) {
            console.log(`Продолжаем с тем, что есть, хорошо.`);
            this.Camera_reach = this.Real_L_max;
            console.log(this.Camera_reach);
        } else {
            alert(`Ну типо ошибка, да?`)
        }
    }
    },

        addZone(){
            this.started = false
            this.analog = true
            let FPS = 30
            this.pixelscount = +this.plot * +this.square
            this.final_mBR += (this.pixelscount* FPS*+this.kodak)/1048576
            localStorage.setItem('Bitrate', +this.final_mBR)
        },

        resetZone(){
            this.started = false
            localStorage.setItem('Bitrate', Number('0'))
            this.final_mBR = 0
            this.pixelscount = 0
        }

    },

    }
</script>

<style>

::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #d2c8c8;
    grid-template-columns: repeat(3, 1fr);
  }
  .mycols {
  display: grid;
}
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(148, 148, 156);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
.v-dialog{
    box-shadow: none;
}
</style>