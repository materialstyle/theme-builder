const luminanceList = [.0008, .001, .0011, .0013, .0015, .0017, .002, .0022, .0025, .0027, .003, .0033, .0037, .004, .0044, .0048, .0052, .0056, .006, .0065, .007, .0075, .008, .0086, .0091, .0097, .0103, .011, .0116, .0123, .013, .0137, .0144, .0152, .016, .0168, .0176, .0185, .0194, .0203, .0212, .0222, .0232, .0242, .0252, .0262, .0273, .0284, .0296, .0307, .0319, .0331, .0343, .0356, .0369, .0382, .0395, .0409, .0423, .0437, .0452, .0467, .0482, .0497, .0513, .0529, .0545, .0561, .0578, .0595, .0612, .063, .0648, .0666, .0685, .0704, .0723, .0742, .0762, .0782, .0802, .0823, .0844, .0865, .0887, .0908, .0931, .0953, .0976, .0999, .1022, .1046, .107, .1095, .1119, .1144, .117, .1195, .1221, .1248, .1274, .1301, .1329, .1356, .1384, .1413, .1441, .147, .15, .1529, .1559, .159, .162, .1651, .1683, .1714, .1746, .1779, .1812, .1845, .1878, .1912, .1946, .1981, .2016, .2051, .2086, .2122, .2159, .2195, .2232, .227, .2307, .2346, .2384, .2423, .2462, .2502, .2542, .2582, .2623, .2664, .2705, .2747, .2789, .2831, .2874, .2918, .2961, .3005, .305, .3095, .314, .3185, .3231, .3278, .3325, .3372, .3419, .3467, .3515, .3564, .3613, .3663, .3712, .3763, .3813, .3864, .3916, .3968, .402, .4072, .4125, .4179, .4233, .4287, .4342, .4397, .4452, .4508, .4564, .4621, .4678, .4735, .4793, .4851, .491, .4969, .5029, .5089, .5149, .521, .5271, .5333, .5395, .5457, .552, .5583, .5647, .5711, .5776, .5841, .5906, .5972, .6038, .6105, .6172, .624, .6308, .6376, .6445, .6514, .6584, .6654, .6724, .6795, .6867, .6939, .7011, .7084, .7157, .7231, .7305, .7379, .7454, .7529, .7605, .7682, .7758, .7835, .7913, .7991, .807, .8148, .8228, .8308, .8388, .8469, .855, .8632, .8714, .8796, .8879, .8963, .9047, .9131, .9216, .9301, .9387, .9473, .956, .9647, .9734, .9823, .9911, 1];
const white = '#ffffff', black = '#000000';
const colorContrastLight = white;
const colorContrastDark = black;
const minContrastRatio = 4.5;

const themeHoverShadeAmount = '15';
const themeHoverTintAmount = '15';
const themeActiveShadeAmount = '20';
const themeActiveTintAmount = '20';
const themeSubtleTintAmount = '80';
const themeSubtleHoverTintAmount = '65';
const themeSubtleActiveTintAmount = '60';
const themeEmphasisShadeAmount = '40';
const themeEmphasisHoverShadeAmount = '55';
const themeBorderSubtleTintAmount = '60';

const themeDarkTintAmount = '35';
const themeDarkHoverShadeAmount = '20';
const themeDarkHoverTintAmount = '20';
const themeDarkActiveShadeAmount = '30';
const themeDarkActiveTintAmount = '30';
const themeDarkSubtleShadeAmount = '60';
const themeDarkSubtleHoverShadeAmount = '55';
const themeDarkSubtleActiveShadeAmount = '40';
const themeDarkEmphasisTintAmount = '55';
const themeDarkEmphasisHoverTintAmount = '50';
const themeDarkBorderSubtleShadeAmount = '40';

function hexToRGB(h) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return {
        "r": +r,
        "g": +g,
        "b": +b
    };
}

function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function mix(color1, color2, weight) {
    let rgb1 = hexToRGB(color1);
    let rgb2 = hexToRGB(color2);
    let color = {};

    for (let name in rgb1) {
        color[name] = Math.round(rgb2[name] + (rgb1[name] - rgb2[name]) * (weight / 100));
    }

    return RGBToHex(color['r'], color['g'], color['b']);
};

