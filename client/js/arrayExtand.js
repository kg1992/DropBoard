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
	
	Array.prototype.any = () => this.length != 0;
})();