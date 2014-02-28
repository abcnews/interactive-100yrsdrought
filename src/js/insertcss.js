var inserted = [];

module.exports = function (css) {
    var elem, text;

    if (inserted.indexOf(css) >= 0) {
        return;
    }

    inserted.push(css);

    elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');

    if (document.head) {
        document.head.appendChild(elem);
        text = document.createTextNode(css);
        elem.appendChild(text);
    } else {
        document.getElementsByTagName('head')[0].appendChild(elem);
        elem.styleSheet.cssText = css;
    }
};