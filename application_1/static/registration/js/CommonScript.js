/* 
 * 모바일 브라우져인지 체크
 * */
function isMobileDevice() {
    if ( navigator.userAgent.match( /Android/i )
        || navigator.userAgent.match( /webOS/i )
        || navigator.userAgent.match( /iPhone/i )
        || navigator.userAgent.match( /iPad/i )
        || navigator.userAgent.match( /iPod/i )
        || navigator.userAgent.match( /BlackBerry/i )
        || navigator.userAgent.match( /Windows Phone/i ) )
        return true;
    else
        return false;

}


/*
 *  주민번호 체크
 * 
 * 
 * */
function juminCheck( jumin1, jumin2 ) {
    var jumin = jumin1 + '' + jumin2,
        arr_jumin = [],
        compare = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5],
        sum = 0;

    // 입력여부 체크
    if ( jumin1 == '' ) {
        //alert('주민등록번호를 기입해주세요.');
        return false;
    }

    if ( jumin2 == '' ) {
        //alert('주민등록번호를 기입해주세요.');
        return false;
    }

    // 입력값 체크
    if ( jumin1.match( '[^0-9]' ) ) {
        //alert("주민등록번호는 숫자만 입력하셔야 합니다.");
        return false;
    }
    if ( jumin2.match( '[^0-9]' ) ) {
        //alert("주민등록번호는 숫자만 입력하셔야 합니다.");
        return false;
    }

    // 자리수 체크
    if ( jumin.length != 13 ) {
        //alert("올바른 주민등록 번호를 입력하여 주세요.");
        return false;
    }


    // 공식: M = (11 - ((2×A + 3×B + 4×C + 5×D + 6×E + 7×F + 8×G + 9×H + 2×I + 3×J + 4×K + 5×L) % 11)) % 11
    for ( var i = 0; i < 13; i++ ) {
        arr_jumin[i] = jumin.substring( i, i + 1 );
    }

    for ( var i = 0; i < 12; i++ ) {
        sum = sum + ( arr_jumin[i] * compare[i] );
    }

    sum = ( 11 - ( sum % 11 ) ) % 10;

    if ( sum != arr_jumin[12] ) {
        //alert("올바른 주민등록 번호를 입력하여 주세요.");
        return false;
    }

    return true;
}




// 엔터키 자동 submit  방지
// <form> tag 내에 onkeydown="javascript:StopSubmit(); 삽입해서 사용
function StopSubmit() {
    var keyCode = window.event.keyCode;
    if ( keyCode == 13 ) {
        window.event.returnValue = false;
    }
}


// 전화번호 인증 팝업
function PopupMobileNo() {
    width = 400;
    height = 200;
    leftVal = ( screen.width - width ) / 2;
    topVal = ( screen.height - height ) / 2;
    window.open( '/popup/MobileNo.aspx', 'popMobileNo', 'width=' + width + ',height=' + height + ',left=' + leftVal + ',top=' + topVal + ',scrollbars=no' );
}

// 팝업윈도우
function PopupWindow( url, width, height, target ) {
    leftVal = ( screen.width - width ) / 2;
    topVal = ( screen.height - height ) / 2;
    return window.open( url, target, 'width=' + width + ',height=' + height + ',left=' + leftVal + ',top=' + topVal + ',scrollbars=yes' );
}

