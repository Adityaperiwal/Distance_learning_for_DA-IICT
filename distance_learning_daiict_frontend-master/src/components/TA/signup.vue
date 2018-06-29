<template>
  <v-app id="inspire">
    <navMenu></navMenu>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title >Signup </v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="">
                  <v-text-field prepend-icon="person" name="ta_name" label="Full Name" type="text" v-model="ta_name"></v-text-field>
                  <v-text-field prepend-icon="mail" name="ta_email" label="Email" type="text" v-model="ta_email"></v-text-field>
                  <v-text-field prepend-icon="phone" name="ta_contact_number" label="Contact Number" type="text" v-model="ta_contact_number"></v-text-field>
                  <v-text-field prepend-icon="lock" name="ta_password" label="Password" id="password" type="password" v-model="ta_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signup">Signup</v-btn>
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
        ta_name: '',
        ta_email: '',
        ta_contact_number: '',
        ta_password: ''
      }
    },
    methods: {
      signup: function () {
        console.log(this.ta_email)
        Axios.post('http://192.168.137.1:3000/ta/add', {
          ta_password: this.ta_password,
          ta_name: this.ta_name,
          ta_email: this.ta_email,
          ta_contact_number: this.ta_contact_number
        }).then(response => {
          console.log(response.data)
          localStorage.getItem('token')
          this.$router.push('/TA/login')
        }).catch(error => {
          console.log('Error signup')
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
