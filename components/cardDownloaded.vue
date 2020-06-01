<template>
    <v-card
        class="mx-auto"
        max-width="400"
    >
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline">{{ card.name }} ({{card.sys.country}})</v-list-item-title>
                <v-list-item-subtitle>{{ card.weather[0].description }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <v-row align="center">
                <v-col class="display-3" cols="10">
                    {{card.main.temp}}&deg;C
                </v-col>
            </v-row>
        </v-card-text>

        <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{ card.wind.speed }} km/h</v-list-item-subtitle>
            <v-divider class="mr-2" vertical></v-divider>
            <v-list-item-icon class="mr-2">
                <v-icon>mdi-cloud</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{ card.clouds.all }}km/h</v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-water</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{ card.main.humidity }}%</v-list-item-subtitle>
            <v-divider class="mr-2" vertical></v-divider>
            <v-list-item-icon class="mr-2">
                <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>[{{ card.coord.lat }}] , [{{ card.coord.lon }}]</v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-temperature-celsius</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle> temperature from
                 {{ card.main.temp_min }}  to
                {{ card.main.temp_max }}
            </v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>

        <v-card-actions>
            <v-btn @click="deleteCard(card)" text>delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data () {
            return {
                time: 0,
                forecast: [
                    { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
                ],
            }
        },
        props: {
            card: {
                type: Object,
                default: ()=> {}
            }
        },
        methods: {
            deleteCard(item) {
                let savedArray = JSON.parse(localStorage.getItem('savedWeather'));
                const index = savedArray.indexOf(item);
                savedArray.splice(index, 1);
                localStorage.setItem('savedWeather', JSON.stringify(savedArray));
                this.$emit('getSavedList');
            }
        }
    }
</script>