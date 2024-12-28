document.getElementById('openDialogButton').addEventListener('click', function() {
    document.getElementById('dialogBox').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('dialogBox').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});
