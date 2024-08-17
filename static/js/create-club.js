document.getElementById('create-club').addEventListener('submit', function(event){
    event.preventDefault();

    const clubName = document.getElementById('clubName').value;
    const simpleIntroduce = document.getElementById('simpleIntroduce').value;
    const clubIntroduce = document.getElementById('clubIntroduce').value;
    const clubMemberNumber = document.getElementById('clubMemberNumber');
    const clubImgUrl = document.getElementById('clubImgUrl').value;

    if(!clubName || !simpleIntroduce || !clubIntroduce || !clubMemberNumber || !clubImgUrl){
        return;
    }

    window.location.href='index.html'

});