nazwa.Game = function (game) {
        var player;
        var jumpTimer = 0;
        var cursors;
        var back;
        var ledges;
        var ledges2;
        var ledges3;
        var player;
        var upkey;
        var platforms;
        var score;
        var scoreText;
        var floor;
        var ledge;
        var camera;
        var bool2;
        var enemys;
        var tween;
        var tween1;
};
nazwa.Game.prototype = {
      create: function() {
        ///camera & score
        bool2 = false;
        camera = this.game.camera.y;
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
        ledges3 = this.game.add.group();
		ledges3.enableBody = true;
		ledges3.physicsBodyTypes = Phaser.Physics.ARCADE;
          ///enemys
        enemys = this.game.add.group();
        enemys.enableBody = true;
		enemys.physicsBodyTypes = Phaser.Physics.ARCADE;
          

        upkey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);  
        
        cursors = this.game.input.keyboard.createCursorKeys();
        this.game.stage.backgroundColor = '#87CEFA';
          
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
          
        this.game.time.desiredFps = 60;
 
        this.createPlayer();
         //floor
        floor = this.game.add.group();
		floor.enableBody = true;
		for (var i = 0; i < 8; i++) {
			floor.create(i*50,600,'pipe');
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
        
        if(this.game.camera.y < camera) {
			if(bool2) {
                this.spawnLedge(this.game.camera.y);
				bool2 = false;
			}
			else {
				var rnd = this.game.rnd.integerInRange(0, 10);
                if(rnd<2){
                    this.spawnEnemy(this.game.camera.y);
                }
				bool2 = true;
			}
			camera = this.game.camera.y -50;
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
        
        if (this.game.physics.arcade.distanceBetween(this.game.camera,floor) > 500){
            floor.destroy(); }
        if(this.game.physics.arcade.distanceBetween(ledges.getAt(0),player) > 500) {
			ledges.getAt(0).destroy(); }
        if(this.game.physics.arcade.distanceBetween(ledges2.getAt(0),player) > 500) {
			ledges2.getAt(0).destroy(); }
        if(this.game.physics.arcade.distanceBetween(enemys.getAt(0),player) > 500) {
			enemys.getAt(0).destroy(); }
        
    },
    
    createPlayer: function(){
        player = this.game.add.sprite(200, 500, 'player');
        this.game.physics.arcade.enable(player);
        this.game.physics.arcade.gravity.y = 400;
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.set(0.5);
 
    },
   
    playerUpdate: function(){
        this.game.physics.arcade.collide(player, enemys, this.killPlayer, null, this);
        this.game.physics.arcade.collide(player, ledges3, this.jump, null , this);
        this.game.physics.arcade.collide(player, ledges2, this.killLedge2, null , this);
        this.game.physics.arcade.collide(player, ledges, this.jump, null, this);
        this.game.physics.arcade.collide(player, floor, this.jump, null, this);
        if(cursors.left.isDown){
        player.body.velocity.x = -250;
    }else if(cursors.right.isDown){
      player.body.velocity.x = 250;
    }else{
        player.body.velocity.x = 0;
    };

        if(this.game.physics.arcade.distanceBetween(this.game.camera,player) > 800) {
			this.killPlayer();
        }
       
 
    },
    
    loadLedge: function() {
		for(var i = 0; i < 20; i++) {
			var x = this.game.rnd.integerInRange(10, 318);
			ledge = ledges.create(x,i*100, "ledge");

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
		var rnd = this.game.rnd.integerInRange(0, 14);
        if(rnd<7){
            var ledge = ledges.create(x,y, "ledge");
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
    }else if(6<rnd && rnd<10){
        var x = this.game.rnd.integerInRange(10, 318);
        var ledge = ledges2.create(x,y, "ledge2");
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
    }else{
        var x = this.game.rnd.integerInRange(10, 318);
        var z = this.game.rnd.integerInRange(60, 150);
        var ledge = ledges3.create(x,y, "ledge3");
        var speed = this.game.rnd.integerInRange(2000, 4000);
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
            if(x<160){
            tween1 = this.game.add.tween(ledge);
            tween1.to({ x:[x, x+z, x]}, speed, "Linear");
            tween1.start();
            tween1.loop(true);
            }else{
            tween1 = this.game.add.tween(ledge);
            tween1.to({ x:[x, x-z, x]}, speed, "Linear");
            tween1.start();
            tween1.loop(true);    
            }
    }
				
	},
    
    spawnEnemy: function(y){
        var rnd = this.game.rnd.integerInRange(0,10);
        if(rnd>4){
            ///przeciwnik
            var x = this.game.rnd.integerInRange(50,300);
            var enemy = enemys.create(x,y, "pipe");
            var speed = this.game.rnd.integerInRange(7,17);
            enemy.scale.set(0.5);
            enemy.body.checkCollision = true;
            enemy.body.velocity = 0
            if(x<175){
            tween = this.game.add.tween(enemy);
            tween.to({ x:[x, x+140, x]}, speed*250, "Linear");
            tween.start();
            tween.loop(true);
            var ledge = ledges.create(x+10, y+25, "ledgeLong");
            }else{
            tween = this.game.add.tween(enemy);
            tween.to({ x:[x, x-140, x]}, speed*250, "Linear");
            tween.start();
            tween.loop(true);
            var ledge = ledges.create(x-130, y+25, "ledgeLong");
            } 
            ledge.body.checkCollision.down = false;
            ledge.body.checkCollision.left = false;
            ledge.body.checkCollision.right = false;
            ledge.body.immovable = true;
            ledge.body.moves = false;
        }
    },
    jump: function(){
        if(player.body.touching.down){
        player.body.velocity.y = -415;
        }
    },
    
    killLedge2 : function(n,ledge) {
        if(player.body.touching.down){
		player.body.velocity.y = -415;
		ledge.kill();
        }
    },
  
    killPlayer: function() {
    this.game.state.start('StartMenu');
    },


};