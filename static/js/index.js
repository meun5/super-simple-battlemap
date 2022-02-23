(function () {
    var SQUARE_DIM = 64
    var NUM_OF_SQUARES_TALL = 10
    var NUM_OF_SQUARES_WIDE = 20
    var AREA_HEIGHT = NUM_OF_SQUARES_TALL * SQUARE_DIM
    var AREA_WIDTH = NUM_OF_SQUARES_WIDE * SQUARE_DIM
    var BORDER_WIDTH = 1
    var CANVAS_HEIGHT = BORDER_WIDTH * 2 + AREA_HEIGHT
    var CANVAS_WIDTH = BORDER_WIDTH * 2 + AREA_WIDTH

    var ACTIVE_COLOUR = 0xAAAAAA
    var INACTIVE_COLOUR = 0xEEEEEE

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

    var s = new Array(NUM_OF_SQUARES_TALL);
    var t = new Array(NUM_OF_SQUARES_TALL);

    new Phaser.Game(config);

    function create ()
    {
        var graphics = this.add.graphics({ lineStyle: { width: BORDER_WIDTH, color: 0x000000 }, fillStyle: { color: INACTIVE_COLOUR } });

        var yOffset = 1;
        for (var y = 0; y < NUM_OF_SQUARES_TALL; y++) {
            var xOffset = 1;

            s[y] = new Array(NUM_OF_SQUARES_WIDE);
            t[y] = new Array(NUM_OF_SQUARES_WIDE);

            for (var x = 0; x < NUM_OF_SQUARES_WIDE; x++) {
                s[y][x] = {
                    active: false,
                    obj: new Phaser.Geom.Rectangle(xOffset, yOffset, SQUARE_DIM, SQUARE_DIM),
                }

                t[y][x] = this.add.text(xOffset + 4, yOffset + 4, x + "/" + y, { color: '#000' });
        
                graphics.fillRectShape(s[y][x].obj);
                graphics.strokeRectShape(s[y][x].obj);

                xOffset += SQUARE_DIM;
            }

            yOffset += SQUARE_DIM;
        }

        this.input.on('pointerup', function (p) {
            for (var y = 0; y < NUM_OF_SQUARES_TALL; y++) {
                for (var x = 0; x < NUM_OF_SQUARES_WIDE; x++) {
                    if (Phaser.Geom.Rectangle.ContainsPoint(s[y][x].obj, p)) {
                        s[y][x].active = !s[y][x].active;

                        if (s[y][x].active) {
                            graphics.fillStyle(ACTIVE_COLOUR)
                            graphics.fillRectShape(s[y][x].obj)
                            graphics.strokeRectShape(s[y][x].obj)
                            t[y][x].setColor('#FFF')

                            break;
                        }

                        graphics.fillStyle(INACTIVE_COLOUR)
                        graphics.fillRectShape(s[y][x].obj)
                        graphics.strokeRectShape(s[y][x].obj)
                        t[y][x].setColor('#000')

                        break;
                    }
                }
            }
        })
    }
})()