document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출을 막기.
    
    // 입력 필드 값 가져오기
    const password = document.getElementById('password').value;
    const recheckPassword = document.getElementById('recheck-password').value;

    // 값이 비어있음
    if (!password || !recheckPassword) {
        return; // 필드가 비어 있는 경우, 나머지 코드 실행을 중단
    } 
    
    if (password !== recheckPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        document.getElementById('password').value = ''; // 비밀번호 필드 초기화
        document.getElementById('recheck-password').value = ''; // 비밀번호 재확인 필드 초기화
        document.getElementById('password').focus()
        return; // 비밀번호가 일치하지 않는 경우
    }

    // 검증 성공 시 페이지 이동
    window.location.href = 'student-Info.html';
});

 