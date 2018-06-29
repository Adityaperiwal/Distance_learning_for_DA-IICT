<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-layout>
      <v-flex>

        <v-card  @submit.prevent="" enctype="multipart/form-data">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="red--text darken-2"><h3>EDIT COURSE DETAILS</h3> </v-card-title>
              </v-flex>

            </v-layout>
            <v-divider></v-divider>
            <v-spacer></v-spacer>

            <v-layout row wrap class="">
              <v-flex xs12>


                <v-card-text>
                  <v-text-field
                    label="Course Subject"
                    name="items.course_subject"
                    v-model="items.course_subject"
                    required
                  >
                    {{ items.course_subject }}
                  </v-text-field>

                  <v-text-field
                    label="Description"
                    v-model="items.course_description"
                    name="items.course_description"
                    required

                  >
                    {{ items.course_description }}
                  </v-text-field>
                  <label>Upload Image*</label>    <br><br>
                  <div>
                    <input type=file
                           @change="onFileSelected"
                           class="text--primary" required
                           accept="image/*" >
                  </div >
                  <br>
                </v-card-text>
                <v-card-actions >
                  <v-btn @click="updateCourse" color="indigo" class="text--white"> SUBMIT </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
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
        items: {
          _id: '',
          course_photo: '',
          course_subject: '',
          course_description: ''
        },
        sideNav: false,
        right: null

      }
    },
    methods: {
      onFileSelected (event) {
        this.course_photo = event.target.files[0]
        console.log(this.course_photo)
      },
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/admin/course/view/' + this.$route.params.id,
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
      updateCourse () {
      //  const fd = new FormData()
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          const fd = new FormData()
          fd.append('course_photo', this.course_photo)
          fd.append('course_subject', this.items.course_subject)
          fd.append('course_description', this.items.course_description)
          Axios.patch('http://192.168.137.1:3000/admin/course/update/' + this.$route.params.id, fd,
            {
              headers: {
              //  'Content-type': 'multipart/form-data',
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
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
