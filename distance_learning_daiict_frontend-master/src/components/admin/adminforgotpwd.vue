<template>
  <v-container>
    <v-spacer></v-spacer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="secondary">
                <v-toolbar-title >Forgot Password</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="admin_email" label="Email" type="text" v-model="admin_email"></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary"@click="reset" :to="'/admin/adminpwdreset'">send mail</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    data () {
      return {
        admin_email: ''
      }
    },
    methods: {
      reset: function () {
        console.log(this.admin_email)
        Axios.post('http://192.168.137.1:3000/admin/forgotpassword', {
          admin_email: this.admin_email
        }).then(response => {
        }).catch(error => {
          console.log('Not done')
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>

  .center{
    border-radius: 50px;
  }
</style>
