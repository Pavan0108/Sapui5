sap.ui
		.controller(
				"zpcurd.curd",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf zpcurd.curd
					 */
					onInit : function() {
						// read operation
						var that = this;

						this.oModel = new sap.ui.model.odata.ODataModel(
								"https://hanap1941535115trial.hanatrial.ondemand.com/Task_Track/Track2/Complexity.xsodata",
								true);
						// direct binding testing purpose
						// this.getView().byId("tableId").setModel(oModel);
//						this.oModel.read("/TestService1", {
//							success : function(req, res) {
//								// here we get records in the form of objects
//								// and arrays formate but we will not bind
//								// directly with arrays and objects thas's why
//								// we hv to create on model that is JSON Model
//								var oJson = new sap.ui.model.json.JSONModel();
//								oJson.setData(req);
//								// by default JSON binding 100 records only we
//								// have to all the records that time we use
//								// setSizeLimit()method
//								oJson.setSizeLimit(req.results.length);
//								// set the data into table usin setModel()
//								// method
//								that.getView().byId("tableId").setModel(oJson);
//
//							},
//							Error : function(oError) {
//								alert("Error")
//							}
//						})
						this.onTableBinding();
					},
					// create operation
					// we hv to get enterd value into the simple form we hv to create
					// on object
					onSubmit : function(oEve) {
						// Create One Object to store values what values we
						// entered
						var oBj = {
							// Using this.getView().byId("id").getValue() method
							// we will get the entered values
							TESTID : this.getView().byId("productId")
									.getValue(),
							TESTNAME : this.getView().byId("pnmId").getValue(),
							TESTDESCRIPTION : this.getView().byId("pcstId")
									.getValue()
						};
						var that = this;
						// do create operation using create method() in create
						// method we hv to pass three parameters
						this.oModel.create("/TestService1", oBj, {
							success : function(req, res) {
								alert("success");
								that.onTableBinding();
								that.getView().byId("productId").setValue("");
								 that.getView().byId("pnmId").setValue("");
								 that.getView().byId("pcstId").setValue("");

							},
							error : function(oError) {
								alert("Error");
							}
						})

					},

					// create on globel function to do create and read method

					onTableBinding : function() {
						var that=this;

						this.oModel.read("/TestService1", {
							success : function(req, res) {
								var oJson = new sap.ui.model.json.JSONModel();
								oJson.setData(req);
								oJson.setSizeLimit(req.results.length);
								that.getView().byId("tableId").setModel(oJson);
							},
							Error : function(oError) {
								alert("Error")
							}
						})

					},
					//Update method()
					onUpdatePress:function(oEve){
						var oSltcntx=oEve.oSource.oParent.getBindingContext().getObject();
						var oBj={
								TESTID:oSltcntx.TESTID,
								TESTNAME:oSltcntx.TESTNAME,
								TESTDESCRIPTION:oSltcntx.TESTDESCRIPTION
						};
						var that = this;
						this.oModel.update("/TestService1("
								+ oSltcntx.TESTID + ")", oBj, {
							success : function(req, res) {
								alert("success");
								that.onTableBinding();

							},
							error : function(oError) {
								alert("Error");

							}
						})
					},
					
//					
//					onDeletePress:function(oEve){
//						var that = this;
//						var oKey = oEve.oSource.oParent.getBindingContext()
//								.getObject().TESTID;
//						this.oData.remove("/TestService1(" + oKey + ")", {
//							success : function(req, res) {
//								alert("success");
//								that.onTablebinding();
//
//							},
//							error : function(oError) {
//								alert("Error");
//
//							}
//						})
//					}.
					
					
					
					onDeletePress:function(oEve){
						var that= this;
						var oKey = oEve.oSource.oParent.getBindingContext().getObject().TESTID;
						this.oModel.remove("/TestService1("+oKey+")",{success:function(req,res){
						that.onTableBinding();
							
						},error:function(){
							alert("Error");
							
							
						}
						})
						
					},
				/**
				 * Similar to onAfterRendering, but this hook is invoked before
				 * the controller's View is re-rendered (NOT before the first
				 * rendering! onInit() is used for that one!).
				 * 
				 * @memberOf zpcurd.curd
				 */
				// onBeforeRendering: function() {
				//
				// },
				/**
				 * Called when the View has been rendered (so its HTML is part
				 * of the document). Post-rendering manipulations of the HTML
				 * could be done here. This hook is the same one that SAPUI5
				 * controls get after being rendered.
				 * 
				 * @memberOf zpcurd.curd
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf zpcurd.curd
				 */
				// onExit: function() {
				//
				// }
				});