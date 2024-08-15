document.getElementById('info-form').addEventListener('submit', function(event){
    event.preventDefault();

    const infos = document.getElementsByClassName('info');
    let allFields = true;
    for(let i=0; i<infos.length; i++){
        if(infos[i].value.trim() === ''){
            allFields = false;
            break;
        }
    }

    if(allFields){
        window.location.href = '#'
    }
     
});