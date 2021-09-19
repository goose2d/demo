"use strict";
class Game {
    /**
     * @param {{ canvasId: any; width: any; height: any; enableSwipedetect: any; enableDebugMode: any; }} gameConfig
     */
    constructor(gameConfig) {
        const { canvasId, width, height, enableSwipedetect, enableDebugMode } = gameConfig;
        // @ts-ignore
        const canvas = document.getElementById(canvasId);
        // @ts-ignore
        canvas.width = width || window.innerWidth;
        // @ts-ignore
        canvas.height = height || window.innerHeight;
        canvas.setAttribute("width", canvas.width);
        canvas.setAttribute("height", canvas.height);
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.enaDebugMode = enableDebugMode || false

        this.oldTimeStamp = Date.now();
        if (enableSwipedetect) {
            swipedetect("canvas", (swipedir) => {
                // @ts-ignore
                window.key = swipedir;
            });
        }
    }
    clearCanvas() {
        const { width, height } = this.canvas;
        this.context.clearRect(0, 0, width, height);
    }
    loop() {
        const t = Date.now();
        this.secondsPassed = (t - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = t;
        this.fps = Math.round(1 / this.secondsPassed);

        // @ts-ignore
        for (let i = 0; i < gameObjects.length; i++) {
            // @ts-ignore
            if (gameObjects[i].isDie) {
                // @ts-ignore
                gameObjects.splice(i, 1);
            }
        }

        // Loop over all game objects
        // @ts-ignore
        for (let i = 0; i < gameObjects.length; i++) {
            // @ts-ignore
            gameObjects[i].update(this.secondsPassed);
        }

        this.detectCollisions();

        this.clearCanvas();

        // Draw number to the screen
        if (this.enaDebugMode) {
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, 200, 100);
            this.context.font = "25px Arial";
            this.context.fillStyle = "black";
            this.context.fillText("FPS: " + this.fps, 10, 70);
            // @ts-ignore
            this.context.fillText("OBJ: " + gameObjects.length, 10, 90);
        }


        // @ts-ignore
        const CollidingObjs = gameObjects.filter((/** @type {{ isColliding: boolean; }} */ obj) => {
            return obj.isColliding == true;
        });
        this.context.fillText("DET: " + CollidingObjs.length, 10, 110);

        // Do the same to draw
        // @ts-ignore
        for (let i = 0; i < gameObjects.length; i++) {
            if (this.enaDebugMode) {
                // @ts-ignore
                gameObjects[i].debug(this.context);
            }
            // @ts-ignore
            gameObjects[i].draw(this.context);
        }

        // @ts-ignore
        window.requestAnimationFrame(() => {
            this.loop();
        });
    }
    detectCollisions() {

        // @ts-ignore
        const objs = gameObjects.filter((/** @type {{ isEnableCollision: boolean; }} */ obj) => {
            return obj.isEnableCollision == true;
        });

        let obj1;
        let obj2;

        // Reset collision state of all objects
        for (let i = 0; i < objs.length; i++) {
            objs[i].isColliding = false;
        }

        // Start checking for collisions

        for (let i = 0; i < objs.length; i++) {
            obj1 = objs[i];
            for (let j = i + 1; j < objs.length; j++) {
                obj2 = objs[j];

                // Compare object1 with object2
                if (
                    this.rectIntersect(
                        obj1.x,
                        obj1.y,
                        obj1.width,
                        obj1.height,
                        obj2.x,
                        obj2.y,
                        obj2.width,
                        obj2.height
                    )
                ) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    obj1.onCollidingWith(obj2.name);
                    obj2.onCollidingWith(obj1.name);

                }
            }
        }
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {any} w1
     * @param {any} h1
     * @param {number} x2
     * @param {number} y2
     * @param {any} w2
     * @param {any} h2
     */
    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {any} r1
     * @param {number} x2
     * @param {number} y2
     * @param {any} r2
     */
    circleIntersect(x1, y1, r1, x2, y2, r2) {
        // Calculate the distance between the two circles
        let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

        // When the distance is smaller or equal to the sum
        // of the two radius, the circles touch or overlap
        return squareDistance <= (r1 + r2) * (r1 + r2);
    }
}