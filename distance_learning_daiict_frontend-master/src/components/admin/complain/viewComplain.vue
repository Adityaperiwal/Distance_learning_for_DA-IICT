<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
          Complain
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
                      <div><h3 mp-0> From: {{ items.student_name }} </h3></div>
                      <br>
                      <div>Date: <br>
                        {{ items.complaint_date_posted }}
                      </div>
                      <br>
                      <div> Course ID: <br>
                        {{ items.FC_id }}
                      </div>
                      <br>
                      <div> Subject: <br>
                        {{ items.complaint_title }}
                      </div>
                      <br>
                      <div> Description: <br>
                        {{ items.complaint_description }}
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
                        name="items.complaint_response"
                        placeholder="reply"
                        textarea
                        v-model="items.complaint_response"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </div>
          <br>
          <v-btn class="blue lighten-1 white--text"> Send</v-btn>
        </v-flex>
      </v-layout>
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
          student_id: '',
          complaint_date_posted: '',
          complaint_title: '',
          FC_id: '',
          student_name: '',
          complaint_description: '',
          student_email: '',
          complaint_response: ''
        },
        right: null
      }
    },

    created: function () {
      console.log('view id called')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      console.log('view id called')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/admin/inquiries/view/' + this.$route.params.id,
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
        this.$router.push('/admin/login')
      }
    },
    methods: {
      giveResponse () {
        const fd = new FormData()
        fd.append('complaint_response', this.items.complaint_response)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.patch('http://192.168.137.1:3000/admin/inquiries/respond/' + this.$route.params.id, fd,
            {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
        } else {
          this.$router.push('/admin/')
        }
      },
      mounted () {
        this.getDetail()
      }
    }
  }
</script>
