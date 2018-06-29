<template>
  <v-container fluid="true">
    <navMenu></navMenu>
    <v-spacer></v-spacer>
    <v-layout>
      <v-flex>
        <h2 class="text-md-center mb-4 red--text">
        Add New Faculty
        </h2>
      </v-flex>

    </v-layout>
    <div
      style="min-width: 560px; margin: auto;">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-container>
            <v-form @submit.prevent="" enctype="multipart/form-data">

                  <v-text-field
                    label="Name"
                    v-model="faculty_name"
                    name="faculty_name"
                    required
                    :rules="nameRules"
                  ></v-text-field>
              <label>Upload Image*</label>    <br><br>
              <div>
                <input type=file
                       @change="onFileSelected"
                       class="text--primary" required
                       accept="image/*"
                        >
              </div >
              <br>
               <v-text-field
                label="E-mail"
                name="faculty_email"
                v-model="faculty_email"
                type="email"
                :rules="emailRules"
                required
                 ></v-text-field>

              <v-text-field
                label="Password"
                type="password"
                name="faculty_password"
                v-model="faculty_password"
                required
                :rules="passwordRules"
              ></v-text-field>

              <v-text-field name="faculty_contact_number"
                                label="Contact"
                                id="contact"
                                v-model.number="faculty_contact_number"
                                :rules="contactRules"
                                required>

              </v-text-field>

              <v-text-field name="faculty_educational_details"
                                label="Educational Details"
                                id="educational-detail"
                                v-model="faculty_educational_details"
                                :rules="eduRules"
                                required>
              </v-text-field>

              <v-text-field name="faculty_area_interest"
                                label="Interest Area"
                                id="interest-area"
                                v-model="faculty_area_interest"
                                :rules="interestRules"
                                required>
              </v-text-field>

              <v-layout row>
                <v-flex xs12 sm6>
                  <v-btn flat class="orange"
                         :disabled="!formIsValid"
                         type="submit"
                         @click="addFaculty">Add
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
  import Menu from '@/components/admin/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        faculty_name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 40 || 'Name must be less than 40 characters'
        ],
        faculty_photo: '',
        faculty_email: '',
        emailRules: [
          v => !!v || 'E-mail is required'
        ],
        faculty_password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ],
        faculty_contact_number: '',
        contactRules: [
          v => !!v || 'Contact number is required'
        ],
        faculty_educational_details: '',
        eduRules: [
          v => !!v || 'Educational Qualification detail is required'
        ],
        faculty_area_interest: '',
        interestRules: [
          v => !!v || 'Area of interest is required'
        ],
        sideNav: false,
        right: null

      }
    },

    computed: {
      formIsValid () {
        return this.faculty_name !== '' &&
          this.faculty_email !== '' &&
          this.faculty_password !== '' &&
          this.faculty_contact_number !== '' &&
          this.faculty_educational_details !== '' &&
          this.faculty_area_interest !== ''
      }
    },
    methods: {
      onFileSelected (event) {
        this.faculty_photo = event.target.files[0]
        console.log(this.faculty_photo)
      },
      addFaculty () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        if (jwt) {
          const fd = new FormData()
          fd.append('faculty_photo', this.faculty_photo)
          fd.append('faculty_name', this.faculty_name)
          fd.append('faculty_email', this.faculty_email)
          fd.append('faculty_password', this.faculty_password)
          fd.append('faculty_contact_number', this.faculty_contact_number)
          fd.append('faculty_educational_details', this.faculty_educational_details)
          fd.append('faculty_area_interest', this.faculty_area_interest)
          axios.post('http://192.168.137.1:3000/admin/faculty/add', fd,
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
          window.alert('data inserted successfully.')
        } else {
          this.$router.push('/admin/')
        }
      }
    }
  }
</script>
