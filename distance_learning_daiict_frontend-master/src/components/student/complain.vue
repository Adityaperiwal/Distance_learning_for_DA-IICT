<template>
  <v-container fluid="true">
    <nav-Menu></nav-Menu>
    <v-layout>
      <v-flex>

        <v-card @submit.prevent="" enctype="multipart/form-data">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="red--text darken-2"><h3>Complain</h3></v-card-title>
              </v-flex>

            </v-layout>

            <v-flex xs12 sm6>
              <v-text-field box label="TItle" v-model="items.complaint_title"

                            required>
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field box multi-line label="Query" v-model="items.complaint_description" required>

              </v-text-field>
            </v-flex>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn flat color="blue" @click="giveResponse">Submit</v-btn>
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
    data () {
      return {
        sideNav: false,
        items: {
          _id: '',
          complaint_title: '',
          complaint_description: '',
          Student_id: '',
          FC_id: ''
        }
      }
    },
    right: null,
    methods: {
      giveResponse () {
        var jwt = Vue.localStorage.get('token')
        console.log(this.$route.params.id)
        if (jwt) {
          Axios.post('http://192.168.137.1:3000/student/course/complain/' + this.$route.params.id, {
            'complaint_title': this.items.complaint_title,
            'complaint_description': this.items.complaint_description
          },
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
              console.log(this.complaint_description)
            })

          this.$router.push('/')
        } else {
          this.$router.push('/student/login')
        }
      }
    }
  }
</script>
