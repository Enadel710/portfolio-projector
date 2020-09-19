<template>
  <div>
    <b-container fluid class="header">
      <h2>
        <b>Portfolio-Projector</b>
      </h2>
    </b-container>

    <b-container fluid>
      <b-row>
        <!-- general information about portfolio -->
        <b-col cols="7">
          <b-row>
            <!-- portfolio table -->
            <b-col cols="4" class="widget">
              <h4 style="text-align: center">Portfolio</h4>
              <List v-bind:data="portfolioData" />
              <!-- <b-table striped hover :fields="null" :items="portfolioInfo"></b-table> -->
            </b-col>
            <!-- general portfolio charts -->
            <b-col cols="8">
              <!-- growth line line chart -->
              <b-row class="widget">
                <!-- line chart here -->
                <LineChart />
              </b-row>
              <!-- stock percentage pie chart -->
              <b-row class="widget">
                <!-- pie chart here -->
                <LineChart />
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <!-- information about individual stocks -->
        <b-col cols="5">
          <b-row class="widget" align-h="center">
            <!-- add a new stock -->
            <div class="margin-bottom">
              <b-button variant="primary" v-b-modal.addstock>Add New Stock</b-button>
              <b-modal id="addstock" title="Add a new stock" v-on:ok="addNewStock()">
                <b-form-input
                  id="input-small"
                  v-model="stockToAdd"
                  size="md"
                  placeholder="Enter the stock ticker"
                ></b-form-input>
              </b-modal>
            </div>
            <!-- select a stock -->
            <b-form-select
              v-if="allStockTickers"
              class="margin-bottom"
              v-model="selected"
              :options="allStockTickers"
            ></b-form-select>
            <!-- table about current stock -->
            <b-table
              class="margin-bottom"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            ></b-table>
            <!-- add more shares of current stock -->
            <div>
              <b-button
                class="center"
                variant="primary"
                v-b-modal.addshares
              >Add More Shares of CURRENTSTOCK</b-button>
              <b-modal id="addshares" title="Add more shares of CURRENTSTOCK">
                <p>Hello from modal!</p>
              </b-modal>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import List from "@/components/List";
import httpPostMixin from "@/mixins/httpPostMixin";

export default {
  components: {
    LineChart,
    List,
  },
  mixins: [httpPostMixin],
  data() {
    return {
      serverURL: "http://localhost:8080/fetchRequest",
      portfolioData: null,
      stockToAdd: "",
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
      allStockTickers: null,
    };
  },
  created() {
    let temp1 = [];
    temp1[0] = { cat: "Cat1", value: "Value1" };
    temp1[1] = { cat: "Cat2", value: "Value2" };
    temp1[2] = { cat: "Cat3", value: "Value3" };
    temp1[3] = { cat: "Cat4", value: "Value4" };
    temp1[4] = { cat: "Cat5", value: "Value5" };
    temp1[5] = { cat: "Cat6", value: "Value6" };
    this.portfolioData = temp1;

    // get all the tickers in the portfolio for the ticker list
    this.post(this.serverURL, { type: "allTickers" })
      .then((res) => {
        console.log(res.data);
        let temp = [];
        for (let i = 0; i < res.data.data.length; i++)
          temp[i] = { value: res.data.data[i].ticker, text: res.data.data[i].ticker };

        this.allStockTickers = temp;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addNewStock() {
      console.log("Added " + this.stockToAdd);
      this.post(this.serverURL, { type: "addTicker", ticker: this.stockToAdd })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px;
  height: 60px;
  text-align: center;
  background: lightblue;
  border-bottom: 3px solid #2b3c58;
  color: #2b3c58;
}
.widget {
  background-color: white;
  border-radius: 10px;
  border: 12px solid #f1f1f1;
  padding: 10px;
}
.margin-bottom {
  margin-bottom: 10px;
}
</style>