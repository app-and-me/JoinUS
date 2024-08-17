document.getElementById('info-form').addEventListener('submit', function(event){
    event.preventDefault();

    const password = document.getElementsByClassName('input-password')[0].value;
    const recheckPassword = document.getElementsByClassName('input-recheck')[0].value;

    if(!password || !recheckPassword){
        return;
    }
    else if(password !== recheckPassword){
        alert('비밀번호가 일치하지 않습니다.');

        //비번 초기화
        document.getElementsByClassName('input-password')[0].value = ''
        document.getElementsByClassName('input-recheck')[0].value = ''
        document.getElementsByClassName('input-password')[0].focus()
        return;
    }

    window.location.href='index.html'
});