function luminance(color) {
    let rgb = hexToRGB(color);

    for (let name in rgb) {
        let value = ((rgb[name] / 255) < .04045 ? ((rgb[name] / 255) / 12.92) : luminanceList[rgb[name]]);
        rgb[name] = value;
    }

    return (rgb['r'] * .2126) + (rgb['g'] * .7152) + (rgb['b'] * .0722);
}

function opaque(background, foreground) {
    return mix(foreground, background, 100);
}

function tintColor(color, weight) {
    return mix('#ffffff', color, weight);
}

function shadeColor(color, weight) {
    return mix('#000000', color, weight);
}

function shiftColor(color, weight) {
    return (weight > 0 ? shadeColor(color, weight) : tintColor(color, -weight));
}

function contrastRatio(background, foreground = colorContrastLight) {
    const l1 = luminance(background);
    const l2 = luminance(opaque(background, foreground));

    return (l1 > l2 ? ((l1 + .05) / (l2 + .05)) : ((l2 + .05) / (l1 + .05)));
}

function colorContrast(background) {
    const foregrounds = [colorContrastLight, colorContrastDark, white, black];
    let maxRatio = 0;
    let maxRatioColor = null;

    for (const color of foregrounds) {
        let cr = contrastRatio(background, color);
        if (cr > minContrastRatio) {
            return color;
        } else if (cr > maxRatio) {
            maxRatio = cr;
            maxRatioColor = color;
        }
    }

    return maxRatioColor;
}

