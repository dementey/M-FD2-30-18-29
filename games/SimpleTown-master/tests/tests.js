module("test");

test( "When user clicks, a new item is added to the items collection", function() {
  var originalNumberOfItems = rootVm.items().length;
  UIChannel.publish("user.clicked", {x:1,y:2});
  var finalNumberOfItems = rootVm.items().length;
  equal(finalNumberOfItems, originalNumberOfItems+1);
});


test( "When user clicks, a new item is added to the model's items collection", function() {

  var world = new model.World();
  var originalNumberOfItems = world.getItemsLength();
  UIChannel.publish("user.clicked", {x:1,y:2});
  var finalNumberOfItems = world.getItemsLength();
  equal(finalNumberOfItems, originalNumberOfItems+1);
});


// test( "When a new item is added to the model's items collection, it emits model.item.added message", function() {
  
// });
