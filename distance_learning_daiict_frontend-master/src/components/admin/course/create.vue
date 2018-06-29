<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>

    <br>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
          Add New Course
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;"
      class="grey lighten-4" >
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-container>
            <v-form enctype="multipart/form-data" @submit.prevent="">

              <label>Upload Image*</label>    <br><br>
              <div>
                <input type=file
                       @change="onFileSelected"
                       class="text--primary" required
                       accept="image/*"
                >
              </div >

              <v-text-field
                label="Course Name"
                name="course_subject"
                v-model="course_subject"
                required></v-text-field>

              <v-text-field
                label="Course Description"
                name="course_description"
                v-model="course_description"
                required></v-text-field>


              <v-layout row>
                <v-flex xs12 sm6>
                  <v-btn  class="purple"
                         :disabled="!formIsValid"
                         type="submit"
                         @click="addCourses"
                  >Add
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
  import Vue from 'vue'
  import Menu from '@/components/admin/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        course_photo: '',
        course_subject: '',
        course_description: '',
        right: null
      }
    },

    computed: {
      formIsValid () {
        return this.course_subject !== '' && this.course_description !== ''
      }
    },
    methods: {
      onFileSelected (event) {
        this.course_photo = event.target.files[0]
        console.log(this.course_photo)
      },
      addCourses () {
        const fd = new FormData()
        fd.append('course_photo', this.course_photo)
        fd.append('course_subject', this.course_subject)
        fd.append('course_description', this.course_description)
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          console.log(this.course_subject)
          axios.post('http://192.168.137.1:3000/admin/course/add', fd,
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
      }
    }
  }
</script>
