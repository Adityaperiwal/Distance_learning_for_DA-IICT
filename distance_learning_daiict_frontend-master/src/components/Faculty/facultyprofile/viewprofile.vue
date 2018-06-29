<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-layout>
      <v-flex>
        <h1 class="text-md-center mb-3 red--text mt-3">
          Profile
        </h1>
      </v-flex>

    </v-layout>
    <div
      style="max-width: 660px; margin: auto;"
       >
      <v-card :key="items._id" class="grey lighten-4">
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg>
          <v-layout row wrap>
            <!--<v-flex xs12 >-->
              <!--<v-card-title style="align-items: right"> <h4>{{ items.faculty_name }}</h4></v-card-title>-->
            <!--</v-flex>-->
            <v-flex>
              <v-card-media
                :src="items.faculty_photo"
                height="165px" width="150px" contain  >
              </v-card-media>
            </v-flex>
          </v-layout>



          <v-layout xs12 md9>
            <v-flex>
              <v-card-text ><b> Faculty Name:</b>
                {{ items.faculty_name }}
              </v-card-text>
              <v-card-text><b>Email Id: </b>{{ items.faculty_email }} </v-card-text>
              <!--<v-card-text> Password: {{ item.faculty_password }} </v-card-text>-->
              <v-card-text><b>Contact Number: </b>{{ items.faculty_contact_number }}</v-card-text>
              <v-card-text><b>Education Detail: </b> {{ items.faculty_educational_details  }} </v-card-text>
              <v-card-text><b>Experience level: </b> {{ items.faculty_area_interest  }} </v-card-text>
              <v-card-actions >
                <v-btn v-bind:to="{name: 'editprofile', params: {id: items._id }}" color="purple" class="text--white"> Edit </v-btn>
              </v-card-actions>
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
  import Menu from '@/components/Faculty/menu'
  export default {
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
        }
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/faculty/view', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            this.items = response.data[0]
            console.log('it works')
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/faculty/')
      }
    }
  }
</script>
