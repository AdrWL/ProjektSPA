export function NavButton(text, componentFunction){
    const navButton = document.createElement('button');

    navButton.classList.add('btn','btn-primary');
    navButton.textContent = text;

    navButton.addEventListener('click', () =>{
        const navigateEvent = new CustomEvent('navigate', {
            detail: componentFunction
        })

        document.body.dispatchEvent(navigateEvent)
    })


    return navButton;

}