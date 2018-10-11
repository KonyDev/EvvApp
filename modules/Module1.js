function geoPosition(successCallback,failureCallback)
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
    alert("Exception is ::"+exception.message);
  }
}
/*****************************************************************
*	Name    : watchPosition
*	Author  : Kony
*	Purpose : The below function is to invoke ' kony.location.watchPosition ' API
******************************************************************/
function watchPosition()
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
    watchID = kony.location.watchPosition (successCallbackPos,failureCallbackPos, positionoptions);
  }catch(err)
  {
    //alert(err.message);
  }
  return watchID;
}

var lastPos = {lat:0,lon:0};

function successCallbackPos(res){
  var latLongValueCurrent = {lat:res.coords.latitude,lon:res.coords.longitude};
 // alert(lastPos)
  if(lastPos.lat == 0){
    //alert("1st time")
    lastPos = {lat:res.coords.latitude,lon:res.coords.longitude};
  }else{
    var dist = kony.map.distanceBetween(lastPos, latLongValueCurrent);
    //alert(dist+"    "+JSON.stringify(lastPos) +"       "+JSON.stringify(latLongValueCurrent) );
    if(dist >5){
      lastPos = latLongValueCurrent;
      //alert("HI Distance greater than 5 m    "+dist)
    }
  }
  
 // alert(res);
}

function failureCallbackPos(){
  
}