define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        show:function(text){
          if(kony.sdk.isNullOrUndefined(text)){
            text = "";
          }
          this.view.CopyLabel0gb63023645da4f.text = text;
          this.view.isVisible = true;
        },
        hide: function(){
          this.view.isVisible = false;
        }
	};
});