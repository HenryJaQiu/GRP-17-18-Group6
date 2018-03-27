<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          Particle Filter Simulator
        </span>
        <filter-chart></filter-chart>
      </div>

      <div class="right-side">
        <parameter-controller></parameter-controller>
      </div>
    </main>
  </div>
</template>

<script>
  import FilterChart from './LandingPage/FilterChart'
  import ParameterController from './LandingPage/ParameterController'

  export default {
    name: 'landing-page',
    components: { FilterChart, ParameterController },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

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
