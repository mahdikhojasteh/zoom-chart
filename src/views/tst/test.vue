<template>
  <v-app>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
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
      <!--  -->
      <v-row>
        <v-col cols="4" offset="4" style="background-color:#f3b6d3">
          <div class="text-center">
            <v-btn min-width="0" text @click="changeDirection">
              <v-icon>mdi-arrow-left-right-bold-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
    <v-container fluid>
      <v-switch v-model="singleExpand" label="Expand Single Item"></v-switch>
      <v-data-iterator
        :items="desserts"
        item-key="name"
        :items-per-page="4"
        :single-expand="singleExpand"
        hide-default-footer
      >
        <template v-slot:default="{ items, isExpanded, expand }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title>
                  <h4>{{ item.name }}</h4>
                </v-card-title>
                <v-switch
                  :input-value="isExpanded(item)"
                  :label="isExpanded(item) ? 'Expanded' : 'Closed'"
                  class="pl-4 mt-0"
                  @change="v => expand(item, v)"
                ></v-switch>
                <v-divider></v-divider>
                <v-list v-if="isExpanded(item)" dense>
                  <v-list-item>
                    <v-list-item-content>Calories:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.calories }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Fat:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.fat }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Carbs:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.carbs }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Protein:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.protein }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sodium:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.sodium }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Calcium:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.calcium }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Iron:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.iron }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    value: "",
    custom: true,
    singleExpand: false,
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      }
    ]
  }),
  computed: {
    progress() {
      let prgs = Math.min(100, this.value.length * 10);
      console.log('Math.min(100, this.value.length * 10) ', prgs);
      return prgs;
    },
    color() {
      let clrInx = Math.floor(this.progress / 40);
      console.log('Math.floor(this.progress / 40) ', clrInx);
      return ["error", "warning", "success"][clrInx];
    }
  },
  methods: {
    changeDirection() {
      this.$vuetify.rtl = !this.$vuetify.rtl; //true/false
    }
  }
};
</script>

<style></style>
