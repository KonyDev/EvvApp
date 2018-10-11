define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNavigate **/
    AS_Button_a9c2e8b2235c4d3eb3c08cd98ea62cb6: function AS_Button_a9c2e8b2235c4d3eb3c08cd98ea62cb6(eventobject) {
        var self = this;
        this.navigateMap();
    },
    /** onClick defined for btnForcedCheckIn **/
    AS_Button_a62bcb6b23334d35957e090ca4166db7: function AS_Button_a62bcb6b23334d35957e090ca4166db7(eventobject) {
        var self = this;
        this.forcedCheckedIn();
    },
    /** onClick defined for btnCheckIn **/
    AS_Button_cbaaa9937d094b1798b6510da2bcdb8e: function AS_Button_cbaaa9937d094b1798b6510da2bcdb8e(eventobject) {
        var self = this;
        this.forcedCheckIn = false;
        this._navigateToExecution();
    },
    /** onClick defined for flexBack **/
    AS_FlexContainer_e75e682bc6c44ea4b1ec3acb842ae402: function AS_FlexContainer_e75e682bc6c44ea4b1ec3acb842ae402(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmInspectionsList");
        ntf.navigate();
    },
    /** onClick defined for btnGPS **/
    AS_Button_h02635e6e35648a0a6b1d9f5a3cf0aa4: function AS_Button_h02635e6e35648a0a6b1d9f5a3cf0aa4(eventobject) {
        var self = this;
        this.GPSHandler();
    },
    /** onClick defined for btnOutOfRange **/
    AS_Button_f8be250817154a46bd074283ae3dcaf5: function AS_Button_f8be250817154a46bd074283ae3dcaf5(eventobject) {
        var self = this;
        this.outOfRange();
    },
    /** onClick defined for btnAgree **/
    AS_Button_e1d16e0e744449cb848d3eacd7782b1b: function AS_Button_e1d16e0e744449cb848d3eacd7782b1b(eventobject) {
        var self = this;
        this.forcedCheckIn = true;
        this._navigateToExecution();
    },
    /** onClick defined for flexClose **/
    AS_FlexContainer_ga9a1bf763974809bcb69076a6d5d2e8: function AS_FlexContainer_ga9a1bf763974809bcb69076a6d5d2e8(eventobject) {
        var self = this;
        this.view.flexRangePopup.isVisible = false;
    },
    /** onClick defined for CopybtnAgree0bd7b4f4de12d45 **/
    AS_Button_d94f1253aa1443b8b65b2eb57907d6ad: function AS_Button_d94f1253aa1443b8b65b2eb57907d6ad(eventobject) {
        var self = this;
        this.view.flexOutOfRange.isVisible = false;
    },
    /** onClick defined for CopybtnAgree0g1964cd2b63b43 **/
    AS_Button_dadcfe99bbaf43dcb3015563d88d5748: function AS_Button_dadcfe99bbaf43dcb3015563d88d5748(eventobject) {
        var self = this;
        this.view.flexOutOfRange.isVisible = false;
        this.view.btnGPS.text = "Pause GPS";
        this.startGPS();
    },
    /** onClick defined for flxStartGPS **/
    AS_FlexContainer_ed8d3348de8e4d68b632690cfaaae30b: function AS_FlexContainer_ed8d3348de8e4d68b632690cfaaae30b(eventobject) {
        var self = this;
        this.GPSHandler();
    },
    /** preShow defined for frmMap **/
    AS_Form_d45479cfa7d74b18b6b4e1507757ce8c: function AS_Form_d45479cfa7d74b18b6b4e1507757ce8c(eventobject) {
        var self = this;
        this.isDefault = true;
        this.showRouteFromLocation("");
    },
    /** onHide defined for frmMap **/
    AS_Form_d852629454a44b608fffb1b9bdcf85f8: function AS_Form_d852629454a44b608fffb1b9bdcf85f8(eventobject) {
        var self = this;
        this.view.btnCheckIn.isVisible = false;
    },
    /** onDeviceBack defined for frmMap **/
    AS_Form_c729824d04aa4575a9566e3e4ba90529: function AS_Form_c729824d04aa4575a9566e3e4ba90529(eventobject) {
        var self = this;

        function doNothing() {}
        doNothing();
    }
});