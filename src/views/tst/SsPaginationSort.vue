<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <v-btn min-width="0" text @click="changeDirection">
              <v-icon>mdi-arrow-left-right-bold-outline</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="8" offset="2">
          <v-card>
            <v-card-title>
              some title
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>

              <v-btn
                fab
                depressed
                x-small
                :disabled="filterDisabled"
                color="primary"
                class="mt-4"
                @click="changeDirection"
                style=":hover:pointer"

                fixed
                bottom
                right
              >
                <v-icon >mdi-magnify</v-icon>
              </v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :options.sync="options"
              :server-items-length="totalDesserts"
              :loading="loading"
              class="elevation-1 mt-2"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      filterDisabled: true,
      //   headers: [
      //     {
      //       text: "Dessert (100g serving)",
      //       align: "start",
      //       sortable: false,
      //       value: "name"
      //     },
      //     { text: "Calories", value: "calories" },
      //     { text: "Fat (g)", value: "fat" },
      //     { text: "Carbs (g)", value: "carbs" },
      //     { text: "Protein (g)", value: "protein" },
      //     { text: "Iron (%)", value: "iron" }
      //   ],
      //   desserts: [
      //     {
      //       name: "Frozen Yogurt",
      //       calories: 159,
      //       fat: 6.0,
      //       carbs: 24,
      //       protein: 4.0,
      //       iron: "1%"
      //     },
      //     {
      //       name: "Ice cream sandwich",
      //       calories: 237,
      //       fat: 9.0,
      //       carbs: 37,
      //       protein: 4.3,
      //       iron: "1%"
      //     },
      //     {
      //       name: "Eclair",
      //       calories: 262,
      //       fat: 16.0,
      //       carbs: 23,
      //       protein: 6.0,
      //       iron: "7%"
      //     },
      //     {
      //       name: "Cupcake",
      //       calories: 305,
      //       fat: 3.7,
      //       carbs: 67,
      //       protein: 4.3,
      //       iron: "8%"
      //     },
      //     {
      //       name: "Gingerbread",
      //       calories: 356,
      //       fat: 16.0,
      //       carbs: 49,
      //       protein: 3.9,
      //       iron: "16%"
      //     },
      //     {
      //       name: "Jelly bean",
      //       calories: 375,
      //       fat: 0.0,
      //       carbs: 94,
      //       protein: 0.0,
      //       iron: "0%"
      //     },
      //     {
      //       name: "Lollipop",
      //       calories: 392,
      //       fat: 0.2,
      //       carbs: 98,
      //       protein: 0,
      //       iron: "2%"
      //     },
      //     {
      //       name: "Honeycomb",
      //       calories: 408,
      //       fat: 3.2,
      //       carbs: 87,
      //       protein: 6.5,
      //       iron: "45%"
      //     },
      //     {
      //       name: "Donut",
      //       calories: 452,
      //       fat: 25.0,
      //       carbs: 51,
      //       protein: 4.9,
      //       iron: "22%"
      //     },
      //     {
      //       name: "KitKat",
      //       calories: 518,
      //       fat: 26.0,
      //       carbs: 65,
      //       protein: 7,
      //       iron: "6%"
      //     }
      //   ],
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true
    },
    search: {
      handler() {
        console.log("search filter ", this.search);
        if(this.search.length > 0){
            this.filterDisabled = false;
        }
        else {
            this.filterDisabled = true;
        }
      },
      deep: true
    }
  },
  mounted() {
    console.log('!!true ', !!true);
    console.log('!!false ', !!false);
    console.log('!!1 ', !!1);
    console.log('!!0 ', !!0);
    console.log('!!null ', !!null);
    this.options.itemsPerPage = 5;
    this.getDataFromApi();
  },
  methods: {
    changeDirection() {
      this.$vuetify.rtl = !this.$vuetify.rtl; //true/false
    },
    getDataFromApi() {
      this.loading = true;
      this.fakeApiCall().then(data => {
        this.desserts = data.items;
        this.totalDesserts = data.total;
        this.loading = false;
      });
    },
    /**
     * In a real application this would be a call to fetch() or axios.get()
     */
    fakeApiCall() {
      return new Promise((resolve, reject) => {  
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        console.log(
            'sortBy: ', sortBy,//which category to be sorted by
            '\nsortDesc: ', sortDesc,//if true then sort descending otherwise ascending
            '\npage: ', page,//page number
            '\nitemsPerPage: ', itemsPerPage//items in a page
        )
        let items = this.getDesserts();
        const total = items.length;

        if (sortBy.length === 1 && sortDesc.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          resolve({
            items,
            total
          });
        }, 3000);
      });
    },
    getDesserts() {
      return [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ];
    }
  }
};
</script>
