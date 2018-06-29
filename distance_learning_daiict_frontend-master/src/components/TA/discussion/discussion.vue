<template>
   <v-container fluid>
  <navMenu></navMenu>
    <div>

      <v-layout row wrap>
        <v-flex xs12 sm5><br><br><br>
          <v-card class="light-blue lighten-4 mb-2" v-for="item in items" :key="item.courseId" :to="'/TA/discussion/discussion/viewdiscussion'">
            <v-container fluid style="min-height: 0;"
                         grid-list-lg>
              <v-card-title primary-title>
                <div>
                  <div><h3 class="Grey--text darken-1" mp-0>Course Id: {{ item.Course_Id }} </h3></div>
                  <div><h3 class="Grey--text darken-1" mp-0> Subject: {{ item.Course_Subject }}</h3></div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat class="green white--text" :to="'/TA/discussion/viewdiscussion'">View Discussion</v-btn>
              </v-card-actions>



            </v-container>

          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm5 ><br><br><br>
          <v-card class="light-blue lighten-4 mb-2" v-for="item in items" :key="item.courseId" :to="'/TA/discussion/discussion/:course_id'">
            <v-container fluid style="min-height: 0;"
                         grid-list-lg>
              <v-card-title primary-title>
                <div>
                  <div><h3 class="Grey--text darken-1" mp-0>Course Id: {{ item.Course_Id }} </h3></div>
                  <div><h3 class="Grey--text darken-1" mp-0> Subject: {{ item.Course_Subject }}</h3></div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat class="green white--text">View Discussion</v-btn>
              </v-card-actions>



            </v-container>

          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>

</template>



<script>
  import Menu from '@/components/TA/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        items: [
          {
            Course_Id: '234',
            Course_Subject: 'Programmig in C'
          }

        ],
        created: function () {
          /*  this.loadQuote(); */
        },
        methods: {
          loadQuote () {
            /* axios.get('https://sheltered-spire-10162.herokuapp.com/admin/faculty/view/') */
          }
        }
      }
    }
  }
</script>

