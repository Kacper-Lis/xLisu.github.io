nazwa.Game = function (game) {
        var player;
        var jumpTimer = 0;
        var cursors;
        var back;
        var ledges;
        var ledges2;
        var player;
        var upkey;
        var platforms;
        var score;
        var scoreText;
        var floor;
        var ledge;
        var compa;
        var bool2;
};
nazwa.Game.prototype = {
      create: function() {
        ///camera & score
        bool2 = false;
        compa = this.game.camera.y;
        back = this.game.add.tileSprite(0,0,364,768,'back');
        scoreText = this.game.add.text(25, 25, "" , { font: '30px Courrier New', fill: '#000' });
        score = this.game.camera.y;
        this.game.camera.bounds = null;
        ///ledges
        ledges = this.game.add.group();
		ledges.enableBody = true;
		ledges.physicsBodyTypes = Phaser.Physics.ARCADE;
        this.loadLedge();
        ledges2 = this.game.add.group();
		ledges2.enableBody = true;
		ledges2.physicsBodyTypes = Phaser.Physics.ARCADE;
        
       
        upkey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
       
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.stage.backgroundColor = '#87CEFA';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
        this.game.time.desiredFps = 60;
 
        cursors = this.game.input.keyboard.createCursorKeys();
 
        this.createPlayer();
         //floor
        floor = this.game.add.group();
		floor.enableBody = true;
		for (var i = 0; i < 8; i++) {
			floor.create(i*50,600,"pipe");
		}
		floor.children.forEach(
			i => {
				i.body.immovable = true;
                i.body.collideWorldBounds = true;
                i.body.moves = false;
			}
		)
 
    
 
    },
 
    update: function() {
        this.game.physics.arcade.collide(player, ledges2, this.killLedge2, null , this);
        if(this.game.camera.y < compa) {
			if(bool2) {
				this.spawnLedge(this.game.camera.y);
				bool2 = false;
			}
			else {
				var rnd = this.game.rnd.integerInRange(0, 10);
				if(rnd<4){
					this.spawnLedge(this.game.camera.y);
				}
				bool2 = true;
			}
			compa = this.game.camera.y -50;
		}
        back.tilePosition.y = -this.game.camera.y/2;
        if(player.y -350 < this.game.camera.y) {
			this.game.camera.y = player.y-350;
			back.y = player.y-350;
			scoreText.y = player.y-325;
		}
        score = - this.game.camera.y;
        scoreText.setText("score : " + score);
        
        this.playerUpdate();
        this.game.world.wrap(player, 0, true, true, false);
        
        if (-800 > this.game.world.y) {
            floor.destroy();
        }
        if(this.game.physics.arcade.distanceBetween(ledges.getAt(0),player) > 500) {
			ledges.getAt(0).destroy(); }
        		if(this.game.physics.arcade.distanceBetween(ledges2.getAt(0),player) > 500) {
			ledges2.getAt(0).destroy(); }
    },
    createPlayer: function(){
        player = this.game.add.sprite(200, 500, 'player');
        this.game.physics.arcade.enable(player);
        this.game.physics.arcade.gravity.y = 400;
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.set(0.5);
 
    },
   
    playerUpdate: function(){
        this.game.physics.arcade.collide(player, ledges);
        this.game.physics.arcade.collide(player, floor);
        if(cursors.left.isDown){
        player.body.velocity.x = -300;
    }else if(cursors.right.isDown){
      player.body.velocity.x = 300;
    }else{
        player.body.velocity.x = 0;
    };
        upkey.onDown.add(function(jump){
            if(player.body.touching.down)
            player.body.velocity.y = -600;
        }, this)
        if(this.game.physics.arcade.distanceBetween(this.game.camera,player) > 800) {
			this.killPlayer();
        }
       
 
    },
    	killLedge2 : function(n,ledge) {
		player.body.velocity.y = -375;
		ledge.kill();
        },
    loadLedge: function() {
		for(var i = 0; i < 20; i++) {
			var x = this.game.rnd.integerInRange(10, 318);
			ledge = ledges.create(x,i*50, "ledge");

            ledge.exists = true;
			ledge.body.checkCollision.down = false;
			ledge.body.immovable = true;
            ledge.body.moves = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
		}

	},
    
    spawnLedge : function(y) {
		var x = this.game.rnd.integerInRange(10, 318);
		var rnd = this.game.rnd.integerInRange(0, 9);
        if(rnd > 3){
            var ledge = ledges.create(x,y, "ledge");
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
            var rnd = this.game.rnd.integerInRange(0, 100);
    }else{
        var x = this.game.rnd.integerInRange(10, 318);
        var ledge = ledges2.create(x,y, "ledge2");
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
                
        
    }
			
		
	},
    jump: function(){
        player.body.velocity.y = -600;
    },
  
    killPlayer: function() {
    this.game.state.start('StartMenu');
    },





};