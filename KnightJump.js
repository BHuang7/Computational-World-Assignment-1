function KnightJump(game, knightSprite, jumpSprite, attackSprite) {
	this.animation = new arrAnimation(knightSprite, .08, true, .25);
	this.jumpAnimation = new arrAnimation(jumpSprite, .08, true, .25);
	this.attackAnimation = new arrAnimation(attackSprite, .08, true, .25);
    this.jumping = false;
    this.radius = 100;
    this.ground = 600;
	this.speed = 125;
	this.attacking = false;
    Entity.call(this, game, 0, 600);
}

KnightJump.prototype = new Entity();
KnightJump.prototype.constructor = KnightJump;

KnightJump.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.game.space) {
        if (this.jumpAnimation.elapsedTime + .02 >= this.jumpAnimation.totalTime) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
			this.game.space = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
	if (this.game.attacking) { this.attacking = true;
		if (this.attacking) {
			if (this.attackAnimation.elapsedTime + .02 >= this.attackAnimation.totalTime) {
				this.attackAnimation.elapsedTime = 0;
				this.attacking = false;
				this.game.attacking = false;
			}
		}
	} else {
		this.x += this.game.clockTick * this.speed;
		if (this.x > 800) this.x = -230;
		Entity.prototype.update.call(this);
	}
    Entity.prototype.update.call(this);
}

KnightJump.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
    } else if (this.attacking) {
		this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}