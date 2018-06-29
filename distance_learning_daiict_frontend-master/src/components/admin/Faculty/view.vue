<template>
  <v-container fluid="true">
   <navMenu></navMenu>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-5 red--text">
          Faculty Detail
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="max-width: 660px; margin: auto;"
      class="orange lighten-4" >
      <v-card>
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 >
              <v-card-title style="align-items: right"> <h4>{{ items.faculty_name }}</h4></v-card-title>
                       </v-flex>
            <v-flex>
              <v-card-media
                :src="items.faculty_photo"
                height="165px" width="150px" contain  >
              </v-card-media>
            </v-flex>
            </v-layout>



<v-layout xs12 md9 class="blue--text darken-1">
  <v-flex>
    <v-card-text>Email Id: {{ items.faculty_email }} </v-card-text>
    <v-card-text>Contact Number: {{ items.faculty_contact_number }}</v-card-text>
    <v-card-text> Educational Qualification:{{ items.faculty_educational_details }} </v-card-text>
    <v-card-text>Interest Area: {{ items.faculty_area_interest  }} </v-card-text>

  </v-flex>
</v-layout>


        </v-container>

        </v-card>
    </div>

  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import Menu from '@/components/admin/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        items: {
          faculty_name: '',
          faculty_photo: '',
          faculty_email: '',
          faculty_password: '',
          faculty_contact_number: '',
          faculty_educational_details: '',
          faculty_area_interest: ''
        },
        right: null
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/admin/faculty/view/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
        .then((response) => {
          console.log(response.data[0])
          this.items = response.data[0]
        })
        .catch((error) => {
          console.log(error)
        })
        } else {
          this.$router.push('/admin/')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
