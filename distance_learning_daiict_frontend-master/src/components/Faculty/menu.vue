<template>
  <v-layout>
    <v-flex>
    <v-navigation-drawer fixed temporary v-model="sideNav" fixed temporary>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0 ">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src=" " >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Faculty</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-layout>
        <v-flex>
          <v-card>
            <v-list class="pt-0" dense>
              <v-list-group
                v-model="item.active"
                v-for="item in menuItems"
                :key="item.title"

                :prepend-icon="item.icon"
                no-action>
                <v-list-tile slot="activator" :key="item.title" @click=""
                             router :to="item.link">
                  <v-list-tile-content>
                    <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.menuItems" :key="subItem.title" router :to="subItem.link">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>{{ subItem.icon }}</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>

    </v-navigation-drawer>

    <v-toolbar class="primary" fixed>
      <v-toolbar-side-icon @click.stop="sideNav=!sideNav" />
      <v-toolbar-title class="white--text">
        <router-link to="/Faculty/index" tag="span" style="cursor: pointer">Distance learning </router-link></v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-menu offset-y>
        <v-btn color="primary" slot="activator" :to="'/Faculty/viewprofile'">Profile</v-btn>
        <v-btn color="primary" slot="activator" @click="logout">Logout</v-btn>
        <!--<v-list>-->
          <!--<v-list-tile v-for="item in items" :key="item.title" :to="item.link">-->
            <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
          <!--</v-list-tile>-->
        <!--</v-list>-->
      </v-menu>
    </v-toolbar><br><br>
    <main>
      <router-view></router-view>
    </main>
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'
  Vue.use(VueLocalStorage)
  export default {
    data () {
      return {
        items: [
          {
            title: 'Profile',
            link: '/Faculty/viewprofile'
          }
        ],
        sideNav: false,
        menuItems: [
          {
            title: 'Course',
            icon: 'dashboard',
            // active: true,
            menuItems: [
              {title: 'Create Course', icon: 'note_add', link: '/Faculty/course/createcourse'},
              {title: 'View Course', icon: 'view_array', link: '/Faculty/course/view/'},
              {title: 'Test', icon: 'view_array', link: '/Faculty/test/view'}
            ]
          },
          {
            title: 'Evaluation', icon: 'dashboard', link: '/Faculty/evaluation'
          },
          {
            title: 'Doubts and Discussion', icon: 'dashboard', link: '/Faculty/discussion'
          }
        ],
        right: null
      }
    },
    methods: {
      logout: function () {
        localStorage.removeItem('token')
        console.log('token deleted')
        this.$router.push('/Faculty/')
      }
    }

  }
</script>

<style scoped>

  .title {
    position: absolute;
    bottom: 50px;
    color: black;
    font-size:2em;

  }
  .pad {
    margin-left: 75px;
  }
</style>
