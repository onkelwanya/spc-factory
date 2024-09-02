export class SPCFactoryForm extends FormApplication {
    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'spc-factory-form',
            title: 'SPC Factory',
            template: 'modules/spc-factory/src/templates/spc-factory.html',
            classes: ['spc-factory'],
            width: 400,
            height: 'auto',
            closeOnSubmit: true
        });
    }

    getData() {
        return {
            name: this.actor.name || '',
            species: 'human',
            challange: 'none',
            disposition: 'neutral'
        };
    }

    async _updateObject(event, formData) {
        console.log('Form data:', formData);
        
        ui.notifications.info("SPC generated!");
    }
}