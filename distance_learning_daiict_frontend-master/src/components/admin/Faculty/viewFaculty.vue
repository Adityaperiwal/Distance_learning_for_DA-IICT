<template>
  <v-container fluid="true">
    <navMenu></navMenu>
  <br>

    <v-layout>
      <v-flex>
        <v-btn :to="'/admin/faculty/add/'" class="green white--text right"> ADD FACULTY </v-btn>
      </v-flex>
    </v-layout>
    <br>
  <div>

      <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="grey lighten-4 mb-3" v-for="item in items" :key="item._id"  >
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                    :src="item.faculty_photo"
                    height="150px" width="150px">
                  </v-card-media>
                </v-flex>
                <v-flex>
                  <v-card-title primary-title>
                    <div class="text--black">
                      <div><h3 class="red--text" mp-0> {{ item.faculty_name }} </h3></div>
                      <div> {{ item.faculty_educational_details }}</div><br>
                      <div>  <label class="text--black"> <b>Area of Interest:</b>  </label> {{ item.faculty_area_interest }}</div><br>
                      <div>  <label class="text--black"><b>Email: </b> </label> {{ item.faculty_email }}</div>
                      <div> <label class="text--black"><b>Office:  </b></label>(+91) {{ item.faculty_contact_number }}</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn flat class="purple lighten-5 purple--text"  v-bind:to= "{name: 'adminview', params: {id: item._id } }" >View</v-btn>
                    <v-btn flat class="purple lighten-5 purple--text" v-bind:to= "{name: 'adminupdate', params: {id: item._id }}" align="center">Edit</v-btn>
                    <v-btn flat class="purple lighten-5 purple--text"   @click="deleteData(item._id)">Delete</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
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
  import Menu from '@/components/admin/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        dialog: false,
        items: {
          _id: '',
          faculty_name: '',
          faculty_photo: '',
          faculty_email: '',
          faculty_contact_number: '',
          faculty_educational_details: '',
          faculty_area_interest: ''
        },
        menuItems: [
          {
            title: 'Faculty',
            icon: 'perm_identity',
            active: true,
            menuItems: [
              {title: 'Add Faculty', icon: 'note_add', link: '/admin/faculty/add'},
              {title: 'View Faculty', icon: 'view_array', link: '/admin/faculty/viewFaculty'}
            ]
          },
          {title: 'Student', icon: 'dashboard', link: '/admin/student/sview'},
          {title: 'Course',
            icon: 'dashboard',
            active: true,
            menuItems: [
              {title: 'View Course', icon: 'view_array', link: '/admin/course/remove'},
              {title: 'Create Course', icon: 'note_add', link: '/admin/course/create'}
            ]
          },
          {title: 'Enquiries', icon: 'dashboard', link: '/admin/inquiry/showInquiries'},
          {title: 'Complains', icon: 'dashboard', link: '/admin/complain/listcomplains'}

        ],

        // deleteUrl: function (id) { return this.path + id },
        right: null
      }
    },
    created: function () {
      console.log('hhh')
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/admin/faculty/view/', {
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
        this.$router.push('/admin/')
      }
    },
    methods: {
      deleteData: function (_id) {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          Axios.delete('http://192.168.137.1:3000/admin/faculty/remove/' + _id, {
            headers: {
              'Authorization': 'bearer ' + Vue.localStorage.get('token')
            }
          })
          .then(res => {
            console.log(res)
            console.log('it works')
          })
          .catch(function (error) {
            console.log(error)
          })
          this.$router.push('/admin/Faculty/viewFaculty')
        } else {
          this.$router.push('/admin/')
        }
      }
    }
  }
</script>
