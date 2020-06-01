<template>
  <div>

      <v-data-table
          :headers="headers"
          :items="weatherList"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="name"
          show-expand
          class="elevation-1"
      >
          <template v-slot:top v-if="modalEditing">
              <v-toolbar flat color="white">
                  <v-toolbar-title>My CRUD</v-toolbar-title>
                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="900px">
                      <template v-slot:activator="{ on }">
                          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                      </template>
                      <v-card>
                          <v-card-title>
                              <span class="headline"> {{formTitle}} </span>
                          </v-card-title>

                          <v-card-text>
                              <v-container>
                                  <v-row>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.name" label="city"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.sys.country" label="Country"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.humidity" label="humidity"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.temp" label="temperature"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.temp_min" label="temperature min"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.temp_max" label="temperature max"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.temp_max" label="temperature max"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.main.temp_max" label="temperature max"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.weather.description" label="sky"></v-text-field>
                                      </v-col>
                                      <v-col cols="12" sm="6" md="3">
                                          <v-text-field v-model="editedItem.wind.speed" label="wind speed"></v-text-field>
                                      </v-col>
                                  </v-row>
                              </v-container>
                          </v-card-text>

                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
              </v-toolbar>
          </template>
          <template v-slot:item.country="{  item }">
              <td>{{ item.sys.country }}</td>
          </template>
          <template v-slot:item.description="{  item }">
              <td>
                  <v-chip v-for="(desc, i) in item.weather" :key="i">
                      {{ desc.description }}
                  </v-chip>
              </td>
          </template>
          <template v-slot:item.temp="{  item }">
              <td>{{ item.main.temp }}℃</td>
          </template>
<!--        v-if="controlActions"-->
          <template v-slot:item.actions="{ item }">
              <div class="d-flex" v-if="controlActions">
                  <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                  >mdi-pencil
                  </v-icon>
                  <v-icon
                      small
                      class="mr-2"
                      @click="deleteItem(item)"
                  >mdi-delete
                  </v-icon>
                  <v-icon
                      small
                      class="mr-2"
                      @click="downloadToLocal(item)"
                  >mdi-cloud-download
                  </v-icon>
              </div>
              <div v-if="!controlActions">
                  <v-icon
                      small
                      class="mr-2"
                      @click="SAVED_LIST(item)"
                  >mdi-arrow-right
                  </v-icon>
              </div>

          </template>
          <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                  <v-card min-width="max-content">
                      <v-card-text>
                          <p class="d-flex">
                            <span class="label">  min/max temperature: </span>
                            <v-chip class="ma-2" small> {{ item.main.temp_min }} - {{ item.main.temp_max }}</v-chip>
                          </p>
                          <v-divider></v-divider>
                          <p class="d-flex">
                              <span class="label"> humidity: </span>
                              <v-chip class="ma-2" small> {{ item.main.humidity }} </v-chip>
                          </p>
                          <v-divider></v-divider>
                          <p class="d-flex">
                              <span class="label"> wind speed: </span>
                              <v-chip class="ma-2" small> {{ item.wind.speed}} </v-chip>
                          </p>
                          <v-divider></v-divider>
                          <p class="d-flex">
                              <span class="label"> coord: </span>
                              <v-chip class="ma-2" small> [{{ item.coord.lat }}] </v-chip>
                              <v-chip class="ma-2" small> [{{ item.coord.lon }}] </v-chip>
                          </p>
                      </v-card-text>
                  </v-card>
              </td>
          </template>
      </v-data-table>
  </div>

</template>

<script>
import {mapMutations} from 'vuex'

  export default {
      name: 'cityList',
      data: () => ({
          dialog: false,
          expanded: [],
          singleExpand: false,
          headers: [
              {
                text: 'city',
                align: 'start',
                sortable: false,
                value: 'name',
              },
              {text: 'country', value: 'country'},
              {text: 'sky', value: 'description'},
              {text: 'temp', value: 'temp'},
              {text: 'Actions', value: 'actions'},
              {text: '', value: 'data-table-expand'}
          ],
          editedIndex: -1,
          savedLocalWeather: [],
          editedItem: {
              name: '',
              coord:{
                  lat: '',
                  lon: ''
              },
              main: {
                  humidity: '',
                  temp: '',
                  temp_max: '',
                  temp_min: ''
              },
              sys: {
                  country: ''
              },
              weather: {
                  description: ''
              },
              wind: {
                  speed: ''
              }
          },
          defaultItem: {
              coord:{
                  lat: '',
                  lon: ''
              },
              main: {
                  humidity: '',
                  temp: '',
                  temp_max: '',
                  temp_min: ''
              },
              sys: {
                  country: ''
              },
              weather: {
                  description: ''
              },
              wind: {
                  speed: ''
              }
          },
      }),

      props: {
          weatherList: {
              type: Array,
              default: ()=> []
          },
          controlActions: {
              type: Boolean,
              default: true
          },
          modalEditing: {
              type: Boolean,
              default: false
          }
      },

      computed: {
          formTitle() {
              return this.editedIndex === -1 ? "New Weather" : "Edit Weather";
          }
      },

      watch: {
          dialog(val) {
              val || this.close();
          }
      },

      methods: {
          ...mapMutations([
              'SAVED_LIST'
          ]),

          editItem(item) {
              this.editedIndex = this.weatherList.indexOf(item);
              this.editedItem = Object.assign({}, item);
              this.dialog = true;
          },

          downloadToLocal (item){
              if (localStorage.getItem('savedWeather') == null) {
                  this.savedLocalWeather.push(item);
                  localStorage.setItem('savedWeather', JSON.stringify(this.savedLocalWeather))
              } else {
                  this.savedLocalWeather = JSON.parse(localStorage.getItem('savedWeather'))
                  this.savedLocalWeather.push(item)
                  localStorage.setItem('savedWeather', JSON.stringify(this.savedLocalWeather))
              }
              this.$emit('getSavedList');
          },

          deleteItem(item) {
              const index = this.weatherList.indexOf(item);
              confirm("Are you sure you want to delete this item?") &&
              this.weatherList.splice(index, 1);
          },

          close() {
              this.dialog = false;
              this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
              });
          },

          save() {
              if (this.editedIndex > -1) {
                  Object.assign(this.weatherList[this.editedIndex], this.editedItem);
              } else {
                  this.weatherList.push(this.editedItem);
              }
              this.close();
          }
      }
  };
</script>

<style lang="scss">
  .label {
    padding: 5px;
  }
</style>
