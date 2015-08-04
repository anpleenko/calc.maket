define [], ->
  class calcView extends Backbone.View
    events:
      'input input': 'render'

    initialize: (options) ->
      @targetResult = options.targetResult
      @memorizeDom()
      @createObj

    memorizeDom: ->
      @getWidth = this.$el.find('.get-width')
      @getHeight = this.$el.find('.get-height')
      @getDpi = this.$el.find('.get-dpi')
      @resultTemplate = _.template $('#result-template').html()

    createObj: ->
      obj =
        width: @getWidth.val()
        height: @getHeight.val()
        dpi: @getDpi.val()

    render: ->
      @targetResult.html @resultTemplate
        data: do @createObj

  class CalcPageRouter extends Backbone.Router
    routes:
      '': 'calcInit'

    calcInit: ->
      targetResult = $('.result')
      new calcView(el: $('.input-wrap'), targetResult: targetResult)

  new CalcPageRouter()
  Backbone.history.start()
