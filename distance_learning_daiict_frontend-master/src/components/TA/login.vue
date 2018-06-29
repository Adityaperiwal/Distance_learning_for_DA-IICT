<template>
  <v-app>
    <navMenu><</navMenu>
    <v-spacer></v-spacer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title >TA Login form</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="ta_email" label="email ID" type="text" v-model="ta_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="ta_password" label="Password" id="ta_password" type="password" v-model="ta_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
               </v-card-actions>
            </v-card>
            <v-label ><a href="/TA/for">forgot password</a></v-label>
          </v-flex>
        </v-layout>
       </v-container>
    </v-content>
  </v-app>
</template>

<script >
  import Axios from 'axios'
  import Vue from 'vue'

  import tile from '@/components/TA/tile'

  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'navMenu': tile},
    data () {
      return {
        ta_email: '',
        ta_password: ''
      }
    },
    methods: {
      login: function () {
        console.log(this.ta_email)
        Axios.post('http://192.168.137.1:3000/ta/login', {
          ta_password: this.ta_password,
          ta_email: this.ta_email
        }).then(response => {
          Vue.localStorage.set('token', response.data.token)
          console.log(response.data.token)
          localStorage.getItem('token')
          this.$router.push('/TA/index')
        }).catch(error => {
          console.log('Error login')
          console.log(error)
        })
      },
      forgotpass: function () {
      }}
  }
</script>
<style scoped>

  .center{
    border-radius: 50px;
  }
</style>
