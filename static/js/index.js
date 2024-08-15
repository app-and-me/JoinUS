 document.getElementById('login-form').addEventListener('submit',function(event){
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const userPassword = document.getElementById('user-password').value;

    if(!userId || !userPassword){
        return;
    }
    window.location.href='studentPassword.html';
});

