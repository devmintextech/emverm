$(document).ready(function () {

    $(function () {
        $('a[href*="#isi"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    }).on('hidden.bs.collapse', function () {
        $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    });

    $(window).load(function () {
        if ($('#isi-break').isOnScreen() == true) {
            $('#ISI-SCROLL').hide();
        }
        if ($('#isi-break').isOnScreen() == false) {
            $('#ISI-SCROLL').show();
        }
    });

    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
        $(this).find('a.dropdown-toggle').addClass('active-hover');
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
        $(this).find('a.dropdown-toggle').removeClass('active-hover');
    });

    $('#click').click(function (event) {
        $('#footbox').animate({height: '100%'}, 700);
        $('.close-isi').show();
        $('.open-isi').hide();
        event.preventDefault();
    });

    $('#click2').click(function (event) {
        $('#footbox').animate({height: '115px'}, 700);
        $('.open-isi').show();
        $('.close-isi').hide();
        event.preventDefault();
    });
	
	$(".close-overlay").click(function() {
		closeOverlays();
	});


});

$.fn.isOnScreen = function () {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

	/* Note: removed "|| viewport.top > bounds.bottom" because the static ISI was reappearing after the ISI content
	went off the top of the screen.  */
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top));
};

$(window).scroll(function () {
    if ($('#isi-break').isOnScreen() == true) {
        $('#ISI-SCROLL').hide();
    }
    if ($('#isi-break').isOnScreen() == false) {
        $('#ISI-SCROLL').show();
    }

});

$('.isi').bind('mousewheel DOMMouseScroll', function (e) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});

autoPlayYouTubeModal();

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal() {
    var trigger = $("body").find('[data-toggle="modal"]');
    trigger.click(function () {
        var theModal = $(this).data("target"),
            videoSRC = $(this).attr("data-theVideo"),
            videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal + ' div.popmake-close').click(function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
        //stops video from playing when closed out of modal
        $('#videoModal').on('hidden.bs.modal', function () {
            $(theModal + ' iframe').attr('src', videoSRC);
        });
    });
}

$(function () {
    $('img').each(function (index, item) {
        var title = $(item).attr('title');
        if (title) {
            return;
        }
        $(item).attr('title', $(item).attr('alt'));
    });
});
function setSection(Section) {
    $(function () {
        $('.' + Section).addClass('active');
    });
}
$(function () {
    $('[data-event]').each(function (index, item) {
        $(item).click(function () {
            var param = $(item).attr('data-event').split(',');
            ga('send', 'event', param[0], param[1], param[2]);
        });
    });
});


/* Email functions */

function showEmailOverlay () {
	$('#email').show();
	showValidation("to", false);
	showValidation("from", false);
}


function validateAndSendEmail () {
	
	var allOK = true;
	
	var emailForm = document.getElementById("email-share");
	
	var sendTo = emailForm.recipient.value;
	var sentFrom = emailForm.email.value
	
	// Check that To field is not blank and contains an @
	var toOK = true;
	if (sendTo == "") {
		allOK = false;
		toOK = false;
	}
	if (sendTo.indexOf("@") == -1) {
		allOK = false;
		toOK = false;
	}
	if (toOK == false) {
		showValidation("to", true);
	} else {
		showValidation("to", false);
	}
	
	// Check that From field is not blank and contains an @
	var fromOK = true;
	if (sentFrom == "") {
		allOK = false;
		fromOK = false;
	}
	if (sentFrom.indexOf("@") == -1) {
		allOK = false;
		fromOK = false;
	}
	if (fromOK == false) {
		showValidation("from", true);
	} else {
		showValidation("from", false);
	}
	

	// Send the email
	if (allOK == true) {
    var payload = {
      to: sentFrom,
      from: sendTo,
      subject: "EMVERM.COM",
      body: "I thought you might be interested in the <a href='http://www.emverm.com' target='_blank'>EMVERM.COM</a> website. This website has facts about highly contagious pinworm infections, including who gets pinworm, what the signs are, how it is treated, and how to prevent the spread of pinworm in your home."
    }
		
    $.ajax({
      url: "https://services.revhealthbackend.com/mailshare.php",
      data: payload,
      dataType: 'jsonp',
      success: function(resp){
        if(resp.status == 200) {
          emailSent();
        } else if (resp.status == 500) {
          $('#email-error').show();
        }
      }, error: function(resp) {
        if(resp.status == 200) {
          emailSent();
        } else if (resp.status == 500) {
          $('#email-error').show();
        }
      }
    });
	}

	//console.log(emailForm.recipient.value);
}

function emailSent () {
	// console.log("email sent");
	closeOverlays();
}


function showValidation (toFrom, show) {
	
	if (show == true) {
		$("#validate-" + toFrom).show();
	} else {
		$("#validate-" + toFrom).hide();
	}
	
}

function closeOverlays () {
  $('#email-error').hide();
	$('#email').hide();
}

function validateChecks (btn) {
	
	var p1 = document.getElementById("term-check");
	var p2 = document.getElementById("age-check");
	
	var check1 = document.querySelector("#term-check input[type=checkbox]");
	var check2 = document.querySelector("#age-check input[type=checkbox]");
	
	if (check1.checked == true) {
		p1.classList.remove("error");
	} else {
		p1.classList.add("error");
	}
	
	if (check2.checked == true) {
		p2.classList.remove("error");
	} else {
		p2.classList.add("error");
	}
	
	if ((check1.checked == true) && (check2.checked == true)) {
		btn.classList.remove("error");
		window.open('https://mprsetrial.mckesson.com/7194/emverm#');
		return true;
	} else {
		btn.classList.add("error");
		return false;
	}
	
}

function goToUrl(url){
    window.open(url);
}

function validateThisCheck (theCheck) {
	
	var btn = document.getElementById("download-button");
	
	if (theCheck.checked == true) {
		theCheck.parentElement.classList.remove("error");
	} else {
		theCheck.parentElement.classList.add("error");
		btn.classList.add("error");
	}
	
	if (bothChecked()) {
		btn.classList.remove("error");
	}
	
}

function bothChecked () {

	var check1 = document.querySelector("#term-check input[type=checkbox]");
	var check2 = document.querySelector("#age-check input[type=checkbox]");

	if ((check1.checked == true) && (check2.checked == true)) {
		return true;
	} else {
		return false;
	}
	
}