// nice ipin 본인인증 팝업
function PopupIpin() {
    window.open( '', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no' );
    document.vnoform.target = 'popupIPIN2';
    document.vnoform.action = 'https://cert.vno.co.kr/ipin.cb';
    document.vnoform.submit();
}

// 이니시스 결재모듈 팝업
function InicisPopup( nextPage ) {
    PopupWindow( 'Common/INISecureStart.aspx?NextPage=' + nextPage, 650, 540 );
}

// keyCode가 숫자인지 체크
function IsNumeric( keyCode ) {
    return keyCode >= 48 && keyCode <= 57 // 0~9
}

// 우편번호 찾기 팝업
/*
parent page :
    $('#findZipCode').click(function (e) {
        PopupZipCode();
        e.preventDefault();
    });

    function setJuso(zipCode, roadAddr, roadAddr1, roadAddr2, jibunAddr) {
        $('#address1').val(roadAddr1);
        $('#address2').val(roadAddr2 + ' ');
        $('#zipCode').val(zipCode);

        //var split = zipCode.split('-');
        //$('#zipCode1').val(split[0]);
        //$('#zipCode2').val(split[1]);

        //$('#jibunAddr').val(jibunAddr);
        $('#address2').selectRange(999, 999);
        $('#address2').focus();
    }

*/
function PopupZipCode() {
    PopupWindow( '/Common/ZipCode2.aspx', 600, 400, 'ZipCode' );
}

// 우편번호 찾기 팝업
function PopupEventCode() {
    PopupWindow( '/Popup/EventCode.aspx', 500, 300, 'popEventCode' );
}

// email validation 
function IsEmail( val ) {
    return isEmailFormat( val );
}
function IsEmailFormat( val ) {
    return isEmailFormat( val );
}

function isEmailFormat( val ) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test( val );
}

// mobile validateion
function IsMobile( val ) {
    return isMobileFormat( val );
}
function IsMobileFormat( val ) {
    return isMobileFormat( val );
}
function isMobileFormat( val ) {
    val = val.replace( /\-/g, '' ).replace( /\./g, '' ).replace( /\ /g, '' );

    if ( isNaN( val ) ) {
        return false;
    }

    if ( val.substr( 0, 3 ) == "010" ) {
        return val.length == 3 + 4 + 4;
    } else if ( val.substr( 0, 1 ) == "0" ) {
        return val.length == 3 + 3 + 4 || val.length == 3 + 4 + 4;
    } else {
        return false;
    }
}

// 전화번호
function MobileFormat( val ) {
    return setMobileFormat( val );
}
// 전화번호
function setMobileFormat( val ) {

    val = val.replace( /\-/g, '' ).replace( /\./g, '' ).replace( /\ /g, '' );

    if ( val.length == 3 + 3 + 4 ) {
        return val.substr( 0, 3 ) + '-' + val.substr( 3, 3 ) + '-' + val.substr( 6, 4 );
    }
    else if ( val.length == 3 + 4 + 4 ) {
        return val.substr( 0, 3 ) + '-' + val.substr( 3, 4 ) + '-' + val.substr( 7, 4 );
    }
    else {
        return val;
    }

    return val;
}


// phone validateion
function IsPhone( val ) {
    return isPhoneFormat( val );
}
function IsPhoneFormat( val ) {
    return isPhoneFormat( val );
}
function isPhoneFormat( val ) {
    val = val.replace( /\-/g, '' ).replace( /\./g, '' ).replace( /\ /g, '' );

    if ( isNaN( val ) ) {
        return false;
    }

    return val.length == 2 + 3 + 4 || val.length == 2 + 4 + 4 || val.length == 3 + 3 + 4 || val.length == 3 + 4 + 4
}


/* 비밀번호 복잡도 */
function checkPasswordComplex( pw ) {
    var regex = /^[a-zA-Z0-9]{4,6}$/g;
    if ( !regex.test( pw ) ) {
        alert( '비밀번호는 숫자와 영문자 조합으로 4~6자리를 사용해야 합니다.' );
        return false;
    }

    var chk_num = pw.search( /[0-9]/g );
    var chk_eng = pw.search( /[a-z]/ig );
    if ( chk_num < 0 || chk_eng < 0 ) {
        alert( '비밀번호는 숫자와 영문자를 혼용하여야 합니다.' );
        return false;
    }

    //if(/(\w)\1\1\1/.test(upw))
    //{
    //    alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.'); 
    //    return false;
    //}
    //if(upw.search(uid)>-1)
    //{
    //    alert('ID가 포함된 비밀번호는 사용하실 수 없습니다.'); 
    //    return false;
    //}

    return true;
}


