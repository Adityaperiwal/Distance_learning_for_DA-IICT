<template>
  <v-container>

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
                <v-form @submit.prevent="" >
                  <v-text-field prepend-icon="person" name="student_name" label="Full Name" type="text" v-model="student_name"></v-text-field>
                  <v-text-field prepend-icon="mail" name="student_email" label="Email" type="text" v-model="student_email"></v-text-field>
                  <v-text-field prepend-icon="phone" name="ta_contact_number" label="Contact Number" type="text" v-model="student_contact_number"></v-text-field>
                  <v-text-field prepend-icon="lock" name="student_password" label="Password" id="password" type="password" v-model="student_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signup" :to="'/student/login'">Signup</v-btn>
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
  import menuuu from '@/components/student/menuu'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'nav-Menu': menuuu},
    data () {
      return {
        student_name: '',
        student_email: '',
        student_password: '',
        student_contact_number: ''
      }
    },
    methods: {
      signup: function () {
        console.log(this.student_email)
        console.log(this.student_password)
        Axios.post('http://192.168.137.1:3000/student/add', {
          student_password: this.student_password,
          student_name: this.student_name,
          student_email: this.student_email,
          student_contact_number: this.student_contact_number
        }).then(response => {
          console.log(response.data)

          localStorage.getItem('token')
        }).catch(error => {
          console.log('Error signup')
          console.log(error)
          console.log(error.status)
          console.log(error.code)
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
