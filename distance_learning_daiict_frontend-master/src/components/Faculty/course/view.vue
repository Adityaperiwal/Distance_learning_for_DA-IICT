<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <div>
      <h1 class="text-lg-center mb-3 mt-3">COURSES</h1>
      <v-layout row wrap>

        <v-flex xs12 sm6 :key="items.course_id"  v-for="item in items">
          <v-card class="grey lighten-4 mb-2 mt-3 ml-3 mar" :key="item._id">
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
  </v-container>

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
        items: [{
          _id: '',
          FC_id: '',
          course_id: '',
          facultyCourse_name: ''
        }]
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/faculty/course/view/', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            this.items = response.data
            console.log('it works')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/faculty/')
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
            this.$router.push('/faculty/index')
            alert('Deleted Sucessfully')
          })
          .catch(function (error) {
            console.log(error)
            this.$router.push('/faculty/index')
            alert('Deleted Not Sucessfully')
          })
      } else {
        this.$router.push('/faculty/')
      }
    }
  }
</script>
<style scoped>
  .mar {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
