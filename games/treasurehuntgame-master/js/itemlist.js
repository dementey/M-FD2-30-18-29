  //form: 
/*
what is the stimulus question?
list every image and give each a name. 
list every container layer (drawer1, drawer2, cabinet1, cabinet2, box1, box2, bottle1, bottle2)
list every item
what are the correct items?
how are they determined? random (3 out of 10), predetermined by author?
is there a time limit?

*/
  
    var sources = {
    	apple:		'apple.png',
		apple_highlight:	'apple_glow.png',
		banana:		'banana.png',
		banana_highlight:		'banana_glow.png',
		button:		'button.png',
		button_highlight:	'button_glow.png',
    	discoball:	'discoball.png',
		discoball_highlight:'discoball_glow.png',
		key:		'key.png',
		key_highlight:		'key_glow.png',
		lightbulb:	'lightbulb.png',
		lightbulb_highlight:	'lightbulb_glow.png',
		pencil:		'pencil.png',
		pencil_highlight:	'pencil_glow.png',
    	pliers:		'pliers.png',
		pliers_highlight:'pliers_glow.png',
    	squirtgun:	'squirtgun.png',
		squirtgun_highlight:'squirtgun_glow.png',
    	thimble:	'thimble.png',
		thimble_highlight:'thimble_glow.png',
     	//groboto: 	'groboto.jpg',
        cart: 		'cart.png',
        drawer1:	'drawerEmpty.png',
        drawer2:	'drawerEmpty.png',
        drawer3:	'drawerEmpty.png',
        drawer4:	'drawerEmpty.png',
        drawer5:	'drawerEmpty.png',
        drawer6:	'drawerEmpty.png',
        drawerhandle1:'drawers/drawerhandle1.png',
        drawerhandle1_highlight:'drawers/drawerhandle1_highlight.png',
        drawerhandle2:'drawers/drawerhandle2.png',
        drawerhandle2_highlight:'drawers/drawerhandle2_highlight.png',
        drawerhandle3:'drawerhandle3.jpg',
        drawerhandle3_highlight:'drawerhandle3_highlight.jpg',
        drawerhandle4:'drawerhandle4.jpg',
        drawerhandle4_highlight:'drawerhandle4_highlight.jpg',
        drawerhandle5:'drawerhandle5.jpg',
        drawerhandle5_highlight:'drawerhandle5_highlight.jpg',
        drawerhandle6:'drawerhandle6.jpg',
        drawerhandle6_highlight:'drawerhandle6_highlight.jpg'     
    };

var layerList = {
	drawer1: {
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer1.png',
		animation_open:'',
		animation_close:''
	},
	drawer2:{
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer2.png',
		animation_open:'',
		animation_close:''	
	},	
	drawer3:{
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer3.png',
		animation_open:'',
		animation_close:''
	},
	drawer4:{
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer4.png',
		animation_open:'',
		animation_close:''
	},
	drawer5:{
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer5.png',
		animation_open:'',
		animation_close:''
	},
	drawer6:{
		x:350,
		y:-450,
		type:'drawer',
		background:'drawer6.png',
		animation_open:'',
		animation_close:''
	},
	drawerHandlesLayer:{
		type:'static',
		x:0,
		y:0
	},
	targetLayer:{
		type:'static',
		x:0,
		y:0
	}
	 		
};


