<template>
 <v-container fluid="true">
   <navMenu></navMenu>
   <v-layout>
     <v-flex>

        <v-card  @submit.prevent="updateFaculty" enctype="multipart/form-data">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="red--text darken-2"><h3>EDIT DETAILS</h3> </v-card-title>
              </v-flex>

            </v-layout>
            <v-divider></v-divider>
            <v-spacer></v-spacer>

            <v-layout row wrap class="">
              <v-flex xs12>

                <v-card-text>
                  <v-text-field
                    label="Faculty name"
                    name="items.faculty_name"
                    v-model="items.faculty_name"
                    required
                  >{{ items.faculty_name }}</v-text-field>
                </v-card-text>

                <label>Upload Image*</label>    <br><br>
                <div>
                  <input type=file
                         @change="onFileSelected"
                         class="text--primary" required
                         accept="image/*">
                </div >
                <br>

              <v-card-text>
                <v-text-field
                  label="E-mail"
                  name="items.faculty_email"
                  v-model="items.faculty_email"
                  required
                >
                  {{ items.faculty_email }}
                </v-text-field>
              </v-card-text>

               <v-card-text>
                 <v-text-field name=" items.faculty_contact_number"
                                label="Contact"
                                v-model="items.faculty_contact_number"
                                required
                                >
                          {{ items.faculty_contact_number }}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.faculty_educational_details"
                                label="Educational Details"
                               v-model="items.faculty_educational_details"
                                required>

                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.faculty_area_interest"
                                label="Interest Area"
                                v-model="items.faculty_area_interest"
                                required
                                >
                            {{ items.faculty_area_interest }}
                  </v-text-field>
                </v-card-text>
                <v-card-actions >
                  <v-btn @click="updateFaculty" color="indigo" class="text--white"> SUBMIT </v-btn>
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
  import Menu from '@/components/admin/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        items: {
          _id: '',
          faculty_name: '',
          faculty_photo: '',
          faculty_email: '',
          faculty_contact_number: '',
          faculty_educational_details: '',
          faculty_area_interest: ''
        },
        sideNav: false,
        right: null

      }
    },
    methods: {
      onFileSelected (event) {
        this.faculty_photo = event.target.files[0]
        console.log(this.faculty_photo)
      },
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/admin/faculty/view/' + this.$route.params.id,
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data[0])
              this.items = response.data[0]
              console.log(this.items)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/admin/')
        }
      },
      updateFaculty () {
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          const fd = new FormData()
          fd.append('faculty_photo', this.faculty_photo)
          fd.append('faculty_name', this.items.faculty_name)
          fd.append('faculty_email', this.items.faculty_email)
          fd.append('faculty_contact_number', this.items.faculty_contact_number)
          fd.append('faculty_educational_details', this.items.faculty_educational_details)
          fd.append('faculty_area_interest', this.items.faculty_area_interest)
          Axios.patch('http://192.168.137.1:3000/admin/faculty/update/' + this.$route.params.id, fd,
            {
              headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then(r => console.log('r: ', JSON.stringify(r, null, 2)))
            .catch(error => {
              console.log(error.response)
            })
        } else {
          this.$router.push('/admin/')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
