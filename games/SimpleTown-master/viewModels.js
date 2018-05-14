var HouseVM = function(position){
	this.top = position.y;
	this.left = position.x;
	this.imageUrl = "house.svg";
}

var rootVm = {
	items: ko.observableArray(),
	
	clicked: function(target, event){
		var position = {x:event.clientX, y:event.clientY};
		UIChannel.publish("user.clicked", position);
	}
};

UIChannel.subscribe("user.clicked", function(msg){	
	rootVm.items.push(new HouseVM(msg));
});
