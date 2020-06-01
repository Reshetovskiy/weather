<template>
    <div class="d-flex align-center ma-5">
        <v-text-field
          v-model="search"
          class="ma-1"
          label="Enter the name of the city">
        </v-text-field>
        <v-btn @click="handleSearchWeather(search)">Search</v-btn>
    </div>
</template>

<script>
import { mapActions } from "vuex";
    export default {
        name: 'searchField',
        data:() => {
            return {
                search: ''
            }
        },
        methods: {
            ...mapActions([
                'handleSearchWeather'
            ]),
        }
    }
</script>
