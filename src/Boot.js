var nazwa = {};

nazwa.Boot = function(game) {};

nazwa.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'assets/loader_bar.png');
    },
    
    create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 270;
		this.scale.minHeight = 480;
        this.scale.maxWidth = 400;
		this.scale.maxHeight = 800;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;

		this.input.addPointer();
		this.stage.backgroundColor = '#171642';
        
        this.state.start('Preloader');
    }
}