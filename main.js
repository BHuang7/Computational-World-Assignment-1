downloadImage("./img/png/Run", 10);
downloadImage("./img/png/Jump", 10);
downloadImage("./img/png/Attack", 10);
AM.queueDownload("./bg/background0.png");

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 800, 800);
};

Background.prototype.update = function () {
};

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	
	
	var knightRun = [];
	assetToArray("./img/png/Run", 10, knightRun);	
	
	
	var knightJump = [];
	assetToArray("./img/png/Jump", 10, knightJump);
	
	var attack = [];
	assetToArray("./img/png/Attack", 10, attack);
	
	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./bg/background0.png")));
	var kj = new KnightJump(gameEngine, knightRun, knightJump, attack);
	gameEngine.addEntity(kj);
    console.log("All Done!");
});