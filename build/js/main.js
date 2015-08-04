(function() {
  var CalcModel, OrderItemsCollection, OrderPageRouter, calcView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  OrderItemsCollection = (function(superClass) {
    extend(OrderItemsCollection, superClass);

    function OrderItemsCollection() {
      return OrderItemsCollection.__super__.constructor.apply(this, arguments);
    }

    OrderItemsCollection.prototype.sub_total = function() {};

    return OrderItemsCollection;

  })(Backbone.Collection);

  CalcModel = (function(superClass) {
    extend(CalcModel, superClass);

    function CalcModel() {
      return CalcModel.__super__.constructor.apply(this, arguments);
    }

    CalcModel.prototype.total = function() {};

    return CalcModel;

  })(Backbone.Model);

  calcView = (function(superClass) {
    extend(calcView, superClass);

    function calcView() {
      return calcView.__super__.constructor.apply(this, arguments);
    }

    calcView.prototype.events = {
      'input input': 'render'
    };

    calcView.prototype.initialize = function(options) {
      this.targetResult = options.targetResult;
      this.memorizeDom();
      return this.createObj;
    };

    calcView.prototype.memorizeDom = function() {
      this.getWidth = this.$el.find('.get-width');
      this.getHeight = this.$el.find('.get-height');
      this.getDpi = this.$el.find('.get-dpi');
      return this.resultTemplate = _.template($('#result-template').html());
    };

    calcView.prototype.createObj = function() {
      var obj;
      return obj = {
        width: this.getWidth.val(),
        height: this.getHeight.val(),
        dpi: this.getDpi.val()
      };
    };

    calcView.prototype.render = function() {
      return this.targetResult.html(this.resultTemplate({
        data: this.createObj()
      }));
    };

    calcView.prototype.updateTotal = function() {};

    return calcView;

  })(Backbone.View);

  OrderPageRouter = (function(superClass) {
    extend(OrderPageRouter, superClass);

    function OrderPageRouter() {
      return OrderPageRouter.__super__.constructor.apply(this, arguments);
    }

    OrderPageRouter.prototype.routes = {
      '': 'calcInit'
    };

    OrderPageRouter.prototype.calcInit = function() {
      var targetResult;
      targetResult = $('.result');
      return $('.input-wrap').each(function() {
        return new calcView({
          el: this,
          targetResult: targetResult
        });
      });
    };

    return OrderPageRouter;

  })(Backbone.Router);

  new OrderPageRouter();

  Backbone.history.start();

}).call(this);
