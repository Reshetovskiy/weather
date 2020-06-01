<template>
  <v-layout column justify-center align-center>
      <v-container fluid>
          <v-row>
              <v-col lg6>
                  <v-card>
                      <v-card-title class="headline">Welcome to App</v-card-title>
                      <search-field> </search-field>
                      <city-list
                          :controlActions="false"
                          :weatherList="weatherList">
                      </city-list>
                  </v-card>
              </v-col>
              <v-col lg6>
                  <v-card>
                      <city-list
                          @getSavedList="getSavedList"
                          :controlActions="true"
                          :modalEditing="true"
                          :weatherList="savedListWeather">
                      </city-list>
                  </v-card>
              </v-col>
          </v-row>
          <v-row>
<!--              {{downloadedListWeather}}-->
              <v-col cols="3" v-for="(card, index) in downloadedListWeather" :key="index">
                  <card-downloaded
                      @getSavedList="getSavedList"
                      :card="card">
                  </card-downloaded>
              </v-col>
          </v-row>
      </v-container>
  </v-layout>
</template>

<script>
import {  mapState } from "vuex";
import cardWeather from "../components/cardWeather";
import searchField from "../components/searchField";
import cityList from "../components/cityList";
import cardDownloaded from "../components/cardDownloaded";
export default {
  data: () => ({
      search: "",
      downloadedListWeather: []
  }),
  components: {
    cityList,
    cardWeather,
    searchField,
    cardDownloaded
  },
  computed: {
      ...mapState([
          'weatherList',
          'savedListWeather'
      ]),
  },
  methods: {
      getSavedList () {
          this.downloadedListWeather = JSON.parse(localStorage.getItem('savedWeather'))
      }
  },
  mounted() {
      this.getSavedList()
  }
};
</script>
