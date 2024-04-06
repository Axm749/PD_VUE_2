<template>
  <div
  >
    

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
        :rules="getRule"
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
        :rules="getRule"
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
          v-model="storeDialog"
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
              @click="setStoresDialogAct"
              ><v-icon>mdi-cog</v-icon>
              Настройки узла
            </v-btn>
          </template>

          <div class="module_bg">
            <v-card
              class="pa-5"
            >

            <h1>параметры дисковых хранилищ узлов</h1>

              <v-text-field
                flat
                type="number"
                required
                outlined
                clearable
                label="Объём диска (Тбайт)"
                :rules="getRule"
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
                :rules="getRule"
                hide-details="auto"
                v-model.number="discs"
                class="mt-5"
              />
            </v-card>
          </div>
          
        <!-- <div v-show="standart"> -->
          
        <!-- </div> -->
        </v-dialog>

      </template>

      <!-- настройки сервера -->
      <template v-if="converg">
        <v-dialog
          v-model="convergDialog"
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
              @click="setConvergDialogAct"
              ><v-icon>mdi-cog</v-icon>
              Настройки сервера
            </v-btn>
          </template>

          
          <!-- сами параметры через v-for -->
          <div class="module_bg">
            <v-card
              outlined
              class="pa-5"
            >
              
              <h1>Доп. сервера</h1>
              

              <div 
                v-for="(server, index) in getConvServParams"
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
                  :rules="getRule"
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
                  :rules="getRule"
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
                  :rules="getRule"
                  hide-details="auto"
                  class="mt-5"
                />
                <v-btn
                  color="error"
                  @click="deleteItemAct(server, index)"
                  class="mt-5 ml-2 mb-2"
                >  <v-icon>mdi-trash-can</v-icon>  удалить </v-btn>

              </div>

              <v-btn
                color="primary"
                @click="extendConvServParamListAct"
                class="ma-5"
              >добавить</v-btn>

              <!-- <v-btn
                color="success"
                @click="sumItUp"
                class="mt-5"
              >суммарный объём</v-btn> -->
          
            </v-card>
          </div>
        </v-dialog>
      </template>

      
      
      

      <!-- выбор режима -->
      <v-select
        required
        v-model="getOptions.value"
        density="comfortable"
        style="margin-top: 10px"
        hide-details
        outlined
        :items="getOptions"
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
        v-show="getOptions.value == 'user'"
        flat
        outlined
        clearable
        label="Мбит/сек"
        :rules="getRule"
        hide-details="auto"
        v-model.number="MBr"
        class="mt-5"
      ></v-text-field>


      <!-- доступ к вычислениям видеонаблюдения -->
      <template v-if="getOptions.value == 'video'">
        <v-dialog
          v-model="videoDialog"
          novalidate
          width="auto"
          aria-hidden="true"
          class="mt-5"
        >
          <template v-slot:activator="{ props }">
            <!-- <br> -->
            <v-btn
              max-width="100%"
              color="primary"
              v-bind="props"
              @click="setVideoDialogAct"
              class="mt-5 mr-5"
              ><v-icon>mdi-cog</v-icon>
              Дополнительно
            </v-btn>
          </template>

          <video1 @cam_bitrate="setMbrVideoAct" />

        </v-dialog>
      </template>



      <!-- старт -->
      <v-btn 
        @click="StartShdAct" 
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
        <p>Требуемый объём для хранения видеоданных <strong>{{ getMainVolume }} TiB</strong> </p>
        <p>
          Требуемый объём СХД с учетом перевода TiB в Тбайт <strong>{{ getMainVolumeTbait }} Тбайт</strong>
        </p>
        <div v-show="converg">
          <p>Объём с резервным копированием <strong>{{ getRezervVolume }} Тбайт</strong></p>
          <p>С учетом резерва требуемая от СХД полезная ёмкость составит
            <strong>{{ getUsefullVolume }} Тбайт;</strong></p>
        </div>
        <p>Узлов без резервирования <strong>{{ getUsliShd }} шт;</strong></p>
        <p>Узлов с резервированием <strong>{{ getUsliShd + 2 }} шт.</strong></p>

        <v-btn
          disabled
          class="mt-2  mr-5"
        >сохранить (WIP)</v-btn>
        <v-btn
          @click="setShdStartedAct(false)"
          class="mt-2"
        >скрыть</v-btn>
    </v-card>

    <!-- уведомление об ошибке -->
    <v-snackbar
      v-model="snackbar"
      :timeout="getTimeout"
    >
      {{ getErrorText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="accent"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>

  </div>

  


</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import video1 from "./video1.vue";

export default {
  name: "shd_vue",
  components: {
    video1,
  },
  computed:{
    ...mapGetters('myShd',
    [
      'getMBr',
      'getCapacity',
      'getDays',
      'getUsers',
      'getDiscs',
      'getConvServParams',
      'getOptions',
      'getRule',
      'getVideoDialog',
      'getConvergDialog',
      'getStoresDialog',
      'getConvergOpt',
      'getStandartOpt',
      'getSnackbar',
      'getTimeout',
      'getErrorText',
      'getMainVolume',
      'getMainVolumeTbait',
      'getRezervVolume',
      'getUsefullVolume',
      'getUsliShd',
      'getStartedShd'
  ] 
    ),
        users:{
            get() {
                console.log('getUsers', this.getUsers)
                return this.getUsers
            },
            async set(value){
                console.log('setUsers', value)
                await this.setUsersAct(value)
            }
        },
        capacity:{
            get() {
                console.log('getCapacity', this.getCapacity)
                return this.getCapacity
            },
            async set(value){
                console.log('setCapacity', value)
                await this.setCapacityAct(value)
            }
        },
        days:{
          get() {
                console.log('getDays', this.getDays)
                return this.getDays
            },
          async set(value){
                console.log('setDays', value)
                await this.setDaysAct(value)
            }
        },
        discs:{
            get() {
                console.log('getDiscs', this.getDiscs)
                return this.getDiscs
            },
            async set(value){
                console.log('setDiscs', value)
                await this.setDiscsAct(value)
            }
        },
        MBr:{
            get() {
                console.log('getMBr', this.getMBr)
                return this.getMBr
            },
            async set(value){
                console.log('setMBr', value)
                await this.setMBrAct(value)
            }
        },
        converg:{
          get(){
            console.log('getConverg',this.getConvergOpt)
            return this.getConvergOpt
          },
          async set(value){
            console.log('setConverg', value)
            await this.setConvergOptAct(value)
          }
        },
        standart:{
          get(){
            console.log('getStandart',this.getStandartOpt)
            return this.getStandartOpt
          },
          async set(value){
            console.log('setStandart', value)
            await this.setStandartOptAct(value)
          }
        },
        snackbar:{
          get(){
            console.log('getSnackbar',this.getSnackbar)
            return this.getSnackbar
          },
          async set(value){
            console.log('setSnackbar', value)
            await this.setSnackbarAct(value)
          }
        },
        started:{
          get(){
            console.log('getStarted',this.getStartedShd)
            return this.getStartedShd
          },
          async set(value){
            console.log('setStarted', value)
            await this.setShdStartedAct(value)
          }
        },
        convergDialog:{
          get(){
            console.log('getConvergDialog', this.getConvergDialog)
            return this.getConvergDialog
          },
          async set(){
            console.log('setConvergDialog')
            await this.setConvergDialogAct()
          }
        },
        videoDialog:{
          get(){
            console.log('getVideoDialog', this.getVideoDialog)
            return this.getVideoDialog
          },
          async set(){
            console.log('setConvergDialog')
            await this.setVideoDialogAct()
          }
        },
        storeDialog:{
          get(){
            console.log('getStoreDialog', this.getStoresDialog)
            return this.getStoresDialog
          },
          async set(){
            console.log('setStoreDialog')
            await this.setStoresDialogAct()
          }
        },
        videoDialog:{
          get(){
            console.log('getVideoDialog', this.getVideoDialog)
            return this.getVideoDialog
          },
          async set(){
            console.log('setVideoDialogAct')
            await this.setVideoDialogAct()
          }
        },
  },
  methods: {
    ...mapActions('myShd',
    [
      'setMBrAct',
      'setCapacityAct',
      'setDaysAct',
      'setUsersAct',
      'setDiscsAct',
      'extendConvServParamListAct',
      'deleteItemAct',
      'setVideoDialogAct',
      'setConvergDialogAct',
      'setStoresDialogAct',
      'setConvergOptAct',
      'setStandartOptAct',
      'setSnackbarAct',
      'StartShdAct',
      'setShdStartedAct',
      'setMbrVideoAct',
    ]
    ),    

  },
};
</script>

