/**
 * @param {any} id
 * @param {(arg0: string) => void} cb
 */
function swipedetect(id, cb) {
    // @ts-ignore
    const el = document.getElementById(id);
    /**
     * @type {number}
     */
    /**
     * @type {number}
     */
    /**
     * @type {number}
     */
    let touchsurface = el,
        // @ts-ignore
        startX,
        // @ts-ignore
        startY,
        distX,
        distY,
        allowedTime = 0.01, // maximum time allowed to travel that distance
        thisTime,
        // @ts-ignore
        startTime,
        x = 0,
        y = 0,
        sub = 20

    // @ts-ignore
    touchsurface.addEventListener(
        "touchstart",
        function(/** @type {{ changedTouches: any[]; preventDefault: () => void; }} */ e) {
            var touchobj = e.changedTouches[0];
            // @ts-ignore
            swipedir = "none";
            // @ts-ignore
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
            e.preventDefault();
        },
        false
    );

    // @ts-ignore
    touchsurface.addEventListener(
        "touchmove",
        function(/** @type {{ changedTouches: any[]; }} */ e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX; // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY; // get vertical dist traveled by finger while in contact with surface
            thisTime = new Date().getTime();
            // @ts-ignore
            if (thisTime - startTime > allowedTime) {
                // @ts-ignore
                if (distX > startX) {
                    x += 1;
                }
                // @ts-ignore
                if (distX < startX) {
                    x -= 1;
                }
                // @ts-ignore
                if (distY > startY) {
                    y += 1;
                }
                // @ts-ignore
                if (distY < startY) {
                    y -= 1;
                }
            }

            if (x > sub) {
                x = 0;
                cb("right");
            }
            if (x < sub * -1) {
                x = 0;
                cb("left");
            }
            if (y > sub) {
                y = 0;
                cb("down");
            }
            if (y < sub * -1) {
                y = 0;
                cb("up");
            }

            startX = distX;
            startY = distY;
            startTime = thisTime;

        },
        false
    );

    // @ts-ignore
    touchsurface.addEventListener(
        "touchend",
        function(/** @type {{ preventDefault: () => void; }} */ e) {
            cb("none");
            e.preventDefault();
        },
        false
    );
}

/*
                //   touch(
                //     document.getElementsByTagName("canvas")[0],
                //     function (swipedir) {
                //       _self.key = swipedir;
                //     }
                //   );
*/