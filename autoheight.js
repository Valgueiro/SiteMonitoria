var setElementHeight = function () {
    var height = $(window).height() - 40;//38=pixels do "direitos reservados"
    $('.autoheight').css('min-height', (height));
};
    
$(window).on("resize", function () {
    setElementHeight();
}).resize();



