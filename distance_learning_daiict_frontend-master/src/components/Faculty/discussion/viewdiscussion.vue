<template>
  <v-container fluid="true">
    <navMenu></navMenu>

    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 mt-4 red--text">
          Discussion
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;"
      class="orange lighten-4" >
      <v-layout row>
        <v-flex xs12 offset-xs2 sm8 v-for="item in items">
          <v-text-field
            name="input-2-3"
            label="Question"
            v-model="item.question"
            disabled
            class="input-group--focused"
            single-line
          ></v-text-field>
          <v-text-field
            name="input-2-3"
            label="Replay"
            v-model="item.replay"
            class="input-group--focused"
            single-line
          ></v-text-field>
        </v-flex>

      </v-layout>
      <v-layout row>

      <v-flex xs12 sm12 text-xs-center>
        <v-container>
          <v-form @submit.prevent="Replay">
            <v-layout row>
              <v-flex xs12 sm12>
                <v-btn flat class="indigo"
                       type="submit"
                       @click="Replay"
                >Replay
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>


<script>
  import axios from 'axios'
  import Vue from 'vue'
  import Menu from '@/components/Faculty/menu'
  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        question: '',
        replay: '',
        items: [{
          question: '',
          replay: ''
        }]
      }
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
              this.items = response.data
              console.log(this.items)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/faculty/login')
        }
      },
      Replay () {
        console.log('hello')
        const fd = new FormData()
        fd.append('question', this.question)
        fd.append('replay', this.replay)
        axios.post('http://192.168.137.1:3000/faculty/create' + this.$route.params.id, fd,
          {
            headers: {
              'Content-type': 'multipart/form-data',
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
          .catch(error => {
            console.log('hello' + error.msg)
          })
      }
    }
  }
</script>
