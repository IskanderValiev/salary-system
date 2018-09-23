<template>
  <main-layout>
      <v-flex sm6 offset-sm3 xs12>
        <v-card>
          <form
            id="app"
            @submit.prevent="addTask"
            method="post"
          >
            <v-card-title primary-title>
              <div>
                <div class="headline">Добавить задание</div>
              </div>
            </v-card-title>

            <v-divider/>

            <div class="px-3 pt-3">
              <v-text-field
                v-model="name"
                required
                type="text"
                label="Название"
              >
              </v-text-field>

              <v-text-field
                v-model="description"
                type="text"
                required
                label="Описание"
              >
              </v-text-field>

              <v-text-field
                v-model="difficulty"
                type="number"
                required
                label="Сложность"
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
                Добавить задание
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
  </main-layout>
</template>
<script>
  export default {
    name: 'Task',

    data: () => ({
      name: null,
      description: null,
      difficulty: null
    }),

    computed: {
      disableSubmit: function () {
        return !this.name || !this.description
      }
    },

    methods: {
      addTask: function () {
        console.log(this.$store);
        this.$store.dispatch('createTask', {
          name: this.name,
          description: this.description,
          difficulty: this.difficulty
        })
          .then((response) => {
            if (response) {
              this.$router.push('/tasks');
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
