<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-5 red--text">
         complains
        </h2>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.complaint_date_posted }}</td>
        <td>{{ props.item.student_name }}</td>
        <td class="text-xs-left"><b>{{ props.item.complaint_title }}</b></td>
        <td> <v-btn :key="props.item._id"  v-bind:to= "{name: 'AdminViewComplain', params: {id: props.item._id } }" class="green lighten-2 white--text"> View</v-btn></td>
      </template>
    </v-data-table>
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
        headers: [
          { text: 'Date', value: 'complaint_date_posted' },
          { text: 'Student Name', value: 'student_name' },
          { text: 'Subject', value: 'complaint_title' }
        ],
        items: [],
        value: false,
        _id: '',
        complaint_date_posted: '',
        complaint_title: '',
        student_name: '',
        sideNav: false,
        right: null
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/admin/complain/view', {
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
        this.$router.push('/admin/')
      }
    }
  }
</script>
