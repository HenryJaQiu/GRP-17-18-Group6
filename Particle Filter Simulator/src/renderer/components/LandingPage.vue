<!-- By Hejia Qiu -->
<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">

        </span>
        <filter-chart ref="editChart"></filter-chart>
      </div>

      <div class="right-side">
        <parameter-controller ref="initMatrix"></parameter-controller>
      </div>
    </main>
  </div>
</template>

<script>
  // import child components
  import FilterChart from './LandingPage/FilterChart'
  import ParameterController from './LandingPage/ParameterController'

  // import the data component
  import store from '../vuex/store'

  export default {
    name: 'landing-page',
    store,
    components: { FilterChart, ParameterController },
    methods: {
      // After click 'start'
      refreshChart () {
        var that = this
        that.$refs.editChart.drawChart() // call function in child component FilterChart
      },
      // Init data & chart
      initData () {
        var that = this
        that.$refs.initMatrix.startAlgorithm() // call function in child component ParameterController
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

</style>
