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
                <v-list-tile-title>Profile</v-list-tile-title>
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
                  <v-list-tile v-for="subItem in item.menuItems" :key="subItem.title" @click="" router :to="subItem.link">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>{{ subItem.icon }}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>
              <v-list dense class="pt-0">
                <v-list-tile v-for="item in menuitems2" :key="item.title" @click="" router
                             :to="item.link">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>

      </v-navigation-drawer>

      <v-toolbar class="primary">
        <v-toolbar-side-icon @click.stop="sideNav=!sideNav" />
        <v-toolbar-title class="white--text">
          <router-link to="/" tag="span" style="cursor: pointer">Distance learning </router-link></v-toolbar-title>
        <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>    <v-spacer> </v-spacer>
        <v-btn class="purple lighten-4 black--text" @click="logout">LOGOUT</v-btn>
        <v-spacer> </v-spacer>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
  import Menu from '@/components/TA/menu'
  export default {
    name: 'app',
    components: {'navMenu': Menu},
    data () {
      return {
        sideNav: false,
        menuItems: [
          {
            title: 'TA-Profile',
            icon: 'perm_identity',
            active: true,
            menuItems: [
              {title: 'Edit Profile', icon: 'note_add', link: '/TA/profile/editprofile'},
      {title: 'View Profile', icon: 'view_array', link: '/TA/profile/viewprofile'}
            ]
          },

          // {title: 'Discussion', icon: 'dashboard', link: '/TA/discussion/discussion'}
        ],
        menuitems2: [
          {title: 'Evaluation', icon: 'dashboard', link: '/TA/evaluation/evaluation'}
          ]
      }
    },
    methods: {
      logout: function () {
        localStorage.removeItem('token')
        console.log('token deleted')
        this.$router.push('/TA/login')
      }
    }
  }
</script>
