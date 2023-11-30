const addBox = document.querySelector('.add_box');
const popupBox = document.querySelector('.popup_box');
const popupTitle = popupBox.querySelector('header p');
const closeIcon = popupBox.querySelector('header i');
const titleTag = popupBox.querySelector('input');
const descTag = popupBox.querySelector('textarea');
const addBtn = popupBox.querySelector('button');
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const notes = JSON.parse(localStorage.getItem('note') || '[]');
let isUpdate = false;
let updateId;

addBox.addEventListener('click', () => {
	popupTitle.textContent = 'Add a new Note';
	addBtn.textContent = 'Add note';
	popupBox.classList.add('show');
	document.querySelector('body').style.overflow = 'hidden';
	// 나중에 스크롤생기면
	if (window.innerWidth > 400) titleTag.focus();
});

closeIcon.addEventListener('click', () => {
	titleTag.value = '';
	descTag.value = '';
	popupBox.classList.remove('show');
	document.querySelector('body').style.overflow = 'auto';
});

showNote();
//동적으로 note를 생성합니다

//notes의 배열에 값이 존재하면 그 배열의 값을 가져다가 보여주는함수
function showNote() {
	if (!notes) return; //notes에 비어있다면 아무일이 안일어남
	const note = document.querySelectorAll('.note');
	note.forEach((el) => {
		el.remove();
	});
	notes.forEach((el, index) => {
		let filterDesc = el.description.replaceAll('\n', '<br/>');
		// notes=[{title,
		//     filterDesc,
		//     date: `${month} ${day}, ${year}`,},{},{},{}]
		// let lisss = document.createElement("li");
		// lisss.classList.add("note");
		// let detailsss = document.createElement("div");
		// detailsss.classList.add("details");
		// lisss.append(detailsss);
		let lis = `
        <li class="note">
            <div class="details">
                <p>${el.title}</p>
                <span>
                    ${filterDesc}
                </span>
            </div>
            <div class="bottom_content">
                <span>${el.date}</span>
                <div class="settings">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <ul class="menu">
                        <li><i class="fa-solid fa-pen"></i>Edit</li>
                        <li><i class="fa-solid fa-trash-can"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>
        `;
		addBox.inset;
		addBox.insertAdjacentHTML('afterend', lis);
		/*
insertAdjacentHTML("beforebegin",시작태그이전)
insertAdjacentHTML("afterbegin",시작태그이후)
insertAdjacentHTML("beforeend",종료태그이전)
insertAdjacentHTML("afterend",종료태그 이후)
*/
	});
}

//업데이트함수
function updateNote() {}

//딜리트함수
function deleteNote() {}

//addnote라는 버튼을 누리면 notes라는 변수배열에 값이 담겨서
//showNote함수에 의해서 화면에 보여지게

addBtn.addEventListener('click', () => {
	//해당값을 배열에 저장한다
	let title = titleTag.value.trim();
	let description = descTag.value.trim();
	if (title || description) {
		let currentDate = new Date();
		// console.log(currentDate);
		//Thu Nov 30 2023 14:17:45 GMT+0900 (한국 표준시)
		// console.log(currentDate.getMonth());
		//getMonth로 시간을 가져오면 인덱스형식으로 가져옵니다
		//11월인 지금 10으로 가져옵니다
		let month = months[currentDate.getMonth()];
		let day = currentDate.getDate();
		let year = currentDate.getFullYear();
		let noteInfo = {
			title,
			description,
			date: `${month} ${day}, ${year}`,
		};
		notes.push(noteInfo);

		localStorage.setItem('notes', JSON.stringify(notes));
		//업데이트가 안되는것 같음 해결요망
		showNote();
		closeIcon.click();
		//클로즈 버튼이 클릭이 되도록 함
	}
});
