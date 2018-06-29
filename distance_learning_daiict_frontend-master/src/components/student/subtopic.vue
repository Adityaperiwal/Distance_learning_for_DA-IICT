<template>
  <v-container>
    <nav-Menu></nav-Menu>


    <v-layout row wrap>
      <v-flex xs12 sm12 offset-sm1><div>
        <v-card class="grey lighten-4 mb-3" v-for="item in items" :key="item._id">
          <v-container fluid>
            <v-layout row>

              <v-flex>
                <v-card-title primary-title>
                  <div class="text--black">
                    <div><h2>{{item.subtopic_name}}</h2></div>

                    <v-spacer></v-spacer>
                    <div><label class="text--black"> <b>Subtopic name:</b> </label> {{ item.subtopic_name }}</div>
                    <br>


                  </div>
                </v-card-title>

                <v-btn flat class="purple lighten-5 purple--text"
                       v-bind:to="{name: 'Studentstudy', params: {id: item._id } }">View
                </v-btn>

              </v-flex>
            </v-layout>
          </v-container>



        </v-card>
        <br>
        <v-layout>
          <v-flex>
            <v-btn  v-bind:to= "{name: 'Exam'}" class="green white--text right"> TAKE TEST </v-btn>
          </v-flex>
        </v-layout>
      </div>
        <br><br><hr>





      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import menuuu from '@/components/student/menuu'
  export default {
    name: 'app',
    components: {'nav-Menu': menuuu},
    data () {
      return {
        // eslint-disable-next-line
        items: {
          _id: '',
          subtopic_name: '',
          subtopic_description: ''
        }
      }
    },
    created: function () {
      console.log('id is called')
      console.log(this.$route.params.id)
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/student/course/subtopic/' + this.$route.params.id, {
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
        console.log('else part')
      }
    }
  }
</script>
