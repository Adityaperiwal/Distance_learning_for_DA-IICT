<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <div>
      <h1 class="text-lg-center mb-3 mt-3">COURSES</h1>
      <v-layout row wrap>

        <v-flex xs12 sm6 :key="items.course_id">
          <v-card class="grey-lighten lighten-5 mb-2 mar" v-for="item in items" :key="item._id">
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
                <v-btn flat class="green white--text" v-bind:to="{name: 'viewevaluation', params: {id: item._id }}">View Evaluation
                </v-btn>
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
  import Menu from '@/components/TA/menu'

  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        items: [{
          _id: '',
          FC_id: '',
          course_id: '',
          facultyCourse_name: '',
          facultyCourse_duration: '',
          facultyCourse_description: ''
        }]
      }
    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/ta/evaluation/view', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            console.log(response)
            this.items = response.data
            console.log('it works')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/TA/login')
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

<!--<template>-->
  <!--<v-container fluid="true">-->
    <!--<navMenu></navMenu>-->

    <!--<div>-->
      <!--<h1 class="text-lg-center mt-4 mb-4">COURSES</h1>-->
      <!--<v-layout row wrap>-->
        <!--<v-flex xs12 sm5>-->
          <!--<v-card class="light-blue lighten-4 mb-2" v-for="item in items" :key="item.courseId" :to="'/Faculty/evaluation/:faculty_id'">-->
            <!--<v-container fluid style="min-height: 0;"-->
                         <!--grid-list-lg>-->
              <!--<v-card-title primary-title>-->
                <!--<div>-->
                  <!--<div><h3 class="Grey&#45;&#45;text darken-1" mp-0>Course Id: {{ item.Course_Id }} </h3></div>-->
                  <!--<div><h3 class="Grey&#45;&#45;text darken-1" mp-0> Subject: {{ item.Course_Subject }}</h3></div>-->
                <!--</div>-->
              <!--</v-card-title>-->

              <!--<v-card-actions>-->
                <!--<v-btn flat class="green white&#45;&#45;text">Evaluation</v-btn>-->
              <!--</v-card-actions>-->



            <!--</v-container>-->

          <!--</v-card>-->
        <!--</v-flex>-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-flex xs12 sm5 >-->
          <!--<v-card class="light-blue lighten-4 mb-2" v-for="item in items" :key="item.courseId" :to="'/Faculty/evaluation/:faculty_id'">-->
            <!--<v-container fluid style="min-height: 0;"-->
                         <!--grid-list-lg>-->
              <!--<v-card-title primary-title>-->
                <!--<div>-->
                  <!--<div><h3 class="Grey&#45;&#45;text darken-1" mp-0>Course Id: {{ item.Course_Id }} </h3></div>-->
                  <!--<div><h3 class="Grey&#45;&#45;text darken-1" mp-0> Subject: {{ item.Course_Subject }}</h3></div>-->
                <!--</div>-->
              <!--</v-card-title>-->

              <!--<v-card-actions>-->
                <!--<v-btn flat class="green white&#45;&#45;text">Evaluation</v-btn>-->
              <!--</v-card-actions>-->



            <!--</v-container>-->

          <!--</v-card>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
    <!--</div>-->
  <!--</v-container>-->

<!--</template>-->



<!--<script>-->
  <!--import Axios from 'axios'-->
  <!--import Menu from '@/components/Faculty/menu'-->
  <!--import Vue from 'vue'-->
  <!--export default {-->
    <!--components: {'navMenu': Menu},-->
    <!--data () {-->
      <!--return {-->
        <!--sideNav: false,-->
        <!--items: [-->
          <!--{-->
            <!--Course_Id: '234',-->
            <!--Course_Subject: 'Programmig in C'-->
          <!--}-->

        <!--],-->
        <!--created: function () {-->
          <!--/*  this.loadQuote(); */-->
        <!--},-->
        <!--methods: {-->
          <!--async getDetail () {-->
            <!--console.log('view id called')-->
            <!--var jwt = Vue.localStorage.get('token')-->
            <!--console.log('view id called')-->
            <!--if (jwt) {-->
              <!--Axios.get('http://192.168.137.1:3000/admin/faculty/view/' + this.$route.params.id,-->
                <!--{-->
                  <!--headers: {-->
                    <!--'Authorization': 'bearer ' + Vue.localStorage.get('token')-->
                  <!--}-->
                <!--})-->
                <!--.then((response) => {-->
                  <!--console.log(response.data[0])-->
                  <!--this.items = response.data[0]-->
                <!--})-->
                <!--.catch((error) => {-->
                  <!--console.log(error)-->
                <!--})-->
            <!--} else {-->
              <!--this.$router.push('/faculty/login')-->
            <!--}-->
          <!--}-->
        <!--},-->
        <!--mounted () {-->
          <!--this.getDetail()-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

