class Pong extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {}
  create() {
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.background = this.add.rectangle(400, 300, 800, 600, 0x000000);
    this.centerDotPositionY = 25;
    for (let i = 0; i < 23; i++) {
      this.add.rectangle(400, this.centerDotPositionY, 5, 10, 0xffffff);
      this.centerDotPositionY += 25;
    }

    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.playerOneScoreText = this.add.text(200, 75, this.playerOneScore, {
      fontFamily: "'Lato', sans-serif",
      fontSize: "75px",
    });
    this.playerOneScoreText.setOrigin(
      this.playerOneScoreText.halfWidth,
      this.playerOneScoreText.halfHeight
    );
    this.playerTwoScoreText = this.add.text(600, 75, this.playerTwoScore, {
      fontFamily: "'Lato', sans-serif",
      fontSize: "75px",
    });
    this.playerTwoScoreText.setOrigin(
      this.playerTwoScoreText.halfWidth,
      this.playerTwoScoreText.halfHeight
    );

    this.playerOnePaddle = this.add.rectangle(25, 300, 10, 50, 0xffffff);
    this.physics.add.existing(this.playerOnePaddle);
    this.playerOnePaddle.body.immovable = true;
    this.playerOnePaddle.body.setCollideWorldBounds(true);

    this.input.on(
      "pointermove",
      function (pointer) {
        //  Keep the paddle within the game
        this.playerOnePaddle.y = Phaser.Math.Clamp(pointer.y, 0, 600);
      },
      this
    );

    this.playerTwoPaddle = this.add.rectangle(775, 300, 10, 50, 0xffffff);
    this.physics.add.existing(this.playerTwoPaddle);
    this.playerTwoPaddle.body.immovable = true;
    this.playerTwoPaddle.body.setCollideWorldBounds(true);
  }
  update() {}
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
        debug: true,
      },
    },
  },
  scene: Pong,
};

const game = new Phaser.Game(config);
