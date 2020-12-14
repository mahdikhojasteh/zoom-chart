<template>
  <base-material-ecard
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
  >
    <template v-slot:heading>
      <!-- <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        :responsive-options="responsiveOptions"
        :type="type"
        style="max-height: 150px;"
      /> -->
       <!-- <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        
        :type="type"
        
      /> -->
      
      <base-echart-line v-if="type==='line'"/>
      <base-echart-bar v-if="type==='bar'"/>
      <base-echart-pie v-if="type==='pie'"/>
        
    </template>

    <slot
      slot="reveal-actions"
      name="reveal-actions"
    />

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </base-material-ecard>
</template>

<script>
  export default {
    name: 'MaterialChartCard',

    inheritAttrs: false,

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      eventHandlers: {
        type: Array,
        default: () => ([]),
      },
      options: {
        type: Object,
        default: () => ({}),
      },
      ratio: {
        type: String,
        default: undefined,
      },
      responsiveOptions: {
        type: Array,
        default: () => ([]),
      },
      type: {
        type: String,
        required: true,
        validator: v => ['Bar', 'Line', 'Pie'].includes(v),
      },
    },
  }
</script>

<style lang="sass">
  .v-card--material-chart
    p
      color: #999

    .v-card--material__heading
      max-height: 185px

      .ct-label
        color: inherit
        opacity: .7
        font-size: 0.975rem
        font-weight: 100

      .ct-grid
        stroke: rgba(255, 255, 255, 0.2)

      .ct-series-a .ct-point,
      .ct-series-a .ct-line,
      .ct-series-a .ct-bar,
      .ct-series-a .ct-slice-donut
          stroke: rgba(255,255,255,.8)

      .ct-series-a .ct-slice-pie,
      .ct-series-a .ct-area
          fill: rgba(255,255,255,.4)
</style>
