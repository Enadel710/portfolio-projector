<template>
  <div>
    <b-container fluid class="header">
      <h1>
        <b>Portfolio</b>
      </h1>
    </b-container>

    <b-container fluid>
      <b-row>
        <h2>Overall Stats</h2>
      </b-row>
      <b-row>
        <b-col class="text">
          <b-table striped hover :items="items"></b-table>
        </b-col>
        <b-col class="overallstatchart">test</b-col>
      </b-row>

      <br />
      <div class="line"></div>
      <br />

      <b-row>
        <b-col>
          <b-row class="text">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-row>

          <br />

          <b-row class="text">
            <b-table
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            ></b-table>
          </b-row>

          <br />

          <b-row class="text" align-h="center">
            <div>
              <b-button pill variant="primary" v-b-modal.addshares>Add More Shares of CURRENTSTOCK</b-button>

              <b-modal id="addshares" title="Add more shares of CURRENTSTOCK">
                <p>Hello from modal!</p>
              </b-modal>
            </div>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="text" align-h="center">
            <div>
              <b-button pill variant="primary" v-b-modal.addstock>Add New Stonk</b-button>

              <b-modal id="addstock" title="Add new stock">
                <p>Hello from modal!</p>
              </b-modal>
            </div>
          </b-row>

          <b-row class="text" align-h="center">
            <LineChart />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "last_name", sortable: true },
        { key: "first_name", sortable: true },
        { key: "age", sortable: true },
        { key: "isActive", sortable: false },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],

      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  padding: 20px;
  height: 80px;
  text-align: center;
  background: lightblue;
  border-bottom: 3px solid #2b3c58;
  color: #2b3c58;
}
.line {
  background: black;
  height: 5px;
}
</style>