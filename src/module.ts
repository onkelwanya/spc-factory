import { SPCFactoryForm } from './spc-factory-form';

console.log('SPC Factory module loaded.');

Hooks.on(
  'renderActorDirectory',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  (app: ActorDirectory, html: JQuery<HTMLElement>, data: any) => {
    console.log('Actor directory is being rendered');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'spc-factory-btn';
    button.textContent = 'SPC Factory';

    const headerActions = html.find('.header-actions');
    console.log('header-actions element:', headerActions);

    if (headerActions.length) {
      headerActions.append(button);
      console.log('SPC Factory button added to the actor directory');
    } else {
      console.error('Could not find the header-actions element');
    }

    button.addEventListener('click', () => {
      new SPCFactoryForm().render(true);
    });
  }
);
