<template>
  <v-container>
    <nav-Menu></nav-Menu>

    <v-layout>
      <v-layout row wrap>
        <v-container fluid>
          <v-layout>
            <v-flex>
              <v-carousel>
                <v-carousel-item
                  v-for="(item,i) in items"
                  :key="i"
                  :src="item.src"
                  transition="fade"
                  reverse-transition="fade"
                ></v-carousel-item>
              </v-carousel>
            </v-flex>
          </v-layout>
        </v-container>
        <router-view></router-view>


        <v-layout column>
          <v-flex xs3 sm4>

            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex
                    v-bind="{ [`xs${card.flex}`]: true }"
                    v-for="card in cards"
                    :key="card.title"
                  >

                    <v-card width="200" height="550">
                      <v-card-media
                        :src="card.course_photo"
                        height="200px"
                        contain
                      >


                        <v-container fill-height fluid>
                          <v-layout fill-height>

                          </v-layout>
                        </v-container>
                      </v-card-media>
                      <v-flex>

                          <div class="text--black">
                            <div><h3 class="blue--text darken-4" mp-0> {{ card.course_subject }} </h3></div>
                            <div> {{ card.course_description}}</div>
                            <br>

                          </div>



                        <v-card-actions>

                          <v-btn absolute bottom  style="margin-top: auto"  color="orange" :to="card.link"
                                 v-bind:to="{name: 'StudentFacultyCourse', params: {id: card._id } }">Explore
                          </v-btn>
                        </v-card-actions>
                        <br>
                        <br>
                      </v-flex>
                    </v-card>
                    <v-spacer></v-spacer>
                    <br>

                    <br>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>


      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
  import Axios from 'axios'
  import menuuu from '@/components/student/menuu'
  import abc from '@/assets/da.jpg'
  import def from '@/assets/da2.jpg'
  import efg from '@/assets/da3.jpg'

  export default {
    name: 'app',
    components: {'nav-Menu': menuuu},
    data() {
      return {
        sideNav: false,
        right: null,
        items: [
          {
            src: abc
          },
          {
            src: def
          },
          {
            src: efg
          }
        ],
        cards: {
          _id: '',
          FC_id: '',
          course_id: '',
          course_subject: '',
          course_photo: '',
          course_description: ''
        }
      }
    },
    /*  computed: {
        cards () {
          let cards = [
            {
              course_subject: '',
              course_photo: '',
              course_description: ''
            }
          ]
          return cards
        }
      }, */
    created: function () {
      console.log('hello')
      Axios.get('http://192.168.137.1:3000/student/course/view')
        .then((response) => {
          this.cards = response.data
          console.log(this.cards)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
