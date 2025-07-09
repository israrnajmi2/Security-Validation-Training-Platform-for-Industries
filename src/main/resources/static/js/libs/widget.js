(function($) {
	var maxInstances = -1;
	var instances = 0;
	$.widget( "rzt.rztwidget", {
        // default options
        options: {},
        _create: function() {
			instances += 1;
			maxInstances = this.options.config.maxInstances;
			if (maxInstances == -1 || instances <= maxInstances)
			{
				this.widgetdata = this.options;
				this.widgetdata.config.set(this);
				this.backing = this.options.backing;
				this.view = this.options.view;
				this.handler = this.options.handler;
				this.options.action();
			} else
			{
				this.options = {};
				this.widgetdata = null;
				this._destroy();
			}
        },
        _destroy: function() {        	
        },
        _refresh: function() {        	
        },
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments );
            this._refresh();
        },
		widget: function() {
			return this.widgetdata;
		},
		destroy:function() {   
			alert("destroy");
			this._destroy();
        }
	});

})(jQuery);

(function( $ ){
	$.fn.widget = function(w) {
		return this.rztwidget(w()).rztwidget("widget");  
	};
	$.fn.belongsTo = function(parent) {
		return 0 !== this.parents(parent).length; 
	};
 })(jQuery);

var COMPONENTS={};
