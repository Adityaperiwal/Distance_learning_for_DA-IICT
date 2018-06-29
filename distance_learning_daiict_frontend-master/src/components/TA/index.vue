<template>
  <v-app>      <navMenu></navMenu>



    <v-layout row wrap>
      <v-flex sm12 xs12 text-xs-center>
        <v-container>
          <h1>Enrolled Courses</h1>
        </v-container>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-for="course in courses" :key="course.course_id" >
        <v-card class="grey-lighten-4" >
          <v-container fluid style="min-height: 0;"
                       grid-list-lg>
            <v-card-title primary-title>
              <div>

                <div><h3 class="Grey--text darken-1" mp-0>Course Name: </h3>{{ course.facultyCourse_name }} </div>
                <div><h3 class="Grey--text darken-1" mp-0> Course Description: </h3>{{ course.facultyCourse_description }}</div>
              </div>
            </v-card-title>



          </v-container>

        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex sm12 xs12 text-xs-center>
        <v-container>
          <!--<v-btn color="primary" dark slot="activator" :to="'/Faculty/evaluation'">Assignment Due for Evaluation</v-btn>-->
          <!--<v-btn color="primary" dark slot="activator" :to="'/Faculty/discussion'">Doubts Posted</v-btn>-->
        </v-container>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex sm12 xs12 text-xs-center>
        <v-container>
          <h1 class="mb-3">Assignment Due for Evaluation</h1>
        </v-container>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 :key="items.course_id" v-for="item in courses">
        <v-card class="grey lighten-4 "  :key="item._id">
          <v-container fluid style="min-height: 0;"
                       grid-list-lg>
            <v-card-title primary-title>
              <div>
                <div><h3 class="Grey--text darken-1" mp-0> Subject: </h3>{{ item.facultyCourse_name }}</div>
                <div><h3 class="Grey--text darken-1" mp-0> Course duration: </h3>{{ item.facultyCourse_duration  }}</div>
                <div><h3 class="Grey--text darken-1" mp-0> Course description: </h3>{{ item.facultyCourse_description   }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat class="purple white--text" v-bind:to="{name: 'viewevaluation', params: {id: item._id }}">View Evaluation
              </v-btn>
            </v-card-actions>


          </v-container>

        </v-card>
      </v-flex>
    </v-layout>

  </v-app>
</template>

<script>
  import Menu from '@/components/TA/menu'
  import Axios from 'axios'
  import Vue from 'vue'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        courses: {
            course_id: '',
            facultyCourse_description: '',
          facultyCourse_duration: '',
          facultyCourse_name: '',
          },
        items: [
          {
            title: 'Index',
            link: '/TA/index'
          },
          {
            title: 'Logout',
            link: '/'
          }
        ],
        sideNav: false,
        right: null
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/ta/evaluation/view', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            console.log(response)
            this.courses = response.data
            console.log('it works')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/TA/login')
      }
    }
  }
</script>

<style scoped>

  .title {
    position: absolute;
    bottom: 50px;
    color: black;
    font-size:2em;

  }
</style>
