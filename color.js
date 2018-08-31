/*
Thie rgb2hsl function transforms rgb colors to hsl
Take as arguments an array of values: [red, green, blue] or 3 separate values: red, green, blue
The function returns an array with the hsl values: [hue, saturation, lightness]
*/

function rgb2hsl(rgb){
  // arguments: [r,g,b] or r,g,b
  // return [H, S, L];
  if (rgb instanceof Array) {
    r = rgb[0] / 255;
    g = rgb[1] / 255;
    b = rgb[2] / 255;
  } else {
    r = arguments[0] / 255;
    g = arguments[1] / 255;
    b = arguments[2] / 255;
  }
    //r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    var H = h*360;
    var S = s*100;
    var L = l*100;
    return [H, S, L];
} // arguments: [r,g,b] or r,g,b

/*
The hsl2rgb function transforms hsl colors to rgb
Take as arguments an array of values: [hue, saturation, lightness] or 3 separate values: hue, saturation, lightness
The function returns an array with the rgb values: [red, green, blue]
*/

function hsl2rgb(HSL){
  // arguments: [H,S,L] or H,S,L
  //return [r, g, b];
  if (HSL instanceof Array) {
    h = Number(HSL[0]) / 360;
    s = Number(HSL[1]) / 100;
    l = Number(HSL[2]) / 100;
  } else {
    h = Number(arguments[0]) / 360;
    s = Number(arguments[1]) / 100;
    l = Number(arguments[2]) / 100;
  }
   // var h = H/360;
   //var s = S/100;
   //var l = L/100;
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
} // arguments: [H,S,L] or H,S,L

/*
The function rgb2hex transforms rgb colors to hex
Take as arguments an array of values: [rgb_Red, rgb_Green, rgb_Blue] or 3 separate values: rgb_Red, rgb_Green, rgb_Blue
The function returns an array with the hex values (i.e hexadecimal numbers): [hex_Red, hex_Green, hex_Blue]
*/

function rgb2hex(rgb) {
  if (rgb instanceof Array) {
    r = Number(rgb[0]);
    g = Number(rgb[1]);
    b = Number(rgb[2]);
  } else {
    r = Number(arguments[0]);
    g = Number(arguments[1]);
    b = Number(arguments[2]);
  }
  var hexR = r.toString(16);
  if (hexR.length == 1) {
    hexR = "0" + hexR;
  };
  var hexG = g.toString(16);
  if (hexG.length == 1) {
    hexG = "0" + hexG;
  };
  var hexB = b.toString(16);
  if (hexB.length == 1) {
    hexB = "0" + hexB;
  };
  return [hexR, hexG, hexB];
} // arguments: array [r,g,b] or 3 values: r,g,b

/*
The function hex2rgb transforms hex colors to rgb
Take as arguments an array of values: [hex_Red, hex_Green, hex_Blue] or 3 separate values: hex_Red, hex_Green, hex_Blue
The function returns an array with the rgb values (i.e decimal numbers): [rgb_Red, rgb_Green, rgb_Blue]
*/

function hex2rgb(hex) {
  // arguments: array [r,g,b] or 3 values: r,g,b
  var rgbRy = [];
  if (hex instanceof Array) {
    for (var i = 0; i < hex.length; i++) {
      rgbRy[i] = parseInt(hex[i], 16);
    }

  } else {
    for (var i = 0; i < arguments.length; i++) {
      rgbRy[i] = parseInt(arguments[i], 16);
    }
  }

  return rgbRy;

} // arguments: array [r,g,b] or 3 values: r,g,b

/*
The function hsl2hex transforms hsl colors to hex
Take as arguments an array of values: [hue, saturation, lightness]
The function returns an array with the hex values (i.e hexadecimal numbers): [hex_Red, hex_Green, hex_Blue]
Example of use: hsl2hex([0,100,50])
*/

function hsl2hex(HSL){// arguments: [H,S,L]
  var rgb = hsl2rgb(HSL); 
  return rgb2hex(rgb);
}// arguments: [H,S,L]


/*
The function hex2hsl transforms hex colors to hsl
Take as arguments an array with the hex values (i.e hexadecimal numbers): [hex_Red, hex_Green, hex_Blue]
The function returns an array with the hsl values: [hue, saturation, lightness]
Example of use: hex2hsl(["ff", "00", "00"])
*/

