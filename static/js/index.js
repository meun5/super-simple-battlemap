(function () {
    var AREA_HEIGHT = 640
    var AREA_WIDTH = 1280
    var SQUARE_DIM = 64
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

    var s = new Array(AREA_HEIGHT/SQUARE_DIM);
    var t = new Array(AREA_HEIGHT/SQUARE_DIM);

    new Phaser.Game(config);

    function create ()
    {
        var graphics = this.add.graphics({ lineStyle: { width: BORDER_WIDTH, color: 0x000000 }, fillStyle: { color: INACTIVE_COLOUR } });

        var yOffset = 1;
        for (var y = 0; y < AREA_HEIGHT/SQUARE_DIM; y++) {
            var xOffset = 1;

            s[y] = new Array(AREA_WIDTH/SQUARE_DIM);
            t[y] = new Array(AREA_WIDTH/SQUARE_DIM);

            for (var x = 0; x < AREA_WIDTH/SQUARE_DIM; x++) {
                console.log(x, y, xOffset, yOffset, xOffset + SQUARE_DIM, yOffset + SQUARE_DIM);

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
            for (var y = 0; y < AREA_HEIGHT/SQUARE_DIM; y++) {
                for (var x = 0; x < AREA_WIDTH/SQUARE_DIM; x++) {
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