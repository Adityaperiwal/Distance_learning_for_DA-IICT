<template>

  <v-container fluid="true">
    <navMenu></navMenu>
    <br>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
          View Test Questions
        </h2>
      </v-flex>

    </v-layout>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.FcTestQuestion_text }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[0] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[1] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[2] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[4] }}</td>
        <td class="text-xs-center">{{ props.item.FcTestQuestion_answer }}</td>
      </template>
      <template slot="pageText" slot-scope="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
    </v-data-table>
    <v-btn color="purple" class="text--white" :to="'/Faculty/test/edit'"> Edit </v-btn>
  </v-container>

</template>
<script>
  import Menu from '@/components/Faculty/menu'
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        course_id: '',
        faculty_id: '',
        FcTestQuestion_text: '',
        FcTestQuestion_answer: '',
        FcTestQuestion_answers: [],
        FcTest: [],
        items: [{
          FcTestQuestion_text: 'ad',
          FcTestQuestion_answers: [],
          FcTestQuestion_answer: 'asd'
        }],
        headers: [
          {
            text: 'Questions',
            align: 'left',
            sortable: false,
            value: 'FcTestQuestion_text'
          },
          { text: 'Option A', value: 'subtopic_description' },
          { text: 'Option B', value: 'subtopic_video' },
          { text: 'Option C', value: 'subtopic_assignment' },
          { text: 'Option D ', value: 'subtopic_weightage' },
          { text: 'Right Answer', value: 'subtopic_assignment_totalMarks: \'\',\n' }
        ],
        right: null
      }
    }

    // computed: {
    // },
    // methods: {
    //   async getDetail () {
    //     console.log('view id called')
    //     var jwt = Vue.localStorage.get('token')
    //     console.log('view id called')
    //     if (jwt) {
    //       axios.get('http://192.168.137.1:3000/faculty/test/view',
    //         {
    //           headers: {
    //             'Authorization': 'bearer ' + Vue.localStorage.get('token')
    //           }
    //         })
    //         .then((response) => {
    //           // console.log(response.data.result[abc].ta_name)
    //           this.items.push(response.data[0])
    //           // this.items = response.data[0]
    //         })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //     } else {
    //       this.$router.push('/faculty/login')
    //     }
    //   }
    // },
    // mounted () {
    //   this.getDetail()
    // }
  }
</script>

