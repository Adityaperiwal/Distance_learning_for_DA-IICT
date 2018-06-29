<template>
  <v-app>
    <v-spacer></v-spacer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title>Faculty Login form</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="faculty_email" label="email ID" type="text"
                                v-model="faculty_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="faculty_password" label="Password" id="admin_password"
                                type="password" v-model="faculty_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
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

  Vue.use(VueLocalStorage)
  export default {
    data () {
      return {
        faculty_email: '',
        faculty_password: '',
        FC_id: ''
      }
    },
    methods: {
      login: function () {
        console.log('hello login function')
        Axios.post('http://192.168.137.1:3000/faculty/login', {
          faculty_password: this.faculty_password,
          faculty_email: this.faculty_email
        }).then(response => {
          Vue.localStorage.set('token', response.data.token)
          Vue.localStorage.set('id', response.data.id)
          console.log(response.data.token)
          console.log(response.data.id)
          //  console.log(response.data.token)
          localStorage.getItem('token')
          this.$router.push('/faculty/index')
        }).catch(error => {
          console.log('Error login')
          console.log(error)
          this.$router.push('/faculty/')
          alert('Invalid Username and Password')
        })
      }
    }
  }
</script>
<style scoped>

  .center {
    border-radius: 50px;
  }
</style>
