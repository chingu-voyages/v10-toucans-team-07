$(document).ready(function() {
    let allTabs = $('.course-overview > li');
    let submenus = $('.tab-content > div');
    let dropdowns = $('.dropdown');
    let navTabLinks = $('.nav-tabs a');

    // Had to rewrite Bootstrap's tab function because it was inconsistent
    const activateTab = function(link) {
        let linkId = link.attr('id');
        submenus = $('.tab-content > div');

        $.each(submenus, function(t) {
            if (submenus.eq(t).hasClass('active')) {
                submenus.eq(t).removeClass('active');
            }
            if (linkId === submenus.eq(t).attr('aria-labelledby')) {
                submenus.eq(t).addClass('active');
            }
        });

    };

    let activateTabEvent = function(e) {
        allTabs = $('.course-overview > li')
        e.stopPropagation();
        activateTab($(this));
        $.each(allTabs, function(t) {
            if (allTabs.eq(t).hasClass('active')) {
                allTabs.eq(t).removeClass('active');
            }
        });
        $(this).parent().addClass('active');
    };

    navTabLinks.on('click', activateTabEvent);


    // --- Dropdown events ---
    let showDropdown = function() {
        $(this).children('.submenu').toggleClass('visible').focus();
    };

    let hideDropdown = function() {
        $(this).children('.submenu').removeClass('visible');
    };

    dropdowns.on('click', showDropdown).focusout(function() {
        window.setTimeout(hideDropdown, 100);
    });



    // --- Scrolldown button ---
    $('.down-arrow-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).children('a').attr('href')).offset().top}, 300, 'linear');
    });

    $(document).scroll((_.debounce(function() {
        let y = $(this).scrollTop();
        console.log(y + ' ' + $('header').height());
        if (y > $('header').height()) {
          $('.down-arrow-btn').fadeOut();
        } else {
          $('.down-arrow-btn').fadeIn();
        }
    }, 20)));


    //  Rellax.js lib
    var rellax = new Rellax(".rellax");

    // Adding Parallax to floating card element above 1200px width
    let floating_card = document.querySelector('.floating-card');
});
