var frmLoginView ="";

function showCheckIn(dist){
  if(dist <300){
    frmMap.btnCheckIn.isVisible = true;
  }else{
    frmMap.btnCheckIn.isVisible = false;
  }
  frmMap.lblDist.text = (dist/1000).toFixed(2)+" mi";
}


function getCordinates(getPin){
  isDefault = false;
  showRouteFromLocation(getPin);
}

function forcedCheckedIn(){
  if(frmMap.btnGPS.text == "Pause GPS"){
    kony.timer.cancel("myTimer");
    frmMap.btnGPS.text = "Start GPS";
  }
  
  frmMap.flexRangePopup.isVisible = true;
}
var flagInd = "pinA";
var flagOnceRange = false;

function startGPS(){
  if(flagOnceRange){
    kony.timer.cancel("myTimer");
  }
  frmMap.btnOutOfRange.isVisible = true;
  kony.timer.schedule("myTimer", timerFunc, 2, true);
}
function timerFunc(){
 // alert("Hi")
  
  isDefault = false;
  showRouteFromLocation(flagInd);
  flagOnceRange = false;
  //alert(flagInd)
  if(flagInd == "pinA"){
    flagInd = "pinB";
  }else if(flagInd == "pinB"){
    kony.timer.cancel("myTimer");
    frmMap.btnGPS.text = "Start GPS";
    flagInd = "pinA";
    flagOnceRange = true;
  }
//   else if(flagInd == "pinC"){
//     flagInd = "pinD";
//   }else if(flagInd == "pinD"){
//     flagInd = "pinE";
//   }else if(flagInd == "pinE"){
    
//   }
  
  
}

function GPSHandler(){
  if(frmMap.btnGPS.text == "Start GPS"){
    frmMap.btnGPS.text = "Pause GPS";
    startGPS();
  }else{
    frmMap.btnGPS.text = "Start GPS";
    kony.timer.cancel("myTimer");
  }
}


function pauseTimer(){
  kony.timer.cancel("myTimer");
  
}


function outOfRange(){
  flagInd = "pinA";
  isDefault = true;
  showRouteFromLocation("");
  if(flagOnceRange){
    frmMap.flexOutOfRange.isVisible = true;
  }else{
    
  }
  kony.timer.cancel("myTimer");
  frmMap.btnOutOfRange.isVisible = false;
  frmMap.btnGPS.text = "Start GPS";
}