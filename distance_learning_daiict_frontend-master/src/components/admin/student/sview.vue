<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
      <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-5 red--text">
          Students Details
        </h2>
      </v-flex>
    </v-layout>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>

          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">

                  <td class="text-xs-right">{{ props.item.student_name }}</td>
          <td class="text-xs-left">{{ props.item.student_email }}</td>
          <td class="text-xs-left">{{ props.item.student_contact_number }}</td>
          <td class="text-xs-left">{{ props.item.student_education_level }}</td>
          <td class="text-xs-left">{{ props.item.student_experience }}</td>
          <td class="text-xs-left">{{ props.item.student_address }}</td>
        </template>
      </v-data-table>
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
        headers: [
          { text: 'Student Name', value: 'student_name' },
          { text: 'Work Experience', value: 'student_experience' },
          { text: 'Email Id', value: 'student_email' },
          { text: 'Contact Number', value: 'student_contact_number' },
          {text: 'Educational Qualification', value: 'student_education_level'},
          { text: 'Address', value: 'student_address' }
        ],
        items: [],
        value: false,
        _id: '',
        sideNav: false,
        right: null
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/admin/student/view', {
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
        this.$router.push('/admin/login')
      }
    }
  }
</script>
