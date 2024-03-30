<template>
  <div>
    <v-container style="border-radius: 20px" fluid>
      <h1>Система хранения данных</h1>
      <br />
      <v-text-field
        outlined
        type="number"
        required
        clearable
        label="Количество устройств"
        :rules="rule"
        hide-details="auto"
        v-model.number="users"
      ></v-text-field>
      <br />
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
      ></v-text-field>

      <v-checkbox
        info
        hide-details
        label="Узел не стандартный?"
        v-model="standart"
      >
      </v-checkbox>
      <v-checkbox
        info
        hide-details
        label="Система гиперконвергентна?"
        v-model="converg"
      >
      </v-checkbox>
      <template v-if="converg">
        <v-dialog
          v-model="dialog1"
          width="80%"
          :scrollable="false"
          aria-hidden="true"
        >
          <template v-slot:activator="{ props1 }">
            <v-btn
              class="mt-2"
              max-width="100%"
              color="primary"
              v-bind="props1"
              @click="getConverg"
              ><v-icon>mdi-cog</v-icon>
              Настройки сервера
            </v-btn>
          </template>
          <v-container fluid>
            <h1>Настройки сервера</h1>
            <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Дисковая память сервера управления (Гбайт)"
                :rules="rule"
                hide-details="auto"
                v-model="ManageServer_capacity"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Количество серверов управления"
                :rules="rule"
                hide-details="auto"
                v-model.number="ManageServer_count"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Дисковая память сервера управления архивом (Гбайт)"
                :rules="rule"
                hide-details="auto"
                v-model.number="ArchManageServer_capacity"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Количество серверов управления архивом"
                :rules="rule"
                hide-details="auto"
                v-model.number="ArchManageServer_count"
              ></v-text-field>
              <div v-if="options.value == 'video'">
                <br>
                <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Дисковая память сервера видеоархива (Гбайт)"
                :rules="rule"
                hide-details="auto"
                v-model.number="ArchVideoServer_capacity"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Количество серверов видеоархива"
                :rules="rule"
                hide-details="auto"
                v-model.number="ArchVideoServer_count"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Дисковая память серверов ситуационного видеонаблюдения (Гбайт)"
                :rules="rule"
                hide-details="auto"
                v-model.number="SituationVideoServer_capacity"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Количество серверов ситуационного видеонаблюдения"
                :rules="rule"
                hide-details="auto"
                v-model.number="SituationVideoServer_count"
              ></v-text-field>
              </div>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Дисковая память сервера сопряжения (Гбайт)"
                :rules="rule"
                hide-details="auto"
                v-model.number="ConnectServer_capacity"
              ></v-text-field>
              <br>
              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Количество серверов сопряжения"
                :rules="rule"
                hide-details="auto"
                v-model.number="ConnectServer_count"
              ></v-text-field>
          </v-container>
        </v-dialog>
      </template>
      <br />
      <div v-show="standart">
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
        ></v-text-field>
        <br />
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
        ></v-text-field>
        <br />
      </div>
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
      ></v-select>
      <br />
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
      ></v-text-field>
      <v-btn @click="start" color="primary">Старт</v-btn>
      <br /><br />
      <template v-if="options.value == 'video'">
        <v-dialog
          v-model="dialog"
          novalidate
          width="auto"
          :scrollable="false"
          aria-hidden="true"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              max-width="100%"
              color="primary"
              v-bind="props"
              @click="getVideo"
              ><v-icon>mdi-cog</v-icon>
              Дополнительно
            </v-btn>
          </template>
          <video1 @cam_bitrate="getMbrVideo" />
        </v-dialog>
      </template>
    </v-container>
    <v-container fluid>
      <h2>Вывод для раздела системы хранения данных</h2>
      <div v-show="started">
        <p>Требуемый объём для хранения видеоданных {{ volume }} TiB</p>
        <p>
          Требуемый объём СХД с учетом перевода TiB в Тбайт {{ volume1 }} Тбайт
        </p>
        <div v-show="converg">
          <p>Объём с резервным копированием {{ volume2 }} Тбайт</p>
          <p>
            С учетом резерва требуемая от СХД полезная ёмкость составит
            {{ volume3 }} Тбайт
          </p>
        </div>
        <p>Количество узлов {{ usli }} шт</p>
        <p>Количество узлов с резервированием {{ usli + 2 }} шт</p>
      </div>
    </v-container>
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
      video: false, //Параметр, отвечающий за использование битрейта с видеонаблюдения
      rule: [(value) => !!value || "Необходимо заполнить это поле."], //Правила для текстовых полей
      options: [
        { name: "Локальная вычислительная сеть", value: "local" },
        { name: "Системы телефонии", value: "phone" },
        { name: "Система видеонаблюдения", value: "video" },
        { name: "Ручной режим", value: "user" },
      ], //Выбор режимов
      ManageServer_count: '...',
      ManageServer_capacity:'...',
      ArchManageServer_count: '...',
      ArchManageServer_capacity:'...',
      ArchVideoServer_count: '...',
      ArchVideoServer_capacity:'...',
      SituationVideoServer_count: '...',
      SituationVideoServer_capacity:'...',
      ConnectServer_count: '...',
      ConnectServer_capacity:'...',
      convergChecked: false,
    };
  },
  methods: {
    getMbrVideo() {
      console.log("cams_Mbr", (this.mBr = localStorage.getItem("Bitrate")));
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

    start() {
      this.started = true;
      this.getMbr();
      console.log(this.mBR1);
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
        console.log(this.wats);
        localStorage.setItem("wats", null);
        localStorage.setItem("wats", this.wats);
        this.$emit("Power", this.wats);
      } else {
        //Мощность при негиперконвергентной системе
        this.wats = (this.usli + 2) * 700;
        console.log(this.wats);
        localStorage.setItem("wats", null);
        localStorage.setItem("wats", this.wats);
        this.$emit("Power", this.wats);
      }
    }, //Ф-ция, передающая параметр мощности в зависимости от типа системы

    Volume() {
      this.volume = this.mBR1 * +this.users * +this.days * 3600 * 24;
      console.log("volume", this.volume);

      this.volume = Math.ceil(this.volume / 8000000);
      console.log("Рассчитанный объём в TiB:   ", this.volume);

      this.volume1 = Math.ceil(this.volume / 0.85 / 0.9095);
      console.log("Рассчитанный объём, переведённый в Tбайт:   ", this.volume1);
    }, //Ф-ция, рассчитывающая объём СХД без учёта резерва

    Converg() {
        let server_volume =0
        let disc_group =0
        if(this.convergChecked){

        
        if(this.options.value != 'video')
        (
        this.ArchVideoServer_capacity = 0,
        this.ArchVideoServer_count =0,
        this.SituationVideoServer_capacity=0,
        this.SituationVideoServer_count=0
        )
        console.log('СУ', this.ManageServer_count, '   ', this.ManageServer_capacity)
        console.log('СУА', this.ArchManageServer_count, '   ', this.ArchManageServer_capacity)
        console.log('СОПР', this.ConnectServer_count, '   ', this.ConnectServer_capacity)
        console.log('СИТУАЦИИ', this.SituationVideoServer_count, '   ', this.SituationVideoServer_capacity)
        console.log('СУВА', this.ArchVideoServer_count, '   ', this.ArchVideoServer_capacity)

        server_volume = +this.ManageServer_capacity/1024*+this.ManageServer_count+this.ArchManageServer_capacity/1024*+this.ArchManageServer_count+ this.ArchVideoServer_capacity/1024*+this.ArchManageServer_count+ this.ConnectServer_capacity/1024*+this.ConnectServer_count+this.SituationVideoServer_capacity/1024*+this.SituationVideoServer_count
        console.log('объём сервера', server_volume)
        disc_group = Math.ceil(server_volume*2 / 0.85);
        this.volume2 = Math.ceil(disc_group+2*this.volume1)
        console.log('Объём с резервным копированием', this.volume2)

        this.volume3= Math.ceil(2*this.volume1 + disc_group)/0.8
        console.log(
          "С учетом резерва требуемая от СХД полезная ёмкость",
          this.volume3,
          " Тбайт"
        )}
        else{
            this.volume2= Math.ceil(this.volume1*2)
            console.log('Объём с резервным копированием   ', this.volume2)
            this.volume3 = Math.ceil(this.volume2/0.7)
            console.log('учетом резерва требуемая от СХД полезная ёмкость', this.volume3)
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
      if (!this.standart && !this.converg) {
        //Стандартный узел и негиперконвергентная система
        this.usli = Math.ceil(this.volume1 / 15 / 8);
        console.log("Количество узлов :   ", this.usli, " шт");
        console.log(
          "Количество узлов с резервированием:   ",
          this.usli + 2,
          " шт"
        );
        localStorage.setItem("usli", null);
        localStorage.setItem("usli", this.usli + 2);
        this.$emit("Usli", this.usli);
      } else if (!this.standart && this.converg) {
        //Стандартный узел и гиперконвергентная система
        this.usli = Math.ceil(this.volume3 / 7 / 4);
        console.log("Количество узлов :   ", this.usli, " шт");
        console.log(
          "Количество узлов с резервированием:   ",
          this.usli + 2,
          " шт"
        );
        localStorage.setItem("usli", null);
        localStorage.setItem("usli", this.usli + 2);
        this.$emit("Usli", this.usli);
      } else {
        //Нестандартный узел и негиперконвергентная система
        this.usli = Math.ceil(this.volume1 / +this.discs / +this.capacity);
        console.log("Количество узлов :   ", this.usli, " шт");
        console.log(
          "Количество узлов с резервированием:   ",
          this.usli + 2,
          " шт"
        );
        localStorage.setItem("usli", null);
        localStorage.setItem("usli", this.usli + 2);
        this.$emit("Usli", this.usli);
      }
    }, //Ф-ция, рассчитывающа число узлов для различных типов систем и узлов
  },
};
</script>

<style>
.v-text-field {
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: white;
}
</style>
