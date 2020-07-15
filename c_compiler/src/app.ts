const btn = document.querySelector('button'); // ! - значит, что тут не будет null

/*
btn.addEventListener('click', () => {
    console.log('clicked');
});
*/

function clickHandler(message: string) {
    console.log('clicked!  ' + message);
}

if (btn) {
    btn.addEventListener('click', clickHandler.bind(this, 'clack'));
}