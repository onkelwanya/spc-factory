export class SPCFactoryForm extends FormApplication<
  FormApplicationOptions,
  any
> {
  constructor(options: Partial<FormApplicationOptions> = {}) {
    super(options);
  }

  static get defaultOptions(): FormApplicationOptions {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'spc-factory-form',
      title: 'SPC Factory',
      template: 'modules/spc-factory/src/templates/spc-factory.html',
      classes: ['spc-factory'],
      width: 400,
      height: 'auto',
      closeOnSubmit: true,
    }) as FormApplicationOptions;
  }

  async getData(): Promise<any> {
    return {
      name: '',
      species: 'human',
      challange: 'none',
      disposition: 'neutral',
    };
  }

  async _updateObject(event: Event, formData: any): Promise<void> {
    console.log('Form data:', formData);

    if (ui.notifications) {
      ui.notifications.info('SPC generated!');
    } else {
      console.warn('Notifications UI is not available.');
    }
  }
}
