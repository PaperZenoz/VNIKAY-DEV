$(window).on("load", function () {
    $('#preloader').fadeOut(500)
    $('body').css("opacity", 1)

});


$(document).ready(function () {
        var windowWidth = $(window).width()
        function common() {
            $('.lazy').lazyload({
                effect: 'fadeIn'
            })
            $('.js--tel').inputmask("+7 (999) 999-9999")
            $('.fancy').fancybox({
                baseClass: 'inner-popup'
            })
        }

        function myCustom() {
            function rangeSlider() {


                $('.js--range').ionRangeSlider({
                    min: 0,
                    max: 100,
                    from: 4,
                    to: 50,
                    extra_classes: 'ion-slider',
                    type: 'double',
                    hide_min_max: true,
                    postfix: 'м²'
                })


            }
            function customInputFile() {
                $('input[type="file"]').styler({
                    filePlaceholder: 'Выберите файл',
                    fileBrowse: 'Выбрать'
                })

            }
            function customSelect() {
                $('.js--select').niceSelect();
            }
            rangeSlider()
            customInputFile()
            customSelect()
        }

        function myTabs() {
            function tabsDots() {
                $('.tabs__item-dots').on('click', function () {
                    $('.tabs__item-dots-dropdown').toggle()
                })
                $(document).mouseup(function (e) { // событие клика по веб-документу
                    var div = $(".tabs__item-dots"); // тут указываем ID элемента
                    if (!div.is(e.target) // если клик был не по нашему блоку
                        && div.has(e.target).length === 0) { // и не по его дочерним элементам
                        $('.tabs__item-dots-dropdown').hide(); // скрываем его
                    }
                });
            }
            function tabsLine() {
                var count,
                    winW = windowWidth

                count = 7

                if (winW > 1365 & winW <= 1919) {
                    count = 6
                } else if (winW > 1023 & winW <= 1365) {
                    count = 6

                } else if (winW > 639 & winW <= 1023) {
                    count = 3
                } else if (winW <= 639) {
                    count = 2
                }

                count = count - 1


                $('.tabs__item:eq(' + count + ')').nextAll('.tabs__item').appendTo('.tabs__item-dots-dropdown')


                if (!$('.tabs__item-dots-dropdown .tabs__item ').length) {
                    $('.tabs__item-dots').remove()

                }

            }

            tabsDots()
            tabsLine()
        }
        function myText() {
            function limit() {
                var text = $('.js--limit')
                if (text.height() > 325) {
                    text.addClass('limit')
                    text.after('<span class="limit-btn">Развернуть</span>')

                }
                $(document).on('click touchstart', '.limit-btn', function () {

                    var localText = $(this).parents().find(text),
                        limit = $('.limit').length,
                        buttonsText = ''


                    localText.toggleClass('limit')


                    if (limit) {
                        buttonsText = 'Свернуть'
                    } else {
                        buttonsText = 'Развернуть'
                    }

                    $(this).html(buttonsText)

                })
            }
            function sameHeight() {

                $('.same-height').css('height', 'auto')


                $('.same-height__parent').each(function () {
                    var h = 0,
                        el = $(this).find('.same-height')

                    el.each(function () {
                        var bh = $(this).height()
                        if (bh > h) {
                            h = bh
                        }
                    })

                    el.height(h)
                })
            }

            limit()
            sameHeight()
        }
        function myYandexMap() {
            var points = [
                {
                    coord: [55.584222, 37.385524],
                }, {
                    coord: [59.918068, 30.304899],

                }, {
                    coord: [55.767304, 49.099977],

                }, {
                    coord: [55.06025556965288, 82.90275950000002],

                }, {
                    coord: [55.396624, 86.086089],

                }, {
                    coord: [53.683380, 91.427085],

                }
            ];

            if ($('#map').length > 0) {
                ymaps.ready(init);
            }

            var myMap

            function init() {
                myMap = new ymaps.Map(
                    'map',
                    {
                        center: [55.028541813146475, 82.93190020179287],
                        zoom: 5,
                        type: 'yandex#map',
                        controls: [],
                    }
                );


                for (var i = 0; i < points.length; i++) {
                    var placemark = new ymaps.Placemark(points[i].coord, {
                        balloonContentHeader: points[i].adres,
                        hideIcon: false,
                        balloonContentBody:
                            '<div class="partners__item-info map" style="padding: 10px; width: 230px">' +
                            '<strong>ПАРТНЕР</strong>' +
                            '<span><i><img src="images/partners/4.png" alt=""/></i><div>г. Новосибирск, ул. Красный проспект д 47</div></span>' +
                            '<span><i><img src="images/partners/6.png" alt=""/></i>8 800 000 00 00</span>\n' +
                            '<span><i><img src="images/partners/5.png" alt=""/></i>info@td-lift.ru</span>' +
                            '</div>'
                    }, {
                        hideIcon: false,
                        iconLayout: 'default#image',
                        iconImageHref: 'images/1.png',
                        iconImageSize: [14, 14],
                        mapAutoPan: false,
                    });


                    var zoomControl = new ymaps.control.ZoomControl({
                        options: {
                            size: "small"
                        }
                    });

                    myMap.controls.add(zoomControl);
                    myMap.behaviors.disable('scrollZoom');
                    myMap.geoObjects.add(placemark);
                }
            }
        }
        function myHeader() {
            function burger() {
                var burger = $('.header__burger-wrap')
                burger.on('click', function () {

                    $('.header-menu').toggleClass('active')
                })
            }

            function mobileHeader() {
                var menu = $('.header__mobile-menu > .container'),
                    contacts = $('.header__mobile-contacts > .container')
                if (windowWidth < 1024) {
                    $('.header__nav').appendTo(menu)
                    $('.header__contacts').clone().appendTo(contacts)
                    $('.header__call').appendTo(contacts)
                }
            }

            burger()
            mobileHeader()

        }
        function mySlick() {
            function slickCounter() {

                $('.slick-counter').each(function () {


                    var parent = $(this),
                        counter = '<div class="slick-counter"><div class="container"><div class="slick-counter__wrap"><div class="slick-counter__current">1</div><span>/</span><div class="slick-counter__general">10</div></div></div></div>'


                    parent.append(counter)


                    var
                        generalIndex = parent.find('.slick-slide').length,
                        currentIndex = parent.find('.slick-current').index() + 1,
                        currentField = parent.find('.slick-counter__current'),
                        generalField = parent.find('.slick-counter__general')


                    currentField.text(currentIndex)
                    generalField.text(generalIndex)


                    parent.on('afterChange', function () {
                        currentIndex = parent.find('.slick-current').index() + 1
                        currentField.text(currentIndex)
                    });

                })


            }

            function mainSliderArrows() {

                var slider = $('.main-banner'),
                    next = slider.find('.slick-next'),
                    prev = slider.find('.slick-prev')

                $('.main-banner__arrow').on('click', function () {
                    if ($(this).hasClass('main-banner__arrow-next')) {
                        next.trigger('click')
                    } else if ($(this).hasClass('main-banner__arrow-prev')) {
                        prev.trigger('click')
                    }
                })
            }

            slickCounter()
            mainSliderArrows()
        }
        function resizeControl() {
            $(window).resize(function () {
                var w = $(window).width();
                $(window).resize(function () {
                    var new_w = $(window).width();
                    if (new_w != w) {
                        $('#preloader').fadeIn()
                        location.reload()
                    }
                });
            })
        }

        function allFunctions() {
            common()
            myCustom()
            myTabs()
            myText()
            myYandexMap()
            myHeader()
            mySlick()
            resizeControl()
        }

        // allFunctions()
    }
)
















