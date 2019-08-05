$(document).ready(function() {
    let allTabs = $('.course-overview > li');
    let submenus = $('.tab-content > div');

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

    // $('.nav-tabs a').on('click', activateTabEvent);


    // --- Dropdown events ---
    let showDropdown = function() {
        $(this).children('.submenu').toggleClass('visible');
    };

    let hideDropdown = function() {
        $(this).children('.submenu').removeClass('visible');
    };

    let dropdowns = $('.dropdown');
    dropdowns.on('click', showDropdown).on('focusout', hideDropdown);

    
    // --- Change appearance when width <= 975 ---
    const BREAKPOINT = 975;

    const headerNavbar = $('header > .fixed-top');
    const topMiddleNav = $('#top-middle-nav');

    function breakpointReached() {
        return window.innerWidth <= BREAKPOINT;
    }

    function createNewMenu() {
        let menu = $('<div></div>');
        menu.attr('id', 'newMenu');
        return menu;
    }

    function rebootEvents() {
        $('.dropdown').on('click', showDropdown).on('focusout', hideDropdown);
        $('.nav-tabs a').on('click', activateTabEvent);
    }

    function adjustHeader() {
        let breakpoint = breakpointReached();

        if (breakpoint) {
            if ( $('#newMenu').length === 0 ) {
                let newMenu = createNewMenu();
                newMenu.append(topMiddleNav);
                if ($('#top-middle-nav')) {
                    topMiddleNav.remove();
                }

                $(headerNavbar).append(newMenu);
                $(newMenu).append(topMiddleNav);
            }
        } else {
            if ( $('#newMenu').length > 0 ) {
                let menu = $('#newMenu');
                menu.remove();
                topMiddleNav.insertBefore($('#top-right-nav'));
            }
        }

        rebootEvents();
    }

    window.onresize = _.debounce(adjustHeader, 20);
    adjustHeader();


    //  Rellax.js lib
    var rellax = new Rellax(".rellax");

    // Adding Parallax to floating card element above 1200px width
    let floating_card = document.querySelector('.floating-card');
});
