import * as p5Global from 'p5/global' 
import module = require('p5');

export = module;
export as namespace p5;
// QR code generator
import qrcode = require('qrcode-generator');

// a very fast face tracking
import clmtrackr from 'clmtrackr';
// a great hack, see https://github.com/Gaweph/p5-typescript-starter/issues/29
declare global {
    namespace clm { class tracker extends clmtrackr.tracker {} }
    type Capture = p5.Element & { width?: number, height?: number, pixels?: number[], loadPixels?: Function };
}



