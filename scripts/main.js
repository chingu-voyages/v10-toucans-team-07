const allTabs = $('.course-overview > li');

$('.nav-tabs a').on('click', function(e) {
    e.stopPropagation();
    $.each(allTabs, function(t) {
        allTabs.eq(t).removeClass('active');
    });
    $(this).parent().addClass('active');
    $(this).tab('show');
});

//  Rellax.js lib
var rellax = new Rellax(".rellax");

// Adding Parallax to floating card element above 1200px width
let floating_card = document.querySelector('.floating-card');
