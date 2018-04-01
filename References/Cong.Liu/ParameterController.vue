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
      <label for="measurement_Noise_Covariance">Measurement_Noise_Covariance: {{measurement_Noise_Covariance}}</label><br>
      <input id="measurement_Noise_Covariance" type="range" min="1" max="500" v-model="measurement_Noise_Covariance">
      <br><br>
  </div>
</template>

<script>
  import Algorithm from './Algorithm.js'

  export default {
    name: 'algorithm',

    data () {
      return {
        algorithm: null,
        particles: 500,
        initial_Noise_Covariance: 5,
        process_Noise_Covariance: 10,
        measurement_Noise_Covariance: 1
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
