<template>
  <main-layout>
    <login-layout class="pt-5">
      <v-flex sm6 offset-sm3 xs12>
        <v-card>
          <form
            id="app"
            @submit.prevent="addTask"
            method="post"
          >
            <v-card-title primary-title>
              <div>
                <div class="headline">Update task</div>
                <span class="grey--text">Update task</span>
              </div>
            </v-card-title>

            <v-divider/>

            <div class="px-3 pt-3">
              <v-text-field
                v-model="name"
                required
                type="text"
                label="name"
              >
              </v-text-field>

              <v-text-field
                v-model="description"
                type="description"
                required
                label="description"
              >
              </v-text-field>
            </div>

            <v-card-actions>
              <v-spacer/>

              <v-btn
                :disabled="disableSubmit"
                type="submit"
                large
                flat
                color="primary"
              >
                Update task
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </login-layout>
  </main-layout>
</template>
<script>
  export default {
    name: 'Task',

    data: () => ({
      name: null,
      description: null
    }),

    computed: {
      disableSubmit: function () {
        return !this.name || !this.description
      }
    },

    methods: {
      addTask: function () {
        this.$store.dispatch('createTask', {
          name: this.name,
          description: this.description,
        })
          .then((response) => {
            if (response) {
              this.$router.push('/');
            }
          })
      },
      push: function (page) {
        this.$router.push({
          name: page
        })
      }
    }
  }
</script>
