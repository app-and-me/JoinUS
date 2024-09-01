 document.getElementById('login-form').addEventListener('submit',function(event){
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const userPassword = document.getElementById('user-password').value;

    if(!userId || !userPassword){
        return;
    }
    window.location.href='/templates/student/student-password.html';
});

document.addEventListener('DOMContentLoaded', function(){
    const koreanButton = document.getElementById('korean');
    const englishButton = document.getElementById('english');

    koreanButton.addEventListener('click', function(){
        koreanButton.classList.add('active');
        englishButton.classList.remove('active');
    });

    englishButton.addEventListener('click', function(){
       englishButton.classList.add('active');
       koreanButton.classList.remove('active'); 
    });
    
    
});

 