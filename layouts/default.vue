<template>
    <v-app dark>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-toolbar-title v-text="title" />
            <v-spacer />
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: "mdi-apps",
                    title: "Welcome",
                    to: "/"
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "Weather"
        };
    }
};
</script>
