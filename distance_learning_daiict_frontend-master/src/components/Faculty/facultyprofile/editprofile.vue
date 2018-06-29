<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-layout>
      <v-flex>

        <v-card class=" lighten-4">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="red--text darken-2 mt-2 mb-2"><h3>EDIT PROFILE</h3> </v-card-title>
              </v-flex>

            </v-layout>
            <v-divider></v-divider>
            <v-spacer></v-spacer>

            <v-layout row wrap >
              <v-flex xs12>

                <v-card-text hidden>
                  <v-text-field
                    label="Faculty Id"
                    name="items._id"
                    v-model="items._id"
                  ></v-text-field>
                </v-card-text>

                <v-card-text>
                  <v-text-field
                    label="Faculty name"
                    name="items.faculty_name"
                    v-model="items.faculty_name"
                  ></v-text-field>
                </v-card-text>
                <v-list-tile-avatar   class="ml-3 mt-3 mb-5"><br/>
                  <div style="height: 100px; width: 100px"><img :src="items.faculty_photo"></div>

                </v-list-tile-avatar>
                <v-layout class="ml-3 mt-3">
                  <label>Upload Image* &nbsp;<br/></label>
                  <input
                    type="file"
                    @change="onFileSelected"
                    required
                    name="items.faculty_photo"
                  ></input>
                </v-layout>
                <!--<v-card-text>-->
                <!--<v-text-field-->
                <!--label="Image Url"-->
                <!--name="items.faculty_photo"-->
                <!--v-model="items.faculty_photo"-->
                <!--&gt;</v-text-field>-->
                <!--</v-card-text>-->

                <v-card-text>
                  <v-text-field
                    label="E-mail"
                    name="items.faculty_email"
                    v-model="items.faculty_email"
                    disabled
                  ></v-text-field>
                </v-card-text>


                <v-card-text>
                  <v-text-field name="items.faculty_contact_number"
                                label="Contact"
                                id="items.faculty_contact_number"
                                v-model="items.faculty_contact_number"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.faculty_educational_details"
                                label="Educational Details"
                                id="items.faculty_educational_details"
                                v-model="items.faculty_educational_details">

                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.faculty_area_interest"
                                label="Interest"
                                id="items.faculty_area_interest"
                                v-model="items.faculty_area_interest"
                  >

                  </v-text-field>
                </v-card-text>
                <v-card-actions >
                  <v-btn @click="" color="purple" class="text--white" @click="update(items._id)"> SUBMIT </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import Vue from 'vue'
  import Menu from '@/components/Faculty/menu'
  export default {
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        _id: '',
        faculty_name: '',
        faculty_photo: '',
        faculty_email: 'kkjj',
        faculty_contact_number: '',
        faculty_educational_details: '',
        faculty_area_interest: '',
        items: {
          faculty_name: '',
          faculty_photo: '',
          faculty_email: '',
          faculty_contact_number: '',
          faculty_educational_details: '',
          faculty_area_interest: ''
        }
      }
    },
    methods: {
      async getDetail () {
        console.log('view id called')
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          axios.get('http://192.168.137.1:3000/faculty/course/getTA',
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              // console.log(response.data.result[abc].ta_name)
              this.items.push(response.data[0])
              // this.items = response.data[0]
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/faculty/login')
        }
      },
      onFileSelected (event) {
        this.faculty_photo = event.target.files[0]
        console.log(this.faculty_photo)
      }

    },
    created: function () {
      console.log(Vue.localStorage.get('token'))
      var jwt = Vue.localStorage.get('token')
      if (jwt) {
        Axios.get('http://192.168.137.1:3000/faculty/view/', {
          headers: {
            'Authorization': 'bearer ' + Vue.localStorage.get('token')
          }
        })
          .then((response) => {
            this.items = response.data[0]
            console.log('it works')
            console.log(this.items)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$router.push('/faculty/')
      }
    },

  }
</script>
