"use strict";
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 ~ 884 bytes minified
class AudioMaker {
    //code base on https://github.com/magnitudoOrg/js13kGames/blob/main/2021/preview-merged-min.html
    constructor() {
        this.volume = 0.3;
        // @ts-ignore
        this.zzfxX = new(window.AudioContext || webkitAudioContext)(); // audio context
        this.zzfx = (
            p = 1,
            k = 0.05,
            b = 220,
            e = 0,
            r = 0,
            t = 0.1,
            q = 0,
            D = 1,
            u = 0,
            y = 0,
            v = 0,
            z = 0,
            l = 0,
            E = 0,
            A = 0,
            F = 0,
            c = 0,
            w = 1,
            m = 0,
            B = 0
        ) => {
            let M = Math,
                R = 44100,
                d = 2 * M.PI,
                G = (u *= (500 * d) / R / R),
                // @ts-ignore
                C = (b *= ((1 - k + 2 * k * M.random((k = []))) * d) / R),
                g = 0,
                H = 0,
                a = 0,
                n = 1,
                I = 0,
                J = 0,
                f = 0,
                x,
                h;
            e = R * e + 9;
            m *= R;
            r *= R;
            t *= R;
            c *= R;
            y *= (500 * d) / R ** 3;
            A *= d / R;
            v *= d / R;
            z *= R;
            l = (R * l) | 0;
            // @ts-ignore
            for (h = (e + m + r + t + c) | 0; a < h; k[a++] = f)
                ++J % ((100 * F) | 0) ||
                ((f = q ?
                        1 < q ?
                        2 < q ?
                        3 < q ?
                        M.sin((g % d) ** 3) :
                        M.max(M.min(M.tan(g), 1), -1) :
                        1 - (((((2 * g) / d) % 2) + 2) % 2) :
                        1 - 4 * M.abs(M.round(g / d) - g / d) :
                        M.sin(g)),
                    (f =
                        (l ? 1 - B + B * M.sin((d * a) / l) : 1) *
                        (0 < f ? 1 : -1) *
                        M.abs(f) ** D *
                        p *
                        this.volume *
                        (a < e ?
                            a / e :
                            a < e + m ?
                            1 - ((a - e) / m) * (1 - w) :
                            a < e + m + r ?
                            w :
                            a < h - c ?
                            ((h - a - c) / t) * w :
                            0)),
                    (f = c ?
                        f / 2 +
                        (c > a ?
                            0 :
                            // @ts-ignore
                            ((a < h - c ? 1 : (h - a) / c) * k[(a - c) | 0]) / 2) :
                        f)),
                (x = (b += u += y) * M.cos(A * H++)),
                (g += x - x * E * (1 - ((1e9 * (M.sin(a) + 1)) % 2))),
                n && ++n > z && ((b += v), (C += v), (n = 0)), !l || ++I % l || ((b = C), (u = G), (n = n || 1));
            p = this.zzfxX.createBuffer(1, h, R);
            // @ts-ignore
            p.getChannelData(0).set(k);
            b = this.zzfxX.createBufferSource();
            // @ts-ignore
            b.buffer = p;
            // @ts-ignore
            b.connect(this.zzfxX.destination);
            // @ts-ignore
            b.start();
            return b;
        };
    }
    // @ts-ignore
    play(arr, volume) {
        if (volume) {
            this.volume = volume;
        }

        this.zzfx(...arr);
    }
}
const audioMaker = new AudioMaker();

const audioKind = {
    Shoot218: [, ,
        382,
        0.04,
        0.08,
        0.07, ,
        1.38, -4.9, , , , , , , , ,
        0.98,
        0.02,
        0.05,
    ],
    Shoot549: [
        2.02, ,
        391,
        0.03,
        0.01,
        0,
        1,
        0.4, -2.4, , , , , ,
        2.3, ,
        0.14,
        0.8,
        0.04,
    ],
    Explosion119: [
        1.04, ,
        919, ,
        0.23,
        0.88,
        1,
        2.73,
        0.5, , , , ,
        0.4,
        20,
        0.5, ,
        0.95,
        0.01,
        0.01,
    ],
    Explosion138: [
        1.37, ,
        965, ,
        0.35,
        0.67,
        4,
        1.2,
        1,
        0.8, , ,
        0.14,
        0.2, ,
        0.5, ,
        0.51,
        0.01,
    ],
    Explosion361: [
        2.07, ,
        39,
        0.02,
        0.26,
        0.38,
        2,
        2.83, , , , ,
        0.12,
        0.7, ,
        0.2,
        0.01,
        0.74,
        0.08,
        0.27,
    ],
    Powerup612: [
        1.24, ,
        72,
        0.04,
        0.4,
        0.28,
        1,
        1.08, , -0.1,
        155,
        0.06,
        0.03, , , ,
        0.16,
        0.95,
        0.08,
    ],
    Powerup363: [
        2.1, ,
        46,
        0.04,
        0.16,
        0.66,
        1,
        0.37, -3.6,
        1.5,
        96,
        0.07,
        0.02, ,
        25,
        0.1,
        0.19,
        0.67,
        0.03,
        0.17,
    ],
    Pickup158: [, ,
        1387, , ,
        0.24,
        1,
        1.72, , ,
        768,
        0.02, , , , , ,
        0.76,
        0.08,
        0.04,
    ],
    Hit349: [
        1.01, ,
        461, , ,
        0.39,
        4,
        2.66, ,
        8.2, , , ,
        0.9, ,
        0.3, ,
        0.65,
        0.08,
    ],
};