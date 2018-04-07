<template>
  <div>
    <!-- <div>{{ count_1 }}</div><br> -->
    <div class="title">Parameter Controller</div><br>
      <button v-on:click="startAlgorithm">Start</button><br>
      <button v-on:click="chartRefresh">Refresh</button><br>
      <h2>Settings</h2><br>

      <label for="particles">Particles: {{particles}}</label><br>
      <input id="particles" type="range" min="1" max="500" v-model="particles">
      <br><br>

      <label for="initial_Noise_Covariance">Initial Noise Covariance: {{initial_Noise_Covariance}}</label><br>
      <input id="initial_Noise_Covariance" type="range" min="1" max="50" v-model="initial_Noise_Covariance">
      <br><br>

      <label for="process_Noise_Covariance">Process Noise Covariance: {{process_Noise_Covariance}}</label><br>
      <input id="process_Noise_Covariance" type="range" min="1" max="50" v-model="process_Noise_Covariance">
      <br><br>

      <label for="measurement_Noise_Covariance">Measurement Noise Covariance: {{measurement_Noise_Covariance}}</label><br>
      <input id="measurement_Noise_Covariance" type="range" min="1" max="50" v-model="measurement_Noise_Covariance">
      <br><br>
      <!-- <div>{{ count_2 }}</div> -->
  </div>
</template>

<script>
  import Algorithm from './Algorithm.js'

  export default {
    name: 'algorithm',

    data () {
      return {
        algorithm: null,
        particles: 100,
        initial_Noise_Covariance: 5,
        process_Noise_Covariance: 10,
        measurement_Noise_Covariance: 1
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
      incrt (mat) {
        this.$store.commit('setMatrixXhat', mat)
      },
      chartRefresh () {
        this.$parent.refreshChart()
      },

      // consoleF () {
      //   console.log(this.$store.getters)
      // },

      startAlgorithm () {
        // this.removePreviousAlgorithm()
        this.algorithm = new Algorithm(this.particles, this.initial_Noise_Covariance, this.process_Noise_Covariance, this.measurement_Noise_Covariance)
        // alert(this.algorithm.start())
        // console.log(this.$store.state.matrix)
        this.incrt(this.algorithm.start())
        this.$parent.refreshChart()
        // this.consoleF()
      }
      //
      // removePreviousAlgorithm () {
      //     this.algorithm = null
      //     }
    }
  }
</script>

<style type="text/css"></style>
