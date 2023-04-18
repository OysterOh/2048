// 16칸 만들기
const $board = document.querySelector('.game');
const $header = document.getElementById('main').querySelector('header');

function make4by4() {
    const arr = new Array(4);
    for (let i = 0; i < 4; i++) {
        arr[i] = new Array(4);
        for (var j = 0; j < 4; j++) {
            arr[i][j] = '';
        }

    }
    const $frag = document.createDocumentFragment;
    let frag = {};
    for (var i = 0; i < 4; i++) {
        frag[`frag${i}`] = document.createElement('ul');
        frag[`frag${i}`].setAttribute('class', [`r${i}`]);
        // console.log([`frag${i}`]);
        for (var j = 0; j < 4; j++) {
            const $item = document.createElement('li')
            $item.setAttribute('class', [`c${j}`]);
            const $text = document.createElement('p');
            $text.textContent = '0';
            $item.appendChild($text);
            frag[`frag${i}`].insertBefore($item, [`frag${i}`].lastChild);
            // console.log(frag[`frag${i}`]);
        }
        // $frag.insertBefore(frag[`frag${i}`], $frag.lastChild);
        // $frag.appendChild(frag[`frag${i}`]);

        // console.log(frag);
    }

    for (let i = 0; i < 4; i++) {
        $board.appendChild(frag[`frag${i}`]);
    }
    return arr;
}

function createRandom(arr) { // 처음 시작 숫자랜덤
    const cR = Math.floor(Math.random() * 3);
    let count = 0;
    while (count < 2) {
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);

        if (arr[row][col] > 0) {
            continue;
        }

        switch (cR) {
            case 0:
                arr[row][col] = 2;
                break;
            case 1:
                if (count === 0) {
                    arr[row][col] = 2;
                } else {
                    arr[row][col] = 4;
                }
                break;
            case 2:
                arr[row][col] = 4;
                break;
        }
        count++;
    }


    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // arr[i][j] = 0;
            const $content = $board.querySelector([`.r${i}`]).querySelector([`.c${j}`]).querySelector('p')
            $content.textContent = arr[i][j];
        }
    }

}

function contentsColor(arr) { //요소 배경색상

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            const $content = $board.querySelector([`.r${i}`]).querySelector([`.c${j}`]);
            if ($content.textContent > 0) {
                $content.style.background = `rgba(255, 0, 0,${Math.log2(arr[i][j])/10})`;
                if($content.textContent < 100)  $content.querySelector('p').style.fontSize = '60px';
                if($content.textContent > 100) $content.querySelector('p').style.fontSize = '45px';
                // console.log($content.textContent);
                
            } else {
                $content.style.background = '#fff';
            }
        }
    }
}

function insertElement(arr) { //배열을 요소에 삽입
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            const $content = $board.querySelector([`.r${i}`]).querySelector([`.c${j}`]).querySelector('p');
            $content.textContent = arr[i][j];
            // $content.style.transition = '0.1s';
        }
        contentsColor(arr);
    }
}

function insert2OR4(arr) { // 2또는 4 삽입
    let flag = true;
    while (flag) {
        let r = Math.floor(Math.random() * 2);
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);

        if (arr[row][col] > 0) {
            continue;
        }

        switch (r) {
            case 0:
                arr[row][col] = 2;
                break;
            case 1:
                arr[row][col] = 4;
                break;
        }
        flag = false;
    }

    return arr;
}

function compare(arr) {
    var count = [0, 0, 0, 0]; //left, right, top, bottom
    var t = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            let num = arr[i][j];
            let left = (j - 1 < 0 ? 0 : j - 1) == j ? null : arr[i][j - 1];
            let right = (j + 1 > 3 ? 3 : j + 1) == j ? null : arr[i][j + 1];
            let bottom = (i + 1 > 3 ? 3 : i + 1) == i ? null : arr[i + 1 > 3 ? 3 : i + 1][j];
            // let top = arr[i-1<0?0:i-1][j];
            let top = (i - 1 < 0 ? 0 : i - 1) == i ? null : arr[i - 1 < 0 ? 0 : i - 1][j];

            console.log(`num: arr${i}${j} :${num}  `);
            console.log(`left: ${left} ${typeof left} = ${left==num}`);
            console.log(`right: ${right} ${typeof right} = ${right==num}`);
            console.log(`top: ${top} ${typeof top} = ${top==num}`);
            console.log(`bottom: ${bottom} ${typeof bottom} = ${bottom==num}`);
            console.log('=======================');
            /*
            영역밖: undefined
            빈칸: '' /'string'
            숫자: integer / number
            */
            if (typeof num != 'string') {

                switch (typeof left) {
                    case 'string':
                        console.log('문자열이 감지됨');
                        count[0]++;
                        break;
                    case 'number':
                        if (left === num) {
                            console.log('숫자가 감지됨');
                            count[0]++;
                        } else {

                        }
                        break;
                    default:
                        break;
                }
                switch (typeof right) {
                    case 'string':
                        console.log('문자열이 감지됨');
                        count[2]++;
                        break;
                    case 'number':
                        if (right === num) {
                            console.log('숫자가 감지됨');
                            count[2]++;
                        } else {

                        }
                        break;
                    default:
                        break;
                }
                switch (typeof top) {
                    case 'string':
                        console.log('문자열이 감지됨');
                        count[1]++;
                        break;
                    case 'number':
                        if (top === num) {
                            console.log('숫자가 감지됨');
                            count[1]++;
                        } else {

                        }
                        break;
                    default:
                        break;
                }
                switch (typeof bottom) {
                    case 'string':
                        console.log('문자열이 감지됨');
                        count[3]++;
                        break;
                    case 'number':
                        if (bottom === num) {
                            console.log('숫자가 감지됨');
                            count[3]++;
                        } else {

                        }
                        break;
                    default:
                        break;
                }
            }
            console.log('countL ' + count[0]);
            console.log('countR ' + count[2]);
            console.log('countT ' + count[1]);
            console.log('countB ' + count[3]);

        }
    }


    console.log('count' + count);

    console.log(Math.log2(2048));

    return count;
}


