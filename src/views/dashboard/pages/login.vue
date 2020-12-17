<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#154560" dark flat>
                <v-toolbar-title> {{ $t("LoginTitle") }} </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="نام کاربری"
                    v-model="form.username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="گذرواژه"
                    v-model="form.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-subtitle v-if="showError">
                 <p class="error--text">
                  {{$t('login_err_msg')}}
                 </p>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">ورود</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  computed: {
    ...mapGetters('storeAuth', ["getStateIsAuthenticated"]),
  },
  methods: {
    ...mapActions('storeAuth', ["actLogInUser"]),
    submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          this.actLogInUser(this.form);
          console.log("after login this.getStateIsAuthenticated ", this.getStateIsAuthenticated);
          // if(this.getStateIsAuthenticated)
          // {
          //   this.$router.push("/");
          //   this.showError = false;
          // }
          // else{
          //   this.showError = true;
          // }
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>