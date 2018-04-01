<template>
  <div>
    <div class="title">Parameter Controller</div><br>
      <button v-on:click="startAlgorithm">Start</button><br>
      <h2>Settings</h2><br>
      <label for="particles">Particles: {{particles}}</label><br>
      <input id="particles" type="range" min="1" max="500" v-model="particles">
      <br><br>
      <label for="initial_Noise_Covariance">Initial Noise Covariance: {{initial_Noise_Covariance}}</label><br>
      <input id="initial_Noise_Covariance" type="range" min="1" max="500" v-model="initial_Noise_Covariance">
      <br><br>
      <label for="process_Noise_Covariance">Process Noise Covariance: {{process_Noise_Covariance}}</label><br>
      <input id="process_Noise_Covariance" type="range" min="1" max="500" v-model="process_Noise_Covariance">
      <br><br>
      <label for="measurement_Noise_Covariance">Measurement Noise Covariance: {{measurement_Noise_Covariance}}</label><br>
      <input id="measurement_Noise_Covariance" type="range" min="1" max="500" v-model="measurement_Noise_Covariance">
      <br><br>
  </div>
</template>

<script>
  import Algorithm from './Algorithm.js'

  var algorithmA = null
  var particlesA = 500
  var initialNoiseCovarianceA = 5
  var processNoiseCovarianceA = 10
  var measurementNoiseCovarianceA = 1

  export default {
    name: 'algorithm',

    data () {
      return {
        algorithm: algorithmA,
        particles: particlesA,
        initial_Noise_Covariance: initialNoiseCovarianceA,
        process_Noise_Covariance: processNoiseCovarianceA,
        measurement_Noise_Covariance: measurementNoiseCovarianceA
      }
    },

    methods: {
      startAlgorithm () {
        alert(this.particles)
        alert(this.initial_Noise_Covariance)
        alert(this.process_Noise_Covariance)
        alert(this.measurement_Noise_Covariance)
        this.algorithm = new Algorithm(this.particles, this.initial_Noise_Covariance, this.process_Noise_Covariance, this.measurement_Noise_Covariance)
        alert(this.algorithm.start())
      }
    }
  }
</script>

<style type="text/css"></style>

