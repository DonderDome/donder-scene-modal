/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import 'mushroom-card';
import 'mushroom-light-card';
import 'mushroom-climate-card';
import { property, state } from "lit/decorators";
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers
import './editor';
import { CARD_VERSION } from './constants';

import type { BoilerplateCardConfig } from './types';
import { actionHandler } from './action-handler-directive';

/* eslint no-console: 0 */
console.info(
  `%c  Donder Scene Modal \n%c  version: ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'donder-scene-modal',
  name: 'Donder Scene Modal',
  description: 'A template custom card for you to create something awesome',
});

// TODO Name your custom element
export class BoilerplateCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // REPLACE "donder-scene-modal" with widget name, everywhere in the project
    // REPLACE the file name with the actual widget name
    return document.createElement('donder-scene-modal-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @property() state!: string
  @property() hass!: any
  @property() config!: any
  @property() event!: any
  @property() callback!: any
  @state() protected _active;
  @state() protected _mode = 'content';
  @state() protected _originalName = null;
  @state() protected _hourType = 0;
  @state() protected _minuteType = 0;
  @state() protected _schedule = {
    hour: "00",
    minutes: "00",
    event: null,
    scheduleSelection: "",
    days: [{name: "MON", state: false}, {name: "TUE", state: false}, {name: "WED", state: false}, {name: "THU", state: false}, {name: "FRI", state: false}, {name: "SAT", state: false}, {name: "SUN", state: false}]
  };
  // @state() protected _checkedEntities = {}; // Store the entity_ids of checked entities
  @state() protected _scene = {
    name: null,
    group: null,
    statuses: <any[]> [],
  }

  public setConfig(config: BoilerplateCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error('Invalid configuration');
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'Boilerplate',
      ...config,
    };
  }

  protected shouldUpdate(): boolean {
    if (!this.config) {
      return false;
    }

    return true;
  }

  public connectedCallback() {
    super.connectedCallback();

    if (this.config.scene) {
      this._scene = this.config.scene
      this._originalName = this.config.scene.name
      this._schedule = this.config.scene.schedule || this._schedule
    } else if (this.config.sceneName) {
      this._scene.name = this.config.sceneName
    } else if (this.config.roomName) {
      this._scene.group = this.config.roomName
    }
  }

  protected async serviceCall (domain: any, service: any, data: any, callback: any, feedback: any) {
    try {
      await this.hass.callService(domain, service, data);
      callback()
      if (feedback) {
        this.hass.callService('browser_mod', 'notification', {message: feedback, duration: 5000, browser_id: localStorage.getItem('browser_mod-browser-id'),})
      }
    } catch (error) {
        this.hass.callService('browser_mod', 'notification', {message: 'Oops, something went wrong..', duration: 5000, browser_id: localStorage.getItem('browser_mod-browser-id'),})
    }
  }

  protected getSensors() {
    const { sensors } = this.config
    return sensors.map((sensor: any) => {
      return html`<option value="${sensor.entity}">${sensor.name}</option>`
    })
  }

  protected handleCheckboxChange(device: any) {
    const { entity } = device
    const index = this._scene.statuses.findIndex(status => status.entity === entity)

    if (index > -1) {
      this._scene.statuses.splice(index, 1);
    } else {
      const attributes = {}
      
      if (device.type === 'shutters') {
        attributes['current_position'] = this.hass.states[entity].attributes.current_position
      } else {
        attributes['state'] = this.hass.states[entity].state
      }

      this._scene.statuses.push({
        entity,
        type: device.type,
        attributes
      })
    }

    this.requestUpdate('_scene'); 
  }

  protected renderShutterEntity(device: any, checkedClass: string, isChecked: boolean, typeIconMaps: any, index: number) {
    const { entity, name, type } = device
    const percentage = isChecked
      ? this._scene.statuses[index].attributes.current_position
      : this.hass.states[entity || ''].attributes?.current_position
    
    return html`
      <div class=${"entity "+checkedClass}>
        <div class="entity-check">
          <ha-switch
            .checked=${isChecked}
            @action=${() => this.handleCheckboxChange(device)}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.hold_action),
            })}>
          </ha-switch>
        </div>
        <div class='summary-shutter-wrapper'>
          <!-- <div class="entity-icon">
            <ha-icon icon=${`mdi:${typeIconMaps[type]}`}></ha-icon>
          </div> -->
          <div class='summary-shutter-name'>${name}</div>
          <div class='summary-shutter'>
            <ha-control-slider
              .value=${isChecked ? percentage : 0}
              min="0"
              max="100"
              mode="start"
              step="5"
              aria-disabled=${isChecked ? false : true}
              @value-changed=${(e) => {
                const target = e.target;
                const value = (target as HTMLInputElement).value;
                this._scene.statuses[index].attributes.current_position = value
                return true;
              }}
            ></ha-control-slider>
          </div>
        </div> 
      </div>     
    `
  }

  protected renderSwitchEntity(device: any, checkedClass: string, isChecked: boolean, index: number) {
    const { entity, name } = device
    const state = isChecked
      ? this._scene.statuses[index].attributes.state
      : this.hass.states[entity || ''].state

    return html`
      <div class=${"entity "+checkedClass}>
        <div class="entity-check">
          <ha-switch
            .checked=${isChecked}
            @action=${() => this.handleCheckboxChange(device)}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.hold_action),
            })}>
          </ha-switch>
        </div>
        <div class='summary-switch-wrapper'>
          <div class='summary-switch-name'>${name}</div>
          <div class='summary-switch'>
            <ha-control-select
              .options=${[{value: 'on', label: 'On'}, {value: 'off', label: 'Off'}]}
              .value=${state}
              @value-changed=${(e: any) => this._scene.statuses[index].attributes.state = e.target.value}
            >
            </ha-control-select> 
          </div>
        </div> 
      </div>   
    `
  }

  protected renderClimateEntity(device: any, checkedClass: string, isChecked: boolean, index: number) {
    const { entity, name } = device
    const state = isChecked
      ? this._scene.statuses[index].attributes.state
      : this.hass.states[entity || ''].state

    return html`
      <div class=${"entity "+checkedClass}>
        <div class="entity-check">
          <ha-switch
            .checked=${isChecked}
            @action=${() => this.handleCheckboxChange(device)}
            .actionHandler=${actionHandler({
              hasHold: hasAction(this.config.hold_action),
            })}>
          </ha-switch>
        </div>
        <div class='summary-climate-wrapper'>
          <div class='summary-climate-name'>${name}</div>
          <div class='summary-climate'>
          <mushroom-light-card
            .hass=${this.hass}
            .entity=${entity}
            .title=${this.config?.name || ''}
            .icon=${"mdi:lightbulb"}
          ></mushroom-light-card>
          </div>
        </div> 
      </div>   
    `
  }

  protected entityGroupComponents() {
    const groupedDevices = this.config.devices
      .reduce((groups, device) => {
        const group = device.group;
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(device);
        return groups;
      }, {})

      const typeIconMaps = {
        'lights': 'lightbulb-outline',
        'switch': 'toggle-switch-variant-off',
        'shutters': 'window-shutter',
        'climate': 'thermostat',
      }
    
      return Object.keys(groupedDevices)
        .map(group => {
          return html`
            <div class="scene-modal-group-wrapper">
              <div class="scene-modal-group-name">${group}</div>
              <div class="scene-modal-group-content">
                ${groupedDevices[group].map(device => {
                  const { entity, type, sceneable } = device
                  const index = this._scene.statuses.findIndex(status => status.entity === entity)
                  const isChecked = index >= 0;
                  const checkedClass = isChecked ? 'checked' : ''
                  // const status = isChecked
                  //   ? this._scene.statuses[index].type === 'shutters'
                  //     ? this._scene.statuses[index].attributes.current_position +'%'
                  //     : this._scene.statuses[index].attributes.state
                  //   : ''


                  if (sceneable) {
                    if (type === 'shutters')
                      return this.renderShutterEntity(device, checkedClass, isChecked, typeIconMaps, index)
                    else if (type === 'switch')
                      return this.renderSwitchEntity(device, checkedClass, isChecked, index)
                    else if (type === 'climate')
                      return this.renderClimateEntity(device, checkedClass, isChecked, index)
                  }
                  return html ``
                })}
              </div>
            </div>
          `
        })
  }

  protected updateEvent(e: any) {
    this._schedule.event = e.target.value
    this._schedule.scheduleSelection = 'event'
    this.requestUpdate('_scene');
  }

  protected updateCalendarDay(index: number) {
    this._schedule.days[index].state = !this._schedule.days[index].state
    this.requestUpdate('_schedule'); 
  }

  protected renderCalendarDays() {
    const selectedDays = this._schedule.days.filter(day => day.state).map(day => day.name);
    const selectionMessage = selectedDays.length === 0 ? 'No days selected' :
      selectedDays.length === 7 ? 'Everyday' :
      selectedDays.length === 5 && selectedDays.includes('MON') && selectedDays.includes('TUE') && 
      selectedDays.includes('WED') && selectedDays.includes('THU') && selectedDays.includes('FRI') ?
      'Weekdays' :
      selectedDays.length === 2 && selectedDays.includes('SAT') && selectedDays.includes('SUN') ?
      'Weekends' :
      `${selectedDays.length} days selected`;


    return html`
      <div class="scheduler-day-summary">
        ${selectionMessage}
      </div>
      <div class="scheduler-days">
        ${this._schedule.days.map((day, index) => {
          return html`
            <div class=${`scheduler-day ${day.state ? 'active' : ''}`} @click=${() => this.updateCalendarDay(index)}>
              <div class='scheduler-day-name'>${day.name}</div>
            </div>
          `
        })}
      </div>
    `
  }

  private allowOnlyNumbers(e: KeyboardEvent) {
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    const input = e.target as HTMLInputElement;
    const value = e.key;

    if (input.name === "schedule-hour") {
      if (this._hourType === 0) {
        input.value = value.padStart(2, '0');
        this._hourType = 1;
        this._schedule.hour = input.value;
      } else {
        input.value = (input.value.slice(1) + value).padStart(2, '0');
        if (parseInt(input.value) > 23) {
          input.value = '23';
        }
        this._schedule.hour = input.value;
        this._hourType = 0;
        const minutesInput = this.renderRoot.querySelector('.schedule-minutes') as HTMLInputElement;
        if (minutesInput) {
          minutesInput.focus();
        }
      }
    } else if (input.name === "schedule-minutes") {
      if (this._minuteType === 0) {
        input.value = value.padStart(2, '0');
        this._minuteType = 1;
        this._schedule.minutes = input.value;
      } else {
        input.value = (input.value.slice(1) + value).padStart(2, '0');
        if (parseInt(input.value) > 59) {
          input.value = '59';
        }
        this._schedule.minutes = input.value;
        this._minuteType = 0;
        input.blur();
      }
    }
  }

  protected handleTimeInputChange(event) {
    const [hour, minutes] = event.target.value.split(':');
    this._schedule.hour = hour;
    this._schedule.minutes = minutes;
    this._schedule.scheduleSelection = 'time'
    this.requestUpdate('_scene');
  }

  protected renderScheduler() {
    return html`
      <div class=${`scheduler-time ${this._schedule.scheduleSelection}`}>
        <div class='scheduler-time-clock'>
          <input
            type="text"
            name="schedule-hour"
            class="schedule-hour"
            value="${this._schedule.hour}"
            @focus=${() => { this._schedule.scheduleSelection = 'time'; this._hourType = 0 }}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
          <span>:</span>
          <input
            type="text"
            name="schedule-minutes"
            class="schedule-minutes"
            value="${this._schedule.minutes}"
            @focus=${() => { this._schedule.scheduleSelection = 'time'; this._minuteType = 0 }}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
        </div>
        <div class='scheduler-time-or'>OR</div>
        <div class='scheduler-time-event' @click=${() => this._schedule.scheduleSelection = 'event'}>
          <ha-control-select
            .options=${[{value: 'sunset', label: 'Sunset'}, {value: 'sunrise', label: 'Sunrise'}]}
            .value=${this._schedule.event}
            @value-changed=${(e: any) => this.updateEvent(e)}
          >
          </ha-control-select>
        </div>
      </div>
      <div class='scheduler-frequency'>
        ${this.renderCalendarDays()}
      </div>
    `
  }

  protected reduceKeys(device) {
    const { type, entity } = device
    const attributes = this.hass.states[entity].attributes
    return {
      type, entity,
      attributes: {
        current_position: attributes.current_position,
      }
    }
  }

  /** Create a function to update this._sceneName */
  protected updateSceneName(e: any) {
    this._scene.name = e.target.value
  }

  protected closeModal() {
    if (this.config.closeModal) {
      const env = this.hass.states['donder_env.global'].attributes
      this.hass.callService('browser_mod', 'popup', { 
        content: {
          type: 'custom:donder-summary-modal',
          entities: env[this.config.icon],
          env,
          showScenes: this.config.name === 'Routines'
        },
        size: "normal",
        left_button: "Close",
        left_button_action: this.hass.callService('browser_mod', 'close_popup', {browser_id: localStorage.getItem('browser_mod-browser-id')}),
        browser_id: localStorage.getItem('browser_mod-browser-id'),
        card_mod: {
          style:{
            "ha-dialog$": `div.mdc-dialog div.mdc-dialog__surface {
              max-width: 90%;
            }
            `,
          }
        }
      })
    } else {
      this.hass.callService('browser_mod', 'close_popup')
    }
  }

  /** Saves/overrides the data of all scenes */
  protected save() {
    const scenes = this.hass.states['donder_scenes.global']?.attributes
    const hasSchedule = this._schedule.days.some(day => day.state)

    if (this._originalName && scenes[this._originalName]) {
      delete scenes[this._originalName]
    }

    if (this._scene.name) {
      // Add a schedule structure to the scene object and save it accordingly. Make sure that we don't fuck up night/day scene triggers
      this.serviceCall(
        'donder_scenes',
        'write',
        {...scenes, [this._scene.name]: {...this._scene, schedule: hasSchedule ? this._schedule : null}},
        () => {
          this._originalName = this._scene.name;
          this.closeModal();
        },
        'Scene saved'
      )
    }    
  }

  protected deleteScene() {
    const scenes = this.hass.states['donder_scenes.global']?.attributes

    if (this._originalName && scenes[this._originalName]) {
      delete scenes[this._originalName]

      this.serviceCall(
        'donder_scenes',
        'write',
        scenes,
        () => {
          this.closeModal();
        },
        'Scene deleted'
      )
    }
  }

  protected editSchedule() {
    this._mode = this._mode === 'scheduler' ? 'content' : 'scheduler'
  }

  private _showWarning(warning: string): TemplateResult {
    return html`
      <hui-warning>${warning}</hui-warning>
    `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html`
      ${errorCard}
    `;
  }

  protected render(): TemplateResult | void {
    /*
      ## INTERFACE
      - this.hass: A lot of information about everything in HA, such as states, theme, etc. The source of the tree
        - states: States of each of the components available
      - this.config: Lovelace settings for this instance

      Example: this.hass.states[this.config.entities[0]] shows the state of the first component
     */

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning('warning message');
    }

    if (this.config.show_error) {
      return this._showError('error message');
    }

    const { isNested } = this.config
    const hasSchedule = this._schedule.days.some(day => day.state)

    return html`
      <ha-card
        tabindex="0"
        .label=${`Boilerplate: ${this.config || 'No Entity Defined'}`}
      >
        <div class=${`donder-widget ${this._mode} ${isNested ? 'nested' : ''} ${hasSchedule ? 'has-schedule' : ''} `}>
          <div class='scene-modal-header'>
            Scene:
            <input
              type="text"
              name="scene-name"
              class="scene-name"
              value="${this._scene.name || ''}"
              ?disabled=${this.config.locked ? true : false}
              @change=${(e: any) => this.updateSceneName(e)}
            />
            <div class='scene-modal-actions'>
              ${!this.config.locked && !this.config.isNew
                ? html`<button
                  class="button delete"
                  @action=${this.deleteScene}
                  .actionHandler=${actionHandler({
                    hasHold: hasAction(this.config.hold_action),
                  })}
                >
                  <ha-icon icon='mdi:trash-can-outline'></ha-icon>
                </button>` : null
              }
              <button
                class="button schedule"
                @action=${this.editSchedule}
                .actionHandler=${actionHandler({
                  hasHold: hasAction(this.config.hold_action),
                })}
              >
                <ha-icon icon='mdi:clock-time-three-outline'></ha-icon>
              </button>
            </div>
          </div>

          <div class='scene-modal-content'>
            ${this.entityGroupComponents()}
          </div>

          <div class='scene-modal-scheduler'>
            ${this.renderScheduler()}
          </div>          

          <div class='scene-modal-footer'>
            <button
              class="button cancel"
              @action=${() => this.closeModal()}
              .actionHandler=${actionHandler({
                hasHold: hasAction(this.config.hold_action),
              })}
            >Cancel</button>
            
            <button
              class="button back"
              @action=${() => this._mode = 'content'}
              .actionHandler=${actionHandler({
                hasHold: hasAction(this.config.hold_action),
              })}
            >Back</button>
              
            <button
              class="button save"
              ?disabled=${!this._scene.name}
              @action=${this._scene.name ? this.save : null}
              .actionHandler=${actionHandler({
                hasHold: hasAction(this.config.hold_action),
              })}
            >Save current state</button>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("donder-scene-modal", BoilerplateCard);
