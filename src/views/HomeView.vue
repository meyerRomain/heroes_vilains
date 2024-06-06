<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center" class="align-center">
      <v-card class="pa-6 custom-card-width">
        <h1>Héros & Vilains</h1>

        <p>Retrouvez tous nos héros répertoriés dans le monde sur ce site. </p>
        <p>Explorez notre collection de héros, chacun possédant des compétences et des talents distincts.
          Comparer et sélectionner les héros qui vous plairont</p>
      </v-card>
      <router-link to="/hero">
        <v-img
            :src="heroesImage"
            height="50vh"
            contain
            ref="/hero"
        ></v-img>
      </router-link>

    </v-row>


  </v-container>
</template>

<script>
// Importez l'image depuis le dossier assets
import heroesImage from '@/assets/heroes.png';

export default {
  data() {
    return {
      // Référencez l'image importée ici pour l'utiliser dans votre template
      heroesImage,
    };
  },
};
</script>

<style scoped>
/* Ajoutez des styles CSS personnalisés ici si nécessaire */
.custom-card-width {
  max-width: 600px; /* Réglez la largeur maximale souhaitée */
}
</style>
