let offset = function(element) {

    let bRect = element.getBoundingClientRect();
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {top: bRect.top + scrollTop, left: bRect.left + scrollLeft};

};

module.exports = offset;

