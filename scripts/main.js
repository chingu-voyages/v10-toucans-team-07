const allTabs = $('.course-overview > li');

$('.nav-tabs a').on('click', function(e) {
    e.stopPropagation();
    $.each(allTabs, function(t) {
        allTabs.eq(t).removeClass('active');
    });
    $(this).parent().addClass('active');
    $(this).tab('show');
});
