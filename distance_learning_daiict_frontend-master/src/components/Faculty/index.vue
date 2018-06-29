<template>
  <v-app>

    <v-container fluid="true">
      <navMenu></navMenu>

      <div>
        <h1 class="text-lg-center mb-3 mt-3">Created Courses</h1>
        <v-layout row wrap>

          <v-flex xs12 sm6 :key="itemlists.course_id" v-for="item in itemlists">
            <v-card class="grey lighten-4 mb-2 ml-3 mr-3 mar"  :key="item._id">
              <v-container fluid style="min-height: 0;"
                           grid-list-lg>
                <v-card-title primary-title>
                  <div>
                    <div><h3 class="Grey--text darken-1" mp-0> Subject: {{ item.facultyCourse_name }}</h3></div>
                    <div><h3 class="Grey--text darken-1" mp-0> Course duration: {{ item.facultyCourse_duration  }}</h3></div>
                    <div><h3 class="Grey--text darken-1" mp-0> Course description: {{ item.facultyCourse_description   }}</h3></div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat class="purple white--text" v-bind:to="{name: 'editcourse', params: {id: item._id }}">Edit
                  </v-btn>
                  <v-btn flat class="purple white--text" @click="deleteData(item._id)">Delete</v-btn>
                </v-card-actions>


              </v-container>

            </v-card>
          </v-flex>
        </v-layout>
      </div>

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
      <v-flex xs12 sm6 :key="items.course_id" v-for="item in items">
        <v-card class="grey lighten-4 mb-2 mr-3 ml-3 mar"  :key="item._id">
          <v-container fluid style="min-height: 0;"
                       grid-list-lg>
            <v-card-title primary-title>
              <div>
                <div><h3 class="Grey--text darken-1" mp-0> Subject: {{ item.facultyCourse_name }}</h3></div>
                <div><h3 class="Grey--text darken-1" mp-0> Course duration: {{ item.facultyCourse_duration  }}</h3></div>
                <div><h3 class="Grey--text darken-1" mp-0> Course description: {{ item.facultyCourse_description   }}</h3></div>
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

    </v-container>
  </v-app>
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
        courses: [
          {
            Course_Id: '',
            Course_Subject: '',
            course_photo: ''
          },
          {
            Course_Id: '',
            Course_Subject: '',
            course_photo: ''
          }
        ],
        items: [{
          _id: '',
          FC_id: '',
          course_id: '',
          facultyCourse_name: '',
          facultyCourse_duration: '',
          facultyCourse_description: ''
        }],
        itemlists: [{
          _id: '',
          FC_id: '',
          course_id: '',
          facultyCourse_name: '',
          facultyCourse_duration: '',
          facultyCourse_description: ''
        }],
        right: null
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/faculty/course/view', {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then((response) => {
              this.itemlists = response.data
              console.log()
            })
            .catch((error) => {
              console.log(error)
            })
          Axios.get('http://192.168.137.1:3000/faculty/evaluation/view',
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data)
              this.items = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/faculty/login')
        }
      },
      deleteData: function (_id) {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.delete('http://192.168.137.1:3000/faculty/course/delete/' + _id, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
            .then(res => {
              console.log(res)
              console.log('it works')
            })
            .catch(function (error) {
              console.log(error)
            })
          this.$router.push('/faculty/index')
        } else {
          this.$router.push('/faculty/')
        }
      }
    },
    mounted () {
      this.getDetail()
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
  .pad {
    margin-left: 75px;
  }
</style>
