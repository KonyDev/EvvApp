define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_f9bd3fb9e4034aa7b89d981bbb1bc609: function AS_FlexContainer_f9bd3fb9e4034aa7b89d981bbb1bc609(eventobject) {
        var self = this;
        this.navigateBack();
    },
    /** onClick defined for flxHistory **/
    AS_FlexContainer_gfc1d1306dff46178a1befcc58edf46d: function AS_FlexContainer_gfc1d1306dff46178a1befcc58edf46d(eventobject) {
        var self = this;
        this.view.navigatepopup.show(this._absoluteAddress);
    },
    /** onClick defined for Button0h5b8c5fe60b843 **/
    AS_Button_jaadce7019584d41bfa8070dce9cd601: function AS_Button_jaadce7019584d41bfa8070dce9cd601(eventobject) {
        var self = this;
        this.view.navigatepopup.show();
    },
    /** onTouchEnd defined for lblAssetDetails **/
    AS_Label_ebc1e7cec7434291ae9fb4f0ffa5db78: function AS_Label_ebc1e7cec7434291ae9fb4f0ffa5db78(eventobject, x, y) {
        var self = this;
        this.showAssetDetailContainer();
    },
    /** onClick defined for btnSubmitInspection **/
    AS_Button_ee690f1d08684c248ac1078dd9d7d105: function AS_Button_ee690f1d08684c248ac1078dd9d7d105(eventobject) {
        var self = this;
        this.submitInspection();
        //this.getInspectedData();
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_d882eeb72ab74dbbaee4d8b1d83b1dd1: function AS_FlexContainer_d882eeb72ab74dbbaee4d8b1d83b1dd1(eventobject) {
        var self = this;
        this.hideAssetDetailContainer();
    },
    /** onClickProceed defined for navigatepopup **/
    AS_UWI_e53292a8a78d4cbfac33565739e5a22d: function AS_UWI_e53292a8a78d4cbfac33565739e5a22d(eventobject) {
        var self = this;
        this.view.navigatepopup.hide();
        this.view.forcedExecution.show();
    },
    /** onClickNavigate defined for navigatepopup **/
    AS_UWI_ac0b3a5bfa754c0bb56548c340bfe9e0: function AS_UWI_ac0b3a5bfa754c0bb56548c340bfe9e0(eventobject) {
        var self = this;
        this.view.navigatepopup.hide();
        var ntf = new kony.mvc.Navigation("frmMap");
        ntf.navigate();
    },
    /** onClickAgree defined for forcedExecution **/
    AS_UWI_fb835927d5b7480e8b731a11ab84333d: function AS_UWI_fb835927d5b7480e8b731a11ab84333d(eventobject) {
        var self = this;
        this.view.lblCheckinAddress.text = "";
        this.view.lblCheckOutAddress.text = "";
        this.view.lblCheckinAddress.isVisible = false;
        this.view.lblCheckOutAddress.isVisible = false;
        this.view.forcedExecution.hide();
    },
    /** onClickClose defined for forcedExecution **/
    AS_UWI_hc89b73f6c2e423381c66b685bbec4ef: function AS_UWI_hc89b73f6c2e423381c66b685bbec4ef(eventobject) {
        var self = this;
        this.view.forcedExecution.isVisible = false;
        this.view.navigatepopup.show();
    },
    /** postShow defined for frmInspectionReview **/
    AS_Form_caa5a6a05f8c4917954a258c222d8a27: function AS_Form_caa5a6a05f8c4917954a258c222d8a27(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** onDeviceBack defined for frmInspectionReview **/
    AS_Form_iba544177efd42089b10576e190ec482: function AS_Form_iba544177efd42089b10576e190ec482(eventobject) {
        var self = this;

        function doNothing() {};
        doNothing();
    }
});