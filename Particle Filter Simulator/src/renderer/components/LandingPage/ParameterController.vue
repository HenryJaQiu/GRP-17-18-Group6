<!-- By Cong Liu and Hejia Qiu -->
<template>
  <div>
    <div class="controller"><strong>Parameter Settings</strong><br><br>
      <div class="clicker">
        <!-- Click to call method in VUE framework-->
        <button class='btn btn-primary' v-on:mouseup="startAlgorithm" v-on:mousedown="showTips">Start</button>&nbsp;&nbsp;
        <button class='btn btn-default' v-on:click="chartRefresh">Refresh</button>
        <label id="tips" v-if="this.$store.getters.getIfRun">Calculating...Please wait</label>
        <br>
      </div>
      <br>

      <div class="slider">
        <!-- Use two-way bind in VUE to make label and slider binding with data stored -->
        <label for="particles">Particles: {{particles}}</label><br>
        <input id="particles" type="range" min="1" max="500" v-model="particles">
        <br>

        <label for="initial_Noise_Covariance">Initial Noise Covariance: {{initial_Noise_Covariance}}</label><br>
        <input id="initial_Noise_Covariance" type="range" min="1" max="50" v-model="initial_Noise_Covariance">
        <br>

        <label for="process_Noise_Covariance">Process Noise Covariance: {{process_Noise_Covariance}}</label><br>
        <input id="process_Noise_Covariance" type="range" min="1" max="50" v-model="process_Noise_Covariance">
        <br>

        <label for="measurement_Noise_Covariance">Measurement Noise Covariance: {{measurement_Noise_Covariance}}</label><br>
        <input id="measurement_Noise_Covariance" type="range" min="1" max="50" v-model="measurement_Noise_Covariance">
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  // import JS algorithm
  import Algorithm from './Algorithm.js'

  export default {
    name: 'algorithm',

    data () {
      return {
        // default data
        algorithm: null,
        particles: 100,
        initial_Noise_Covariance: 5,
        process_Noise_Covariance: 10,
        measurement_Noise_Covariance: 1,
        state: 'Finished'
      }
    },

    computed: {
      count_1 () {
        return this.$store.state.matrixXhat
      },
      count_2 () {
        return this.$store.state.matrixTrue
      }
    },

    methods: {
      // commit the result to data store
      incrt (mat) {
        this.$store.commit('setMatrixXhat', mat)
      },
      // call parent component to refresh chart
      chartRefresh () {
        this.$parent.refreshChart()
        this.$store.commit('setIfRun', false)
      },
      startAlgorithm () {
        this.$store.commit('setIfRun', false)
        this.algorithm = new Algorithm(this.particles, this.initial_Noise_Covariance, this.process_Noise_Covariance, this.measurement_Noise_Covariance)
        this.incrt(this.algorithm.start())
        this.chartRefresh()
      },
      showTips () {
        this.$store.commit('setIfRun', true)
      }
    }
  }
</script>

<style type="text/css">
  .controller {
    font-size: 19px;
    position: absolute;
    left: 500px;
    top: 50px;
  }
  .slider {
    font-size: 15px;
  }
  #tips {
    opacity: 0.5;
    font-size:11px;
  }
</style>
