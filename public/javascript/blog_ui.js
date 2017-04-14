$(document).ready(() => {
    $('.like').on('click', (e) => {
        e.preventDefault();
        let likeIcon = $(this).find('i');
        console.log(likeIcon.text());
        if(likeIcon.hasClass('fa-heart-o')) {
            likeIcon.removeClass('fa-heart-o');
            likeIcon.addClass('fa-heart');
        } else if(likeIcon.hasClass('fa-heart')) {
            likeIcon.removeClass('fa-heart');
            likeIcon.addClass('fa-heart-o');
        }
    })
});
