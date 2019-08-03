const allTabs = $('.course-overview > li');
const submenus = $('.tab-content > div');

// had to rewrite Bootstrap's tab function because it was inconsistent
const activateTab = function(link) {
    let linkId = link.attr('id');
    $.each(submenus, function(t) {
        if (submenus.eq(t).hasClass('active')) {
            submenus.eq(t).removeClass('active');
        }
        if (linkId === submenus.eq(t).attr('aria-labelledby')) {
            submenus.eq(t).addClass('active');
        }
    });

};

$('.nav-tabs a').on('click', function(e) {
    e.stopPropagation();
    activateTab($(this));
    $.each(allTabs, function(t) {
        if (allTabs.eq(t).hasClass('active')) {
            allTabs.eq(t).removeClass('active');
        }
    });
    $(this).parent().addClass('active');
});

const dropdowns = $('.dropdown');
dropdowns.on('click', function() {
    $(this).children('.submenu').toggleClass('visible');
}).on('focusout', function() {
    $(this).children('.submenu').removeClass('visible');
});


//  Rellax.js lib
var rellax = new Rellax(".rellax");

// Adding Parallax to floating card element above 1200px width
let floating_card = document.querySelector('.floating-card');
