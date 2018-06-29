<template>
  <v-container>

      <nav-Menu></nav-Menu>
      <br>
      <br>
      <br>
      <v-layout>

        <v-flex>

        <h3 style="justify-content: center;display: flex; color: darkcyan">SUBTOPIC &nbsp;  {{items.subtopic_name}}</h3>

          <v-flex xs5 sm4 md3>

          <v-flex offset-sm1>
            <!--<video width="1200" height="540" controls >-->
              <!--<source :src=this.items.subtopic_video type="video/mp4">-->

            <!--</video>-->
            <iframe width="900" height="540" :src=this.items.subtopic_video allowfullscreen ></iframe>
          </v-flex>
        </v-flex>
        <v-container>
          <v-flex xs11>
            <v-card>
              <div><label class= " grey lighten-4 mb-3 ml-4 cyan--text"><h2> Description: </h2>&nbsp; </label> {{ items.subtopic_description }}</div><br>
            </v-card>
          </v-flex>
          <br>
          <br>

<v-layout row wrap >
          <v-flex xs3 sm4>
<v-card>
            <v-card class="grey lighten-4 mb-3">
              <v-card-title primary-title>
                <div class="text--black">
                  <div><h3 class="blue--text ml-4" mp-0> FACULTY NOTES </h3></div><br>

                </div>
              </v-card-title>
                <v-card-actions>
                  <a v-bind:href="items.subtopic_assignment" target="_blank" download> <br> <v-btn > Click here to download</v-btn> </a>   </v-card-actions>
              <br>
              <v-card-actions>

                    <v-btn class="cyan lighten-4" v-bind:to= "{name: 'Studfeedback', params: {id: items._id }}">Give Feedback</v-btn>


              </v-card-actions>

            </v-card>
                  <v-card class="grey lighten-4 mb-3">
                  <div class="container">
                    <div class="dropbox">
                      <label>UPLOAD ASSIGNMENT</label>
                      <br>
                      <br>
                      <input
                        type="file"
                        @change="onFileSelected"
                        required
                        name="subtopic_assignment_submission"
                        id="subtopic_assignment_submission"
                      > <br><br>
                      <v-btn @click="PostAssignment" type="submit" class="cyan lighten-4" >Upload</v-btn>
                    </div>
                  </div>
                </v-card>

                <br>
</v-card>      </v-flex>

</v-layout>
        </v-container>

        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import subtopicMenu from '@/components/student/subtopicNavigation'
  import menuuu from '@/components/student/menuu'
  export default {
    name: 'app',
    components: {
      'nav-Menu': menuuu,
      'subtopic-menu': subtopicMenu
    },
    data () {
      return {

        items: {
          _id: '',
          subtopic_name: '',
          subtopic_assignment: '',
          subtopic_video: '',
          subtopic_assignment_submission: '',
          subtopic_description: '',
          subtopic_weight: ''
        }
      }
    },

    methods: {
      onFileSelected (event) {
        this.subtopic_assignment_submission = event.target.files[0]
        console.log(this.subtopic_assignment_submission)
      },
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called' + jwt)
        console.log(this.$route.params._id)
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/student/course/subtopics/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data[0])
              this.items = response.data[0]
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/student/login')
        }
      },
      PostAssignment () {
        const fd = new FormData()
        var jwt = Vue.localStorage.get('token')
        console.log(this.$route.params.id)
        console.log(this.subtopic_assignment_submission)
        console.log('view id called' + jwt)
        if (jwt) {
          fd.append('subtopic_assignment_submission', this.subtopic_assignment_submission)
          Axios.post('http://192.168.137.1:3000/student/course/assignment/' + this.$route.params.id, fd,
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
          this.$router.push('/student/login')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
