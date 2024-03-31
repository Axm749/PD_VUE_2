<template>
  <div class="module_bg">
    

    <!-- ввод требований -->
    <v-card 
      class="pa-5" 
    >
      <h1>Система хранения данных</h1>

      <v-text-field
        outlined
        type="number"
        required
        clearable
        label="Количество устройств"
        :rules="rule"
        hide-details="auto"
        v-model.number="users"
        class="mt-5"
      />
      
      <v-text-field
        flat
        type="number"
        required
        outlined
        clearable
        label="Дни хранения"
        :rules="rule"
        hide-details="auto"
        v-model.number="days"
        class="mt-5"
      />
      <!-- стандратный ли узел -->
      <v-checkbox
        info
        hide-details
        label="Узел не стандартный?"
        v-model="standart"
        class="mt-5"
      />
      <!-- гиперконвергентность -->
      <v-checkbox
        info
        hide-details
        label="Система гиперконвергентна?"
        v-model="converg"
        class="mt-5"
      />

      <!-- если диск нестандартный -->
      <template v-if="standart">
        <v-dialog
          v-model="dialog2"
          transition="dialog-bottom-transition"
          width="80%"
          :scrollable="false"
          aria-hidden="true"
        >
        <template v-slot:activator="{ props2 }">
            <v-btn
              class="mt-2 mt-5"
              width="100%"
              color="primary"
              v-bind="props2"
              @click="getStores"
              ><v-icon>mdi-cog</v-icon>
              Настройки узла
            </v-btn>
          </template>

        
          <v-card
            class="pa-5 mt-5"
          >

          <h1>параметры дисковых хранилищ узлов</h1>

            <v-text-field
              flat
              type="number"
              required
              outlined
              clearable
              label="Объём диска (Тбайт)"
              :rules="rule"
              hide-details="auto"
              v-model.number="capacity"
              class="mt-5"
            />
            
            <v-text-field
              flat
              type="number"
              required
              outlined
              clearable
              label="Количество дисков"
              :rules="rule"
              hide-details="auto"
              v-model.number="discs"
              class="mt-5"
            />
          </v-card>
        <!-- <div v-show="standart"> -->
          
        <!-- </div> -->
        </v-dialog>

      </template>

      <!-- настройки сервера -->
      <template v-if="converg">
        <v-dialog
          v-model="dialog1"
          transition="dialog-bottom-transition"
          width="80%"
          
          aria-hidden="true"
        >
          <template v-slot:activator="{ props1 }">
            <v-btn
              class="mt-2 mt-5"
              width="100%"
              color="primary"
              v-bind="props1"
              @click="getConverg"
              ><v-icon>mdi-cog</v-icon>
              Настройки сервера
            </v-btn>
          </template>

          
          <!-- сами параметры через v-for -->
          <v-card
            outlined
            class="pa-5 mt-5"
          >
            
            <h1>Дополнительные сервера</h1>
            

            <div 
              v-for="(server, index) in convServParam"
              :key="index"
              class="mt-5 inCardTab"
            >
              
              
              <v-text-field
                v-model="server.title"
                required
                outlined
                clearable
                label="название"
                prepend-icon="mdi-table-column"
                placeholder="hello"
                :rules="rule"
                hide-details="auto"
                class="mt-2"
              />
              
              <v-text-field
                v-model="server.count"
                type="number"
                required
                outlined
                clearable
                prepend-icon="mdi-counter"
                label="количество (шт)"
                :rules="rule"
                hide-details="auto"
                class="mt-5"
              />
              
              <v-text-field
                v-model="server.volume"
                type="number"
                required
                outlined
                clearable
                prepend-icon="mdi-disc-player"
                label="объём (ГБ)"
                :rules="rule"
                hide-details="auto"
                class="mt-5"
              />
              <v-btn
                color="error"
                @click="deleteItem(server, index)"
                class="mt-5 ml-2 mb-2"
              >  <v-icon>mdi-trash-can</v-icon>  удалить </v-btn>

            </div>

            <v-btn
              color="primary"
              @click="extendConvServParamList"
              class="ma-5"
            >добавить</v-btn>

            <!-- <v-btn
              color="success"
              @click="sumItUp"
              class="mt-5"
            >суммарный объём</v-btn> -->
            
            
            


          </v-card>
        </v-dialog>
      </template>

      
      
      

      <!-- выбор режима -->
      <v-select
        required
        v-model="options.value"
        density="comfortable"
        style="margin-top: 10px"
        hide-details
        outlined
        :items="options"
        item-text="name"
        item-value="value"
        label="Выберите режим"
        class="mt-5"
      />
      
      <v-text-field
        ref="mBRRef"
        required
        type="number"
        style="margin-bottom: 20px"
        v-show="options.value == 'user'"
        flat
        outlined
        clearable
        label="Мбит/сек"
        :rules="rule"
        hide-details="auto"
        v-model.number="mBR"
        class="mt-5"
      ></v-text-field>


      <!-- доступ к вычислениям видеонаблюдения -->
      <template v-if="options.value == 'video'">
        <v-dialog
          v-model="dialog"
          novalidate
          width="auto"
          :scrollable="false"
          aria-hidden="true"
          class="mt-5"
        >
          <template v-slot:activator="{ props }">
            <!-- <br> -->
            <v-btn
              max-width="100%"
              color="primary"
              v-bind="props"
              @click="getVideo"
              class="mt-5 mr-5"
              ><v-icon>mdi-cog</v-icon>
              Дополнительно
            </v-btn>
          </template>

          <video1 @cam_bitrate="getMbrVideo" />

        </v-dialog>
      </template>



      <!-- старт -->
      <v-btn 
        @click="start" 
        color="primary" 
        class="mt-5"
      >Старт</v-btn>
    </v-card>


    <!-- результаты вычислений -->
    <v-card 
      class="pa-5 mt-5"
      v-show="started"
    >
      <!-- <h2>Вывод для раздела системы хранения данных</h2> -->
        <p>Требуемый объём для хранения видеоданных <strong>{{ volume }} TiB</strong> </p>
        <p>
          Требуемый объём СХД с учетом перевода TiB в Тбайт <strong>{{ volume1 }} Тбайт</strong>
        </p>
        <div v-show="converg">
          <p>Объём с резервным копированием <strong>{{ volume2 }} Тбайт</strong></p>
          <p>С учетом резерва требуемая от СХД полезная ёмкость составит
            <strong>{{ volume3 }} Тбайт;</strong></p>
        </div>
        <p>Узлов без резервирования <strong>{{ usli }} шт;</strong></p>
        <p>Узлов с резервированием <strong>{{ usli + 2 }} шт.</strong></p>

        <v-btn
          disabled
          class="mt-2"
        >сохранить (WIP)</v-btn>
        <v-btn
          @click="started=false"
          class="mt-2 ml-5"
        >скрыть</v-btn>
    </v-card>
  </div>

  


