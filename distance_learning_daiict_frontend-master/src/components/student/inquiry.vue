<template>
  <v-container>

    <nav-Menu>

    </nav-Menu>

    <v-container grid-list-md>

      <v-layout row wrap>
        <v-flex xs12 sm6>

          <v-text-field box
                        label="Email" v-model="items.inquiry_email"

                        required></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field box
                        label="TItle" v-model="items.inquiry_title"

                        required>{{items.inquiry_title}}</v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field box multi-line label="Query" v-model="items.inquiry_description" required> </v-text-field>
        </v-flex>

      </v-layout>
      <v-btn flat color="blue"  @click="giveResponse">Submit</v-btn>
    </v-container>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'
  import menuuu from '@/components/student/menuu'
  Vue.use(VueLocalStorage)

  export default {
    name: 'app',
    components: {'nav-Menu': menuuu},
    data: function () {
      return {
        items: {
          inquiry_title: '',
          inquiry_email: '',
          inquiry_description: ''
        }
      }
    },
    methods: {
      giveResponse () {
        Axios.post('http://192.168.137.1:3000/student/inquiry', {
          'inquiry_title': this.items.inquiry_title,
          'inquiry_email': this.items.inquiry_email,
          'inquiry_description': this.items.inquiry_description
        }).then(response => {
          console.log(response.data)
          console.log(this.inquiry_title)
        }).catch(error => {
          console.log('Error login')
          console.log(error.response)
        })
      }
    }
  }
</script>
