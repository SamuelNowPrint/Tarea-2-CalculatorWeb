let tasks = [];

var operacion=""

window.addEventListener('load', ()=> {
    const display = document.querySelector('.calculator-display');
    const keypadButtons = document.getElementsByClassName('keypad-button');
    const keypadButtonsArray = Array.from(keypadButtons);
    
    keypadButtonsArray.forEach( (button) => {
        button.addEventListener('click', () => {
            calculadora(button, display);
            boton = button.innerHTML
            operacion += boton.toString();
            if (operacion.includes('=') ||  operacion.includes('C')){
                operacion = ''
            }
        })
    })
})

function calculadora(button, display) {

    switch (button.innerHTML) {
        case 'C':
            borrar(display);
            break;

        case '=':
            calcular(display);
            break;

        default:
            actualizar(display, button); 
            break;
    }
}


function calcular(display) 
{
    display.innerHTML = eval(display.innerHTML)
    impresion = operacion + '=' + display.innerHTML
    const ul = document.querySelector('ul');
    if (impresion.includes('[object HTMLDivElement]')){
        impresion = impresion.replace('[object HTMLDivElement]', '')
    }

    const text = impresion;
    console.log(text)

    const task = {text}
    tasks = [...tasks, task]

    localStorage.setItem('tasks',JSON.stringify(tasks));
    const p = document.createElement('p');
    p.textContent = text;
    const li = document.createElement('li');
    li.appendChild(p);
    ul.appendChild(li);

    showTasks();
}


function showTasks()
{
    document.addEventListener('DOMContentLoaded',() => {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = `${task.text}`;
            li.appendChild(p);
            ul.appendChild(li);

        });
    });

}


function actualizar(display,button)
{
    
    if (display.innerHTML == 0) {display.innerHTML = '';}
    display.innerHTML += button.innerHTML;
    
}


function borrar(display)
{
    display.innerHTML = 0
}

function vaciar_historial()
{
    localStorage.removeItem('tasks');
    const p = document.createElement('p');
    p.innerHTML = "Vacio"
}