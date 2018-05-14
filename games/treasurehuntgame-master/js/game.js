
 	var wheight =  $(window).height();   // returns height of browser viewport
  	var dheight =	$(document).height(); // returns height of HTML document
	var wwidth = $(window).width();   // returns width of browser viewport
	var dwidth = $(document).width(); // returns width of HTML document
  	var sheight = screen.height;
	var swidth = screen.width;
	//http://stackoverflow.com/questions/3437786/how-to-get-web-page-size-browser-window-size-screen-size-in-a-cross-browser-wa/11744120#11744120
   	var correctItemList = '';//this will be the HTML that contains the names of all items or pictures of items that need to be found   
	var correctItems= [];
	var findableItemsArray=new Array();
	var findableItemsObject=new Object();
	$.each(itemList, function( key, value ){
    	if(itemList[key].type == 'findable') {
			 findableItemsObject[key] = itemList[key]
			 findableItemsArray.push(itemList[key]);//add it to the findable items array
		}
	});
	chooseCorrectItems();

  //  Kinetic.pixelRatio = 1; 
    Kinetic.Image.prototype.type = "";
    var stage = new Kinetic.Stage({
        	container: 'container',
          	//width: 1200,
          //	width:1023,
          width:980,
          	height: 644
          //	height: 630
        });	
        
	$('#msg').html('stage width = '+ stage.attrs.width+', stage height = '+ stage.attrs.height+'<br/>window height ='+ wheight+', window width'+wwidth+'<br/>doc width='+dwidth+', doc height ='+dheight+ '<br/>sheight= '+sheight+ ', swidth='+swidth);

    var score=0; 
    var round;
    var foundItems = 0;
    	document.getElementById('stimulus').innerHTML=correctItemList; 
    	document.getElementById('status').innerHTML=('Your score: '+score);
    var backgroundLayer    = new Kinetic.Layer();
    var drawerHandlesLayer = new Kinetic.Layer();
    var tooltipLayer = new Kinetic.Layer();
    stage.add(tooltipLayer);
    tooltipLayer.draw();
	var targetLayer = new Kinetic.Layer();
	var mygroup = new Kinetic.Group();
		backgroundLayer.add(mygroup);
    var images = {};
    var layers ={};
    var items=[];
    var assetDir = 'images/'; 
    var drawers={}  
    var zheader = new Kinetic.Rect({
    	x:0,
    	y:0,
    	width:980,
    	height:123,
    	fill:'black'
    });  
  //  targetLayer.add(zheader);
   // zheader.draw(); 

 /*create tooltips*/  
     // label with left pointer
      var labelLeft = new Kinetic.Label({
        x: 195,
        y: 130,
        opacity: 0.75
      });
      
      labelLeft.add(new Kinetic.Tag({
        fill: 'green',
        pointerDirection: 'left',
        pointerWidth: 20,
        pointerHeight: 28,
        lineJoin: 'round'
      }));
      
      labelLeft.add(new Kinetic.Text({
        text: 'Label pointing left',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
      }));
        
	var zcircle = new Kinetic.Circle({
       // x:900,
       x:565,
        //y: 550,
        y:50,
        radius: 55,
        fill: 'blue',
        stroke: 'white',
        opacity:.2,
        strokeWidth: 4
      });
		zcircle.on('mouseover', function() {	
		});
	
    targetLayer.add(zcircle);
	zcircle.draw();
		
	 
    function drawBackground(backgroundLayer, bgImg, text) {
        var canvas = backgroundLayer.getCanvas();
        var context = backgroundLayer.getContext();
        context.drawImage(bgImg, 0, 0);
        context.font = '20pt Calibri';
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillText(text, backgroundLayer.getStage().getWidth() / 2, 40);      		
    }         
    //this is the big setup function 
    function loadImages(sources, callback) {          
        var loadedImages = 0;
        var numImages = 0;        
        stage.add(backgroundLayer);
        stage.add(drawerHandlesLayer);
		       
        for (var layr in layerList){              		
        	(function() {
        		var thislayer = layerList[layr];
        		var klayer  = new Kinetic.Layer ({
					name:layr+'_kLayer',
					x:thislayer.x,
					y:thislayer.y
				});
				stage.add(klayer);
				layers[layr]=klayer;
				if (thislayer.type=='drawer'){
					drawers[layr]=klayer;
				}//end if		
			})();//end function
		}//end for
				 
        for(var src in sources) { numImages++; }
        
        for(var src in sources) {
          	images[src] = new Image();
          	images[src].onload = function() {
            	if(++loadedImages >= numImages) {
              		callback(images);
            	}//end if
          	};
          	images[src].src = assetDir + sources[src];
        }//end for
    		
     	for(var key in itemList) {
     	 	var thisitemsLayer;     	
           	(function() { 
           		var privKey = key;         	
            	var itm = itemList[key];
            	var layerkey = itemList[key].container;
				thisitemsLayer = layers[layerkey];
				var itemtype = itm.type;				 					            	
            	var item = new Kinetic.Image({
            		name:key+'_kImage',
              		image: images[privKey],
              		type:itemtype,
					draggable:itm.draggable==false?false:true,
              		x: itm.x,
             	 	y: itm.y
            	});		
			if(itm.drawHitRegion){
				item.createImageHitRegion();
				}
	 
/*findable items have different behaviors on mouseover, drag, etc.*/			
			if(itm.type=='findable'){				
				item.on('mouseover', function(){
					this.setImage(images[privKey + '_highlight']);		
					this.parent.draw();
					document.body.style.cursor = 'pointer'; 
				});
				
				item.on("mouseover touchstart", function(){
					var mousePos = stage.getMousePosition();
              		labelLeft.setPosition(mousePos.x + 5, mousePos.y + 5);
              		//console.log('mousePos'+mousePos.x);
              		labelLeft.children[1].setText("node: " + privKey  );
              		labelLeft.show();
              		tooltipLayer.add(labelLeft);
              	 	setTimeout("tooltipLayer.draw()",1000);
              	 	tooltipLayer.moveToTop();
              		 
				});
				item.on('mousedown', function(){
				
				});
				item.on('mouseout touchend', function(){
					this.setImage(images[privKey]);
					this.parent.draw();
					document.body.style.cursor = 'default';
					labelLeft.hide();
					//add a slow fade out animation instead of just "hide"
					tooltipLayer.draw();
				});
            	item.on('dragstart', function() {
             		this.moveToTop();
             		labelLeft.hide();
             		tooltipLayer.draw();
            	});	
            			
				item.on('dragend', function() {	 
    //item was on the correct items list   
          		
                	if(correctItems[privKey] && inIntersection()){
                		var thelayer = item.parent;	
                		
                		switch(gametype){
                			case 1:
								foundItems = foundItems+1;
								//score=score+1;//save for another type of game	
								flush(item,thelayer);
								item.inRightPlace = true;
								saveStage();
								$("#correctItm_"+privKey).css("text-decoration","line-through").css("color","#CCCCCC");
								 //item was on the correct items list AND we now have found ALL of them.           		
                				if(foundItems >= numCorrectItms) {                		
                  		 	 		document.getElementById('status').innerHTML=('Your score: 100%<br/><span class="success">You Win!</span>');
                  		 	 	
                	 			}
                	 			else { 
                					//document.getElementById('status').innerHTML=('Your score: '+score);
                					var remainder = parseInt((numCorrectItms - foundItems),10) 
                					document.getElementById('status').innerHTML=('You have <span id="remainder">'+remainder+'</span> items left to find!');
                					
                				}
                			break;
                			default:
                				alert('no gametype specified');
                		}//end switch
      
                	} //if(correctItems[
                	
    //item was NOT correct: put it back           	
                	else if(inIntersection()){ 
                		document.getElementById('status').innerHTML=('Your score: '+score+'<br/><span class="fail">Sorry, try again!</span>');
                		this.moveToTop();
                		item.setImage(images[privKey]);					
                		zcircle.setFill('red');
                		zcircle.setScale(1.5);
                		zcircle.setFill('blue');
                		zcircle.parent.draw();
                		zcircle.setFill('red');                		 
                		zcircle.parent.draw();
                		var resetX = parseFloat(item.getX())-parseFloat(itm.x);
                		var resetY = parseFloat(item.getY())-parseFloat(itm.y);
                		var putItBack = new Kinetic.Tween({		 
    						node:item,
    						x: itm.x,
        					y: itm.y,
  							easing: Kinetic.Easings.EaseIn,
							duration: .5,      				
						});
                		putItBack.play();              		
                		this.moveToTop();
                		this.parent.draw();
                		setTimeout(function(){zcircle.setFill('blue');zcircle.parent.draw();zcircle.setScale(1);zcircle.parent.draw();},750);                		
                		document.body.style.cursor = 'default';
                	}//else if(inIntersection
            	});//end item on dragend
			}
			
			if(itm.type=='trigger'){	
					var drawerhandlenumber=privKey.substring(13,12);
					var drawerkey = "drawer"+drawerhandlenumber;		   				
    				
					item.on('mouseover', function() {						
						item.setImage(images[privKey + '_highlight']);
						item.draw();
						document.body.style.cursor = 'pointer';
					});
					
					item.on('mousedown touchstart',function(){ 
						closealldrawers(); 						     		
						drawerOpen(drawerkey);						 						
					});	            	
				 
					 item.on('mouseout touchend', function() {
						item.setImage(images[privKey]);
						item.draw();
						document.body.style.cursor = 'default';
					});	 												
			}
		
			items.push(item); 
 			thisitemsLayer.add(item);
			thisitemsLayer.draw();
			 
		})();
		
      } //end for(var key
      
  	}  //end loadImages	  	
  	function inIntersection() {  		
  		var uPos =	stage.getPointerPosition();  		
  		if( zcircle.intersects(uPos)){  		 	
			return true;
  		}
  		 else {
          return false;
        }  	
  	}
  	function isNearOutline(item, target) {
        var a = item;
        var o = target;
		var oPos = o.getAbsolutePosition();
		var aPos = a.getAbsolutePosition();
		var ox = oPos.x;
		var oy = oPos.y;	
        var ax = aPos.x;
		var ay = aPos.y;
       
        if(ax > ox - 20 && ax < ox + 60 && ay > oy-20 && ay< oy+60) {
          return true;
        }
        else {
          return false;
        }
      }
  	function drawerOpen(drawerkey){ 
		layers[drawerkey].moveToTop();
  		layers[drawerkey].draweropen = new Kinetic.Tween({ 
			node:layers[drawerkey],
			x:350,
			y: 100,
			easing: Kinetic.Easings.EaseOut,
			duration: 2 
		});
		layers[drawerkey].draweropen.play(); 
  	}			  
    function initStage() {                   
        var score = 0;  
      	drawBackground(backgroundLayer, images.cart, ' ');
      	layers.drawerHandlesLayer.draw();
		stage.add(targetLayer);
		targetLayer.draw(); 		
    }
	function closealldrawers() { //add something that mops up any items that were dragged out of place?
		 for (var x in drawers){					
				var drawerclose = new Kinetic.Tween({
    				node:drawers[x],
        			y: -450,
  					easing: Kinetic.Easings.EaseIn,
					duration: 1,
					onFinish: function() {
					}       				
				});
				if(drawers[x].attrs.y!=-450){  
					drawerclose.play();
				}   						  						 
			} 
	}
	function flush(item,thisitemsLayer){ //animation that sort of flushes item away in a swirl
		var vanishItem= new Kinetic.Tween({
		node:item,
		rotationDeg:1080,
		scaleX:0,
		scaleY:0,
		duration:.5
	})
	 vanishItem.play();
	
	setTimeout(function(){
		item.remove();
		thisitemsLayer.draw();
		},1000);	
	}
	function randomize(from, to) {
    	return Math.floor(Math.random()*(to-from+1)+from);
	}
	function chooseCorrectItems(){		
  		switch(gametype){
    		case 1: //sort findable items randomly, then pull the desired number from the list	
 	 			var templist = selectRandomItems(findableItemsArray);
 	 			$.each(templist,  function(key, value){
     				correctItems[value.shortname]=value; 	 
				});
				
				for (var key in correctItems){
     				correctItemList += '<span class="correctItem" id="correctItm_'+key+'">'+ correctItems[key].title +'</span>';     
     			} 
     			
 	 		break;
 	 		default:
 	 		alert('no game type specified');
 	 	return correctItemList, correctItems;
				 
 	 	}  //end if(gametype==1) 
 	 
 }//end chooseCorrectItems		
 
     	
	
	function selectRandomItems(){
	 	//$(findableItemsArray).get().sort(function(){ 
	 	var p = $(findableItemsArray).sort(function(){ 
  	 		return 0.5 - Math.random()
	 	}).slice(0,numCorrectItms);
	 	 return p;	 		 	 
	}
	
	function nextRound(){
		closealldrawers();
		
	}
	function saveStage(){
		var json = stage.toJSON();
		console.log(json);
	}			    
    loadImages(sources, initStage);
     
  
