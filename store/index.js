import Vue from "vue";
import Vuex from "vuex";
import { axios } from "../axiosConfig";
const key = "6367e4e43d29c713e7e3d4d63794097a";
Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
      state: {
          weatherList: [],
          savedListWeather: []
      },
      mutations: {
          WEATHER_CITY(state, payload) {
              state.weatherList = [];
              state.weatherList.push(payload);
          },
          SAVED_LIST (state, payload) {
              state.savedListWeather.push(payload)
          },
      },
      actions: {
          async handleSearchWeather({ commit }, needle) {
              try {
                  let response = await axios.get(`/data/2.5/weather?q=${needle}&units=metric&appid=${key}`);
                  if (response.status == 200) {
                      commit("WEATHER_CITY", response.data);
                  }
              } catch (e) {
                  console.log(e);
              }
          },
      },

  });

export default store;
