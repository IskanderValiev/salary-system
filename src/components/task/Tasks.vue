<template>
  <main-layout>

    <v-layout class="mt-4 mx-4">

      <div class="mt-3 ml-3">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

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
      processCode: 'icl1teamTestService',
      newItem: {
        UsrName: null,
        UsrDescription: null,
        UsrDifficulty: null,
      },
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
        columns: (state) => state.task.columns,
        items: (state) => state.task.tasks
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
        return result
      }
    },

    beforeCreate() {
      this.$store.dispatch('getTasks');
    },

    methods: {
    },
  }
</script>
