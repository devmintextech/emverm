/**
 * Created by bryan on 2/8/16.
 */
$(function () {
    var isExpanded = false;

    function Toggle(Hide) {
        isExpanded = Hide !== true ? !isExpanded : false;
        isExpanded ? $('.HamburgerMenu').slideDown() : $('.HamburgerMenu').slideUp();
    }

    $(window).resize(function () {
        Toggle(true);
    });
    $('.Hamburger').click(Toggle);
});
//Matches a group of divs height
$(function () {
    var Groups = {};
    var AllElements = [];

    function MatchHeights() {
        Groups = {};
        $('[data-matchheight]').each(function (index, item) {
            var groupName = $(item).attr('data-matchheight');
            var group = Groups[groupName];
            if (!group) {
                group = Groups[groupName] = [];
            }
            group.push(item);
            AllElements.push(item);
        });
        Resize();
    }

    function Resize() {
        $(AllElements).css('min-height', '0px');
        var groupNames = Object.getOwnPropertyNames(Groups);
        for (var y = 0; y < groupNames.length; y++) {
            var group = Groups[groupNames[y]];
            var height = 0;
            for (var x = 0; x < group.length; x++) {
                var h = $(group[x]).outerHeight();
                height = h > height ? h : height;
            }
            $(group).css('min-height', height + 'px');
        }
    }

    MatchHeights();
    $(window).resize(Resize);
});

//Vertical align middle
$(function () {
    var Elements = [];

    function CenterElements() {
        $('[data-verticalalignmiddle]').each(function (index, item) {
            Elements.push(item);
        });
        Resize()
    }

    function Resize() {
        $(Elements).each(function (index, item) {
            var parentHeight = $(item).parent().height();
            var Height = $(item).outerHeight();
            var padding = Math.floor((parentHeight - Height) / 2);
            if (!padding) {
                return;
            }
            $(item).css({position: 'relative', top: padding + 'px'})
        });
    }

    CenterElements();
    $(window).resize(Resize);
});

$(function () {
    if (Page == "Home") {
        $('.SliderDiv').css({background: 'none'});
        $('.CallToAction.Dynamic').css({display: 'block'});
    }
    var Links = $('.Bottom .Nav .Link');

    $(Links).hover(
        function (e, item) {
            $(Links).find('.Inner').removeClass('Selected');
            $(this).find('.Inner').addClass('Selected');
            console.log('Hover');
        },
        function (e, item) {
            $(Links).find('.Inner').removeClass('Selected');
            $('#' + Page).find('.Inner').addClass('Selected');
        })
        .click(function () {
            var href = $(this).find('a').attr('href');
            window.location = href;
        });

    $('#' + Page).find('.Inner').addClass('Selected');
});

$(function () {
    var isExpanded = false;
    var Settings = {
        ctaHeight: $('.CallToAction.Dynamic').outerHeight(),
        dividerHeight: $('.BottomFloat .Divider').outerHeight(),
        isiHeight: $('.BottomFloat .ISI').outerHeight()
    };


    function SetPosition(isToggle) {
        var windowheight = $(window).height();
        $('.ISI > .Content').css({
            'height': (windowheight - 20) + 'px',
            'overflow-y': (isExpanded ? 'scroll' : 'hidden')
        });
        $('.ISI').css('padding-bottom', '20px');
        $('.ISI > .Content').scrollTop(0);
        if (!isToggle) {
            $('.BottomFloat').css({transition: 'none'});
        }

        var top = isExpanded ? '-101px' : (windowheight - 240) + 'px';


        $('.BottomFloat').css({top: top});

        setTimeout(function () {
            $('.BottomFloat').css({transition: '1s all ease'});
        }, 1);
    }

    function Toggle() {
        isExpanded = !isExpanded;
        return isExpanded ? Expand() : Collapse();
    }

    function Expand() {
        isExpanded = true;
        $('#SafetyExpand').hide();
        $('#SafetyCollapse').show();
        $('.glyphicon-chevron-up').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        SetPosition(true);
    }

    function Collapse() {
        isExpanded = false;
        $('#SafetyCollapse').hide();
        $('#SafetyExpand').show();
        $('.glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        SetPosition(true);
    }

    $('.ISI, .Divider').click(Toggle);

    SetPosition();
    $(window).resize(SetPosition);
});