</template>

<script>
import video1 from "./video1.vue";

export default {
  name: "shd_vue",
  components: {
    video1,
  },
  data() {
    return {
      convServParam: [
        {id: 0, title: `сервер управления`, count: 1, volume: 300},
        {id: 1, title: `сервер архивного управления`, count: 1, volume: 300},
        {id: 2, title: `сервер сопряжения`, count: 3, volume: 600},
        {id: 3, title: `сервер ситуационного видеонаблюдения`, count: 1, volume: 300},
        {id: 4, title: `сервер другой`, count: 3, volume: 7680}
      ], 
      // список дополнительных серверов вносящих свои требования к объёму схд
      sumItUpAnswer: 0, //объём всех серверов вместе взятых, ГБ



      started: false,
      volume3: 0, //Полезная ёмкость с учетом резерва
      volume2: 0, //Объём с резервным копированием
      volume1: 0, //Требуемый объём СХД с учётом перевода TiB в Тбайт
      volume: 0, //Требуемый объём для хранения данных
      mBR1: 0, //Параметр битрета для непосредственного расчёта(используется исключительно в формуле)
      mBR: "...", //Параметр битрейта для текстового поля (для передачи данных из V-model при ручном режиме или при получении битрейта от видеонаблюдения)
      wats: "", //Мощность, требуемая для рассчёта времени работы на резервном питании
      users: "...", // Число устройств
      usli: 0, //Кол-во узлов
      days: "...", //Дни для рассчёта
      capacity: "...", //Объём дисков при нестандартных узлах
      discs: "...", //Кол-во дисков при нестандартных узлах
      standart: false, //Параметр, отвечающий за стандартные/нестандартные узлы(по умолчанию стандартные узлы)
      converg: false, //Параметр, отвечающий за гиперконвергентную/негиперконвергентную систему(по умолчанию негиперконвергентная)
      dialog: false, //Параметр, отвечающий за отображение видеонаблюдения
      dialog1: false,
      dialog2: false,
      video: false, //Параметр, отвечающий за использование битрейта с видеонаблюдения
      rule: [(value) => !!value || "Необходимо заполнить это поле."], //Правила для текстовых полей
      options: [
        { name: "Локальная вычислительная сеть", value: "local" },
        { name: "Системы телефонии", value: "phone" },
        { name: "Система видеонаблюдения", value: "video" },
        { name: "Ручной режим", value: "user" },
      ], //Выбор режимов

      convergChecked: false,
    };
  },
  methods: {
    
    // изменение списка дополнительных серверов для гиперконвергента
    extendConvServParamList(){
      // console.log('hello, making a new member')
      // console.log(this.convServParam)
      // console.log(this.convServParam.length)
      // console.log(this.convServParam[this.convServParam.length-1])
      this.convServParam.push({
        id: this.convServParam.length, 
        title: `type idk`, 
        count: 1, 
        volume: 0,
      }) 
      
      // console.log(this.convServParam)
    },
    deleteItem: function (item, index) {
      if(this.convServParam[index] === item) { 
      // The template passes index as the second parameter to avoid indexOf, 
      // it will be better for the performance especially for one large array
      // (because indexOf actually loop the array to do the match)
        this.convServParam.splice(index, 1)
        // console.log(this.convServParam)
      } else {
        let found = this.convServParam.indexOf(item)
        this.convServParam.splice(found, 1)
      }
    },

    
    sumItUp(){
      this.sumItUpAnswer = 0
      this.convServParam.forEach( servParam => {
        this.sumItUpAnswer += (servParam.count*servParam.volume)
      })
      console.log( `${this.sumItUpAnswer} ГБ      ${this.sumItUpAnswer/1024} ТБ`)
      return this.sumItUpAnswer
    }, // суммарный объём всех серверов в гиперконвергентной вкладке
    



    
    
    getMbrVideo() {
      // console.log("cams_Mbr", (this.mBr = localStorage.getItem("Bitrate")));
      this.video = true;
      return (this.mBR = localStorage.getItem("Bitrate"));
    }, //Ф-ция, отвечающая за присвоение битрейта от видеокамер

    getVideo() {
      if (this.dialog === false) {
        this.dialog = true;
        this.convergChecked = true
      } else {
        this.dialog = false;
      }
    }, //Ф-ция, отвечающая за вкладку с видеонаблюдением

    getConverg(){
        if (this.dialog1 === false) {
        this.dialog1 = true;
        this.convergChecked = true
      } else {
        this.dialog1 = false;
      }
    },

    getStores(){
        if (this.dialog2 === false) {
        this.dialog2 = true;
        this.standart = true
      } else {
        this.dialog2 = false;
      }
    },

    start() {
      this.started = true;
      this.getMbr();
      // console.log(this.mBR1);
      this.Volume();
      if(this.converg)
        this.Converg();

      this.Standart();
      this.Power();
    }, //Старт

    Power() {
      if (this.converg) {
        //Мощность при гиперконвергентной системе
        this.wats = (this.usli + 2) * 1000;
        // console.log(this.wats);
        localStorage.setItem("wats", null);
        localStorage.setItem("wats", this.wats);
        this.$emit("Power", this.wats);
      } else {
        //Мощность при негиперконвергентной системе
        this.wats = (this.usli + 2) * 700;
        // console.log(this.wats);
        localStorage.setItem("wats", null);
        localStorage.setItem("wats", this.wats);
        this.$emit("Power", this.wats);
      }
    }, //Ф-ция, передающая параметр мощности в зависимости от типа системы

    Volume() {
      this.volume = this.mBR1 * +this.users * +this.days * 3600 * 24;
      // console.log("volume", this.volume);

      this.volume = Math.ceil(this.volume / 8000000);
      // console.log("Рассчитанный объём в TiB:   ", this.volume);

      this.volume1 = Math.ceil(this.volume / 0.85 / 0.9095);
      // console.log("Рассчитанный объём, переведённый в Tбайт:   ", this.volume1);
    }, //Ф-ция, рассчитывающая объём СХД без учёта резерва

    Converg() {
        let server_volume =0
        let disc_group =0
        if(this.convergChecked){

        server_volume = this.sumItUp()/1024
        // console.log('объём сервера (ТБ)', server_volume)
        
        disc_group = Math.ceil(server_volume*2 / 0.85);
        this.volume2 = Math.ceil(disc_group+2*this.volume1)
        // console.log('Объём с резервным копированием', this.volume2)

        this.volume3= Math.ceil(2*this.volume1 + disc_group)/0.8
        // console.log(
        //   "С учетом резерва требуемая от СХД полезная ёмкость",
        //   this.volume3,
        //   " Тбайт"
        // )
        }
        else{
            this.volume2= Math.ceil(this.volume1*2)
            // console.log('Объём с резервным копированием   ', this.volume2)
            this.volume3 = Math.ceil(this.volume2/0.7)
            // console.log('учетом резерва требуемая от СХД полезная ёмкость', this.volume3)
        }
    }, //Ф-ция, учитывающая объём СХД с резервом (при гиперконвергентной системе)

    getMbr() {
      this.mBR1 = 0;
      if (this.options.value == "local") {
        //Локальные вычислительные сети
        this.mBR1 = 5;
      }
      if (this.options.value == "phone") {
        //Системы телефонии
        this.mBR1 = 0.1;
      }
      if (this.options.value == "video") {
        //Система видеонаблюденя
        if (this.video) {
          this.mBR1 = this.mBR;
        } else {
          this.mBR1 = 8;
        }
      }
      if (this.options.value == "user") {
        //Ручной режим
        this.mBR1 += this.mBR;
      }
    }, //Ф-ция, присваивающая значение битрейта при разных режимах

    Standart() {
      if (!this.standart){
        // стандартные узлы
        if (this.converg){
          // гиперконвергентные системы
          this.usli = Math.ceil(this.volume3 / 7 / 4);
        } else {
          // обычные системы
          this.usli = Math.ceil(this.volume1 / 15 / 8);
        }
      } else{
        // свои узлы
        if (this.converg){ 
          // гиперконвергентные системы
          this.usli = Math.ceil(this.volume3 / this.discs / this.capacity);
        } else {
          // здесь не важно, какой тип системы, ведь оно учитывалось в объёме
          this.usli = Math.ceil(this.volume1 / this.discs / this.capacity);
        }

      }
      localStorage.setItem("usli", this.usli);
      localStorage.setItem("usli", this.usli + 2);
      this.$emit("Usli", this.usli);
      // console.log('emitting Usli')
      
      // if (!this.standart && !this.converg) {
      //   //Стандартный узел и негиперконвергентная система
      //   this.usli = Math.ceil(this.volume1 / 15 / 8);
      //   localStorage.setItem("usli", null);
      //   localStorage.setItem("usli", this.usli + 2);
      //   this.$emit("Usli", this.usli);
      // } else if (!this.standart && this.converg) {
      //   //Стандартный узел и гиперконвергентная система
      //   this.usli = Math.ceil(this.volume3 / 7 / 4);
      //   // console.log("Количество узлов :   ", this.usli, " шт");
      //   // console.log(
      //   //   "Количество узлов с резервированием:   ",
      //   //   this.usli + 2,
      //   //   " шт"
      //   // );
      //   localStorage.setItem("usli", null);
      //   localStorage.setItem("usli", this.usli + 2);
      //   this.$emit("Usli", this.usli);
      // } else {
      //   //Нестандартный узел и негиперконвергентная система
      //   this.usli = Math.ceil(this.volume1 / this.discs / this.capacity);
      //   // console.log("Количество узлов :   ", this.usli, " шт");
      //   // console.log(
      //   //   "Количество узлов с резервированием:   ",
      //   //   this.usli + 2,
      //   //   " шт"
      //   // );
      //   localStorage.setItem("usli", null);
      //   localStorage.setItem("usli", this.usli + 2);
      //   this.$emit("Usli", this.usli);
      // }
    }, //Ф-ция, рассчитывающа число узлов для различных типов систем и узлов
  },
};
</script>

