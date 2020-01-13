/**
 * @ Author: Keen
 * @ Create Time: 2019-12-11
 * @ Description: 인기 검색어 모듈
 * @ 의존 JS : jQuery, swiper.js
 */

var recommendRoom = (function(){

    // Data 가져오기
    var getData = function(){
        var data = null;
        $.ajax({
            url: 'http://localhost:3000/recommendRoom',
            type: 'GET',
            cache: false,
            datatype: 'json',
            success: function(response) {
                // HTML 생성
                // generateHTML(response);
            },
            error: function(error) {
                console.error(error);
            }
        });
    };

    // HTML 생성 (mockData.json 참고)
    // var generateHTML = function(data) {
    //     var appendElement = $('.module-recommend-room .swiper-wrapper');

    //     for ( i = 0 ; i < data.length ; i++) {

    //         var html = '<li class="swiper-slide">'
    //             html += '<a href="' + data[i].scheme + '"</a>'
    //                 html += '<figure>'
    //                     html += '<img data-src="' + data[i].image + '"class="swiper-lazy" alt="">'
    //                 html += '</figure>'
    //                 html += '<div>'
    //                     html += '<span>' + data[i].category + '</span>'
    //                     html += '<strong>' + data[i].productName + '</strong>'
    //                     html += '<em>' + data[i].address + '</em>'
    //                 html += '</div>'
    //             html += '</li>';

    //         appendElement.append(html);

    //         if(i === data.length - 1) {
    //             // 스와이퍼 적용
    //             handleSwiper('[data-js-swiper-recommend]');
    //         }
    //     }
    // }


        // $('[data-js-swiper-keyword] .swiper-slide').eq(0).addEventListner(function(){
        //     setTimeout(function(){
        //         console.log('111');
        //     },0);
        // });

    // 스와이퍼 핸들링
    var handleSwiper = function(target){

        if (target === '' || typeof target !== "string") throw new Error('스와이퍼 타겟 엘리먼트값이 누락되었습니다. 타입은 String입니다.');

        var targetSwiper = $(target);

        // Swiper.prototype.setCustomWidth

        // Swiper.prototype.getCount = function(count, reset){
        //     // var count = 0;
        //     // return count;
        //     console.log('1111');
        // };

        var animateVariables = function() {
            var count = 0;
            function getCount() {
                return count;
            }
            return getCount();
        }

        var animateScrollText = {

            play: function() {
                var ddd = animateVariables();
                console.log(ddd);
            }
        }

        animateScrollText.play();



        Swiper.prototype.getCount = function(target) {
            var count = 0,
                defaultSliceIndex = 0,
                textAnimateInterval,
                itemFadeTime = 410,
                itemAnimateInterval = 1800;

            return {
                count: count,
                defaultSliceIndex: defaultSliceIndex,
                textAnimateInterval: textAnimateInterval,
                itemFadeTime: itemFadeTime,
                itemAnimateInterval: itemAnimateInterval
            }
        };

        // Swiper 커스텀 가로정렬
        Swiper.prototype.setCustomWidth = function(target) {

            if (!target) throw new Error('container 스와이퍼의 data셋 값이 필요합니다.')

            var slides = $('.swiper-slide',target),
                slidesLength = slides.length,
                elementSwiper = swiper.params.el[0].swiper,
                getCalculateSlideWidth = [], // 계산된 스와이프 넓이 (적용할 스와이프 넓이)
                getSlideWidth = $('.swiper-slide', target).width(),
                getEachSlideWidth =[],
                spacebetween = 8, // 스와이프간 영역
                wrapElementPadding = 20; // 랩퍼 엘리먼트 패딩 값

            if (slidesLength <= 2) return;
            console.log('elementSwiper',elementSwiper);
            console.log('getSlideWidth',getSlideWidth);
            // slidesSizesGrid에 들어갈 값
            $('.swiper-slide', target).each(function(){
                var thisWidth = $(this).width();
                getEachSlideWidth.push(thisWidth);
            });

            // 스와이프 넓이 계산
            for (i = 0; i < slidesLength ; i++) {

                if (i === 0) {
                    // 처음
                    getCalculateSlideWidth.push(0);
                } else if (i === 1) {
                    // 첫장일 때
                    var calculateWidth = getSlideWidth - wrapElementPadding;
                    getCalculateSlideWidth.push(calculateWidth);
                } else if (i === slidesLength - 1) {
                    // 마지막일 때
                    var prevIndexWidth = getCalculateSlideWidth[i - 1],
                        calculateWidth = prevIndexWidth + getSlideWidth - wrapElementPadding;
                    getCalculateSlideWidth.push(calculateWidth);
                } else {
                    // 그외
                    var prevIndexWidth = getCalculateSlideWidth[i - 1],
                        calculateWidth = prevIndexWidth + getSlideWidth + spacebetween;
                    getCalculateSlideWidth.push(calculateWidth);
                }
            }
            // var testValue = [0, 295, 618, 913];
            elementSwiper.slidesGrid = getCalculateSlideWidth;
            elementSwiper.slidesSizesGrid = getEachSlideWidth;
            elementSwiper.snapGrid = getCalculateSlideWidth;
        };

        // 스와이퍼 인스턴스
        var swiper = new Swiper(targetSwiper, {
            spaceBetween: 8, // 간격
            slidesPerView: 1.18, // 보여지는 비율
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    const text = ['숙박','액티비티','추가 탭1','추가 탭2'];
                    return '<span class="' + className + '">' + text[index] + '</span>';
                },
            },
            on: {
                init: function() {
                    setTimeout(function(){
                        console.log(swiper);
                        swiper.setCustomWidth('[data-js-swiper-keyword');
                        swiper.getCount();

                    },0);
                    // swiperTextAnimation('[data-js-swiper-keyword');


                    // handleTextAnimation('[data-js-swiper-keyword]');

                },
                resize: function() {
                    var reInit = swiper.setCustomWidth('[data-js-swiper-keyword');
                    swiper.slideTo(0,300,reInit);
                },
                slideChangeTransitionEnd: function() {
                    // 활성화 슬라이더 인덱스
                    var getActiveIndex = swiper.activeIndex;
                    console.log(`getActiveIndex : ${getActiveIndex}`);
                }
            },
        });

    };

    // 엘리먼트 비지블 컨트롤
    var visibleControl = {
        show: function() {
            var target = $('.module-recommend-room');
            target.addClass('show');
        }
    }

    // 초기화
    var init = (function(){
        // getData();
        handleSwiper('[data-js-swiper-keyword]');
    })();

})();