function OnMobileBlur() {
    var mobile;
    if ( $( '#Mobile' ).length > 0 ) {
        var value = $( '#Mobile' ).val();
        $( '#Mobile' ).prop( 'value', setMobileFormat( value ) )
    } else if ( $( '#mobile' ).length > 0 ) {
        var value = $( '#mobile' ).val();
        $( '#mobile' ).prop( 'value', setMobileFormat( value ) )
    } else {
        return;
    }
}
function onMobileBlur() {
    OnMobileBlur();
}


function onEmailBlur() {
    var email;
}

/*
input[type=text]의 커서 이동
*/
$.fn.selectRange = function ( start, end ) {
    return this.each( function () {
        if ( this.setSelectionRange ) {
            this.focus();
            this.setSelectionRange( start, end );
        } else if ( this.createTextRange ) {
            var range = this.createTextRange();
            range.collapse( true );
            range.moveEnd( 'character', end );
            range.moveStart( 'character', start );
            range.select();
        }
    } );
};


/*
체크박스 그룹의 특정 항목 선택처리
*/
function setCheckbox( name, value ) {
    $( 'input[type="checkbox"][name="' + name + '"][value="' + value + '"]' ).prop( 'checked', true );
}


/*
단일선택 체크박스 선택처리
*/
function setCheckboxChecked() {    //클릭 이벤트 발생한 요소가 체크 상태인 경우
    if ( $( this ).prop( 'checked' ) ) {
        //체크박스 그룹의 요소 전체를 체크 해제후 클릭한 요소 체크 상태지정
        $( 'input[type="checkbox"][name="' + $( this ).prop( 'name' ) + '"]' ).prop( 'checked', false );
        $( this ).prop( 'checked', true );
    }
}



/*
radio 그룹의 특정 항목 선택처리
*/
function setRadioValue( name, value ) {
    $( "input[type='radio'][name='" + name + "'][value='" + value + "']" ).prop( 'checked', true );
}



// 국가코드 찾기 팝업
/*
parent page :
    $('#findCountryCode').click(function (e) {
        PopupCountryCode();
        e.preventDefault();
    });

    function setCountryCode(countryCode, countryNameK, countryNameE) {
        $('#countryCode').val(countryCode);
        $('#countryNameK').val(countryNameK);
        $('#countryNameE').val(countryNameE);
    }
*/
function PopupCountryCode() {
    PopupWindow( '/Common/CountryCode.aspx', 400, 250, 'CountryCode' );
}


function htmlEncode( value ) {
    if ( value ) {
        return $( '<div />' ).text( value ).html();
    } else {
        return '';
    }
}
function htmlDecode( value ) {
    if ( value ) {
        return $( '<div />' ).html( value ).text();
    } else {
        return '';
    }
}




// 브라우져 Parameter GET
function GetParam( key ) {
    // Find the key and everything up to the ampersand delimiter
    var value = RegExp( "" + key + "[^&]+" ).exec( decodeURI( window.location.search ) );

    // Return the unescaped value minus everything starting from the equals sign or an empty string
    return unescape( !!value ? value.toString().replace( /^[^=]+./, "" ) : "" );
}
function getParam( key ) {
    return GetParam( key );
}


// IE Version
/*
    <!--IE 버젼체크-->
    <script type="text/javascript">
        if(getIeVersion() <= 7)
        {
            window.location.href = '/Common/BrowserLowVersion.html';
        }
    </script>
*/
function GetIeVersion() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf( "MSIE " )

    if ( msie > 0 )      // If Internet Explorer, return version number
        return parseInt( ua.substring( msie + 5, ua.indexOf( ".", msie ) ) )
    else                 // If another browser, return 0
        return 9999
}
function getIeVersion() {
    return GetIeVersion()
}

