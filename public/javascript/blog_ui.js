$(document).ready(() => {
    $('.like').on('click', () => {
        let likeIcon = $('.like i');
        if(likeIcon.hasClass('fa-heart-o')) {
            likeIcon.removeClass('fa-heart-o');
            likeIcon.addClass('fa-heart');
        } else if(likeIcon.hasClass('fa-heart')) {
            likeIcon.removeClass('fa-heart');
            likeIcon.addClass('fa-heart-o');
        }
    })
});