// image positions
var itemList = {
	drawer1: {
	    container:'drawer1',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
		drawer2:{
		container:'drawer2',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
		drawer3: {
		container:'drawer3',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
		drawer4: {
		container:'drawer4',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
		drawer5: {
		container:'drawer5',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
		drawer6:{
		container:'drawer6',
		x:0,
		y:0,
		type:'container',
		drawHitRegion:false,
		draggable:false
	},
	 apple: {
	 	title:'Apple',
	 	shortname:'apple',
        container:'drawer1',
        x: 150,
        y: 90,
		type:'findable',
        defaultImg: {source:'apple.png'},
        highlight: {source:'apple_glow.png'},
        drawHitRegion:true,
        draggable:true  
    }, 
     banana: {
     	title:'Banana',
     	shortname:'banana',
        container:'drawer2',
        x: 290,
        y: 60,
		type:'findable',
        defaultImg: {source:'banana.png'},
        highlight: {source:'banana_glow.png'},
       //active:{source:'discoball_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    },  
	button: {
		title:'Button',
		shortname:'button',
        container:'drawer3',
        x: 190,
        y: 20,
		type:'findable',
        defaultImg: {source:'button.png'},
        highlight: {source:'buttonl_glow.png'},
        //active:{source:'button_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    }, 
   /* corkscrew: { //image is corrupt, needs to be recreated
        container:'drawer6',
        x: 190,
        y: 20,
		type:'findable',
        defaultImg: {source:'corkscrew.png'},
        highlight: {source:'corkscrew_glow.png'},
        //active:{source:'discoball_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    },  */
	discoball: {
		title:'Discoball',
		shortname:'discoball',
        container:'drawer4',
        x: 190,
        y: 20,
		type:'findable',
        defaultImg: {source:'discoball.png'},
        highlight: {source:'discoball_glow.png'},
        //active:{source:'discoball_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    }, 
    lightbulb: {
    	title:'Light Bulb',
    	shortname:'lightbulb',
        container:'drawer5',
        x: 190,
        y: 20,
		type:'findable',
        defaultImg: {source:'lightbulb.png'},
        highlight: {source:'lightbulb_glow.png'},
        //active:{source:'pencil_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    },  
    pencil: {
    	title:'Pencil',
    	shortname:'pencil',
        container:'drawer6',
        x: 290,
        y: 80,
		type:'findable',
        defaultImg: {source:'pencil.png'},
        highlight: {source:'pencil_glow.png'},
        //active:{source:'pencil_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true  
    },  
    pliers: {
    	title:'Pliers',
    	shortname:'pliers',
        container:'drawer1',
        x: 140,
        y: 20,
		type:'findable',
        defaultImg: {source:'pliers.png'},
        highlight: {source:'pliers_glow.png'},
        //active:{source:'pliers_puff.png' },
        //animation:function(){},
        drawHitRegion:true,
        draggable:true     
    },
    squirtgun: {
    	title:'Squirt Gun',
    	shortname:'squirtgun',
        container:'drawer2',
        x: 90,
        y: 20,
		type:'findable',
        defaultImg: {source:'squirtgun.png'},
        highlight: {source:'squirtgun_glow.png'},
        active:{source:'squirtgun_puff.png' },
        //animation: function(){},
        drawHitRegion:true,
        draggable:true    
        },
    thimble: {
    	title:'Thimble',
    	shortname:'thimble',
        container:'drawer3',
        x: 40,
        y: 20,
		type:'findable',
        defaultImg: {source:'thimble.png' },
        highlight: {source:'thimble_glow.png'},
        active:{source:'thimble_puff.png' },
        //animation: function(){}, 
        drawHitRegion:true,
        draggable:true     
    },
    drawerhandle1:{
        container:'drawerHandlesLayer',
        highlight: {source:'drawerhandle1_highlight.jpg'},
        x:64,
        y:178,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 
    },       
    drawerhandle2:{
    	container:'drawerHandlesLayer',
    	highlight: {source:'drawerhandle2_highlight.jpg'},
        x:64,
        y:206,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 

    },        
    drawerhandle3:{
    	container:'drawerHandlesLayer',
    	highlight: {source:'drawerhandle3_highlight.jpg'},
        x:64,
        y:236,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 

    },                
    drawerhandle4:{
    	container:'drawerHandlesLayer',
    	highlight: {source:'drawerhandle4_highlight.jpg'},
        x:64,
        y:268,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 
    },          
    drawerhandle5:{
    	container:'drawerHandlesLayer',
    	highlight: {source:'drawerhandle5_highlight.jpg'},
        x:64,
        y:298,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 
    },          
    drawerhandle6:{
    	container:'drawerHandlesLayer',
    	highlight: {source:'drawerhandle6_highlight.jpg'},
        x:64,
        y:360,
		type:'trigger',
        drawHitRegion:false,
        draggable:false 
    }            
};

/* var correctItems={
	thimble:{},
	discoball:{}
 }*/
 
 

 /*
 Game type 1
 choose a number of items randomly from the list for each round
 --need to know:
 --stimulus question
 --correct item message 
 --incorrect item message 
 -- got them all message
 --want to try again?
 
 
 */
 
var gametype = 1; //select a number of items randomly from the list. When user finds all of them, that is the end of round 1 and they get 1 point.
var numCorrectItms = 6;
var stimulusText = 'Find the items listed and drag them to the blue target!';
var correctMsg="Correct!"
var incorrectMsg="Wrong! Try again!";

