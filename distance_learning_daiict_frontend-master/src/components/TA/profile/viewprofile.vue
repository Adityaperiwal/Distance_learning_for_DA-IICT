<template>
  <v-container fluid>
    <navMenu></navMenu>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-5 red--text">
          Profile
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="max-width: 660px; margin: auto;"
      class="orange lighten-5" >
      <v-card >
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 >

            </v-flex>
            <v-flex>
              <v-card-media
                :src="items.ta_photo"
                height="165px" width="150px" contain  >
              </v-card-media>
            </v-flex>
          </v-layout>



          <v-layout xs12 md9>
            <v-flex>
              <v-card-text > TA Name:
                {{ items.ta_name }}
              </v-card-text>
              <v-card-text ><b>Email Id: </b>{{ items.ta_email }} </v-card-text>
              <!--<v-card-text> Password: {{ item.faculty_password }} </v-card-text>-->
              <v-card-text><b>Contact Number: </b>{{ items.ta_contact_number }}</v-card-text>
             <v-card-text  ><b> Subject: </b>{{ items.ta_subject }} </v-card-text>
              <v-card-text><b>Education Detail: </b>{{ items.ta_educational_detail  }} </v-card-text>


              <v-card-actions >
                <v-btn  v-bind:to= "{name: 'taeditprofile', params: {id: items._id }}" color="indigo" class="text--white"> Edit </v-btn>
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
  import Menu from '@/components/TA/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        items: {
          ta_name: '',
          ta_photo: '',
          ta_email: '',
          ta_password: '',
          ta_contact_number: '',
          ta_educational_details: '',
          ta_subject: '',
          ta_area_interest: '',
          _id: ''
        },
        right: null
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log(Vue.localStorage.get('token'))
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/ta/view',
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data.data[0])
              this.items = response.data.data[0]
              console.log(this.items.data[0].ta_name)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/TA/login')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
