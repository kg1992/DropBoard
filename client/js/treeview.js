(function()
{
	//
	// v1 commented out.
	//
	// function entry(id, data)
	// {
	// 	this.id = id;
	// 	this.expanded = false;
	// 	this.parent = null;
	// 	this.data = data;
	// }
	
	// function treeViewModel(args)
	// {
	// 	var lastId = 0;
	// 	var entries;
	// 	var getData = entry => entry.data;
	// 	var connections;
		
	// 	// init entries
	// 	if( args.dataArray ){
	// 		if( !Array.isArray(args.dataArray) )
	// 		{
	// 			throw "args.dataArray must be an array";
	// 		}
			
	// 		entries = args.dataArray.map(d=>new entry(++lastId, d));
	// 	}
	// 	else
	// 	{
	// 		entries = new Array();
	// 	}
		
	//   // returns null if not found
	//   this.findEntry = function(data)
	//   {
	//   	var entries = this.entries;
	  	
	//   	return entries.firstOrDefault(e => this.dataGetter(e) == data);
	//   };
	  
	//   // expand entry
	//   this.expand = function(data)
	//   {
	//   	this.findEntriesByData(data).forEach(e=>e.expanded = true);
	//   };
		
	// 	// input is data for the entry
	// 	// return value is array
	// 	this.findEntriesByData = data => entries.filter(e=>getData(e) == data);
		
	// 	// // out [jquery extended bom] : output object ot be bound to
	// 	// var bindTo = function($out)
	// 	// {
			
	// 	// };
	// }
	
	window.buildTreeView = function(model, $target, settings){
		var getDisplay = function(model)
		{
			var displayed = settings.displayed;
			
			if( typeof displayed == "string" )
			{
				return model[displayed];
			} else if (typeof displayed == "function" )
			{
				return displayed(model);
			}
		};
		
		if( typeof model != "object" ) throw "model type must be an object";
		
		var getChildren = function(o)
		{
			var cg = settings.childrenGetter;
			if( cg && typeof cg == "function" )
			{
				return cg(o);
			}
			return o.keys().map(key => o[key]);
		}
		
		// returns jquery extended dom object
		var build = function(o)
		{
			var openList = [o];
			
			while( openList.any() )
			{
				var node = openList.pop();
				var div = $('<div></div>');
				div.innerText = getDisplay(node);
				var children = getChildren(node);
				openList.concat(children);
			}
			getDisplay(o);
		};
	};
	
	window.test0 = function() {
		Object.keys(o).forEach(function(pname, index){
			console.log(pname);
		});
	};
	
	window.treeview = function(model){
		
	};
})(window);