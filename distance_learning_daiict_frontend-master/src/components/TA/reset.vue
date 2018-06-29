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
                <v-toolbar-title >Reset Password</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>



                  <v-text-field prepend-icon="person" name="password" label="password" type="password" v-model="password"></v-text-field>

                  <v-text-field prepend-icon="person" name="confirmpassword" label="confirm password" type="password" v-model="confirmpassword"></v-text-field>

                  <v-text-field prepend-icon="person" name="token" label="token" type="password" v-model="token"></v-text-field>



                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="reset">confirm</v-btn>
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
  import Menu from '@/components/TA/menu'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        password: '',
        confirmpassword: '',
        token: ''
      }
    },
    methods: {
      reset: function () {
        console.log(this.taname)
        Axios.post('http://192.168.137.1:3000/ta/reset', {
          password: this.password,
          confirmpassword: this.confirmpassword,
          token: this.token
        }).then(response => {
          console.log(response.data)
          localStorage.getItem('token')
        }).catch(error => {
          console.log('Error signup')
          console.log(error)
        })
        window.alert('The password has been reset successfully....')
      }
    }
  }
</script>
<style scoped>

  .center{
    border-radius: 50px;
  }
</style>
