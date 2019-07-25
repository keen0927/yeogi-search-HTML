var handleSearch = (function(){

    // 인풋 클리어 추가
    function inputAddResetButton(element) {
        var buttonHTML = '<button type="button" class="button-cancel"><i class="icon-icn_cancel"></i><span>삭제</span></button>';

        $(this).insertAfter(buttonHTML);

        $('.js-search-input').on('focus keyup',function(){
            if ($(this).val() === "") {
                console.log('empty');
            } else {
                console.log($(this).val());
            }
        });
    }

    inputAddResetButton('.js-search-input');


    // 진입 후 input 포커스
    function inputFocus(element) {
        setTimeout(function(){
            $(element).focus();
        },400);
    }

    inputFocus('.js-search-input');

    // 고정GNB 스크롤 해들러 (아이폰 버그 대응)
    function handleFocusScroll(element) {
        if (typeof element !== 'string') {
            throw new TypeError(element + ' is not a string');
        }

        var targetElement = document.querySelector(element);
        var handleBlur = function() {
            targetElement.blur();
            window.removeEventListener('scroll',handleBlur);
        }

        targetElement.addEventListener('focus',function(){

            setTimeout(function(){
                window.addEventListener('scroll',handleBlur);
            },300);

        });
    }

    // 최근 검색어 삭제
    function handleRemoveItem(element) {
        if (typeof element !== 'string') {
            throw new TypeError(element + ' is not a string');
        }
        var element = element || console.error('dd');
        var targetElements = document.querySelectorAll('.search-recently-keyword ul li button');


        for (i = 0 ; i < targetElements.length ; i++ ) {
            targetElements[i].addEventListener('click',function(e){
                var thisParent = e.currentTarget.parentNode;
                var speed = 370;

                thisParent.classList.add('js-item__fadeout');
                setTimeout(function(){
                    thisParent.remove();
                },speed)
            });
        }
    }

    // 최근 검색어 전체 삭제
    function handleRemoveItemAll() {
        var targetElement = document.querySelector('.search-recently-keyword ul');
        var speed = 370;

        targetElement.classList.add('js-item__fadeout');
        setTimeout(function(){
            targetElement.remove();
        },speed)
    }

    // Initialize
    var init = (function(){
        handleFocusScroll('.js-search-input');
        handleRemoveItem('.search-recently-keyword');
    })();

    return {
        handleRemoveItemAll: handleRemoveItemAll
    }

})();
