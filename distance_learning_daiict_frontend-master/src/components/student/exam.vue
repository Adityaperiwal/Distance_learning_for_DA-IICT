<template>
  <v-container>
    <nav-Menu></nav-Menu>
    <h2 style="display: flex;justify-content: center">
      {{quiz.title}}
    </h2>
    <v-card>
      <br>
      <v-flex offset-sm2>

        <div v-for="(question,index) in quiz.questions">
                   <div v-show="index===questionIndex">
            <h2>{{questionIndex+1}}   {{question.FcTestQuestion_text}}</h2>
            <ol>
            <li v-for="response in question.FcTestQuestion_answers">
              <label>
                <input type="radio"
                       v-bind:value="response.correct"
                       v-bind:name="index"
                >
              {{response.text}}
                <br><br>
              </label>

            </li>
          </ol>
            <br>
            <br>

            <v-btn v-if="questionIndex > 0" @click="prev">
              prev
            </v-btn>
            <v-btn @click="next">
              next
            </v-btn>
          </div>
        </div>
        <div v-show="questionIndex===quiz.questions.length">
          <h2>
            Finished
          </h2>
          <p>
          You Got {{this.mark}} mark(s).
          </p>

          <v-btn @click="submit">
            submit
          </v-btn>
        </div>
      </v-flex>
    </v-card>
  </v-container>
</template>
<script>
  import menuuu from '@/components/student/menuu'
  import Axios from 'axios'
  import Vue from 'vue'

  import VueLocalStorage from 'vue-localstorage'

  Vue.use(VueLocalStorage)
  export default {
    name: 'app',
    components: {'nav-Menu': menuuu},

    data: function () {
      return {
        questionIndex: 0,
        userResponses: [],
        _id: '',
        ct: 0,
        radios: [],
        value: '',
        marks: '',
        mark: 0,
        quiz: {
          title: 'Myquiz',
          questions: [
            {
              FcTestQuestion_text: 'question 1',
              FcTestQuestion_answers: [
                {text: 'a'},
                {text: 'b', correct: true},
                {text: 'c'},
                {text: 'd'}
              ]
            },
            {
              FcTestQuestion_text: 'question2',
              FcTestQuestion_answers: [
                {text: 'e'},
                {text: 'f'},
                {text: 'g'},
                {text: 'h', correct: true}
              ]
            }]
        }
      }
    },
    methods: {
      next: function () {
        this.questionIndex++
      },
      prev: function () {
        this.questionIndex--
      },
      Score: function () {
        return this.userResponses.filter(function (val) {
          return val
        }).length
      },
      submit () {
        this.ct = 0
        this.mark = 0
        this.radios=document.getElementsByTagName('input')
        for (var j = 0; j < this.quiz.questions.length; j++) {
          if (this.quiz.questions[j].FcTestQuestion_answers[0].correct !== undefined) {
            this.userResponses.push(0)
          } else if (this.quiz.questions[j].FcTestQuestion_answers[1].correct !== undefined) {
            this.userResponses.push(1)
          } else if (this.quiz.questions[j].FcTestQuestion_answers[2].correct !== undefined) {
            this.userResponses.push(2)
          } else {
            this.userResponses.push(3)
          }
          console.log(this.userResponses)
        }
        console.log(this.radios)
        this.value=5
        for (var i = 0; i < this.radios.length; i++) {
          if (this.radios[i].type === 'radio' && this.radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            this.value = i%4
            console.log( this.value)
          }
          if ((i + 1) % 4 === 0 && i !== 0) {
            if (this.userResponses[this.ct++] === this.value) {
              this.mark++
              this.value=5
            }
            console.log(this.mark)
          }
        }
        //     console.log(Vue.localStorage.get('token'))
        //     var jwt = Vue.localStorage.get('token')
        //     console.log('view id called')
        //     if (jwt) {
        //       Axios.post('http://192.168.137.1:3000/student/', {
        //         'result': this.mark
        //       },
        //         {
        //           headers: {
        //             //  'Content-type': 'multipart/form-data',
        //             'Authorization': 'bearer ' + Vue.localStorage.get('token')
        //           }
        //         })
        //         .then(r => console.log('r: ', JSON.stringify(r, null, 2))
        //         )
        //         .catch(error => {
        //           console.log(error.response)
        //         })
        //     } else {
        //       this.$router.push('/student/login')
        //     }
        //   }
        // },
      },
      created: function () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/student/course/viewTest/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data)
              this.quiz.questions = response.data
              console.log(this.quiz.questions[0].FcTestQuestion_answers)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('')
        }
      }
    }
  }
</script>
