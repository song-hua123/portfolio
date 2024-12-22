let currentTextIndex = 0;
const profileTextElements = document.querySelectorAll('.profile-text');
const scoreButton = document.getElementById('score-button');

// `Enter` 키를 눌렀을 때 텍스트를 하나씩 표시
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && currentTextIndex < profileTextElements.length) {
    const currentText = profileTextElements[currentTextIndex];

    // 텍스트 표시 및 애니메이션 효과
    currentText.style.display = 'block';
    setTimeout(() => {
      currentText.style.opacity = 1; // 부드럽게 나타나게
    }, 10); // 조금 딜레이를 주어야 opacity 애니메이션이 적용됨

    currentTextIndex++;

    // 모든 텍스트가 표시되면 점수 버튼 활성화
    if (currentTextIndex === profileTextElements.length) {
      scoreButton.disabled = false; // 버튼 활성화
    }
  }
});

let scrollTimeout; // 타이머 변수 선언
let textComplete = false; // 텍스트가 모두 나왔는지 여부
let scoreActivated = false; // 점수란 활성화 여부

// 점수란이 활성화되었을 때 설정하는 함수
function checkScoreActivation() {
  const scoreButton = document.getElementById('score-button');
  scoreActivated = !scoreButton.disabled; // 점수란이 활성화되었는지 확인
  togglePromptVisibility();
}

// "엔터 키를 눌러봐" 문구 보이기/숨기기
function togglePromptVisibility() {
  const scrollPrompt = document.getElementById('scroll-prompt');

  if (scoreActivated) {
    // 텍스트가 다 나오고, 점수란이 활성화되었을 때 문구 숨김
    scrollPrompt.style.display = 'none';
  } else {
    // 그 외에는 문구 보이도록
    scrollPrompt.style.display = 'block';
  }
}


// 스크롤 이벤트
window.addEventListener('scroll', () => {
const scrollPrompt = document.getElementById('scroll-prompt');

// 스크롤을 했을 때 문구 보이게
if (!scoreActivated) {
scrollPrompt.style.opacity = 1; // 문구가 보이도록 설정

// 스크롤을 멈춘 후 일정 시간 지나면 문구 숨기기
clearTimeout(scrollTimeout);
scrollTimeout = setTimeout(() => {
  scrollPrompt.style.opacity = 0; // 문구가 서서히 사라지도록 설정
}, 500); // 0.5초 후에 숨김
}
});



// 'career-description'을 활성화하는 함수
function showCareerDescription(id) {
const description = document.getElementById(id);
const scoreButton = document.getElementById("score-button-career");

description.classList.add("show");

// 모든 설명이 표시되었는지 확인
const descriptions = document.querySelectorAll('.career-description');
const allDescriptionsVisible = Array.from(descriptions).every(description => description.classList.contains('show'));

// 모든 설명이 보일 때 버튼 활성화
if (allDescriptionsVisible) {
scoreButton.disabled = false;
}
}

// 'career-item' 클릭 이벤트 처리
document.querySelectorAll('.career-item').forEach(item => {
item.addEventListener('click', function onClick() {
const careerDescription = item.querySelector('.career-description');
showCareerDescription(careerDescription.id);

// 클릭한 후에는 더 이상 클릭할 수 없도록 이벤트 리스너 제거
item.removeEventListener('click', onClick);
});
});

// 점수 증가 로직
function increaseScore(button) {
const score = document.getElementById('score');
score.textContent = parseInt(score.textContent) + 1;

// 버튼 비활성화
button.disabled = true;
}



document.addEventListener('DOMContentLoaded', function() {
const skillBars = document.querySelectorAll('.skill'); // 모든 skill 항목 선택
const button = document.querySelector('#score-button-skill'); // 버튼 선택
let completedSkills = 0; // 완료된 skill의 수

// 버튼은 처음에 비활성화 상태
button.disabled = true;

// 각 skill에 대해 이벤트 리스너 설정
skillBars.forEach(skill => {
const skillBar = skill.querySelector('.skill-bar'); // 해당 skill의 게이지
const skillImage = skill.querySelector('img'); // 해당 skill의 이미지
let isCompleted = false; // 게이지가 보였는지 여부 추적

// 처음에 게이지는 숨김
skillBar.style.visibility = 'hidden';
skillBar.style.width = '0%'; // 게이지의 초기 너비 설정 (0%로 시작)

function showSkillBar() {
  if (!isCompleted) { // 게이지가 아직 안 보였다면
    skillBar.style.visibility = 'visible'; // 게이지를 보이게
    const percent = skillBar.getAttribute('data-percent'); // data-percent 값을 가져와서
    skillBar.style.width = percent; // 해당 percent 값으로 너비 설정
    const percentText = skillBar.querySelector('.percent-text');
    percentText.textContent = percent; // 수치 텍스트 업데이트
    percentText.style.visibility = 'visible'; // 텍스트도 보이게 설정
    isCompleted = true; // 게이지가 보였으므로 isCompleted를 true로 설정
    completedSkills++; // 완료된 스킬 수 증가
    skillImage.removeEventListener('mouseover', showSkillBar); // 이미지에서 이벤트 리스너 제거
  }

  // 모든 게이지가 완료되었으면 버튼 활성화
  if (completedSkills === skillBars.length) {
    button.disabled = false; // 모든 게이지가 완료되면 버튼 활성화
  }
}

skillImage.addEventListener('mouseover', showSkillBar); // 이미지에만 이벤트 리스너 추가
});
});



