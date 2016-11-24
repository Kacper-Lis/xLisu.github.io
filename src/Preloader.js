nazwa.Preloader = function(game) {
    var preloadBar;
    this.ready = false;
};

nazwa.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
        this.game.load.image('ledge', 'assets/img/ledge.png');
        this.game.load.image('player', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('back', 'assets/img/back.png');
        this.game.load.image('ledge2', 'assets/img/ledge2.png');
        this.game.load.image('titlescreen', 'assets/Start.png');
        this.game.load.image('ledgeLong', 'assets/img/ledgeLong.png');
        this.game.load.image('ledge3', 'assets/img/ledge3.png');
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
            this.ready = true;
            this.state.start('StartMenu');
        
	}
};