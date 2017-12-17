<template>
  <v-container>
    <v-card color="indigo lighten-4" raised>
      <v-card-text>
        <v-container fluid>
          <v-layout>
            <v-flex>
              <form>
                <v-text-field
                  v-model="id"
                  label="Book ID"
                  :counter="3"
                  :error-messages="errors.collect('id')"
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
                  :counter="5"
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
                <v-checkbox
                  v-model="checkbox"
                  value="1"
                  label="Do you agree ?"
                  :error-messages="errors.collect('checkbox')"
                  v-validate="'required'"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>
              </form>
            </v-flex>
          </v-layout>
          <v-btn type="submit" @click="submit" color="white">submit</v-btn>
          <v-btn @click="clear" color="white">clear</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import db from './firebase'

  export default {
    $validates: true,
    name: 'BookAdd',

    data() {
      return {
        id: null,
        author: null,
        ISBN: null,
        name: null,
        description: null,
        checkbox: null
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll()
          .then(result => {
            if (result) {
              this.saveBook()
            }
          }).catch(err => console.log(err))
      },
      clear() {
        this.id = ''
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.clean()
      },
      saveBook() {
        db.collection('books').add({
          book_id: this.id,
          name: this.name,
          description: this.description,
          ISBN: this.ISBN,
          author: this.author
        }).then(docRef => {
          console.log('Book added' + docRef.id)
          this.$router.push('/')
        }).catch(error => console.log(error))
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
