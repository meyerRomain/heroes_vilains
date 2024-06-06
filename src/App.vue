<template>
  <v-app>

    <v-app-bar app>
      <router-link style="cursor: pointer" :to="{ name: 'home' }" tag="div">
        <v-toolbar-title>Heroes & Vilains</v-toolbar-title>
      </router-link>

      <v-btn text :to="{ name: 'org' }">Organisations</v-btn>
      <v-btn text :to="{ name: 'team' }">Équipes</v-btn>
      <v-btn text :to="{ name: 'hero' }">Héros</v-btn>

      <v-spacer></v-spacer>

      <template v-if="auth">
        <span class="mr-4 subtitle-1">{{ getUserInfoName }}</span>
        <v-btn class="mr-4"  :to="{ name: 'UserAccount' }">espace personnel</v-btn>
        <v-btn color="red" text @click="logout">Déconnexion</v-btn>
      </template>
      <template v-else>
        <v-btn class="mr-4" color="green"  :to="{ name: 'login' }">Connexion</v-btn>
        <v-btn color="red" :to="{ name: 'register' }">Inscription</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view/>
      <ErrorDialog title="Erreur" width="500"></ErrorDialog>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";
import ErrorDialog from "@/components/ErrorDialog.vue";


export default {
  name: 'App',
  components:{
    ErrorDialog
  },

  methods:{
    ...mapActions("secret",["logoutUser"]),
    ...mapActions("main",["clearCurrentTeam","clearCurrentHero","clearCurrentOrg"]),
    async logout(){
      await this.logoutUser()
    }
  },
  computed: {
    ...mapState("main",['currentOrg','currentTeam','currentHero']),
    ...mapState("secret",["auth"]),
    ...mapGetters("secret",['getUserInfoName']),
  },
};
</script>


