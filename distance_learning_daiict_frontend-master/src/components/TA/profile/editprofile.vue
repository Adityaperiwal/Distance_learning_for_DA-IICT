<template>
  <v-container fluid>
    <navMenu></navMenu>
    <v-layout>
      <v-flex>

        <v-card>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="red--text darken-2"><h3>EDIT PROFILE</h3> </v-card-title>
              </v-flex>

            </v-layout>
            <v-divider></v-divider>
            <v-spacer></v-spacer>

            <v-layout row wrap class="">
              <v-flex xs12>


                <v-card-text>
                  <v-text-field
                    label="TA name"
                    name="items.ta_name"
                    v-model="items.ta_name"
                  > {{items.ta_name }}</v-text-field>
                </v-card-text>

                <v-card-text>

                <label>Upload Image*</label>    <br><br>
                <div>
                  <input type=file
                         @change="onFileSelected"
                         class="text--primary" required
                         accept="image/*">
                </div >
                </v-card-text>
                <br>

                <v-text-field
                  label="E-mail"
                  name="items.ta_email"
                  v-model="items.ta_email"
                  type="email" required>{{ items.ta_email}}</v-text-field>

                <v-card-text>
                  <v-text-field name="items.ta_contact_number"
                                label="Contact"
                                id="contact"
                                v-model="items.ta_contact_number">
                    {{ items.ta_contact_number }}
                  </v-text-field>
                </v-card-text>

                <v-card-text>
                  <v-text-field name="items.ta_educational_details"
                                label="Educational Details"
                                id="educational-detail"
                                v-model="items.ta_educational_details">
                    {{ items.ta_educational_detail }}

                  </v-text-field>
                </v-card-text>


                <v-card-actions >
                  <v-btn @click="updateTa" color="indigo" class="text--white"> SUBMIT </v-btn>
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
  /* eslint-disable comma-spacing */

  import Axios from 'axios'
  import Vue from 'vue'
  import Menu from '@/components/TA/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        items: {
          _id: '',
          ta_name: '',
          ta_photo: '',
          ta_email: '',
          ta_contact_number: '',
          ta_educational_details: ''
        }
      }
    },
    methods: {
      onFileSelected (event) {
        this.ta_photo = event.target.files[0]
        console.log(this.ta_educational_details)
      },
      async getDetail () {
        console.log(Vue.localStorage.get('token'))
        var jwt = Vue.localStorage.get('token')
        // console.log('view id called')
        if (jwt) {
          Axios.get('http://192.168.137.1:3000/ta/view',
            {
              headers: {
                'Authorization': 'bearer ' + Vue.localStorage.get('token')
              }
            })
            .then((response) => {
              console.log(response.data.data[0])
              this.items = response.data.data[0]
              console.log(this.items.data[0])
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          this.$router.push('/TA/login')
        }
      },
      updateTa () {
        const fd = new FormData()
        fd.append('ta_photo', this.ta_photo)
        fd.append('ta_name', this.items.ta_name)
        fd.append('ta_email', this.items.ta_email)
        fd.append('ta_contact_number', this.items.ta_contact_number)
        fd.append('ta_educational_details', this.items.ta_educational_details)
        console.log(this.items.ta_educational_details)
        var jwt = Vue.localStorage.get('token')
        console.log(this.ta_educational_details)
        if (jwt) {
          Axios.patch('http://192.168.137.1:3000/ta/update', fd,
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
          window.alert('Profile has been successfully...')
        } else {
          this.$router.push('/TA/login')
        }
      }
    },
    mounted () {
      this.getDetail()
    }

  }
</script>
