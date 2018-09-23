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
  import {mapState} from 'vuex';

  export default {
    name: 'Tasks',

    beforeCreate() {
      this.$store.dispatch('getTask');
    },

    methods: {
      saveChanges: function () {
        let action = this.newItem.Id ? 'updateContact' : 'createContact';
        this.$store.dispatch(action, this.newItem).then(() => {
          this.resetNewItem();
        });
      },
      resetNewItem: function () {
        Object.keys(this.newItem).forEach((key) => this.newItem[key] = null);
        this.dialog = false;
      },
      showUpdateDialog: function (item) {
        item.attributesCollection.forEach((attr) => {
          if (this.newItem.hasOwnProperty(attr.name)) {
            this.newItem[attr.name] = attr.value;
          }
        });
        this.dialog = true;
      },
      deleteItem: function (item) {
        confirm('Вы уверены, что хотите удалить этот элемент?') && this.$store.dispatch('deleteContact', item.objectId);
      },
      runProcess: function (objectId = null) {
        this.$store.dispatch('runProcess', {
          objectId: objectId,
          processCode: this.processCode,
          parameters: this.processParams,
        })
      }
    },
  }
</script>