function hex2hsl(HEX){// arguments: [R,G,B]
  var rgb = hex2rgb(HEX);
  return rgb2hsl(rgb);
}// arguments: [R,G,B]

/*
The function hex2ry takes as argument a string representing a hex color: "#123456" || "#123" || "123456" || "123"
The function returns an array with the hex values (i.e hexadecimal numbers): [hex_Red, hex_Green, hex_Blue]
*/

function hex2ry(hex) {

  if (hex.charAt(0) == "#") {
    hex = hex.substr(1);
  }

  var hexRy = ["ff", "ff", "ff"];

    if (hex.length == 6) {
      hexRy[0] = hex.slice(0, 2);
      hexRy[1] = hex.slice(2, 4);
      hexRy[2] = hex.slice(4, 6);
    } else if (hex.length == 3) {
      var r = hex.slice(0, 1);
      var g = hex.slice(1, 2);
      var b = hex.slice(2, 3);
      hexRy[0] = r + r;
      hexRy[1] = g + g;
      hexRy[2] = b + b;
    }
  return hexRy;
} // argument: "#123456" || "#123" || "123456" || "123"

/*
The function rgb2ry takes as argument a string representing a rgb color: rgb(255,100,178)
The function returns an array with the rgb values (i.e decimal numbers): [rgb_Red, rgb_Green, rgb_Blue]
*/

function rgb2ry(rgb) {
  // argument: "rgb(255,100,178)"
  // return: ["255", "100", "178"]
  var ry = rgb.split(/(\(|\))/)[2].split(",");
  for(var i = 0; i < ry.length;i++){
    if(ry[i] < 0 || ry[i] > 255) return [255,255,255];
  }
  return ry;
} // argument: "rgb(255,100,178)"

/*
The function hsl2ry takes as argument a string representing a hsl color: hsl(255,100%,50%)
The function returns an array with the hsl values: [hue, saturation, lightness]
*/
function hsl2ry(hsl) {
  // argument: "hsl(255,100%,50%)"
  // return: ["255", "100", "178"]
  var hslry = [0, 0, 100];
 
  var ry = hsl.split(/(\(|\))/)[2].split(",");
  for (var i = 0; i < ry.length; i++) {
    hslry[i] = Number(ry[i].replace("%", ""))//.trim();
    if(i > 0 && hslry[i] > 100) return [0, 0, 100];
  }
  return hslry;
} // argument: "hsl(255,100%,50%)"


/*
This function takes as argument a string representing a hex color: "#123456" || "#123" || "123456" || "123"
returns true or false
*/
function validateHex(hex) {
  return /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(hex);
}

/*
This function takes as argument a string representing a rgb color: rgb(255,100,178)
returns true or false
*/

function validateRgb(rgb) {
  return /^rgb\((\s*\d{1,3}\s*),(\s*\d{1,3}\s*),(\s*\d{1,3}\s*)\)$/.test(rgb);
}

/*
This function takes as argument a string representing a hsl color: hsl(255,100%,50%)
returns true or false
*/

function validateHsl(HSL) {
  return /^hsl\((\s*\d{1,3}\s*),(\s*\d{1,3}%\s*),(\s*\d{1,3}%\s*)\)$/.test(HSL);
}

/*
The function display_hex takes as argument an array with the hex values (i.e hexadecimal numbers): [hex_Red, hex_Green, hex_Blue]
The function returns a string representing a hex color or false.
*/

function display_hex(ry){
  var hex = "#" + ry[0] + ry[1] + ry[2];
  if(validateHex(hex)){return hex;}else{return false;}
}

/*
The function display_rgb takes as argument an array with the rgb values (i.e decimal numbers): [rgb_Red, rgb_Green, rgb_Blue]
The function returns a string representing a rgb color or false.
*/

function display_rgb(ry){
  var rgb = "rgb(" + Math.round(ry[0]) +","+  Math.round(ry[1]) +","+  Math.round(ry[2]) + ")";
  if(validateRgb(rgb)){return rgb;}else{return false;}
}


/*
The function display_hsl takes as argument an array with the hsl values (i.e decimal numbers): [hue, saturation, lightness]
The function returns a string representing a hsl color or false.
*/
function display_hsl(ry){
  var hsl = "hsl(" +  Math.round(ry[0]) +","+  Math.round(ry[1]) +"%,"+  Math.round(ry[2]) + "%)";
  if(validateHsl(hsl)){return hsl;}else{return false;}
}
