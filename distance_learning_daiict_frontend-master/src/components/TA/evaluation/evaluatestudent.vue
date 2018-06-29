
<template>
  <v-container fluid="true">
    <navMenu></navMenu>

    <div id="app">
      <v-app id="inspire">
        <div class="text-xs-left ml-4 mt-4">
          <v-card>
            <v-card-title>
              STUDENTS LIST
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              v-for="item in items"
              :key="item._id"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-right">{{ props.item.student_id }}</td>
                <td class="text-xs-right">{{ props.item.subtopic_assignment_submission }}</td>
                <td class="text-xs-right"><a :href=props.item.subtopic_assignment> {{ props.item.subtopic_assignment_submission_date }}</a></td>
                <v-btn flat class="green white--text" v-bind:to="{name: 'viewevaluationstd', params: {student_id: item.student_id, subtopic_id: item._id }}">View
                </v-btn>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </div>
      </v-app>
    </div>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import Menu from '@/components/TA/menu'

  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        m: [],
        sub: '',
        date: '',
        search: '',
        headers: [
          {text: 'Student Id', value: 'subtopic_name'},
          {text: 'Subtopic Assignment Submission', value: 'subtopic_description'},
          {text: 'Subtopic Assignment Submission Date', value: 'subtopic_assignment'}
        ],
        items: [{
          _id: '',
          student_id: '',
          subtopic_assignment_submission: '',
          subtopic_assignment_submission_date: '',
          subtopic_id: ''
        }]
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/ta/evaluation/student/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log('oyyyy')
              console.log(response.data)
              console.log('HJGHJ')
              this.items = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/ta/login')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
