define({ 

  //Type your controller code here 
  forceCheckin: false,
  _address:"",
  _absoluteAddress:"",
  tempAssetDetail:{
  "Assets": [
    {
      "country": "US",
      "manufacture_Serial_Nbr": "A1000233448",
      "asset_Location_Id": "SUBST55",
      "city": "Memphis",
      "latitude": "35.0765676",
      "asset_Id": "OAA-0000209",
      "asset_Type_Name": "GASPL",
      "asset_Type_Description": "Gas Pipeline",
      "asset_Description": "Stein 3000 KVA Gas Pipeline\t",
      "manufacture_Model_Nbr": "STEIN3000ST",
      "reference_doc": "http://forms.kony.com/rs/konysolutions/images/DS-Kony-Marketplace.pdf",
      "locationDes": "MLGW Electrical Substation #55, 3350 American Way, Memphis city",
      "street": "3350 American Way",
      "manufacture_Part_Nbr": "280381",
      "region": "TN",
      "asset_Img_URL": "https://www.bid-on-equipment.com/uploads/1892016/280381-3.jpg",
      "longitude": "-90.0212331"
    }
  ],
    "opstatus": 0,
    "httpStatusCode": 200,
    "httpresponse": {
      "headers": {
        "X-Android-Received-Millis": "1538048140160",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Set-Cookie": "JSESSIONID=434395DB9FCFA8CDB477014B3406B09A; Path=/services; Secure; HttpOnly",
        "Vary": "Accept-Encoding",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, TRACE, OPTIONS, PUT, DELETE, PATCH",
        "X-Kony-Service-Message": "",
        "X-Android-Selected-Protocol": "http/1.1",
        "Server": "Kony",
        "X-Android-Sent-Millis": "1538048137671",
        "X-Kony-RequestId": "b4da1630-9afa-4b4a-acf7-b854453e0d3a",
        "Connection": "Keep-Alive",
        "Date": "Thu, 27 Sep 2018 11:35:29 GMT",
        "Access-Control-Allow-Origin": "*",
        "X-Kony-Service-Opstatus": "0",
        "Transfer-Encoding": "chunked",
        "Content-Type": "text/plain;charset=UTF-8",
        "X-Android-Response-Source": "NETWORK 200",
        "Keep-Alive": "timeout=60, max=100",
        "Pragma": "no-cache",
        "Content-Encoding": "gzip"
      },
      "url": "https://vivekiyer1.konycloud.com/services/Assets/getAssetById",
      "responsecode": 200
    }
  },
  dummyInfoData:{
  "measurement_name": "Control Power Supply  Voltage",
  "measurement_Id": "#Meas005",
  "measurement_description": "Voltage reading from power supply",
  "values": [
    {
      "date": "14/08/2018",
      "time": "12:08 Hrs",
      "value": "2795",
      "responseType": "Numeric"
    },
    {
      "date": "14/08/2018",
      "time": "15:07 Hrs",
      "value": "2795",
      "responseType": "Numeric"
    },
    {
      "date": "17/08/2018",
      "time": "11:17 Hrs",
      "value": "3000",
      "responseType": "Numeric"
    }
  ]
},
  inspection:null,
  assetDetail:null,
  isContainerShown:false,
  imageCallBackFunction:null,
  
  onNavigate:function(inspection){
    if(inspection===null||inspection===undefined)
      return;
    this.inspection=inspection;
    this.assetDetail=null;
        this.forceCheckin = inspection.forcedCheckIn;
    try{
      this.populateData();
    }catch(excp){
      alert("Excp occured while populating data: "+JSON.stringify(excp));
    }
  },
  onPostShow:function(){
    this._absoluteAddress = this.inspection["asset_location_description"]+", "+this.inspection["asset_location_street"]+", "+this.inspection["asset_location_city"];
    this._address = this.inspection["asset_location_description"]+", "+this.inspection["asset_location_street"]+", "+this.inspection["asset_location_city"];
    if(this.inspection.forcedCheckIn){
      this.view.lblcheckinAddress.isVisible = true;
      this.view.lblcheckinAddress.skin = "CopysknLblDay0ffb578e9e60447";
      this.view.lblcheckinAddress.text = "Not Captured";
    }
    else{
      this.view.lblcheckinAddress.skin = "sknLblDay";
      this.view.lblcheckinAddress.isVisible = true;
      this.view.lblcheckinAddress.text = this._address;
    }
    debugger;
    if(this.inspection===null||this.inspection===undefined)return;
    else if(this.assetDetail===null)
      this.getAssetDetail(validateText(this.inspection["asset_Id"]));
  },
  toggleImageGalleryContainer:function(){
    this.isContainerShown=!this.isContainerShown;
    if(this.isContainerShown){
      this.showImageGallery();
    }else{
      this.hideImageGallery();
    }
    this.view.forceLayout();
  },
  addImageCallback:function(callbackFunction){
    debugger;
    //alert(typeof callbackFunction);

    if(typeof callbackFunction==="function"){
      this.imageCallBackFunction=callbackFunction;
      this.toggleImageGalleryContainer();
    }
    //this.toggleImageGalleryContainer();

  },
  onImageSelected:function(imgBase64){
    this.toggleImageGalleryContainer();
    if(this.imageCallBackFunction!==null&& this.imageCallBackFunction!==undefined){
      this.imageCallBackFunction(imgBase64);
    }
    //debugger;
  },
  showImageGallery:function(eventobject){
    var self=this;
    this.view.flxImageGalleryContainer.isVisible=true;
    this.view.flxImageGalleryContainer.animate(
      kony.ui.createAnimation({100:{top:"0%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
      {animationEnd: function() {
        self.view.imagegallery.toggleBackground(true);
        self.view.forceLayout();
      } 
      });

  },
  hideImageGallery:function(){
    var self=this;
    this.view.flxImageGalleryContainer.isVisible=false;
    this.view.imagegallery.toggleBackground(false);
    this.view.flxImageGalleryContainer.animate(
      kony.ui.createAnimation({100:{top:"100%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.1},
      {animationEnd: function() {
        self.view.forceLayout();
      } 
      });
  },
  showInfoCallBack:function(measurementID,measurementRangeID){
    debugger;
    //this.view.flxInfoCardContainer.right="0%";
    this.getMesurementInfo(measurementID,measurementRangeID);
  },
  populateData:function(){
    debugger;
    if(this.inspection===null||this.inspection===undefined){
      return;
    }
    //this.view.measurement;
    //this.view.add(widgetArray)
    this.view.measurement.setData(this.inspection.measurementRangeList,this.addImageCallback,this.showInfoCallBack);
    this.view.forceLayout();
    var status=this.inspection["status"];
    if(status!==null&&status!==undefined){
      status=status.toLowerCase();
    }
    switch(status){
      case "assigned":
        this.view.lblInspectionStatus.text="Assigned";
        break;
      case "in progress":
        this.view.lblInspectionStatus.text="In-progress";
        break;
      case "completed":
        this.view.lblInspectionStatus.text="Completed";
        break;
      default:
        this.view.lblInspectionStatus.text="NA";
    }
    this.view.lblAssetId.text=validateText(this.inspection["asset_Id"]);
    this.view.lblInspectionID.text=validateText(this.inspection["inspection_Id"]);
    this.view.lblAssetCode.text=validateText(this.inspection["asset_type"]);
    this.view.lblAssetName.text=getAssatName(this.inspection["asset_type"]);
    var timeStamp=this.inspection["assigned_Timestamp"];
    timeStamp=_convertDateStringToEpochTime(timeStamp);
    this.view.lblTime.text=getTimeString(timeStamp);
    this.view.lblDay.text=getDateString(timeStamp);
    this._address = this.inspection["asset_location_description"]+", "+this.inspection["asset_location_street"]+", "+this.inspection["asset_location_city"];
    this.view.lblcheckinAddress.text = this.inspection["asset_location_description"]+", "+this.inspection["asset_location_street"]+", "+this.inspection["asset_location_city"];
    if(!kony.sdk.isNullOrUndefined(this.inspection["asset_type"])){
		this.view.lblAssetTypeId.text = this.inspection["asset_type"];
    }
    /*if(timeStamp!==null && timeStamp!==undefined){
      try{
        var date=new Date(timeStamp);
        this.view.lblTime.text=date.getHours()+" Hrs";
        this.view.lblDay.text=(timeStamp.split(" "))[0];
      }catch(excp){
        kony.print(JSON.stringify(excp));
      }
    }*/
    this.view.lblUserName.text=validateText(this.inspection["inspectedBy"]);//@TODO change value 
    this.view.lblDistance.text=this.inspection["distance"];
    this.view.lblAddress.text=validateText(this.inspection["asset_location_description"]);
  },
  showAssetDetailContainer:function(){
    debugger;
    var self=this;
    this.view.flxScAssetDetailsContainer.animate(
      kony.ui.createAnimation({100:{left:"20%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
    self.view.flxOverlay.animate(
      kony.ui.createAnimation({100:{left:"0%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
  },
  hideAssetDetailContainer:function(){
    debugger;
    var self=this;
    this.view.flxScAssetDetailsContainer.animate(
      kony.ui.createAnimation({100:{left:"100%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
    self.view.flxOverlay.animate(
      kony.ui.createAnimation({100:{left:"-20%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.01},
      {animationEnd: function() {

      } 
      });
  },
  getAssetDetailSuccessCB:function(result){
    debugger;
    result = this.tempAssetDetail;
    kony.application.dismissLoadingScreen();
    this.view.loadingScreen.hide();
    if(result!==null&&result!==undefined){
      if(Array.isArray(result.Assets)){
        this.populateAssetDetail(result.Assets[0]);
      }
    }
  },
  populateAssetDetail:function(asset){
    if(asset!==null&&asset!==undefined){
      this.assetDetail=asset;
      this.view.lblAssetDetail.text = validateText(asset.asset_Id);;
      this.view.lblAssetId2.text=validateText(asset.asset_Id);
      this.view.lblAssetCode.text=validateText(asset.asset_Type_Name);
      this.view.lblAssetName.text=validateText(asset.asset_Type_Description);
      this.view.lblAssetDescription.text=validateText(asset.asset_Description);
      this.view.lblLocationCode.text=validateText(asset.asset_Location_Id);
      this.view.lblAssetAddress.text=validateText(asset.locationDes)+" "+validateText(asset.street);
      this.view.lblAssetGroup0.text="XXX";
      this.view.lblAssetGroup1.text="XXX";
      this.view.lblPartNumber.text=validateText(asset.manufacture_Part_Nbr);
      this.view.lblModelNumber.text=validateText(asset.manufacture_Model_Nbr);
      this.view.lblSerialNumberValue.text=validateText(asset.manufacture_Serial_Nbr);
    }
  },
  getAssetDetailFailureCB:function(result){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    alert("error:"+result)
  },
  readMeasurement:function(){
    var results=this.view.measurement.getResult();
    var navObj=new kony.mvc.Navigation("frmInspectionReview");
    var reviewData={};
    reviewData["inspection"]=this.inspection;
    reviewData["measurement"]=results;
    reviewData["assetDetail"]=this.assetDetail;
    reviewData["forceCheckin"] = this.forceCheckin;
    try{
      navObj.navigate(reviewData);
    }catch(excp){
      alert("Excp: "+JSON.stringify(excp));
    }
  },
  /**********************************************************************************
   *	Name	:	getAssetDetail
   *	Author	:	Kony
   *	Purpose	:	To get the detail of the asset for the provided asset id.
   ***********************************************************************************/
  getAssetDetail:function(assetId){
    if(assetId===null || assetId===undefined){
      return;
    }

    /*try{
      var objectInstance=getObjectInstance("AssetDetail");
      if(objectInstance!==null){
        var dataObject = new kony.sdk.dto.DataObject("Asset");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          //"queryParams": {"$filter":"((someid eq '"+assetId+"' ) and ((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"}
          "queryParams": {"$filter":"someid eq '"+assetId+"'" }
        };
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          kony.application.showLoadingScreen("sknLoading","please wait..",constants.
                                             LOADING_SCREEN_POSITION_FULL_SCREEN, true,false,null);
          objectInstance.fetch(options, this.getAssetDetailSuccessCB.bind(this),this.getAssetDetailFailureCB.bind(this));
        } else {
          dismissLoadingScreen();
          alert("No Network connected");
        }
      }
    }catch(excp){
      dismissLoadingScreen();
      kony.application.dismissLoadingScreen();
      kony.print("Exception occured in getting asset details: "+JSON.stringify(excp) );
    }*/


//     try{
//       var client = kony.sdk.getCurrentInstance();
//       var intgService;
//       intgService = client.getIntegrationService("Assets");
//       this.view.loadingScreen.show();
//       //kony.model.ApplicationContext.showLoadingScreen("Please wait..");
//       intgService.invokeOperation("getAssetById",{},{"id":assetId},this.getAssetDetailSuccessCB.bind(this),this.getAssetDetailFailureCB.bind(this));
//     }catch(excp){
//       this.view.loadingScreen.hide();
//       kony.application.dismissLoadingScreen();
//       kony.print(JSON.stringify(excp));
//     }
    this.getAssetDetailSuccessCB();
  },


  getMesurementInfo:function(measurementID,measurement_Range_ID){
//     if(measurementID!==null && measurementID!==undefined && measurement_Range_ID!==null && measurement_Range_ID!==undefined){
//       var queryParams = {"msid":measurementID};
//       this._fetchFromODataService("inspectionObjService", "MeasurementSet", queryParams, this.onSuccesCallbackInfo.bind(this,measurement_Range_ID), this.errorCallbackInfo.bind(this));
//     }
    this.onSuccesCallbackInfo();

  },
  _fetchFromODataService: function(objectService, dataModelObject, queryParams, successCallback, errorCallback) {
    try {
      var sdkClient = new kony.sdk.getCurrentInstance();
      var objectInstance;
      if (Object.keys(sdkClient).length !== 0) {
        objectInstance = sdkClient.getObjectService(objectService, {
          "access": "online"
        });
      }
      if (objectInstance === null || objectInstance === undefined) {
        this.view.loadingScreen.hide();
        kony.application.dismissLoadingScreen();
        throw {
          "error": "ConnectionError",
          "message": "Please connect app to MF"
        };
        return;
      }
      var dataObject = new kony.sdk.dto.DataObject(dataModelObject);
      var options = {
        "dataObject": dataObject,
        "headers": {
          "Content-Type": "application/json"
        },
        "queryParams": queryParams
      };
      if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        objectInstance.fetch(options, successCallback, errorCallback);
      }
    } catch (exception) {
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      //@TODO remove alerts
      alert(exception);
    }
  },


  errorCallbackInfo: function(response){
    
    kony.print("Error in errorCallbackInfo:"+response.toString());

  },
  onSuccesCallbackInfo: function(measurement_Range_ID,response){
//     var data = response.records[0].MeasurementHistoryList;
//     var measurement_Range_Id = measurement_Range_ID;
    //alert(data);
//     if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
//       data = data.filter(function(element){
//         if(element.measurement_Range_Id==measurement_Range_Id)
//           return true;
//         return false;
//       }.bind(this));
//       data = this._processData(data);
      this.view.flxInfoCardContainer.right="0%";
	  var data = this.dummyInfoData;
      this.view.InfoCard.setData(data);
//     }
  },
  _processData: function(data){
    var result = {};
    if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
      result.measurement_name = data[0].measurement_name;
      result.measurement_Id = "#"+ data[0].measurement_Id;
      result.measurement_description = data[0].measurement_description;
      var values = [];
      var tempJSON;
      for(var i=0;i<data.length;i++){
        tempJSON = {};
        tempJSON.date = this._getUTCDate(parseInt(data[i].inspection_Timestamp));
        tempJSON.time = this._getUTCTime(parseInt(data[i].inspection_Timestamp));
        tempJSON.value = data[i].inspection_Value;
        values.push(tempJSON);
      }
      result.values = values;
    }
    return result;
  },
  _getUTCDate: function (epochTime){
    var result = "";
    var date = new Date(epochTime);
    var day =  date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    result = this._addZeroPrefix(day)+ "/"+ this._addZeroPrefix(month)+"/"+year;
    return result;
  },
  _getUTCTime: function (epochTime){
    var result;
    var currDate = new Date();
    var date = new Date(epochTime);
    var hr = this._addZeroPrefix(date.getHours());
    var min = this._addZeroPrefix(date.getMinutes());
    result = hr +":"+min+" Hrs";
    return result;
  },
  _addZeroPrefix: function (number){
    var result;
    if(number>=0 && number<10){
      result = "0"+number;
    }
    else{
      result = number;
    }
    return result;
  },
  _onClickOfHistory: function(){
    var navigationObj = new kony.mvc.Navigation("frmInspectionHistory");
    var navigationData = {};
    navigationData.previousForm = "frmInspectionExecution";
    navigationData.asset_id = this.inspection["asset_Id"];
    navigationObj.navigate(navigationData);
  }





});