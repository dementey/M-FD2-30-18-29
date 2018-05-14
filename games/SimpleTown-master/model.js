var model = (function(){
	
	var House = function(){};

	var World = function(){
		
		var items = [];
		
		UIChannel.subscribe("user.clicked", function(msg){
			items.push(new House(msg));
		});

		this.getItemsLength = function(){
			return items.length;
		}
	};



	return {
		World:World
	};
})();

		