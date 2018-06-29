<template>
  <v-container>
    <nav-Menu></nav-Menu>
    <v-layout row wrap>

      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <h1 style="justify-content:center;display:flex">
          My courses
        </h1>
        <br>
        <v-card class="grey lighten-4 mb-3" v-for="item in items" :key="item._id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="item.facultyCourse_image"
                  height="150px" width="150px">
                </v-card-media>
              </v-flex>
              <v-flex>
                <v-card-title primary-title>
                  <div class="text--black">
                    <div><h2>{{item.facultyCourse_name}}</h2></div>

                    <v-spacer></v-spacer>
                    <div><label class="text--black"> <b>Course name:</b> </label> {{ item.facultyCourse_name }}</div>
                    <br>
                    <div> {{ item.faculty_educational_details }}</div>


                    <div><label class="text--black"><b>Duration:</b></label>{{item.facultyCourse_duration}}</div>
                    <br>

                    <div><label class="text--black"> <b>Description:</b></label>{{item.facultyCourse_description}}</div>
                    <div><label class="text--black"><b>Prerequisite:</b></label>{{item.facultyCourse_prerequisites}}
                    </div>
                  </div>
                </v-card-title>

                <v-btn flat class="purple lighten-5 purple--text"
                       v-bind:to="{name: 'Studentsubtopic', params: {id: item._id } }">View
                </v-btn>
                <v-btn flat class="purple lighten-5 purple--text"
                       v-bind:to="{name: 'StudComplain', params: {id: item._id } }">Complain
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>

        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <br>

  </v-container>
</template>
<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import menuuu from '@/components/student/menuu'

  export default {
    isLoggedIn: true,
    name: 'app',
    components: {'nav-Menu': menuuu},

    data: function () {
      return {
        Enroll: 'Enroll',
        items: {
          _id: '',
          course_id: '',
          facultyCourse_duration: '',
          facultyCourse_name: '',
          facultyCourse_description: '',
          facultyCourse_image: '',
          facultyCourse_prerequisites: ''
        }
      }
    },
    created: function () {
      console.log('id is called')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/student/course/enrolled', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            this.items = response.data
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/student/login')
      }
    }
  }
</script>
