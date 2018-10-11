var locationMap = {dest:{
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
};

var isDefault =true;
var flagTemp = "";


function showRouteFromLocation(getPin){
  flagTemp = getPin;
  var locationData = [];
  locationData.push(locationMap.dest);
  if(isDefault){
    locationMap.source.image = "myself.png";
    locationData.push(locationMap.source);
  }else{
    var dataTemp = [];
    switch(getPin){
      case "pinA":
        locationData.push(locationMap.pinA);
        break;
      case "pinB":
        locationData.push(locationMap.pinB);
        break;
      case "pinC":
        locationData.push(locationMap.pinC);
        break;
      case "pinD":
        locationData.push(locationMap.pinD);
        break;
      case "pinE":
        locationData.push(locationMap.pinE);
    }
  }
  callSearchRoutefunc(locationData[1]);
  
}

function successcallbackWatch(res){
  alert(res.coords.latitude+"    "+res.coords.longitude);
}
function errorcallbackWatch(res){
  alert("Failure");
}

function navigateMap(){
  var daddr = locationMap.dest.lat+","+locationMap.dest.lon;
  var saddress = "";
  switch(flagTemp){
    case "pinA":
      saddress = locationMap.pinA.lat+","+locationMap.pinA.lon;
      break;
    case "pinB":
      saddress = locationMap.pinB.lat+","+locationMap.pinB.lon;
      break;
    case "pinC":
      saddress = locationMap.pinC.lat+","+locationMap.pinC.lon;
      break;
    case "pinD":
      saddress = locationMap.pinD.lat+","+locationMap.pinD.lon;
      break;
    case "pinE":
      saddress = locationMap.pinE.lat+","+locationMap.pinE.lon;
      break;
    case "":
      saddress = locationMap.source.lat+","+locationMap.source.lon;
      break;
    }
  if(kony.os.deviceInfo().name.search("and")>=0){
    kony.application.openURL("google.navigation:q="+daddr);
  }else{
    kony.application.openURL("comgooglemaps://?saddr="+saddress+"&daddr="+daddr+"&directionsmode=driving&zoom=14");
  }
}

function callSearchRoutefunc(sourceOrigin){
  var searchCriteriaObj = {
    alternatives : true, 
    directionServiceUrl : "https://maps.googleapis.com/maps/api/directions/json",
    destination : locationMap.dest,
    origin : sourceOrigin , 
    transportMode : "driving",
    apiKey:"AIzaSyBxz_lS49jNEpML6LiwXTbKQRPsTSS8HZM"
  };
  kony.map.searchRoutes(searchCriteriaObj, searchRouteSuccesCallback, errorRouteSuccesCallback);  
  
}
function errorRouteSuccesCallback(errorCode,errorMessage){
  alert(errorCode+"   "+errorMessage);
}

function searchRouteSuccesCallback(routes)
{
   //alert("######Succeess callback is called###"+routes.length);
    displySearchRoutes(routes);
}

function displySearchRoutes(Searchroutes)
{
        routeColors = ["0000FFFF","FF00FFFF","FF0000FF","FFFF00FF","0x000000FF"];
            drawRoute("route"+0, Searchroutes[0].polylinePoints, routeColors[0]);
}

function drawRoute(routeid,polyPoints,color)
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

    polylineData = {
        id : routeid,
        locations : steps,
        startLocation : startLoc,
        endLocation : endLoc,
        polylineConfig : {lineWidth : 5, lineColor: color}
    };
     frmMap.map1.addPolyline(polylineData);
  var dist = kony.map.distanceBetween(endLoc, startLoc);
  showCheckIn(dist);
 //mMap.map1.zoomLevel = 14;
  kony.application.dismissLoadingScreen();
}		