/* 한글입력 
    <input type="text"
        id="visitorName"
        name="VisitorName"
        class="form-control reg-input"
        value="[VisitorName]"
        onkeyup="FormatHangul($(this));">    
*/
function FormatHangul( e ) {
    regexp = /^[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    v = e.val();
    if ( regexp.test( v ) ) {
        alert( "한글만 입력하세요" );
        e.val( v.replace( regexp, '' ) );
    }
}


/*
conditions
- jquery obj for input
- data type(AP: alphabet, N: number, HA: hangul, AN: alphanumeric)
- event type (click, keydown, keypress, keyup(*default) ...)
- handler binded event type (*optional)
- max length( *optional)

- example :
  addInputHandler({ input: $("#visitorName"), dataType: "HA" });

*/
function addInputHandler( conditions ) {
    var $input = conditions.input;
    var dataType = conditions.dataType;
    var eventType = conditions.eventType;
    if ( ( !$input ) || ( !dataType ) ) {
        throw { error: "NotEnoughArguments", errorMsg: "required argument is missing " + ( ( !$input ) ? " target input element" : " dataType" ) }
        return;
    }
    if ( $input[0].tagName != "INPUT" ) {
        throw { error: "IlregalTargetElement", errorMsg: "target element is not input" };
        return;
    }
    if ( ( !eventType ) ) {
        eventType = "keyup";
    }
    var handlerFunc = conditions.handler;
    if ( ( !handlerFunc ) ) {
        handlerFunc = function ( event ) {
            $( "#divKeyCode" ).empty().html( "<span> event key code = " + event.keyCode + "</span>" );
            var regEx = null;
            if ( dataType == "N" ) {
                regEx = /[^0-9]/gi;
            } else if ( dataType == "AP" ) {
                regEx = /[^a-z\ \.\,\-]/gi;
            } else if ( dataType == "AN" ) {
                regEx = /[^a-z0-9]/gi;
            } else if ( dataType == "HA" ) {
                regEx = /[a-z0-9]/gi;

            } else {
                throw { error: "IlregalDataType", errorMsg: "dataType(" + dataType + ") is incorrect" };
            }
            remainOnlyTargetValue( regEx, $input, event, dataType );
            //return true;
        };  // end of handlerFunc
    } // end of if to check handlerFunc
    $input.on( eventType, handlerFunc );

    if ( conditions.maxlength ) {
        $input.attr( "maxlength", conditions.maxlength );
    }

}
function remainOnlyTargetValue( regEx, $input, event, dataType ) {
    if ( ( !( event.keyCode >= 34 && event.keyCode <= 40 ) ) && event.keyCode != 16 ) {
        var inputVal = $input.val();
        if ( regEx.test( inputVal ) ) {
            $input.val( inputVal.replace( regEx, '' ) );
            var msg = "";
            if ( dataType == "HA" ) {
                msg = "한글만 입력 가능합니다.";
            } else if ( dataType == "AP" ) {
                msg = "알파벳만 입력 가능합니다.";
            } else if ( dataType == "AN" ) {
                msg = "알파벳 및 숫자만 입력 가능합니다.";
            }

            if ( msg != "" ) {
                alert( msg );
            }
        }
    }
}


/*
Datetime format 
ex) new Date().format("yyyy-MM-dd HH:mm:ss")
*/
String.prototype.string = function ( len ) { var s = '', i = 0; while ( i++ < len ) { s += this; } return s; };
String.prototype.zf = function ( len ) { return "0".string( len - this.length ) + this; };
Number.prototype.zf = function ( len ) { return this.toString().zf( len ); };
Date.prototype.format = function ( f ) {
    if ( !this.valueOf() ) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace( /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ( $1 ) {
        switch ( $1 ) {
            case "yyyy": return d.getFullYear();
            case "yy": return ( d.getFullYear() % 1000 ).zf( 2 );
            case "MM": return ( d.getMonth() + 1 ).zf( 2 );
            case "dd": return d.getDate().zf( 2 );
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf( 2 );
            case "hh": return ( ( h = d.getHours() % 12 ) ? h : 12 ).zf( 2 );
            case "mm": return d.getMinutes().zf( 2 );
            case "ss": return d.getSeconds().zf( 2 );
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    } );
};




/* 
 * 원본 : http://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie 
 * 수정본 : http://tonks.tistory.com/107 
 */
function get_version_of_IE() {

    var word;
    var version = "N/A";

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower ) 
    if ( name == "Microsoft Internet Explorer" ) word = "msie ";

    else {
        // IE 11 
        if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:";

        // Microsoft Edge  
        else if ( agent.search( "edge/" ) > -1 ) word = "edge/";
    }

    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );

    if ( reg.exec( agent ) != null ) version = RegExp.$1 + RegExp.$2;

    return version;
}