(function () {
    let arr = make4by4();
    // console.log('======123=============');
    // console.log(arr);
    createRandom(arr);
    contentsColor(arr);

    document.body.addEventListener('keydown', e => {
        // console.log(e.keyCode);
        var total = 0,
            high = 0;

        // left : 37
        // right : 39
        // top : 38
        // bottom : 40
        var count = compare(arr); //키 입력 받기전 모든 칸 중 이동 가능한지 확인
        var point = 0;
        [...count].forEach(e => {
            point += e
        }); //상하좌우 무브값을 모두 더함

        if (point == 0) {
            const $end = document.querySelector('.end-title');
            if (!$end.getAttribute('id', 'end')) {
                $end.setAttribute('id', 'end');
            } else {
                const r = setInterval(() => { //game over 글자색 변경
                    const $over = document.querySelector('.over')
                    $over.querySelector('span').style.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
                }, 300);
                $end.querySelector('p').textContent = '3 초뒤 재시작합니다.';

                setTimeout(() => {
                    $end.querySelector('p').textContent = '2 초뒤 재시작합니다.';
                    setTimeout(() => {
                        $end.querySelector('p').textContent = '1 초뒤 재시작합니다.';
                    }, 1000);

                    setTimeout(() => {
                        $end.setAttribute('id', '');
                        $end.querySelector('p').textContent = '     ';
                        // $end.querySelector('.end-title').style.display = 'none';
                        location.reload();
                        clearInterval(r);
                    }, 2000);
                }, 1000);





            }

        } else {
            console.log('무브포인트' + point);

            if (!((e.keyCode >= 37) && (e.keyCode <= 40))) return;
            // switch (e.keyCode) { // 방향키
            //     case 37: //left
            //         for (var i = 0; i < 4; i++) {
            //             for (var j = 0; j < 4; j++) {
            //                 if (j === 0) {
            //                     // console.log(arr[i][j - 1]);
            //                 } //undefined
            //                 else {
            //                     for (var k = 0; k < 4; k++) {
            //                         if (typeof arr[i][k - 1] == 'string') {
            //                             arr[i][k - 1] = arr[i][k];
            //                             arr[i][k] = '';

            //                         } else if (typeof arr[i][k - 1] == 'number') {
            //                             if (arr[i][k - 1] == arr[i][k]) {
            //                                 arr[i][k - 1] *= 2;
            //                                 arr[i][k] = '';
            //                             }
            //                         }
            //                     }

            //                 }



            //             }
            //         }
            //         break;
            //     case 38: //top

            //         for (var i = 0; i < 4; i++) {
            //             for (var j = 0; j < 4; j++) {
            //                 //undefined

            //                 for (var k = 0; k < 4; k++) {
            //                     if (k === 0) {
            //                         // console.log(arr[i][j - 1]);
            //                     } else if (typeof arr[k - 1][i] == 'string') {
            //                         arr[k - 1][i] = arr[k][i];
            //                         arr[k][i] = '';

            //                     } else if (typeof arr[k - 1][i] == 'number') {
            //                         if (arr[k - 1][i] == arr[k][i]) {
            //                             arr[k - 1][i] *= 2;
            //                             arr[k][i] = '';
            //                         }
            //                     }
            //                 }

            //             }
            //         }

            //         break;
            //     case 39: //right

            //         for (var i = 0; i < 4; i++) {
            //             for (var j = 4; j > 0; j--) {
            //                 if (j === 4) {
            //                     // console.log(arr[i][j - 1]);
            //                 } //undefined
            //                 else {
            //                     // console.log(arr[i][j - 1]);
            //                     for (var k = 0; k < 3; k++) {
            //                         if (typeof arr[i][k + 1] == 'string') {
            //                             arr[i][k + 1] = arr[i][k];
            //                             arr[i][k] = '';

            //                         } else if (typeof arr[i][k + 1] == 'number') {
            //                             if (arr[i][k + 1] == arr[i][k]) {
            //                                 arr[i][k + 1] *= 2;
            //                                 arr[i][k] = '';
            //                             }
            //                         }
            //                     }

            //                 }
            //             }
            //         }

            //         break;
            //     case 40: //bottom

            //         for (var i = 0; i < 4; i++) {
            //             for (var j = 0; j < 4; j++) {
            //                 //undefined

            //                 for (var k = 0; k < 4; k++) {
            //                     if (3 - k === 0) {
            //                         // console.log(arr[i][j - 1]);
            //                     } else if (typeof arr[k + 1][i] == 'string') {
            //                         arr[k + 1][i] = arr[k][i];
            //                         arr[k][i] = '';



            //                     } else if (typeof arr[k + 1][i] == 'number') {
            //                         if (arr[k + 1][i] == arr[k][i]) {
            //                             arr[k + 1][i] = arr[k][i] * 2;
            //                             arr[k][i] = '';

            //                         }
            //                     }
            //                 }

            //             }
            //         }

            //         break;


            // }
            if (e.keyCode == 37 && count[0] > 0) { //left
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (j === 0) {
                            // console.log(arr[i][j - 1]);
                        } //undefined
                        else {
                            for (var k = 0; k < 4; k++) {
                                if (typeof arr[i][k - 1] == 'string') {
                                    arr[i][k - 1] = arr[i][k];
                                    arr[i][k] = '';

                                } else if (typeof arr[i][k - 1] == 'number') {
                                    if (arr[i][k - 1] == arr[i][k]) {
                                        arr[i][k - 1] *= 2;
                                        arr[i][k] = '';
                                    }
                                }
                            }

                        }



                    }
                }
                arr = insert2OR4(arr);
            } else if (e.keyCode == 38 && count[1] > 0) { //top
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        //undefined

                        for (var k = 0; k < 4; k++) {
                            if (k === 0) {
                                // console.log(arr[i][j - 1]);
                            } else if (typeof arr[k - 1][i] == 'string') {
                                arr[k - 1][i] = arr[k][i];
                                arr[k][i] = '';

                            } else if (typeof arr[k - 1][i] == 'number') {
                                if (arr[k - 1][i] == arr[k][i]) {
                                    arr[k - 1][i] *= 2;
                                    arr[k][i] = '';
                                }
                            }
                        }

                    }
                }
                arr = insert2OR4(arr);
            } else if (e.keyCode == 39 && count[2] > 0) { //right
                for (var i = 0; i < 4; i++) {
                    for (var j = 4; j > 0; j--) {
                        if (j === 4) {
                            // console.log(arr[i][j - 1]);
                        } //undefined
                        else {
                            // console.log(arr[i][j - 1]);
                            for (var k = 0; k < 3; k++) {
                                if (typeof arr[i][k + 1] == 'string') {
                                    arr[i][k + 1] = arr[i][k];
                                    arr[i][k] = '';

                                } else if (typeof arr[i][k + 1] == 'number') {
                                    if (arr[i][k + 1] == arr[i][k]) {
                                        arr[i][k + 1] *= 2;
                                        arr[i][k] = '';
                                    }
                                }
                            }

                        }
                    }
                }
                arr = insert2OR4(arr);
            } else if (e.keyCode == 40 && count[3] > 0) { //bottom
                for (var i = 0; i < 4; i++) {
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            //undefined

                            for (var k = 0; k < 4; k++) {
                                if (3 - k === 0) {
                                    // console.log(arr[i][j - 1]);
                                } else if (typeof arr[k + 1][i] == 'string') {
                                    arr[k + 1][i] = arr[k][i];
                                    arr[k][i] = '';



                                } else if (typeof arr[k + 1][i] == 'number') {
                                    if (arr[k + 1][i] == arr[k][i]) {
                                        arr[k + 1][i] = arr[k][i] * 2;
                                        arr[k][i] = '';

                                    }
                                }
                            }

                        }
                    }
                }
                arr = insert2OR4(arr);
            } else return;





            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (typeof arr[i][j] == 'number') {
                        total += arr[i][j];
                        high = Math.max(high, arr[i][j]);
                    }
                }
            }


            $header.querySelector('.total-point').textContent = total;
            $header.querySelector('.high-point').textContent = high;
            insertElement(arr);
        }

    });


})();