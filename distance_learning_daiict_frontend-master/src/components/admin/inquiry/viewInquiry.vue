<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <div>
      <v-layout>
        <v-flex>
          <h2 class="text-md-center mb-4 red--text">
            Enquiry
          </h2>
        </v-flex>

      </v-layout>
      <div>

        <v-layout row wrap>
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-card class="grey lighten-5 mb-3">
              <v-container fluid>
                <v-layout row>
                  <v-flex>
                    <v-card-title primary-title>
                      <div class="text--black">
                        <div><h3 mp-0> From: {{ items.inquiry_email }} </h3></div>
                        <br>
                        <div> Date: <br>
                          {{ items.inquiry_date_responded }}
                        </div>
                        <br>
                        <div> Subject: <br>
                          {{ items.inquiry_title }}
                        </div>
                        <br>
                        <div> Description: <br>
                          {{ items.inquiry_description }}
                        </div>
                        <br>

                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-container>

            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <div>
              <v-card color="grey lighten-4" flat @submit.prevent="giveResponse" enctype="multipart/form-data">
                <v-card-text class="white">
                  <v-subheader>Reply</v-subheader>
                  <v-container fluid>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          name="items.inquiry_response"
                          placeholder="reply"
                          textarea
                          v-model="items.inquiry_response"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
            <br>
            <v-btn class="blue lighten-1 white--text" @click="giveResponse"> Send</v-btn>
          </v-flex>
        </v-layout>
      </div>
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
          _id: '',
          inquiry_title: '',
          inquiry_email: '',
          inquiry_description: '',
          inquiry_response: '',
          inquiry_date_responded: '',
          inquiry_date_posted: ''
        },
        right: null
      }
    },
    created: function () {
      console.log('view id called')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      console.log(this.$route.params.id)
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/admin/inquiry/view/' + this.$route.params.id,
          {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
          .then((response) => {
            console.log(response.data[0])
            this.items = response.data[0]
            console.log(this.items)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/admin/')
      }
    },
    methods: {
      giveResponse () {
        console.log('view id called')
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          const fd = new FormData()
          fd.append('inquiry_response', this.items.inquiry_response)
          Axios.patch('http://192.168.137.1:3000/admin/inquiry/respond/' + this.$route.params.id, fd,
            {headers: {'Content-type': 'multipart/form-data'}})
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
        } else {
          this.$router.push('/admin/')
        }
      }
    }
  }
</script>
