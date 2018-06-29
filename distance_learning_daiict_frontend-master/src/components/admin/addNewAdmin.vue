<template>
  <v-container>
    <nav-Menu></nav-Menu>
    <v-content>
      <v-container fluid fill-height>

        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title >Add new Admin </v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="" >
                  <v-text-field prepend-icon="mail" name="student_email" label="Email" type="text" v-model="admin_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="ta_contact_number" label="Password" type="text" v-model="admin_password"></v-text-field>
                 </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signup" :to="'/admin/'">Add Admin</v-btn>
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
  import Menu from '@/components/admin/menu'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        admin_email: '',
        admin_password: ''
      }
    },
    methods: {
      signup: function () {
        console.log(this.admin_email)
        console.log(this.admin_password)
        Axios.post('http://192.168.137.1:3000/admin/add', {
          admin_email: this.admin_email,
          admin_password: this.admin_password
        }).then(response => {
          console.log(response.data)

          localStorage.getItem('token')
        }).catch(error => {
          console.log('Error adding new admin')
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
