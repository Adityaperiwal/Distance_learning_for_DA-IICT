<template>
  <v-app>
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title >Forgot Password</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="ta_email" label="Email" type="text" v-model="ta_email"></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"@click="reset">send mail</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'
  import Menu from '@/components/TA/menu'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        ta_email: ''
      }
    },
    methods: {
      reset: function () {
        console.log(this.ta_email)
        Axios.post('http://192.168.137.1:3000/ta/forgotpassword', {
          ta_email: this.ta_email
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
