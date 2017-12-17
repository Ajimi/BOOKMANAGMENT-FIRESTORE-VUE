<template>
  <v-container>
    <v-card color="indigo lighten-4" raised>
      <v-card-text>
        <v-container fluid>
          <v-layout>
            <v-flex>
              <form>
                <v-text-field disabled
                              v-model="book_id"
                              label="Book ID"
                              :counter="5"
                              :error-messages="errors.collect('name')"
                              v-validate="'required|min:3'"
                              data-vv-name="name"
                              required></v-text-field>
                <v-text-field
                  v-model="name"
                  label="Name"
                  :counter="5"
                  :error-messages="errors.collect('name')"
                  v-validate="'required|min:5'"
                  data-vv-name="name"
                  required></v-text-field>
                <v-text-field
                  v-model="author"
                  label="Author"
                  :counter="10"
                  :error-messages="errors.collect('author')"
                  v-validate="'required|min:5'"
                  data-vv-name="author"
                  required></v-text-field>
                <v-text-field
                  v-model="ISBN"
                  label="ISBN"
                  :counter="5"
                  :error-messages="errors.collect('ISBN')"
                  v-validate="'required|min:5'"
                  data-vv-name="ISBN"
                  required></v-text-field>
                <v-text-field
                  v-model="description"
                  name="description"
                  label="Book description "
                  multi-line
                ></v-text-field>
              </form>
            </v-flex>
          </v-layout>
          <v-btn type="submit" @click="submit" color="white">Edit</v-btn>
          <v-btn @click="clear" color="white">Clear</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import db from './firebase'

  export default {
    $validates: true,
    name: 'BookEdit',

    data() {
      return {
        id: null,
        book_id: null,
        author: null,
        ISBN: null,
        name: null,
        description: null,
        checkbox: null
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
      submit() {
        this.$validator.validateAll()
          .then(result => {
            if (result) {
              this.editBook()
            }
          }).catch(err => console.log(err))
      },
      clear() {
        this.id = ''
        this.name = ''
        // TODO ADD OTHER INPUTS
        this.checkbox = null
        this.$validator.clean()
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
      editBook() {
        db.collection('books').where('book_id', '==', this.$route.params.book_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              book_id: this.book_id,
              name: this.name,
              description: this.description,
              ISBN: this.ISBN,
              author: this.author
            })
              .then(() => {
                this.$router.push({name: 'BookView', params: {book_id: this.book_id}})
              })
          })
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
