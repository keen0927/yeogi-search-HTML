/**
 * @ Author: Keen
 * @ Create Time: 2019-07-22 18:45:59
 * @ Description: 검색홈 javascript
 */

var animate = (function(){

    // 애니메이션 함수
    function AnimateObject(targetElement) {
        var targetElement = $(targetElement),
            count = 0,
            defaultSliceIndex = 0,
            textAnimateInterval,
            itemFadeTime = 410,
            itemAnimateInterval = 1800;

        // 컨트롤
        var control = {

            // 애니메이션 카운트
            intervalAnimate: function() {
                var parentElement = $('ul', targetElement).eq(defaultSliceIndex);
                $('li',parentElement).eq(count).addClass('js-list__fadeout');
                setTimeout(function(){
                    $('li',parentElement).eq(count-1).addClass('js-list__fadein');
                },itemFadeTime);
                $('li',parentElement).eq(count).removeClass('js-list__fadeout, js-list__fadein');
                (count === 4) ? count = 0 : count++ ;
            },
            // 실행
            play: function() {
                var _self = this;
                textAnimateInterval = setInterval(function(){
                    _self.intervalAnimate();
                },itemAnimateInterval);
            },
            // 리셋
            reset: function() {
                count = 0;
                clearInterval(textAnimateInterval);
                $('ul li',targetElement).removeClass();
            }
        };

        // 스와이퍼
        var swiper = new Swiper(targetElement, {
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
            },
            on: {
                // 초기화
                init: function() {
                    $('.search-home-keyword').addClass('show');
                    var itemLength = $('li',targetElement).length;
                    if (itemLength <= 5) {
                        $('.swiper-pagination',targetElement).hide();
                        return;
                    }
                    control.play();
                }
            }
        });

        // 슬라이드 컨트롤
        swiper.on('slideChange', function(){
            defaultSliceIndex = swiper.realIndex;
            control.reset();
            control.play();
        });
    }

    // 인스턴스 생성
    var yeogiSwiper = new AnimateObject('.js-yeogi-swiper');
    var activitySwiper = new AnimateObject('.js-activity-swiper');

})();
