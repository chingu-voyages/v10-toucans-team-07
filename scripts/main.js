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


    // --- Modify Degrees + Programs submenu appearance
    const BREAKPOINT = 975;

    let oldSubmenu = $('.submenu.wide > .row.no-gutters');
    let newSubmenu = $('.new-container > ul');

    let rearrangeSubmenu = function() {
        if (window.innerWidth < BREAKPOINT) {
            if ($('.submenu.wide > .row.no-gutters').length === 1 && $('.new-container').length === 0) {
                let headings = $('.submenu.wide #heading');
                $('.submenu.wide').append($('<div></div>').addClass('new-container').append('<ul></ul>'));
                newSubmenu = $('.new-container > ul');

                $.each(headings, function() {
                    let field = $(this).attr('data-heading');
                    let courses = $('*[data-field="' + field + '"');

                    let newHeading = $('<li></li>').addClass('py-2').append($(this).clone().removeAttr('href'));
                    $(newSubmenu).append($(newHeading));

                    $.each(courses, function() {
                        let newCourse = $('<li></li>').addClass('pb-1').append($(this).clone());
                        $(newSubmenu).append($(newCourse));
                    });
                });

                $(newSubmenu).append($('<li></li>').addClass('py-2'));

                $('.submenu.wide > .row.no-gutters').detach();
                newSubmenu = $('.submenu.wide > .new-container');
            }
        } else {
            if (newSubmenu.length > 0) {
                $(newSubmenu).remove();
                $('.submenu.wide').append(oldSubmenu);
            }
            oldSubmenu = $('.submenu.wide > .row.no-gutters');
        }
    }

    window.onresize = _.debounce(rearrangeSubmenu, 100);
    rearrangeSubmenu();


    // --- Close tab event - removed because of inconsistencies
    // $('.close-btn').on('click', function() {
    //     $(this).parent().removeClass('visible');
    // });


    // --- Turn dropdown links backgrounds red when active
    const triggers = $('#top-middle-nav .dropdown-trigger');
    triggers.on('click', function() {
        $(this).toggleClass('active');
    }).on('focusout', function() {
        $(this).removeClass('active');
    });

    // --- Remove active background when exit buttons are clicked
    $('.close-btn').on('click', function() {
        $(this).parent().parent().children('a').removeClass('active');
    });


    // --- Scrolldown button ---
    $('.down-arrow-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).children('a').attr('href')).offset().top}, 300, 'linear');
    });

    $(document).scroll((_.debounce(function() {
        let y = $(this).scrollTop();
        // console.log(y + ' ' + $('header').height());
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