function generateCss() {
    let color = document.querySelector('#color-picker').value;
    let borderRadius = document.querySelector('#border-radius').value;
    let borderWidth = document.querySelector('#border-width').value;

    let contrastingColor = colorContrast(color);
    let rgb = hexToRGB(color);

    let darkColor = tintColor(color, themeDarkTintAmount);
    let contrastingDarkColor = colorContrast(darkColor);
    let darkRgb = hexToRGB(darkColor);

    let lightCss = [];
    let darkCss = [];

    lightCss['--bs-primary'] = color;
    lightCss['--bs-primary-hover'] = (contrastingColor == colorContrastLight ? shadeColor(color, themeHoverShadeAmount) : tintColor(color, themeHoverTintAmount));
    lightCss['--bs-primary-active'] = (contrastingColor == colorContrastLight ? shadeColor(color, themeActiveShadeAmount) : tintColor(color, themeActiveTintAmount));
    lightCss['--bs-primary-subtle'] = tintColor(color, themeSubtleTintAmount);
    lightCss['--bs-primary-subtle-hover'] = tintColor(color, themeSubtleHoverTintAmount);
    lightCss['--bs-primary-subtle-active'] = tintColor(color, themeSubtleActiveTintAmount);
    lightCss['--bs-primary-emphasis'] = shadeColor(color, themeEmphasisShadeAmount);
    lightCss['--bs-primary-emphasis-hover'] = shadeColor(color, themeEmphasisHoverShadeAmount);
    lightCss['--bs-primary-border-subtle'] = tintColor(color, themeBorderSubtleTintAmount);
    lightCss['--bs-primary-rgb'] = rgb['r'] + ', ' + rgb['g'] + ', ' + rgb['b'];
    lightCss['--bs-text-on-primary'] = contrastingColor;
    lightCss['--bs-border-radius'] = borderRadius + 'rem';
    lightCss['--bs-border-width'] = borderWidth + 'px';

    darkCss['--bs-primary'] = darkColor;
    darkCss['--bs-primary-hover'] = (contrastingDarkColor == colorContrastLight ? shadeColor(darkColor, themeDarkHoverShadeAmount) : tintColor(darkColor, themeDarkHoverTintAmount));
    darkCss['--bs-primary-active'] = (contrastingDarkColor == colorContrastLight ? shadeColor(darkColor, themeDarkActiveShadeAmount) : tintColor(darkColor, themeDarkActiveTintAmount));
    darkCss['--bs-primary-subtle'] = shadeColor(color, themeDarkSubtleShadeAmount);
    darkCss['--bs-primary-subtle-hover'] = shadeColor(color, themeDarkSubtleHoverShadeAmount);
    darkCss['--bs-primary-subtle-active'] = shadeColor(color, themeDarkSubtleActiveShadeAmount);
    darkCss['--bs-primary-emphasis'] = tintColor(color, themeDarkEmphasisTintAmount);
    darkCss['--bs-primary-emphasis-hover'] = tintColor(color, themeDarkEmphasisHoverTintAmount);
    darkCss['--bs-primary-border-subtle'] = shadeColor(color, themeDarkBorderSubtleShadeAmount);
    darkCss['--bs-primary-rgb'] = darkRgb['r'] + ', ' + darkRgb['g'] + ', ' + darkRgb['b'];
    darkCss['--bs-text-on-primary'] = contrastingDarkColor;

    document.querySelector('#light').innerHTML = '';
    document.querySelector('#dark').innerHTML = '';
    document.body.style.backgroundColor = lightCss['--bs-primary'];
    document.body.style.color = lightCss['--bs-text-on-primary'];

    let c = ':root, [data-bs-theme="light"] {';
    for (let cssKey in lightCss) {
        let lightCssContainer = document.createElement('div');
        lightCssContainer.className = 'd-flex align-items-stretch gap-2';

        let colorBox = document.createElement('div');
        colorBox.className = 'flex-shrink-0';
        colorBox.style.width = '30px';
        colorBox.style.backgroundColor = cssKey.includes('rgb') ? `rgb(${lightCss[cssKey]})` : lightCss[cssKey];

        c += cssKey + ': ' + lightCss[cssKey] + ';';

        let cssLine = document.createElement('span');
        cssLine.innerHTML = cssKey + ': ' + lightCss[cssKey] + ';';

        lightCssContainer.append(colorBox);
        lightCssContainer.append(cssLine);

        document.querySelector('#light').append(lightCssContainer);
    }

    document.styleSheets[3].deleteRule(0);
    document.styleSheets[3].insertRule(c + '}', 0);

    c = '[data-bs-theme="dark"] {';
    for (let cssKey in darkCss) {
        let darkCssContainer = document.createElement('div');
        darkCssContainer.className = 'd-flex align-items-stretch gap-2';

        let colorBox = document.createElement('div');
        colorBox.className = 'flex-shrink-0';
        colorBox.style.width = '30px';
        colorBox.style.backgroundColor = cssKey.includes('rgb') ? `rgb(${darkCss[cssKey]})` : darkCss[cssKey];

        c += cssKey + ': ' + darkCss[cssKey] + ';';

        let cssLine = document.createElement('span');
        cssLine.innerHTML = cssKey + ': ' + darkCss[cssKey] + ';';

        darkCssContainer.append(colorBox);
        darkCssContainer.append(cssLine);

        document.querySelector('#dark').append(darkCssContainer);
    }

    document.styleSheets[3].deleteRule(1);
    document.styleSheets[3].insertRule(c + '}', 1);

    document.querySelector('#sass').innerHTML =
        '$primary: ' + color + ';<br>$border-radius: ' + borderRadius + 'rem;<br>$border-width: ' + borderWidth + 'px;';
}

document.addEventListener("DOMContentLoaded", () => {
    generateCss();

    document.querySelector('#color-picker').addEventListener("input", function () {
        generateCss();
    }, false);

    document.querySelector('#border-radius').addEventListener("input", function () {
        generateCss();
    }, false);

    document.querySelector('#border-width').addEventListener("input", function () {
        generateCss();
    }, false);

    document.querySelector('#color-mode-switch').addEventListener("input", function () {
        const components = document.querySelector('#components');
        const colorModeLabel = document.querySelector('#color-mode-switch + label');
        if (event.target.checked) {
            components.setAttribute('data-bs-theme', 'dark');
            colorModeLabel.innerHTML = 'ON';
        } else {
            components.setAttribute('data-bs-theme', 'light');
            colorModeLabel.innerHTML = 'OFF';
        }
    }, false);

    // Initialize Text fields
    var textFieldList = [].slice.call(document.querySelectorAll('.form-control'))
    var textFields = textFieldList.map(function (textField) {
        return new materialstyle.TextField(textField)
    })

    // Initialize Text fields
    var selectFieldList = [].slice.call(document.querySelectorAll('.form-select'))
    var selectFields = selectFieldList.map(function (selectField) {
        return new materialstyle.SelectField(selectField)
    })
});