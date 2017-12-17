<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-list two-line subheader>
              <v-subheader inset>Books</v-subheader>
              <template v-for="book in books">
                <v-list-tile avatar v-bind:key="book.id" @click="changeRouteTo('BookView',book.book_id)">
                  <v-list-tile-avatar>
                    <v-icon v-bind:class="[book.iconClass]">{{ book.icon }}</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ book.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ book.ISBN }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ book.author }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple @click="changeRouteTo('BookEdit', book.book_id)">
                      <v-icon color="grey lighten-1">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>

            </v-list>

          </v-card>
        </v-flex>
        <router-link to="/new">
          <v-btn
            fixed
            dark
            fab
            bottom
            right
            color="indigo lighten-4"
          >

            <v-icon color="blue">add</v-icon>

          </v-btn>
        </router-link>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import db from './firebase'

  export default {

    name: 'BookList',

    data() {
      return {
        books: [],
        loading: true
      }
    },
    created() {
      db.collection('books').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'book_id': doc.data().book_id,
            'name': doc.data().name,
            'author': doc.data().author,
            'ISBN': doc.data().ISBN,
            'iconClass': 'grey lighten-1 white--text',
            'icon': 'book'
          }
          return this.books.push(data)
        })
      })
    },
    methods: {
      changeRouteTo(routeName, bookId) {
        console.log('Route changing')
        this.$router.push({name: routeName, params: {'book_id': bookId}})
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
