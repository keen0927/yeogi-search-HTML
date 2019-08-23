// 레이어 팝업
var popupControl = (function(){

    function show(message, buttonText1, buttonFunction1, halfCheck, buttonText2, buttonFunction2) {
        makePopup(message, buttonText1, buttonFunction1, halfCheck, buttonText2, buttonFunction2);
    }

    // 팝업 닫기 & 제거
    function popupClose() {
        document.querySelector('.popup-default').classList.remove('show');
        setTimeout(function(){
            document.querySelector('.popup-default').remove();
        },300)
    }

    function makePopup(
        message,
        buttonText1,
        buttonFunction1,
        halfCheck,
        buttonText2,
        buttonFunction2) {

        var halfCheck = halfCheck || false;
        var buttonText1 = buttonText1 || '확인';
        var buttonFunction1 = buttonFunction1 || 'popupControl.popupClose()';
        var buttonFunction2 = buttonFunction2 || 'popupControl.popupClose()';

        var popupDefaultHTML = '<div class="popup-default">';
                popupDefaultHTML += '<div class="popup-default-content">';
                    popupDefaultHTML += '<div class="popup-text">' + message + '</div>';
                    popupDefaultHTML += '<div class="button-wrap button-wrap__full">';
                        popupDefaultHTML += '<button type="button" onclick="' + buttonFunction1 + '">' + buttonText1 + '</button>';
                    popupDefaultHTML += '</div>';
                popupDefaultHTML += '</div>';
            popupDefaultHTML += '</div>';

        var popupHalfHTML = '<div class="popup-default">';
                popupHalfHTML += '<div class="popup-default-content">';
                    popupHalfHTML += '<div class="popup-text">' + message + '</div>';
                    popupHalfHTML += '<div class="button-wrap button-wrap__half">';
                        popupHalfHTML += '<button type="button" onclick="'+ buttonFunction1 + '">' + buttonText1 + '</button>';
                        popupHalfHTML += '<span></span>';
                        popupHalfHTML += '<button type="button" onclick="'+ buttonFunction2 + '">' + buttonText2 + '</button>';
                    popupHalfHTML += '</div>';
                popupHalfHTML += '</div>';
            popupHalfHTML += '</div>';

        console.log(halfCheck);

        halfCheck === true ? insertPopup(popupHalfHTML) : insertPopup(popupDefaultHTML);

        function insertPopup(html) {
            document.body.insertAdjacentHTML('beforeend', html);
        }

        setTimeout(function(){
            document.querySelector('.popup-default').classList.add('show');
        },10);
    }

    return {
        show: show,
        popupClose: popupClose
    }

})();

function sampleFunction() {
    alert('샘플 펑션입니다');
    popupControl.popupClose();
}

// 샘플
// popupControl.show('안녕하세요'); // 기본형
// popupControl.show('안녕하세요','샘플 함수','sampleFunction()'); // 기본형
// popupControl.show(
//     '안녕하세요',
//     '좌측 버튼',
//     'popupControl.popupClose()',
//     true,
//     '우측 버튼',
//     'popupControl.popupClose()'
// ); // 2버튼 샘플