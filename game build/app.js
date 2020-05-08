const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

//html5 안의 픽셀을 다루는 요소
//canvas 기본적으로 이미지를 생성

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE; //pixel 가용 사이즈 부여

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //캔버스 초기설정

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; //클릭 없을 시 사용 x 기본으로 놓음
let filling = false;

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y); 마우스 움직임따라 연속적 좌표 생기는 지 확인
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y); //클릭 않을 시 마우스 위치 추적
    } else {
        ctx.lineTo(x, y); //클릭 했을 시 마우스 좌표 기반으로 라인 생성
        ctx.stroke();
    }
}
// canvas 사이즈 적용 안하면 드래그 실현 안됨

/*function onMouseDown(event) {
    paintng = true; //클릭 시 painting 발생
}*/

/*function onMouseUp(event) {
    stopPainting();
}*/

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; //클릭 지점 rgb값 도출 아래 버튼으로 선택 범위 제한됨
    ctx.strokeStyle = color; //포인터 색 선택 target으로 부터 색상 받아 rgb값으로 변경 
    // rgb 색상 확인 console.log(color)
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    //console.log(event.target.value);로 굵기조절 바 return값 확인
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE) //시작좌표 x, y, 가로 세로 길이
    } else {

    }
}

function handleCM(event) {
    event.preventDefault(); //우클릭 방지 contextmenu 출력 불가
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[★]"; //download = anchor("a") tag의 attribute
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas,addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //contextmenu : 우클릭시 나오는 메뉴
}

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
/*일반적으로 실행하면 htmlcollection으로 나옴, array를 원하기 때문에 array 형성
Array.from() 객체로 부터 array 형성, forEach()로 각각의 항목 가져옴*/
