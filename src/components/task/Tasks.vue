<template>
  <main-layout>

    <v-layout class="mt-4 mx-4">

      <div class="mt-3 ml-3">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="mr-1 mt-2">

        <v-btn
          class="ml-4"
          color="primary"
          round
          outline
          @click="dialog = true"
        >
          Добавить задачу
        </v-btn>

      </div>

    </v-layout>

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

        </template>
        <!-- end of table items -->

      </v-data-table>

    </v-flex>
    <!-- table end -->

    <!-- dialog -->
    <v-dialog v-model="dialog" width="360">
      <v-card>

        <v-card-title class="headline" v-text="title">
        </v-card-title>

        <v-divider></v-divider>

        <div class="px-3">
          <v-text-field
            v-model="newItem.UsrName"
            label="Название"
            required
          ></v-text-field>

          <v-text-field
            v-model="newItem.UsrDescription"
            label="Описание"
            required
          ></v-text-field>

          <v-text-field
            v-model="newItem.UsrDifficulty"
            label="Сложность"
            required
          ></v-text-field>
        </div>


        <v-card-actions>
          <v-spacer/>
          <v-btn
            flat
            color="error"
            @click="resetNewItem()"
          >
            Отмена
          </v-btn>

          <v-btn
            flat
            color="primary"
            @click="saveChanges()"
          >
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <!-- dialog -->
  </main-layout>
</template>

<script>
  import {mapState} from 'vuex';
  import Filters from '@/helpers/HelperFilters'

  export default {
    name: 'Tasks',

    filters: {
      split: (income = 0) => {
        return Filters.splitNumbers(income);
      },
      humanDate: (income = 0) => {
        return Filters.humanDate(income)
      },
      label: (item) => {
        if (item.type && item.type === 'Edm.DateTime') {
          return Filters.humanDate(item.value)
        }
        return item.value
      }
    },

    data: () => ({
      title: 'Список невзятых заданий',
      dialog: false,
      newItem: {
        Id: null,
        UsrName: null,
        UsrDescription: null,
        UsrDifficulty: null
      },
      processCode: 'icl1teamTestService',
      processParams: [
        {
          "name": "ProcessSchemaParameter1",
          "value": "testText",
          "type": "string"
        }, {
          "name": "ProcessSchemaParameter2",
          "value": "79",
          "type": "string"
        }, {
          "name": "ProcessSchemaParameter3",
          "value": "79",
          "type": "integer"
        }
      ],
      editableItem: {},
      showDatePicker: false
    }),

    computed: {
      ...mapState({
        columns: (state) => state.contacts.columns,
        items: (state) => state.contacts.contacts
      }),
      headers: function () {
        let result = [];
        this.columns.forEach((item, index, array) => {
          result.push({
            text: item,
            value: item,
            sortable: false,
          })
        });
        result.push({
          text: 'Actions',
          align: 'left',
          sortable: false,
        });
        return result
      }
    },

    beforeCreate() {
      this.$store.dispatch('getTasks');
    },

    methods: {
      saveChanges: function () {
        this.$store.dispatch('createTask', this.newItem).then(() => {
          this.resetNewItem();
        });
      },
      resetNewItem: function () {
        Object.keys(this.newItem).forEach((key) => this.newItem[key] = null);
        this.dialog = false;
      },
    },
  }
</script>
