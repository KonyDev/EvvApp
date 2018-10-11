define({ 
  flagInd : "pinA",
  forcedCheckIn: false,
  flagOnceRange : false,
  locationMap : {dest:{
    lat:35.0765676,
    lon:-90.0212331,
    name:"D",
    desc:"2519 Elvis Presley Blvd, Memphis, TN 38106, USA",
    image:"pindest.png"
  },
  source:{
    lat:35.092196,
    lon:-90.010186,
    name:"S",
    desc:"Thompson Courts, 1875 Keltner Cir, Memphis, TN 38114, USA",
    image:"myself.png"
  },
  pinA:{
    lat:35.078009,
    lon:-90.010873,
    image:"myself.png"
  },
  pinB:{
    lat:35.078044,
    lon:-90.019499,
    image:"myself.png"
   }
//   pinC:{
//     lat:35.086,
//     lon:-90.008,
//     image:"myself.png"
//   },
//   pinD:{
//     lat:35.080,
//     lon:-90.014,
//     image:"myself.png"
//   },
//   pinE:{
//     lat:35.078,
//     lon:-90.02,
//     image:"myself.png"
//   }
},

 isDefault :true,
 flagTemp : "",
  lastPos : {lat:0,lon:0},
  onNavigate:function(inspection){
    this.init();
    if(inspection===null||inspection===undefined)
      return;
    this.inspection=inspection;
    
  },
  init: function(inspection){
	this.view.flexOutOfRange.isVisible = false;
    this.view.flexRangePopup.isVisible = false;
    
  },
  showCheckIn:function(dist){
    if(dist <300){
      this.view.btnCheckIn.isVisible = true;
    }else{
      this.view.btnCheckIn.isVisible = false;
    }
    this.view.lblDist.text = (dist/1000).toFixed(2)+" mi";
  },


  getCordinates:function(getPin){
    this.isDefault = false;
    this.showRouteFromLocation(getPin);
  },

  forcedCheckedIn:function(){
    if(this.view.btnGPS.text == "Pause GPS"){
      kony.timer.cancel("myTimer");
      this.view.btnGPS.text = "Start GPS";
    }

    this.view.flexRangePopup.isVisible = true;
  },

  startGPS:function(){
    if(flagOnceRange){
      kony.timer.cancel("myTimer");
    }
    //this.view.btnOutOfRange.isVisible = true;
    kony.timer.schedule("myTimer", this.timerFunc.bind(this), 2, true);
  },
  timerFunc:function(){
    // alert("Hi")

    this.isDefault = false;
    this.showRouteFromLocation(this.flagInd);
    this.flagOnceRange = false;
    //alert(flagInd)
    if(this.flagInd == "pinA"){
      this.flagInd = "pinB";
    }else if(this.flagInd == "pinB"){
      kony.timer.cancel("myTimer");
      this.view.btnGPS.text = "Start GPS";
      this.flagInd = "pinA";
      this.flagOnceRange = true;
    }
    //   else if(flagInd == "pinC"){
    //     flagInd = "pinD";
    //   }else if(flagInd == "pinD"){
    //     flagInd = "pinE";
    //   }else if(flagInd == "pinE"){

    //   }


  },

  GPSHandler: function(){
    if(this.view.btnGPS.text == "Start GPS"){
      this.view.btnGPS.text = "Pause GPS";
      this.startGPS();
    }else{
      this.view.btnGPS.text = "Start GPS";
      kony.timer.cancel("myTimer");
    }
  },


  pauseTimer:function(){
    kony.timer.cancel("myTimer");

  },


  outOfRange:function(){
    this.flagInd = "pinA";
    this.isDefault = true;
    this.showRouteFromLocation("");
    if(this.flagOnceRange){
      this.view.flexOutOfRange.isVisible = true;
    }else{

    }
    kony.timer.cancel("myTimer");
    this.view.btnOutOfRange.isVisible = false;
    this.view.btnGPS.text = "Start GPS";
  },

  showRouteFromLocation:function(getPin){
    var timeStamp=this.inspection["assigned_Timestamp"];
    timeStamp=_convertDateStringToEpochTime(timeStamp);
    this.view.rtxtCheckinTime.text = "Check in <label style = \"color:#000000\">"+getDateString(timeStamp)+" "+getTimeString(timeStamp)+"</label>";
    this.flagTemp = getPin;
    var locationData = [];
    locationData.push(this.locationMap.dest);
    var testdata = 
    {
      id:"circleId",
      centerLocation :
      {
        lat:this.locationMap.dest.lat,
        lon:this.locationMap.dest.lon},
      navigatetoZoom:false,
      radius:500,
      circleConfig:
      {
        lineColor:"0x858585FF",
        lineWidth:1,
        fillColor:"0x85858580"
      },
      showCenterPin:false
    };
    this.view.map1.addCircle(testdata);
    if(this.isDefault){
      this.locationMap.source.image = "myself.png";
      locationData.push(this.locationMap.source);
    }else{
      var dataTemp = [];
      switch(getPin){
        case "pinA":
          locationData.push(this.locationMap.pinA);
          break;
        case "pinB":
          locationData.push(this.locationMap.pinB);
          break;
        case "pinC":
          locationData.push(this.locationMap.pinC);
          break;
        case "pinD":
          locationData.push(this.locationMap.pinD);
          break;
        case "pinE":
          locationData.push(this.locationMap.pinE);
      }
    }
    this.callSearchRoutefunc(locationData[1]);

  },

  successcallbackWatch:function(res){
    //alert(res.coords.latitude+"    "+res.coords.longitude);
  },
  errorcallbackWatch:function(res){
    //alert("Failure");
  },

  navigateMap:function(){
    var daddr = this.locationMap.dest.lat+","+this.locationMap.dest.lon;
    var saddress = "";
    switch(flagTemp){
      case "pinA":
        saddress = this.locationMap.pinA.lat+","+this.locationMap.pinA.lon;
        break;
      case "pinB":
        saddress = this.locationMap.pinB.lat+","+this.locationMap.pinB.lon;
        break;
      case "pinC":
        saddress = this.locationMap.pinC.lat+","+this.locationMap.pinC.lon;
        break;
      case "pinD":
        saddress = this.locationMap.pinD.lat+","+this.locationMap.pinD.lon;
        break;
      case "pinE":
        saddress = this.locationMap.pinE.lat+","+this.locationMap.pinE.lon;
        break;
      case "":
        saddress = this.locationMap.source.lat+","+this.locationMap.source.lon;
        break;
    }
    if(kony.os.deviceInfo().name.search("and")>=0){
      kony.application.openURL("google.navigation:q="+daddr);
    }else{
      kony.application.openURL("comgooglemaps://?saddr="+saddress+"&daddr="+daddr+"&directionsmode=driving&zoom=14");
    }
  },

  callSearchRoutefunc:function(sourceOrigin){
    var searchCriteriaObj = {
      alternatives : true, 
      directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
      destination : this.locationMap.dest,
      origin : sourceOrigin , 
      transportMode : "driving",
      apiKey:"AIzaSyBxz_lS49jNEpML6LiwXTbKQRPsTSS8HZM"
    };
    kony.map.searchRoutes(searchCriteriaObj, this.searchRouteSuccesCallback.bind(this), this.errorRouteSuccesCallback.bind(this));  

  },
  errorRouteSuccesCallback:function(errorCode,errorMessage){
    alert("Something went wrong white creating routes. Try Again.");
  },

  searchRouteSuccesCallback:function(routes)
  {
    //alert("######Succeess callback is called###"+routes.length);
    this.displySearchRoutes(routes);
  },

  displySearchRoutes:function(Searchroutes)
  {
    var routeColors = ["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];
    this.drawRoute("route"+0, Searchroutes[0].polylinePoints, routeColors[0]);
  },

  drawRoute:function(routeid,polyPoints,color)
  {
    var steps = polyPoints;
    kony.print("################The polyline points");
    kony.print(steps);
    ei = steps.length-1;

    var startLoc = {
      lat:steps[0].lat,
      lon:steps[0].lon,
      image:{source:"myself.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var endLoc = {
      lat:steps[ei].lat,
      lon:steps[ei].lon,
      image:{source:"pindest.png",anchor:kony.map.PIN_IMG_ANCHOR_CENTER}
    };

    var polylineData = {
      id : routeid,
      locations : steps,
      startLocation : startLoc,
      endLocation : endLoc,
      polylineConfig : {lineWidth : 5, lineColor: color}
    };
    this.view.map1.addPolyline(polylineData);
    var dist = kony.map.distanceBetween(endLoc, startLoc);
    this.showCheckIn(dist);
    //mMap.map1.zoomLevel = 14;
    kony.application.dismissLoadingScreen();
  },
  

  geoPosition:function(successCallback,failureCallback)
  {
    //var positionoptions1={};
    var positionoptions={};
    positionoptions.enableHighAccuracy=true;
    positionoptions.timeout=10000;
    positionoptions.maximumAge=1000;
    //watchFlag = false;
    try
    {
      kony.location.getCurrentPosition(successCallback, failureCallback,positionoptions);
    }
    catch(exception)
    {
      //alert("Exception is ::"+exception.message);
    }
  },
  /*****************************************************************
*	Name    : watchPosition
*	Author  : Kony
*	Purpose : The below function is to invoke ' kony.location.watchPosition ' API
******************************************************************/
  watchPosition:function()
  {   
    //alert("HI")
    //var positionoptions1 = {};//maximumage: 3000};
    var positionoptions={};
    positionoptions.enableHighAccuracy=true;
    // positionoptions.timeout=3000;
    //positionoptions.maximumAge=3000;
    //positionoptions.minimumTime=1000;
    positionoptions.minimumDistance=5;
    //watchFlag = true;
    var watchID=null;
    try
    {
      watchID = kony.location.watchPosition (this.successCallbackPos.bind(this),this.failureCallbackPos.bind(this), positionoptions);
    }catch(err)
    {
      //alert(err.message);
    }
    return watchID;
  },

  successCallbackPos:function(res){
    var latLongValueCurrent = {lat:res.coords.latitude,lon:res.coords.longitude};
    // alert(lastPos)
    if(this.lastPos.lat == 0){
      //alert("1st time")
      this.lastPos = {lat:res.coords.latitude,lon:res.coords.longitude};
    }else{
      var dist = kony.map.distanceBetween(this.lastPos, latLongValueCurrent);
      //alert(dist+"    "+JSON.stringify(lastPos) +"       "+JSON.stringify(latLongValueCurrent) );
      if(dist >5){
        this.lastPos = latLongValueCurrent;
        //alert("HI Distance greater than 5 m    "+dist)
      }
    }

    // alert(res);
  },

  failureCallbackPos:function(){

  },
  _navigateToExecution: function(){
    var navObj=new kony.mvc.Navigation("frmInspectionExecution");
    var navigationData = this.inspection;
    navigationData.forcedCheckIn = this.forcedCheckIn;
    navObj.navigate(navigationData);
  }
  
 });