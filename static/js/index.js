(function () {
    var AREA_HEIGHT = 640
    var AREA_WIDTH = 1280
    var SQUARE_DIM = 64
    var BORDER_WIDTH = 1
    var CANVAS_HEIGHT = BORDER_WIDTH * 2 + AREA_HEIGHT
    var CANVAS_WIDTH = BORDER_WIDTH * 2 + AREA_WIDTH

    var config = {
        type: Phaser.AUTO,
        parent: "map",
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        scene: {
            create: create
        },
        backgroundColor: "#FFFFFF",
    };

    var s = new Array(AREA_HEIGHT/SQUARE_DIM);

    new Phaser.Game(config);

    function create ()
    {
        var graphics = this.add.graphics({ lineStyle: { width: BORDER_WIDTH, color: 0x000000 }, fillStyle: { color: 0xEEEEEE } });

        var yOffset = 1;
        for (var y = 0; y < AREA_HEIGHT/SQUARE_DIM; y++) {
            var xOffset = 1;

            s[y] = new Array(AREA_WIDTH/SQUARE_DIM);

            for (var x = 0; x < AREA_WIDTH/SQUARE_DIM; x++) {
                console.log(x, y, xOffset, yOffset, xOffset + SQUARE_DIM, yOffset + SQUARE_DIM);

                s[y][x] = new Phaser.Geom.Rectangle(xOffset, yOffset, SQUARE_DIM, SQUARE_DIM);
                this.add.text(xOffset + 4, yOffset + 4, x + "/" + y, { color: 0xAAAAAA });
        
                graphics.fillRectShape(s[y][x]);
                graphics.strokeRectShape(s[y][x]);

                xOffset += SQUARE_DIM;
            }

            yOffset += SQUARE_DIM;
        }
    }
})()