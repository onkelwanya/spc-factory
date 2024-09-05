/** Dependency Imports */
import Handlebars from 'handlebars';

/** Types Import */
import { SPCFactoryForm } from './SPCFactoryForm';

/** Settings Import */
import { getOpenAIApiKey } from './settings';

console.log('SPC Factory module loaded.');


Hooks.on('init', () => {
  console.log('SPC Factory | Initializing SPC Factory Module');

  Handlebars.registerHelper('t', (key: string) => {
    console.log('SPC Factory | Registring t helper function');
    return (game as Game).i18n.localize(key);
  });

  (game as Game).settings.register('spc-factory', 'openaiApiKey', {
    name: 'OpenAI API Key',
    hint: 'Enter your OpenAI API key to enable this module',
    scope: 'world',
    config: true,
    type: String,
    default: '',
  });
});

Hooks.on(
  'renderActorDirectory',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  (app: ActorDirectory, html: JQuery<HTMLElement>, data: any) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'spc-factory-btn';
    button.textContent = 'SPC Factory';

    const headerActions = html.find('.header-actions');

    if (headerActions.length) {
      headerActions.append(button);
    } else {
      console.error('SPC Factory | Could not find the header-actions element');
    }

    button.addEventListener('click', () => {
      const OPENAI_API_KEY = getOpenAIApiKey();
      if (!OPENAI_API_KEY) {
        ui.notifications?.error(
          'OpenAI API Key is not set. Please configure the key in the module options'
        );
        return;
      }
      new SPCFactoryForm().render(true);
    });
  }
);
