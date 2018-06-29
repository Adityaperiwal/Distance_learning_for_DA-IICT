<template>

  <v-container fluid="true">
    <navMenu></navMenu>
    <br>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
          Edit Test
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;"
      class="grey lighten-4" >
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent="addTest" enctype="multipart/form-data">
              <v-text-field
                label="Enter Question"
                name="FcTestQuestion_text"
                v-model="FcTestQuestion_text"
                required></v-text-field>
              <v-text-field
                label="Option A"
                name="a"
                v-model="a"
                required></v-text-field>
              <v-text-field
                label="Option B"
                name="b"
                v-model="b"
                required></v-text-field>
              <v-text-field
                label="Option C"
                name="c"
                v-model="c"
                required></v-text-field>
              <v-text-field
                label="Option D"
                name="d"
                v-model="d"
                required></v-text-field>
              <v-select
                :items="answers"
                label="Right Answer"
                v-model="FcTestQuestion_answer"
                data-vv-name="select"
                required
              ></v-select>


              <v-card-actions >
                <v-btn color="purple" class="text--white"  @click="save(FcTestQuestion_text, a, b, c, d, FcTestQuestion_answer)"> Add more subtopic </v-btn>
              </v-card-actions>


            </v-form>
          </v-container>
        </v-flex>
      </v-layout>
    </div>
    <v-data-table
      :headers="headers"
      :items="FcTest"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.FcTestQuestion_text }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[0] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[1] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[2] }}</td>
        <td class="text-xs-right">{{ props.item.FcTestQuestion_answers[3] }}</td>
        <td class="text-xs-center">{{ props.item.FcTestQuestion_answer }}</td>
        <v-btn color="purple" class="text--white iteDelete" @click="del(props.item.FcTestQuestion_text, props.item.FcTestQuestion_answers[0], props.item.FcTestQuestion_answers[1], props.item.FcTestQuestion_answers[2], props.item.FcTestQuestion_answers[3], props.item.FcTestQuestion_answer)" > delete </v-btn>
      </template>
      <template slot="pageText" slot-scope="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
    </v-data-table>
    <v-btn color="purple" class="text--white" type="submit" @click="addTest"> submit </v-btn>
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
        a: '',
        b: '',
        c: '',
        d: '',
        answers: [
          '0',
          '1',
          '2',
          '3'
        ],
        FcTestQuestion_answers: [],
        FcTest: [],
        items: [],
        headers: [
          {
            text: 'Questions',
            align: 'left',
            sortable: false,
            value: 'FcTestQuestion_text'
          },
          { text: 'Option 0', value: 'subtopic_description' },
          { text: 'Option 1', value: 'subtopic_video' },
          { text: 'Option 2', value: 'subtopic_assignment' },
          { text: 'Option 3 ', value: 'subtopic_weightage' },
          { text: 'Right Answer', value: 'subtopic_assignment_totalMarks: \'\',\n' }
        ],
        right: null
      }
    },

    computed: {
    },
    methods: {
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          console.log('set1')
          console.log(this.$route.params.id)
          axios.get('http://192.168.137.1:3000/faculty/test/viewtest/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log('oyy')
              console.log(response)
              this.FcTest = response.data
              console.log(this.FcTest)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/faculty/login')
        }
      },
      save: function (FcTestQuestion_text, a, b, c, d, FcTestQuestion_answer) {
        var ar = [a, b, c, d]
        console.log(ar)
        this.FcTest.push({
          FcTestQuestion_text: FcTestQuestion_text,
          FcTestQuestion_answers: ar,
          FcTestQuestion_answer: FcTestQuestion_answer
        })
      },
      del: function (FcTestQuestion_text, FcTestQuestion_answers0, FcTestQuestion_answers1, FcTestQuestion_answers2, FcTestQuestion_answers3, FcTestQuestion_answer) {
        var ar = [FcTestQuestion_answers0, FcTestQuestion_answers1, FcTestQuestion_answers2, FcTestQuestion_answers3]
        this.FcTest.splice({
          FcTestQuestion_text: FcTestQuestion_text,
          FcTestQuestion_answers: ar,
          FcTestQuestion_answer: FcTestQuestion_answer
        }, 1)
      },
      addTest () {
        //  hgjgh
        var test = JSON.stringify(this.FcTest)
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          axios.patch('http://192.168.137.1:3000/faculty/test/edit/' + this.$route.params.id, {FcTest_questions: test},
            {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)),
              this.$router.push('/faculty/index'), alert('Test Edit Successfully'))
            .catch(error => {
              console.log(error.response)
              this.$router.push('/faculty/index')
              alert('Test Not Edit Successfully')
            })
        } else {
          this.$router.push('/faculty/login')
        }
      }
      // addCourses () {
      //   console.log('hello')
      //   // const fd = new FormData()
      //   // fd.append('course_subject', this.course_subject)
      //   // console.log(Vue.localStorage.get('token'))
      //   //   var jwt = Vue.localStorage.get('token')
      //   //   if (jwt) {
      //   const fd = new FormData()
      //   fd.append('FcTestQuestion_text', this.FcTestQuestion_text)
      //   fd.append('FcTestQuestion_answers[]', this.FcTestQuestion_answers)
      //   fd.append('FcTestQuestion_answer', this.FcTestQuestion_answer)
      //   axios.patch('http://192.168.137.1:3000/faculty/course/create', fd,
      //     {
      //       headers: {
      //         'Content-type': 'multipart/form-data'
      //         // 'Authorization': 'bearer ' + Vue.localStorage.get('token')
      //       }
      //     })
      //     .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
      //     .catch(error => {
      //       console.log('hello' + error.msg)
      //     })
      //
      //   // }
      // }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>

