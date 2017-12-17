<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-toolbar color="red" dark>
            <v-toolbar-title>Book Information</v-toolbar-title>
          </v-toolbar>
          <v-list two-line subheader>
            <v-subheader>Basic</v-subheader>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Book Name</v-list-tile-title>
                <v-list-tile-sub-title>{{name}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Book Author</v-list-tile-title>
                <v-list-tile-sub-title>{{author}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Book Description</v-list-tile-title>
                <v-list-tile-sub-title>{{description}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          <router-link to="/" class="btn grey">Back</router-link>
          <v-btn @click="deleteBook" color="red">DELETE</v-btn>
          <v-btn @click="changeRouteTo('BookEdit',book_id)" color="BLUE">EDIT</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  /* eslint-disable quotes */

  import db from './firebase'

  export default {

    name: 'BookView',

    data() {
      return {
        id: null,
        book_id: null,
        author: 'Hello',
        ISBN: '',
        name: '',
        description: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      db.collection('books').where('book_id', '==', to.params.book_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.book_id = doc.data().book_id
            vm.author = doc.data().author
            vm.name = doc.data().name
            vm.description = doc.data().description
            vm.ISBN = doc.data().ISBN
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      deleteBook() {
        if (confirm('Are you sure?')) {
          db.collection('books').where('book_id', '==', this.$route.params.book_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete()
              this.$router.push('/')
            })
          }).catch(err => console.log(err))
        }
      },
      fetchData() {
        console.log("Fetching Data started")
        db.collection('books').where('book_id', '==', this.$route.params.book_id).get().then((querySnapshot) => {
          querySnapshot.for((doc) => {
            console.log(doc)
            this.book_id = doc.data().book_id
            this.author = doc.data().author
            this.name = doc.data().name
            this.description = doc.data().description
            this.ISBN = doc.data().ISBN
          })
        }).catch(err => console.log(err))
      },
      changeRouteTo(routeName, bookId) {
        console.log('Route changing')
        this.$router.push({name: routeName, params: {'book_id': bookId}})
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
