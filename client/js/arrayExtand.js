(function(){
	Array.prototype.clone = function() {
			return this.slice(0);
	};
	
	Array.prototype.firstOrDefault = function(d) {
		if( d == null && this.length != 0 ) 
			return this[0];
			
		for (var i = 0; i < this.length; ++i) {
			if (d(this[i]))
				return this[i];
		}
		return null;
	};
	
	Array.prototype.removeAll = function(item){
		var removeCount = 0;
		for( var i = 0; i < this.length; ++i ){
			if( this[i] == item ){
				this.splice(i,1);
				removeCount++;
			}
		}
		return removeCount;
	};
	
	Array.prototype.last = function() {
		return this[this.length-1];
	};
	
	Array.prototype.any = function(item) {
		if( item !== undefined ){
			for( var i = 0; i < this.length; ++i )
			{
				if( this[i] === item )
					return true;
			}
			return false;
		} else {
			return this.length != 0;
		}	
	}
})();