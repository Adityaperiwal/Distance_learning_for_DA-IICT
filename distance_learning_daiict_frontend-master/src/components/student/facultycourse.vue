<template>
  <v-container>
    <nav-Menu></nav-Menu>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
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
                    <br>

                    <div><label class="text--black"> <b>Course name:</b> </label> {{ item.facultyCourse_name }}</div>
                    <br>
                    <div> {{ item.faculty_educational_details }}</div>

                    <div><label class="text--black"><b>Duration:</b></label>{{item.facultyCourse_duration}}</div>
                    <br>

                    <div><label class="text--black"> <b>Description:</b></label>{{item.facultyCourse_description}}</div>
                    <br>
                    <div><label class="text--black"><b>Prerequisite:</b></label>{{item.facultyCourse_prerequisites}}
                    </div>

                  </div>
                </v-card-title>


                <v-btn flat class="purple lighten-5 purple--text" @click="enrollment(item._id)" type="submit"  v-bind:to= "{name: 'MyCourses', params: {id: item._id }}">Enroll
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
    name: 'app',
    components: {'nav-Menu': menuuu},

    data: function () {
      return {
        Enroll: 'Enroll',
        items: {
          _id: '',
          course_id: '',
          FC_id: '',
          facultyCourse_duration: '',
          facultyCourse_name: '',
          facultyCourse_description: '',
          facultyCourse_image: '',
          facultyCourse_prerequisites: '',
          facultyCourse_subtopic: ['']
        }
      }
    },
    created: function () {
      console.log('id is called')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      console.log(this.$route.params.id)

      localStorage.setItem('subtop', JSON.stringify(this.facultyCourse_subtopic))

      if (jwt) {
        Axios.get('http://192.168.137.1:3000/student/course/viewFC/' + this.$route.params.id, {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            this.items = response.data
            console.log(this.items)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log(this.$route.params)
        Axios.get('http://192.168.137.1:3000/student/course/viewFC/' + this.$route.params.id)
          .then((response) => {
            this.items = response.data
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    methods: {
      enrollment (id) {
        console.log('enroll clicked')
        console.log(Vue.localStorage.get('token'))
        console.log(id)
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.post('http://192.168.137.1:3000/student/course/enrollment/' + id, null,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
       //   window.alert('enrolled.')
        } else {
          this.$router.push('/student/login')
          console.log('else part')
        }
      }
    }
  }
</script>
