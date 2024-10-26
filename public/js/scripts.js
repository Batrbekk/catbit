jQuery(document).ready(function () {
    new Swiper(".banner-inner", {
        loop: true,
        navigation: {
            nextEl: ".banner-nav__next",
            prevEl: ".banner-nav__prev",
        },
        pagination: {
            el: ".banner-pag",
            clickable: true
        },
    });

    var init = false;
    var benefitsSlider;
    function swiperCard() {
        if (window.innerWidth <= 940) {
            if (!init) {
                init = true;
                benefitsSlider = new Swiper(".benefits-slider", {
                    loop: false,
                    spaceBetween: '20',
                    breakpoints: {
                        0: {
                            spaceBetween: '10',
                        },
                        579: {
                            spaceBetween: '20',
                        }
                    }
                });

                $(window).on('scroll', function() {
                    if($(this).scrollTop() > 0) {
                        $('.header').addClass('fix');
                    } else {
                        $('.header').removeClass('fix');
                    }
                });
            }
        } else if (init) {
            benefitsSlider.destroy();
            init = false;
        }
    }
    swiperCard();
    window.addEventListener("resize", swiperCard);


    $('select').niceSelect();

    $('.coins option').each(function() {
        var bg = $(this).attr('data-imageUrl');
        $(this).parents('.coins').next('.nice-select').find('.list li').eq($(this).index()).prepend('<img src="' + bg + '"/>');
    });

    $('.coins .current').prepend('<img src="' + $('.coins option:selected').attr('data-imageUrl') + '"/>');

    $('select.coins').on('change', function() {
        var bg = $('.coins option:selected').attr('data-imageUrl');
        $(this).next('.coins').find('.current').prepend('<img src="' + bg + '"/>');
    });


    $('.burger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.mobile-wrapper').fadeToggle();
    });



    $('.popup').on('click', function(e) {
        var target = $(e.target);
        if (!target.closest('.popup-form').length) {
            $('.popup').fadeOut(100);
        }
    });

    $('[data-popup]').on('click', function(e) {
        e.preventDefault();
        $($(this).attr('data-popup')).fadeIn(100);
    });

    $(document).on('click', function (e) {
        var target = $(e.target);
        if (target.is('.change-select__search') || target.is('.change-list_tags:not(.change-list_tags--big) span')) {
            target.parents('.change-select_top').find('.change-list_wrapper').show();
            target.parents('.change-select_top').find('svg.arrow').addClass('is-active');
        } else {
            $('.change-select_top').find('.change-list_wrapper').hide();
            $('.change-select_top').find('svg.arrow').removeClass('is-active');
        }
    });

    $(document).on('click', '.change-list_tags span', function () {
        $(this).addClass('is-active').siblings().removeClass('is-active');
    });

    $(document).on('focus', 'input', function () {
        $(this).parent().removeClass('_error');
        $(this).next('.change-box__error').remove();
    });


    $('.text-copy').on('click', function() {
        var $this = $(this);
        var textToCopy = $this.prev('.copy-container__text').text();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(textToCopy).select();

        document.execCommand("copy");
        $temp.remove();

        $this.hide().next('.text-copied').show();
        setTimeout(function() {
            $this.show().next('.text-copied').hide();
        }, 3000);
    });


    $('#file').on('change', function(event) {
        var input = event.target;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.verify-photo_block').empty().append('<img src="' + e.target.result + '" alt="Фото" />');
            }

            reader.readAsDataURL(input.files[0]);
        }
    });

    $('.verify-photo_label').on('dragover', function(event) {
        event.preventDefault();
        $(this).addClass('active');
    });

    $('.verify-photo_label').on('dragleave', function() {
        $(this).removeClass('active');
    });

    $('.verify-photo_label').on('drop', function(event) {
        event.preventDefault();
        $(this).removeClass('active');
        var files = event.originalEvent.dataTransfer.files;

        if (files.length > 0) {
            $('#file').prop('files', files);
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.verify-photo_block').empty().append('<img src="' + e.target.result + '" alt="Фото" />');
            }

            reader.readAsDataURL(files[0]);
        }
    });
});
