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
                playPauseBtn.textContent = '⏸️';
            } else {
                audio.pause();
                playPauseBtn.textContent = '▶️';
            }
        });

        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });

        let storyText = [
            "안녕하세요. 이 사이트는 포트폴리오 사이트입니다.",
            "들어가기 앞서, 간단한 규칙을 설명드리겠습니다.",
            "제가 누군지 흥미가 가신다면, 버튼을 눌러 점수판의 점수를 올려주세요.",
            "모든 버튼을 누른다면, 점수판의 표시가 MAX로 바뀝니다.",
            "점수가 MAX가 될시 저와 연락할 수 있는 연락망을 획득할 수 있게 됩니다.",
            "과연 제게 도달할 수 있을까요?",
            "행운을 빕니다!"
        ];

        let currentIndex = -1;
        let typingSpeed = 80;
        let typingInProgress = false;

        function startGame() {
            document.getElementById('game-start-btn').style.display = 'none'; // 게임 시작 버튼 숨김
            document.getElementById('story').style.opacity = '1'; // 텍스트 박스 표시
            displayText();
        }

        function displayText() {
            if (currentIndex < storyText.length - 1 && !typingInProgress) {
                currentIndex++;
                let storyElement = document.getElementById("text");
                storyElement.innerHTML = '';
                let text = storyText[currentIndex];
                let i = 0;
                typingInProgress = true;
                
                function type() {
                    if (i < text.length) {
                        storyElement.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, typingSpeed);
                    } else {
                        typingInProgress = false;
                    }
                }

                type();
            } else if (currentIndex === storyText.length - 1 && !typingInProgress) {
                // 모든 텍스트가 다 출력되었을 때, 마지막 메시지 처리
                document.getElementById("story").innerHTML = "잠시후 본 사이트로 이동합니다..."; // 마지막 메시지 출력
                countdownTimer(); // 카운트다운 함수 호출
            }
        }

        // 카운트다운을 시작하는 함수
        function countdownTimer() {
            let countdown = 5;
            let countdownElement = document.getElementById("countdown");
            countdownElement.innerHTML = `사이트 이동까지 ${countdown}초 남았습니다.`;
            
            let interval = setInterval(function() {
                countdown--;
                countdownElement.innerHTML = `사이트 이동까지 ${countdown}초 남았습니다.`;
                if (countdown <= 0) { 
                    clearInterval(interval);
                    window.location.href = "final.html"
                }
            }, 1000); 
        }