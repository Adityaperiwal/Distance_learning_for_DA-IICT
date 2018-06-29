<template>
  <v-container fluid>
    <v-flex offset-sm3>


      <div style="font-family: 'Calibri Light';font-size: 30px;color:darkslategrey">Feedback Form</div>
      <br>
    </v-flex>
    <br>
    <v-card color="grey lighten-4">
      <v-layout>
        <v-flex xs4 xm4 offset-sm2>
          <v-flex xm4 xs4>
            <div style="font-family: sans-serif;font-size: 20px">Subject</div>
          </v-flex>

          <v-flex xm12>

            <v-text-field
              name="items.feedback_title"
              v-model="items.feedback_title"
              value=""
              auto-grow
            ></v-text-field>
          </v-flex>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs4 xm4 offset-sm2>
          <v-flex xm4 xs4>
            <div style="font-family: sans-serif;font-size: 20px">Description</div>
          </v-flex>

          <v-flex>
            <v-text-field
              name="items.feedback_description"
              row-height="10"
              :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
              :counter="50"
              v-model="items.feedback_description"
              value=""
              auto-grow
              multi-line
            ></v-text-field>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm6>
          <v-btn flat class="indigo"
                 type="submit"
                 @click="giveResponse">Submit
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'

  Vue.use(VueLocalStorage)
  export default {
    data: function () {
      return {
        items: {
          Student_id: '',
          feedback_title: '',
          feedback_description: ''
        }
      }
    },
    methods: {
      giveResponse () {
        var jwt = Vue.localStorage.get('token')
        console.log(this.$route.params.id)
        if (jwt) {
          Axios.post('http://192.168.137.1:3000/student/course/feedback/' + this.$route.params.id, {
            'feedback_title': this.items.feedback_title,
            'feedback_description': this.items.feedback_description
          },
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
        }
      }
    }
  }
</script>
