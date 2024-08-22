document.getElementById('logo-title').addEventListener('click', function(){
    window.location.href='home.html';
});

document.querySelector('.section-password').addEventListener('submit', function(event){
   event.preventDefault
   
    const beforePassword = document.getElementById('beforePassword').value;
    const afterPassword = document.getElementById('afterPassword').value;

    if(!beforePassword || !afterPassword){
        return;
    }
    else if(beforePassword === afterPassword){
        alert('이전과 다른 새로운 비밀번호를 입력해주세요.')
        document.getElementById('beforePassword').value = ''
        document.getElementById('afterPassword').value = ''
        document.getElementById('beforePassword').focus();
        return;
    }
    alert('수정이 완료되었습니다.');
    window.location.href = '/';
    // console.log(beforePassword)
});
 
 
