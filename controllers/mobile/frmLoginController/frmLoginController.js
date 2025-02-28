define({ 
  userData:{
  	"email": "john.doe@kony.com",
	"firstName": "John",
	"lastName": "Doe",
	"raw_response": "{\"user_role\":\"Member\",\"firstName\":\"John\",\"lastName\":\"Doe\",\"user_id\":\"User0001\",\"email\":\"john.doe@kony.com\"}",
	"user_id": "User0001",
	"user_role": "Member"

  },
  identitySvc:null,
  userAttribute:{},
  doLogin:function(){
    var identitySvc = KNYMobileFabric.getIdentityService("customLogin");
    var options = {};
    options["userid"] = this.view.LoginComponent.getEmail();
    options["password"] = this.view.LoginComponent.getPassword();
//     this.view.LoginComponent.setLoading();
//     identitySvc.login(options,this._loginSuccess.bind(this,identitySvc),function(err){
//       this.view.LoginComponent.resetLoading();
//       var toast=new kony.ui.Toast({"text":"Invalid user name or password","duration":constants.TOAST_LENGTH_SHORT });
//       toast.show();
//       //  alert("Login Failure"+JSON.stringify(err));
//     }.bind(this));
    this._loginSuccess();
  },
  _loginSuccess: function(identityService,res){
    //alert("Login Success"+JSON.stringify(res));
//     this.view.LoginComponent.resetLoading();
//     identityService.getUserAttributes(function(result) {
      var result = this.userData;
      this.userAttribute["userid"]=result.user_id;
      this.userAttribute["userRole"]=result.user_role;
      this.userAttribute["firstName"]=result.firstName;
      this.userAttribute["lastName"]=result.lastName;
      
      this.userAttribute["email"]=result.email;
	  kony.store.setItem("USER_INFO",this.userAttribute);
      if(true){
        try{
          var navObj=new kony.mvc.Navigation("frmInspectionsList");
          navObj.navigate(this.userAttribute);
        }catch(excp){
          alert(JSON.stringify(excp));
        }
      }
//       else{
//         try{
//           var navObj=new kony.mvc.Navigation("frmInspectionCreation");
//           navObj.navigate(this.userAttribute);
//         }catch(excp){
//           alert(JSON.stringify(excp));
//         }
//       }
//       this.view.LoginComponent.resetLoading();
//     }.bind(this), function(error) {
//       this.view.LoginComponent.resetLoading();
//       alert("failure callback for getUserAttributes. Error :"+JSON.stringify(error));
//     }.bind(this));
  },
  _loginFailure: function(response){

  }

});