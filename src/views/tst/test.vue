<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-checkbox v-model="custom" label="Custom progress bar"></v-checkbox>
      <v-text-field
        v-model="value"
        color="cyan darken"
        label="Text field"
        placeholder="Start typing..."
        loading
      >
        <template v-slot:progress>
          <v-progress-linear
            v-if="custom"
            :value="progress"
            :color="color"
            absolute
            height="7"
          ></v-progress-linear>
        </template>
      </v-text-field>
      <v-row>
        <v-col cols="4" offset="4">
         <div class="text-center">
            <v-btn min-width="0" text @click="changeDirection">
             <v-icon>mdi-logout</v-icon>
             </v-btn>
         </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    value: "",
    custom: true
  }),
  computed: {
    progress() {
      return Math.min(100, this.value.length * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  methods: {
    changeDirection() {
      this.$vuetify.rtl = !this.$vuetify.rtl;
    }
  }
};
</script>

<style></style>
