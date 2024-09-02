import { SPCFactoryForm } from "./spc-factory-form.js";

console.log("SPC Factory module loaded.");

Hooks.on('renderActorDirectory', (app, html, data) => {
    console.log("My custom Hook on ready - should also do button");
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'spc-factory-btn';
    button.textContent = "SPC Factory";

    const headerActions = html.querySelector('.header-actions');
    if (headerActions) {
        headerActions.appendChild(button);
    }

    button.addEventListener('click', () => {
        console.log("nothing here yet.");
        
    })
});