/*
메세지박스 표시
Timer이용
*/
function showAlert( msg ) {
    window.setTimeout( function () { alert( msg ); }, 200 );
}



/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * example
   12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
   123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
   12345678.9.format(0, 3, '-');       // "12-345-679"
 */
Number.prototype.format = function ( n, x, s, c ) {
    var re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\D' : '$' ) + ')',
        num = this.toFixed( Math.max( 0, ~~n ) );

    return ( c ? num.replace( '.', c ) : num ).replace( new RegExp( re, 'g' ), '$&' + ( s || ',' ) );
};




/*
다음 우편번호 팝업
*/
function popupDaumZipCode() {
    new daum.Postcode( {
        oncomplete: function ( data ) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if ( data.bname !== '' && /[동|로|가]$/g.test( data.bname ) ) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if ( data.buildingName !== '' && data.apartment === 'Y' ) {
                extraRoadAddr += ( extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName );
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if ( extraRoadAddr !== '' ) {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if ( fullRoadAddr !== '' ) {
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.

            if ( $( '#zipCode' ).length > 0 ) {
                $( '#zipCode' ).val( data.zonecode ).change(); //5자리 새우편번호 사용
            }
            if ( $( '#address1' ).length > 0 ) {
                $( '#address1' ).val( fullRoadAddr ).change();
            }

            if ( $( '#address2' ) ) {
                $( '#address2' ).focus(); //동/호수
            }
            //$('#address1').val(data.address).change(); // 기본주소
            //if (data.apartment === 'Y') {
            //    alert('동/호수를 입력하시기 바랍니다.');
            //    $('#address2').focus();
            //} else {
            //    alert('주소선택이 완료되었습니다.');
            //    $('#address2').val('동/호수(해당없음)');
            //}
        }
    } ).open();
}



/**
 * 1 --> 0001 
 * @param {any} n
 * @param {any} width
 */
function pad( n, width ) {
    n = n + '';
    return n.length >= width ? n : new Array( width - n.length + 1 ).join( '0' ) + n;
}


/**
 * 첫글자 대문자, 나머지 글자 소문자로 바꾸기
 * @param {any} text
 */
function capitalizeFirstLetter( text ) {
    var result = "";
    if ( text && text.length > 0 ) {
        text.split( ' ' ).forEach( function ( e, i ) {
            if ( e.length > 0 )
                result += e.substring( 0, 1 ).toUpperCase() + e.substring( 1 ).toLowerCase() + ' ';
        } );

        return result.trim();
    }
    else
        return text;
}



/**
 * IE와 호환되는 preventDefault()
 * 
 * */
function preventDefault() {
    window.event.preventDefault ? window.event.preventDefault() : ( window.event.returnValue = false );
}




/* jquery 확장 (https://stackoverflow.com/questions/4801655/how-to-go-to-a-specific-element-on-page)
 * scroll by element id
 * */
( function ( $ ) {
    $.fn.goTo = function () {
        $( 'html, body' ).animate( {
            scrollTop: $( this ).offset().top + 'px'
        }, 'fast' );
        return this; // for chaining...
    };
} )( jQuery );




////////////////////////////////////////////////////
// POLIFILL
////////////////////////////////////////////////////

/**
 * Number.prototype.format(n, x, s, c)
 * 
 */
/* ********************************************************
 * Number.prototype.format(n, x, s, c) polyfill
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * example
 *      12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
 *      123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
 *      12345678.9.format(0, 3, '-');       // "12-345-679"
 * */

Number.prototype.format = function ( n, x, s, c ) {
    var re = '\\d(?=(\\d{' + ( x || 3 ) + '})+' + ( n > 0 ? '\\D' : '$' ) + ')',
        num = this.toFixed( Math.max( 0, ~~n ) );

    return ( c ? num.replace( '.', c ) : num ).replace( new RegExp( re, 'g' ), '$&' + ( s || ',' ) );
};


/* ********************************************************
 * String.startsWith() polyfill
 * */

if ( !String.prototype.startsWith ) {
    String.prototype.startsWith = function ( search, pos ) {
        return this.substr( !pos || pos < 0 ? 0 : +pos, search.length ) === search;
    };
}


/* ********************************************************
 * String.endsWith() polyfill
 * */
if ( !String.prototype.endsWith ) {
    String.prototype.endsWith = function ( searchString, position ) {
        var subjectString = this.toString();
        if ( typeof position !== 'number' || !isFinite( position ) || Math.floor( position ) !== position || position > subjectString.length ) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf( searchString, position );
        return lastIndex !== -1 && lastIndex === position;
    };
}




// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if ( !Array.prototype.indexOf ) {
    Array.prototype.indexOf = function ( searchElement, fromIndex ) {

        var k;

        // 1. Let o be the result of calling ToObject passing
        //    the this value as the argument.
        if ( this == null ) {
            throw new TypeError( '"this" is null or not defined' );
        }

        var o = Object( this );

        // 2. Let lenValue be the result of calling the Get
        //    internal method of o with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = o.length >>> 0;

        // 4. If len is 0, return -1.
        if ( len === 0 ) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = fromIndex | 0;

        // 6. If n >= len, return -1.
        if ( n >= len ) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max( n >= 0 ? n : len - Math.abs( n ), 0 );

        // 9. Repeat, while k < len
        while ( k < len ) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of o with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of o with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if ( k in o && o[k] === searchElement ) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

/**
 * Array.find() IE에 추가
 * */
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if ( !Array.prototype.find ) {
    Object.defineProperty( Array.prototype, 'find', {
        value: function ( predicate ) {
            // 1. Let O be ? ToObject(this value).
            if ( this == null ) {
                throw new TypeError( '"this" is null or not defined' );
            }

            var o = Object( this );

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if ( typeof predicate !== 'function' ) {
                throw new TypeError( 'predicate must be a function' );
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while ( k < len ) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if ( predicate.call( thisArg, kValue, k, o ) ) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    } );
}



/**
 * Array.prototype.addItem(i)
 * item을 Array에 추가
 * 같은 값이 있으면 skip
 * */
if ( !Array.prototype.addItem ) {
    Object.defineProperty( Array.prototype, 'addItem', {
        value: function ( item ) {
            'use strict';
            if ( this == null ) {
                throw new TypeError( 'Array.prototype.addItem called on null or undefined' );
            }
            var me = Object( this );
            if ( me.indexOf( item ) < 0 ) {
                me.push( item );
            }
            return me;
        },
    } );
}

/**
 * Array.prototype.removeItem(i)
 * item을 Array에서 제거
 * 같은 값이 없으면 skip
 * */
if ( !Array.prototype.removeItem ) {
    Object.defineProperty( Array.prototype, 'removeItem', {
        value: function ( item ) {
            'use strict';
            if ( this == null ) {
                throw new TypeError( 'Array.prototype.removeItem called on null or undefined' );
            }
            var me = Object( this );
            var index = me.indexOf( item );
            if ( index >= 0 ) {
                me.splice( index, 1 );
            }
            return me;
        },
    } );
}



if ( !Array.prototype.findIndex ) {
    Object.defineProperty( Array.prototype, 'findIndex', {
        value: function ( predicate ) {
            'use strict';
            if ( this == null ) {
                throw new TypeError( 'Array.prototype.findIndex called on null or undefined' );
            }
            if ( typeof predicate !== 'function' ) {
                throw new TypeError( 'predicate must be a function' );
            }
            var list = Object( this );
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for ( var i = 0; i < length; i++ ) {
                value = list[i];
                if ( predicate.call( thisArg, value, i, list ) ) {
                    return i;
                }
            }
            return -1;
        },
        enumerable: false,
        configurable: false,
        writable: false
    } );
}





