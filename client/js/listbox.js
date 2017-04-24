/* global $ */

(function(window) {
	// consturctor for 'list_model' object
	function listBoxModel() {
		// entries of 'object_model'
		var entries = new Array();

		// selected items
		var selectedItems = new Array();
		
		// allow multiple chocies
		this.multipleChoice = false;
		
		// array of callback functions that takes 'list_model' object as first argument
		// will be invoked every time selected items changes
		var onSelectionChanged = new Array();
		
		var invokeSelectionChanged = function(model)
		{
			onSelectionChanged.forEach(function(handler)
			{
				handler(model);
			});
		};
		
		this.addSelectionChangedHandler = function(handler)
		{
			onSelectionChanged.push(handler);
		};
		
		this.removeSelectionChangedHandler = function(handler)
		{
			onSelectionChanged.removeAll(handler);
		};

		// getter
		this.getEntries = function(){
			return entries.clone();
		};
		
		// setter
		this.setEntries = function(entries_) {
			entries = entries_.clone();
		};
		
		this.getSelectedItems = function() {
			return selectedItems.clone();
		};

		this.setSelected = function(name, bool) {
			var item = entries.firstOrDefault(x => x.name == name);
			if (!item) return;
			if (bool) {
				if (selectedItems.firstOrDefault(x => x.name == name))
					return;
				else {
					if( !this.multipleChoice )
						selectedItems = [item];
					else
						selectedItems.push(item);
					invokeSelectionChanged(this);
				}
			}
			else {
				var removeCount = selectedItems.removeAll(item);
				if( removeCount != 0 ) 
					invokeSelectionChanged(this);
			}
		};
		
		// returns entry object that is currently selected.
		//				 if the 'name' property is not given, just the first one that is selected will be returend.
		//				 if no selected item is found, result is null.
		this.getSelected = function(name) {
			if( name == null )
				return selectedItems.firstOrDefault();
			return selectedItems.firstOrDefault(x=>x.name == name);
		};
		
		this.toggleSelected = function(name) {
			if( this.getSelected(name) )
				this.setSelected(name, false);
			else
			
				this.setSelected(name, true);
		};
	}

	window.listbox = {
		// data is an array of object where each object contains 'name' 'tag' property
		create_list_box_from_data: function(data, $out) {
			// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
			if (!Array.isArray(data)) throw this.name + ": " + 'data needs to be an array object';

			var lbm = new listBoxModel();
			lbm.setEntries(data);
			var sync = function(model) {
				$out.empty();
				
				var $ol = $('<ol></ol>');
	
				model.getEntries().forEach(function(entry) {
					var $li = $('<li>' + entry.name + '</li>')
						.appendTo($ol);
					if( model.getSelected(entry) ){
						$li.addClass('selected');
					}
					$li.on("click", function() {
						model.toggleSelected(entry.name);
					});
				});
	
				$out.append($ol);
			};
			
			var syncViewModel = function(model) {
				var lis = $out.find('ol li');
				for( var i = 0; i < lis.length; ++i ){
					var $li = lis[i];
					if( model.getSelected($li.innerText) )
						$li.className = 'selected';
					else
						$li.className = '';
				}
			};
			
			lbm.addSelectionChangedHandler(function(model)
			{
				syncViewModel(model);
			});
			
			sync(lbm);
			
			return lbm;
		}
	};

})(window);