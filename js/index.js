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
    this.goal = false;
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

    this.ball = this.add.circle(400, 300, 5, 0xffffff);
    this.physics.add.existing(this.ball);
    this.ball.body.setCircle(5);
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1);
    this.ballSpeed = 250;
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.randomDirection = Math.random() < 0.5 ? 0 : this.ballSpeed;
    this.ball.body.setVelocity(
      -this.ballSpeed,
      this.randomDirection * this.plusOrMinus
    );
    this.MAX_ANGLE = 45;

    this.physics.add.collider(
      this.playerOnePaddle,
      this.ball,
      this.calcBallBounce
    );

    this.physics.add.collider(
      this.playerTwoPaddle,
      this.ball,
      this.calcBallBounce
    );
  }
  update() {
    // this.playerOnePaddle.body.y = this.ball.body.y - 20;
    this.calcPlayerTwoPosition(this.playerTwoPaddle.body, this.ball.body);
    this.checkForGoal(this.ball.body);
  }
  calcBallBounce(paddle, ball) {
    if (paddle.y + 5 < ball.y) {
      ball.body.velocity.y = 250;
    } else if (paddle.y + 5 >= ball.y && paddle.y - 5 <= ball.y) {
      ball.body.velocity.y = 0;
    } else if (paddle.y - 5 > ball.y) {
      ball.body.velocity.y = -250;
    }
  }
  calcPlayerTwoPosition(player2Paddle, ball) {
    // player2Paddle.y = ball.y - 20;
    if (ball?.y > player2Paddle.y + 20) {
      player2Paddle.y += 3.9;
    }
    if (ball?.y < player2Paddle.y + 20) {
      player2Paddle.y -= 3.9;
    }
  }
  checkForGoal(ball) {
    if (ball?.x + 5 < 0 && this.goal === false) {
      this.goal = true;
      console.log("Player 2 scored");
      this.ball.destroy();
      this.playerTwoScore += 1;
      this.playerTwoScoreText.text = this.playerTwoScore;
      this.spawnNewBall();
    }
    if (ball?.x - 5 > 800 && this.goal === false) {
      console.log("Player 1 scored");
      this.goal = true;
      this.ball.destroy();
      this.playerOneScore += 1;
      this.playerOneScoreText.text = this.playerOneScore;
      this.spawnNewBall();
    }
  }
  spawnNewBall() {
    setTimeout(() => {
      this.ball = this.add.circle(400, 300, 5, 0xffffff);
      this.physics.add.existing(this.ball);
      this.ball.body.setCircle(5);
      this.ball.body.setCollideWorldBounds(true);
      this.ball.body.setBounce(1);
      this.ballSpeed = 250;
      this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      this.randomDirection = Math.random() < 0.5 ? 0 : this.ballSpeed;
      this.ball.body.setVelocity(
        -this.ballSpeed,
        this.randomDirection * this.plusOrMinus
      );
      this.physics.add.collider(
        this.playerOnePaddle,
        this.ball,
        this.calcBallBounce
      );

      this.physics.add.collider(this.playerTwoPaddle, this.ball);
      this.goal = false;
    }, 1000);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: {
        y: 0,
      },
    },
  },
  scene: Pong,
};

const game = new Phaser.Game(config);
