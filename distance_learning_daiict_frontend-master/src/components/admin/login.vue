<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title>Admin Login form</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="admin_email" label="email ID" type="text"
                                v-model="admin_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="admin_password" label="Password" id="admin_password"
                                type="password" v-model="admin_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
            <label color="secondary"><a href="/admin/adminforgotpwd" >forgot password</a></label>
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
        admin_email: '',
        admin_password: ''
      }
    },
    methods: {
      login: function () {
        Axios.post('http://192.168.137.1:3000/admin/login', {
          admin_password: this.admin_password,
          admin_email: this.admin_email
        }).then(response => {
          Vue.localStorage.set('token', response.data.token)
          //  console.log(response.data.token)
          localStorage.getItem('token')
          this.$router.push('/admin/AdminHome')
        }).catch(error => {
          console.log('Error login')
          console.log(error)
          window.alert('Please enter correct username and Password')
          this.$router.push('/admin/')
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
