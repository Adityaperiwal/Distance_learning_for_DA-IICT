<template>
  <v-container fluid="true">
    <nav-Menu></nav-Menu>
    <v-layout>
      <v-flex>

        <v-card  @submit.prevent="" enctype="multipart/form-data">
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
                    label="Student name"
                    name="items.student_name"
                    v-model="items.student_name"
                    required
                  >{{ items.student_name }}</v-text-field>
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
                    name="items.student_email"
                    v-model="items.student_email"
                    required
                  >
                    {{ items.student_email }}
                  </v-text-field>
                </v-card-text>

                <v-card-text>
                  <v-text-field name=" items.student_contact_number"
                                label="Contact"
                                v-model="items.student_contact_number"
                                required
                  >
                    {{ items.student_contact_number }}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_educational_details"
                                label="Educational Details"
                                v-model="items.student_educational_details"
                                required>

                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_occupation"
                                label="Occupation"
                                v-model="items.student_occupation"
                                required
                  >
                    {{ items.student_occupation}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_industry"
                                label="Industry"
                                v-model="items.student_industry"
                                required
                  >
                    {{ items.student_industry}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_collage_name"
                                label="College"
                                v-model="items.student_collage_name"
                                required
                  >
                    {{ items.student_collage_name}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_experience_level"
                                label="Experience"
                                v-model="items.student_experience_level"
                                required
                  >
                    {{ items.student_experience_level}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_birthdate"
                                label="Birthdate"
                                v-model="items.student_birthdate"
                                required
                  >
                    {{ items.student_birthdate}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-card-text>
                    <v-text-field name="items.student_gender"
                                  label="gender"
                                  v-model="items.student_gender"
                                  required
                    >
                      {{ items.student_birthdate}}
                    </v-text-field>
                  </v-card-text>
                  <v-card-text>
                  <v-text-field name="items.student_address"
                                label="Address"
                                v-model="items.student_address"
                                required
                  >
                    {{ items.student_address}}
                  </v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field name="items.student_topSkills"
                                label="Skills"
                                v-model="items.student_topSkills"
                                required
                  >
                    {{ items.student_topSkills}}
                  </v-text-field>
                </v-card-text>
                <v-card-actions >
                  <v-btn @click="updateFaculty" color="indigo" class="text--white"> SUBMIT </v-btn>
                </v-card-actions>
                </v-card-text>
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
  import Menu from '@/components/student/menuu'
  export default {
    name: 'app',
    components: {'nav-Menu': Menu},
    data () {
      return {
        items: {
          student_name: '',
          student_photo: '',
          student_email: '',
          student_contact_number: '',
          student_educational_details: '',
          student_occupation: '',
          student_industry: '',
          student_collage_name: '',
          student_experience_level: '',
          student_gender: '',
          student_birthdate: '',
          student_address: '',
          student_topSkills: ''
        },
        sideNav: false,
        right: null

      }
    },
    methods: {
      onFileSelected (event) {
        this.student_photo = event.target.files[0]
        console.log(this.faculty_photo)
      },
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/student/view/' + this.$route.params.id,
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
          this.$router.push('/admin/login')
        }
      },
      updateFaculty () {
        const fd = new FormData()
        console.log('helloooooo' + this.student_photo)
        fd.append('student_photo', this.student_photo)
        fd.append('student_name', this.items.student_name)
        fd.append('student_email', this.items.student_email)
        fd.append('student_contact_number', this.items.student_contact_number)
        fd.append('student_educational_details', this.items.student_educational_details)
        fd.append('student_occupation', this.items.student_occupation)
        fd.append('student_industry', this.items.student_industry)
        fd.append('student_collage_name', this.items.student_collage_name)
        fd.append('student_experience_level', this.items.student_experience_level)
        fd.append('student_gender', this.items.student_gender)
        fd.append('student_birthdate', this.items.birthdate)
        fd.append('student_address', this.items.address)
        fd.append('student_topSkills', this.items.topSkills)
        var jwt = Vue.localStorage.get('token')
        console.log('view id called')
        if (jwt) {
          Axios.patch('http://192.168.137.1:3000/student/update/' + this.$route.params.id, fd,
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
          this.$router.push('/student/login')
        }
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
