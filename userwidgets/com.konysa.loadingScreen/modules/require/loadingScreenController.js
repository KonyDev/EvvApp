define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this._defaultText = "Loading...";
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
        show: function(message,type){
            kony.timer.cancel("mytimer_loadingScreen");
            this.view.lblConnecting.text = "";
          	this.view.lblOffline.text = "";
            this.view.lblSuccess.text = "";
            this.view.lblFailure.text = "";
            if(kony.sdk.isNullOrUndefined(message) && kony.sdk.isNullOrUndefined(type)){
              	this.view.flxConnecting.isVisible=true;
                message = this._defaultText;
            }
            else if(kony.sdk.isNullOrUndefined(type)){
				this.view.flxConnecting.isVisible=true;
                this.view.flxOffline.isVisible=false;
                this.view.flxSuccess.isVisible=false;
                this.view.flxFailure.isVisible=false;
                this.view.lblConnecting.text = message;
            }
            type=parseInt(type);
            switch(type){
              case 1:	this.view.flxConnecting.isVisible=true;
                		this.view.flxOffline.isVisible=false;
                 		this.view.flxSuccess.isVisible=false;
                		this.view.flxFailure.isVisible=false;
                 		this.view.lblConnecting.text = message;
                		break;
              case 2:   this.view.flxConnecting.isVisible=false;
                		this.view.flxOffline.isVisible=true;
                 		this.view.flxSuccess.isVisible=false;
                		this.view.flxFailure.isVisible=false;
                		this.view.lblOffline.text = message;
                        break;
              case 3:	this.view.flxConnecting.isVisible=false;
                		this.view.flxOffline.isVisible=false;
                 		this.view.flxSuccess.isVisible=true;
                		this.view.flxFailure.isVisible=false;
                		this.view.lblSuccess.text = message;
                        this._callTimer();
                		break;
              case 4:	this.view.flxConnecting.isVisible=false;
                		this.view.flxOffline.isVisible=false;
                 		this.view.flxSuccess.isVisible=false;
                		this.view.flxFailure.isVisible=true;
                		this.view.lblFailure.text = message;
                		this._callTimer();
                		break;
              default:  this.view.flxConnecting.isVisible=true;
                		this.view.flxOffline.isVisible=false;
                 		this.view.flxSuccess.isVisible=false;
                		this.view.flxFailure.isVisible=false;
                		this.view.lblConnecting.text = message;
            }
			this.view.isVisible = true;
        },
        hide: function(){
			this.view.isVisible = false;
        },
        _callTimer: function(){
          kony.timer.schedule("mytimer_loadingScreen",this.hide, 3, false);
        }
	};
});