<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 mt-4 red--text">
          Evaluation
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;"
      class="orange lighten-4">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent="addCourses">
              <label name=""><h3><u>Student Id : </u></h3></label><br>
              <label name=""><h3>{{items.student_id}}</h3></label><br>
              <label name=""><h3><u>Assignment Link : </u></h3></label><br>
              <label name=""><h3><a
                :href=items.subtopic_assignment_submission>{{items.subtopic_assignment_submission}}</a></h3></label><br>
              <label name=""><h3><u>Assignment Submission date : </u></h3></label><br>
              <label name=""><h3>{{items.subtopic_assignment_submission_date}}</h3></label><br>

              <v-text-field
                label="Marks Obtained"
                v-model="subtopic_assignment_acquiredMarks"
                name="subtopic_assignment_acquiredMarks"
                required
              ></v-text-field>
              <v-layout row>
                <v-flex xs12 sm6>
                  <v-btn flat class="indigo"
                         type="submit"
                         @click="addCourses"
                  >Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>


<script>
  import axios from 'axios'
  import Menu from '@/components/TA/menu'
  import Vue from 'vue'

  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        subtopic_assignment_acquiredMarks: '',
        items: []
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        console.log(jwt)
        if (jwt) {
          axios.get('http://192.168.137.1:3000/ta/evaluation/student/detail/' + this.$route.params.student_id + '/' + this.$route.params.subtopic_id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log('hello')
              console.log(response.data)
              this.items = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/TA/login')
        }
      },
      addCourses () {
        // console.log('hello')
        var ss_id = this.items._id
        console.log(ss_id)
        console.log(this.subtopic_assignment_acquiredMarks)
        axios.patch('http://192.168.137.1:3000/ta/evaluation/student/detail/' + ss_id, {subtopic_assignment_acquiredMarks: this.subtopic_assignment_acquiredMarks},
          {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
          .catch(error => {
            console.log('hello' + error.msg)
          })

        // }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
