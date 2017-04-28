(function() {
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

	window.buildTreeView = function(model, settings) {
		var getDisplay = function(model) {
			if( !settings || !settings.displayed )
			{
				return JSON.stringify(model);
			}
			var displayed = settings.displayed;
			
			if (typeof displayed == "string") {
				return model[displayed];
			}
			else if (typeof displayed == "function") {
				return displayed(model);
			}
		};

		if (typeof model != "object") throw "model type must be an object";

		var getChildren = function(o) {
			if ( settings
			  && settings.childrenGetter
			  && typeof settings.childrenGetter == "function") {
				return settings.childrenGetter(o);
			}
			
			if( Array.isArray(o) || typeof o == "object" )
				return Object.keys(o).map(key => o[key]);
			else 
				return [];
		};

		var buildRecursive = function(o, $p) {
			// get children
			var children = getChildren(o);
			if( children.length != 0 ){
				// build self
				$div = $('<div></div>');
				children.forEach(x => {
					buildRecursive(x, $div);
				});
				$p.append($div);
			} else {
				var $span = $('<span></span>');
				$span.text(getDisplay(o));
				$p.append($span);
			}
		};

		// returns jquery extended dom object
		var $div = $('<div></div>');
		buildRecursive(model, $div);
		return $div;
	};

	window.test0 = function($out) {
		var i = window.buildTreeView([{
			color: "red",
			value: "#f00"
		}, {
			color: "green",
			value: "#0f0"
		}, {
			color: "blue",
			value: "#00f"
		}, {
			color: "cyan",
			value: "#0ff"
		}, {
			color: "magenta",
			value: "#f0f"
		}, {
			color: "yellow",
			value: "#ff0"
		}, {
			color: "black",
			value: "#000"
		}]);
		console.log(i);
		$('body').append(i);
	};

	window.treeview = function(model) {

	};
})(window);