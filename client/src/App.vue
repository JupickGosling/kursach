<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          Здравствуйте!
        </v-list-item-title>
        <v-list-item-subtitle>
          Добро пожаловать!
        </v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
      <v-divider>
      </v-divider>
      <v-list dense>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link" link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            prepend-icon="mdi-file-outline"
          >
          <template v-slot:activator>
            <v-list-item-title>Categories</v-list-item-title>
          </template>
          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
          </v-list-group>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Объявления пу-пу-пу</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
var FormData = require('form-data');
  export default {
    data: () => ({ drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', link: "/" },
      { title: 'Add post', icon: 'mdi-note-plus', link: "/add-post" },
      { title: 'Login', icon: 'mdi-account', link: "/login" },
      { title: 'About', icon: 'mdi-help-box', link: "/about" },
    ],
    admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
    }),
  }
</script>