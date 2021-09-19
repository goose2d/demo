"use strict";
class GameObject {
    /**
     * @param {any} name
     * @param {any} x
     * @param {any} y
     * @param {any} vx
     * @param {any} vy
     * @param {any} w
     * @param {any} h
     */
    constructor(name, x, y, vx, vy, w, h) {
        this.name = name
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = w;
        this.height = h;
        this.isColliding = false;
        this.isStayInScreen = false;
        this.isDie = false;
        this.isEnableCollision = false;
    }

    /**
     * @param {boolean} flag
     */
    enableCollision(flag) {
        this.isEnableCollision = flag;
    }

    /**
     * @param {any} name
     */
    onCollidingWith(name) {
        console.log(this.name, 'Colliding', name);
    }

    /**
     * @param {any} context
     */
    // @ts-ignore
    draw(context) {

    }

    /**
     * @param {{ beginPath: () => void; strokeStyle: string; lineWidth: number; rect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; stroke: () => void; }} context
     */
    debug(context) {
        context.beginPath();
        context.strokeStyle = this.isColliding ? '#ff0000' : '#0099b0';
        context.lineWidth = 4;
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }

    stayInScreen() {
        this.isStayInScreen = true;
    }

    /**
     * @param {number} secondsPassed
     */
    move(secondsPassed) {

        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        if (this.isStayInScreen) {
            if (this.x <= 0) {
                this.x = 0;
            }
            if (this.y <= 0) {
                this.y = 0;
            }
            // @ts-ignore
            if (this.x >= window.innerWidth - this.width) {
                // @ts-ignore
                this.x = window.innerWidth - this.width;
            }
            // @ts-ignore
            if (this.y >= window.innerHeight - this.height) {
                // @ts-ignore
                this.y = window.innerHeight - this.height;
                this.vy = 0;
            }
        }
    }

    /**
     * @param {any} secondsPassed
     */
    // @ts-ignore
    update(secondsPassed) {

    }
}