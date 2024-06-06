<template>
  <v-container>
    <h3 class="mt-6 mb-4">Liste des Équipes</h3>

    <v-btn color="blue lighten-2" @click="addTeamDialog = true">Ajouter Équipe</v-btn>

    <AddTeamDialog :dialog="addTeamDialog" @update:dialog="addTeamDialog = $event"></AddTeamDialog>

    <v-data-table
        :headers="tableHeaders"
        :items="teams"
        @click:row="selectTeam"
        class="elevation-1 mt-4"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddTeamDialog from "@/components/Teams/TeamManagement/AddTeamDialog.vue";

export default {
  components: {
    AddTeamDialog
  },

  data() {
    return {
      tableHeaders: [
        {text: 'ID', value: '_id'},
        {text: 'Nom de l’équipe', value: 'name'},
        {text: 'Affiliations', value: 'nbAffiliations'}
      ],
      addTeamDialog: false
    };
  },

  async mounted() {
    await this.loadTeams();
  },

  computed: {
    ...mapState('main',['teams']),
  },

  methods: {
    ...mapActions('main',['getAllTeams']),
    async loadTeams() {
      await this.getAllTeams();
    },
    async selectTeam(team) {
      await this.setCurrentTeam(team._id);
      this.$router.push({name: 'teamDetails'});
    }
  }
}
</script>

<style scoped>
</style>
