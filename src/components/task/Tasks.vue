<template>
  <main-layout>
    <!-- table begin -->
    <v-flex xs12 class="px-4">

      <v-data-table
        disable-initial-sort
        no-data-text="Нет элементов для отображения"
        :headers="headers"
        :items="items"
      >

        <!-- table items -->
        <template
          slot="items"
          slot-scope="td"
        >

          <td
            v-for="column in columns"
            :key="column"
          >
            {{td.item.attributesCollection.find( elem => elem.name === column) | label}}
          </td>

          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="runProcess(td.item.objectId)"
            >
              play_arrow
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="showUpdateDialog(td.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(td.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <!-- end of table items -->

      </v-data-table>

    </v-flex>
  </main-layout>
</template>
<script>
  export default {
    name: 'Tasks',

    beforeCreate() {
      this.$store.dispatch('getTasks');
    }
  }
</script>
