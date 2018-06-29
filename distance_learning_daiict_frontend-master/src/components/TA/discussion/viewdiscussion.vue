<template>
  <v-container fluid>
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
          Discussion
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;"
      class="orange lighten-4" >
      <v-layout row>
        <v-flex xs12 offset-xs2 sm8>
          <v-text-field
            name="input-2-3"
            label="Question"
            disabled="true"
            class="input-group--focused"
            single-line
          ></v-text-field>
        </v-flex>

      </v-layout>
      <v-layout row>
        <v-flex xs12 offset-xs2 sm8>
          <v-text-field
            name="input-2-3"
            label="Replay"
            class="input-group--focused"
            single-line
          ></v-text-field>
        </v-flex>

      </v-layout>
      <v-layout row>

      <v-flex xs12 sm12 text-xs-center>
        <v-container>
          <v-form @submit.prevent="addCourse">
            <v-layout row>
              <v-flex xs12 sm12>
                <v-btn flat class="indigo"
                       :disabled="!formIsValid"
                       type="submit"
                       @click="addCourse"
                >Replay
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
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        Course_Id: '',
        Course_Subject: ''
      }
    },

    computed: {
      formIsValid () {
        return this.Course_Id !== '' &&
          this.Course_Subject !== ''
      }
    },
    methods: {
      addCourse () {
        if (!this.formIsValid) {
          return
        }
        const CourseData = {
          Course_Id: this.Course_Id,
          Course_Subject: this.Course_Subject
        }
        console.log(CourseData)
        axios.post('https://sheltered-spire-10162.herokuapp.com/admin/course/create/')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>
