<template>
  <v-layout>
    <v-flex offset-sm0>
      <template>
        <v-navigation-drawer permanent>
          <v-toolbar flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  Subtopics
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list dense class="pt-0">
            <v-list-tile v-for="item in course" :key="item.subtopic_name" @click="">

              <v-list-tile-content>
                <v-list-tile-title @click="">{{ item.subtopic_name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </template>
    </v-flex>
  </v-layout>
</template>
<script>
  import Axios from 'axios'

  import Vue from 'vue'
  export default {
    data: function () {
      return {
        course: [
          {_id: ''},
          {subtopic_name: ''}
        ]
      }
    },
    created: function () {
      console.log('sub is called')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      console.log(this.$route.params.id)
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/student/course/subtopic/' + this.$route.params.id, {
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
        this.$router.push('/student/login')
        console.log('else part')
      }
    }
  }
</script>