document.getElementById('guestbook-form').addEventListener('submit', function handleSubmit(event) {
event.preventDefault(); // 기본 폼 제출 방지

const name = document.getElementById('name').value;
const message = document.getElementById('message').value;

if (name && message) {
// 성공적인 폼 제출
saveMessage(name, message);

// 방명록 폼 제출 버튼 비활성화 (회색 버튼으로 처리)
const sendButton = document.getElementById('send-button');
sendButton.disabled = true;
sendButton.style.backgroundColor = "#cccccc"; // 비활성화 시 회색 버튼
sendButton.style.cursor = "not-allowed"; // 마우스 포인터 변경

// 점수 획득 버튼 활성화
const scoreButton = document.getElementById('score-button-guestbook');
scoreButton.disabled = false;
scoreButton.style.backgroundColor = ""; // 기본 색상으로 복원
scoreButton.style.cursor = "pointer";

// 폼 비활성화 메시지 표시
alert("방명록은 한 번만 작성할 수 있습니다!");
} else {
alert("이름과 메시지를 모두 입력해 주세요.");
}
});

function saveMessage(name, message) {
const messages = getMessages();

// 새 메시지를 배열에 추가
messages.push({ name, message });

// 로컬 스토리지에 메시지 저장
localStorage.setItem('guestbookMessages', JSON.stringify(messages));

// 메시지 표시
displayMessages();

// 성공 메시지 표시
document.getElementById('confirmation-message').style.display = "block";
document.getElementById('error-message').style.display = "none";

// 폼 초기화 (입력 필드만 초기화)
document.getElementById('guestbook-form').reset();
}

function getMessages() {
const messages = localStorage.getItem('guestbookMessages');
return messages ? JSON.parse(messages) : [];
}

function displayMessages() {
const messages = getMessages();
const guestbookMessagesDiv = document.getElementById('guestbook-messages');

guestbookMessagesDiv.innerHTML = ''; // 기존 메시지 비우기

messages.forEach(message => {
const messageDiv = document.createElement('div');
messageDiv.classList.add('message');
messageDiv.innerHTML = `<strong>${message.name}</strong><p>${message.message}</p>`;
guestbookMessagesDiv.appendChild(messageDiv);
});
}

// 페이지가 로드될 때 메시지 표시
window.onload = function() {
displayMessages();

// 점수 획득 버튼 초기 비활성화 설정
const scoreButton = document.getElementById('score-button-guestbook');
scoreButton.disabled = true;
scoreButton.style.backgroundColor = "#cccccc"; // 초기 비활성화 상태
scoreButton.style.cursor = "not-allowed";
};


// 모든 방명록 삭제
document.getElementById('delete-messages-button').addEventListener('click', function() {
// 로컬 스토리지에 저장된 방명록 삭제
localStorage.removeItem('guestbookMessages');

// 화면에서 방명록 내용 초기화
displayMessages();

alert("모든 방명록이 삭제되었습니다.");
});

function displayMessages() {
const messages = getMessages();
const guestbookMessagesDiv = document.getElementById('guestbook-messages');

guestbookMessagesDiv.innerHTML = ''; // 기존 메시지 비우기

if (messages.length === 0) {
// 방명록이 없을 경우 안내 메시지 표시
guestbookMessagesDiv.innerHTML = '<p>아직 작성된 방명록이 없습니다.</p>';
} else {
messages.forEach(message => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.innerHTML = `<strong>${message.name}</strong><p>${message.message}</p>`;
  guestbookMessagesDiv.appendChild(messageDiv);
});
}
}


// 점수 및 버튼 상태 관리
let score = 0; // 점수 초기화
const maxScore = 4; // 최대 점수 (버튼 개수)

function increaseScore(button) {
  // 버튼 비활성화
  button.disabled = true;

  // 점수 증가
  score++;

  // 점수 업데이트
  const scoreDisplay = document.getElementById('score');
  if (score < maxScore) {
    scoreDisplay.textContent = score; // 현재 점수 표시
  } else {
    scoreDisplay.textContent = "MAX"; // 점수 MAX 표시
  }

  // 점수가 MAX에 도달했을 때
  if (score >= maxScore) {
    // 경고문구 출력
    alert("점수가 MAX에 도달했습니다. 연락처가 나왔습니다!\n맨 밑을 확인해주세요! :)");

    // contact 섹션 표시
    document.getElementById('contact').style.display = 'block';

    // score 버튼 비활성화
    button.disabled = true;
  }
}






const audio = document.getElementById('background-audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeSlider = document.getElementById('volume-slider');

window.addEventListener('load', () => {
  if (!audio.paused) {
    playPauseBtn.textContent = '⏸️'; // 일시 정지 버튼
  } else {
    playPauseBtn.textContent = '▶️'; // 재생 버튼
  }
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️'; // 일시 정지 버튼
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️'; // 재생 버튼
  }
});

volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
}); 

// MAX 점수 클릭 이벤트 추가
const scoreText = document.getElementById("score-text");
const contactSection = document.getElementById("contact");

scoreText.addEventListener("click", () => {
  // 점수가 MAX인지 확인
  if (scoreText.textContent === "MAX") {
    // Contact 섹션 표시
    contactSection.style.display = "block";
  }
});
