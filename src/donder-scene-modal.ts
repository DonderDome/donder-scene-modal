/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
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

  static get styles(): CSSResultGroup {
    return css`
      .type-custom-donder-scene-modal {
        height: 100%;
        width: 100%;
        background: transparent;
        --mdc-icon-size: 16px;
      }
      .donder-widget {
        height: 100%;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        padding-bottom: 0;
        background-color: transparent;
        color: var(--text-primary-color);
        border-radius: var(--ha-card-border-radius)
      }
      .donder-widget.nested {
        padding: 0px;
      }
      .scene-modal-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .scene-modal-header input {
        background: none;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        padding-bottom: 5px;
        margin-left: 10px;
        position: relative;
        top: 2px;
        font-size: 1em;
      }
      .scene-modal-content {
        display: flex;
        max-width: 100%;
        flex-wrap: wrap;
      }
      .scene-modal-group-wrapper {
        box-sizing: border-box;
        margin-bottom: 40px;
        flex: 1 0 50%;
        max-width: 50%;
      }
      .scene-modal-group-wrapper .scene-modal-group-name {
        opacity: .6;
        margin-bottom: 10px;
        font-size: .8em;
      }
      .scene-modal-group-wrapper:nth-child(even) {
        padding-left: 20px;
      }
      .scene-modal-group-wrapper:nth-child(odd) {
        padding-right: 20px;
      }
      .entity {
        /* opacity: 0.5; */
        /* display: flex; */
        /* border: 1px solid rgba(255, 255, 255, 0.3); */
        /* border-radius: 5px; */
        padding: 10px 10px 10px 50px;
        /* margin-bottom: 10px; */
        position: relative;
      }
      .entity-name {
        margin-left: 10px;
        font-size: .9em;
        color: white;
      }
      .summary-shutter {
        position: relative;
      }
      .summary-shutter::after,
      .summary-switch::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        clear: both;
      }
      .entity.checked .summary-shutter-wrapper,
      .entity.checked .summary-switch-wrapper {
        opacity: 1;
      }
      .entity.checked .summary-shutter::after,
      .entity.checked .summary-switch::after {
        display: none;
      }
      .entity .summary-shutter-name {
        padding-right: 30px;
        /* padding-top: 5px; */
        /* opacity: .8; */
        /* flex: 2; */
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        z-index: 10;
        /* text-shadow: 1px 1px 0px rgba(0,0,0,0.3); */
        pointer-events: none;
      }
      .entity.checked .summary-shutter-name {
        color: white;
      }
      .summary-switch-wrapper {
        display: flex;
      }
      .summary-switch-name {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 10px;
      }
      .summary-switch {
        flex: 1;
      }
      .entity-icon {
        width: 18px;
        /* color: #ccc; */
      }
      .entity-check {
        width: 18px;
        color: white;
        position: absolute;
        top: 20px;
        left: 0px;
      }
      .entity-status {
        font-style: italic;
        opacity: .5;
        font-size: .9em;
        margin-left: 10px;
      }
      .scene-name {
        text-transform: uppercase
      }
      .scene-modal-footer {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin: -10px -25px;
        padding-top: 12px;
      }
      .scene-modal-footer button {
        background: none;
        border: none;
        color: rgb(3, 169, 244);
        font-size: .9em;
        font-weight: 500;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
      }
      .scene-modal-footer button.cancel {
        color: rgb(255, 255, 255, .4);
      }
      .scene-modal-actions {
        position: absolute;
        right: 10px;
      }
      .scene-modal-actions button {
        width: 48px;
        padding: 7px 13px;
        opacity: 0.6;
        margin-right: 10px;
      }
      .summary-shutter-wrapper,
      .summary-switch-wrapper {
        width: 100%;
        position: relative;
        opacity: .5;
      }
      .summary-shutter-wrapper ha-control-slider {
        --control-slider-color: var(--transparent);
        border: 2px dashed var(--disabled-color);
        --control-slider-background: #fff;
      }
      .entity.checked .summary-shutter-wrapper ha-control-slider {
        --control-slider-color: var(--primary-color);
        border: 2px dashed transparent;
      }
      .scene-modal-scheduler {
        display: flex;
        margin-bottom: 30px;
        margin-top: 50px;
        flex-direction: column;
      }
      .scene-modal-scheduler .scheduler-time,
      .scene-modal-scheduler .scheduler-frequency {
        flex: 1;
      }
      .scene-modal-scheduler .scheduler-frequency {
        display: flex;
        justify-content: center;
        padding: 40px 0;
      }
      .scene-modal-scheduler .scheduler-time {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--disabled-color);
        padding-bottom: 30px;
      }
      .scheduler-time .scheduler-time-clock {
        display: flex;
        justify-content: center;
        padding: 3px 0;
      }
      .scheduler-time .scheduler-time-clock input {
        background: none;
        border: none;
        padding-bottom: 5px;
        margin-left: 10px;
        position: relative;
        top: 2px;
        font-size: 4em;
        width: 100px;
        text-align: center;
      }
      .scheduler-time .scheduler-time-clock .schedule-hour::after {
        content: ""; 
      }
      .scheduler-time .scheduler-time-or {
        text-align: center;
        color: var(--disabled-color);
        height: 10px;
        position: relative;
        margin: 20px;
      }
      .scheduler-time .scheduler-time-clock span {
        font-size: 4em;
        width: 0px;
      }
      .scheduler-time .scheduler-time-event,
      .scheduler-time .scheduler-time-clock {
        flex: 1;
        background-color: var(--ha-card-background);
        border-radius: var(--scenery-border-radius);
        max-width: 300px;
        align-items: center;
      }
      .scheduler-time .scheduler-time-event {
        padding: 20px;
      }
      .scene-modal-scheduler .scheduler-day {
        text-align: center;
        border-radius: 50%;
        background: var(--disabled-color);
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 40px;
        margin: 0px 10px;
        cursor: pointer;
      }
      .scene-modal-scheduler .scheduler-day.active {
        background-color: var(--primary-color);
      }
      .content .scene-modal-scheduler,
      .scheduler .scene-modal-content {
        display: none;
      }
      .scheduler .scene-modal-actions button {
        /* background-color: rgba(214, 163, 25, .2);
        border: 1px solid rgb(214, 163, 25); */
      }
      @media (max-width: 600px) {
        .scene-modal-group-wrapper {
          flex: 1 0 100%;
          max-width: 100%;
        }
        .scene-modal-header {
          flex-direction: column;
        }
        .scene-modal-actions {
          position: initial;
        }
        .scene-modal-actions button:nth-child(2) {
          margin-right: 0px;
        }
        .scene-modal-header input {
          margin-bottom: 20px;
          text-align: center;
        }
        .scene-modal-group-wrapper:nth-child(even) {
          padding-left: 0px;
        }
        .scene-modal-group-wrapper:nth-child(odd) {
          padding-right: 0px;
        }
      }
    `;
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
                    else
                      return this.renderSwitchEntity(device, checkedClass, isChecked, index)
                  } else {
                    return html ``
                  }})
                }
              </div>
            </div>
          `
        })
  }

  protected detectDeviceType() {
    const ua = navigator.userAgent;
  
    // Check if the user agent is a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  
    // Check if the user agent is a tablet
    const isTablet = /iPad|Android|Touch/i.test(ua) && !/Mobile/i.test(ua);
  
    if (isMobile) {
      if (isTablet) {
        return 'Tablet';
      }
      return 'Mobile';
    } else {
      return 'Desktop';
    }
  }

  protected updateEvent(e: any) {
    console.log(e.target.value)
    this._schedule.event = e.target.value
  }

  protected updateCalendarDay(index: number) {
    this._schedule.days[index].state = !this._schedule.days[index].state
    this.requestUpdate('_schedule'); 
  }

  protected renderCalendarDays() {
    return html`
      ${this._schedule.days.map((day, index) => {
        return html`
          <div class=${`scheduler-day ${day.state ? 'active' : ''}`} @click=${() => this.updateCalendarDay(index)}>
            <div class='scheduler-day-name'>${day.name}</div>
          </div>
        `
      })}
    `
  }
  protected resetHourType() {
    this._hourType = 0;
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

  protected renderScheduler() {
    return html`
      <div class='scheduler-time'>
        <div class='scheduler-time-clock'>
          <input
            type="text"
            name="schedule-hour"
            class="schedule-hour"
            value="${this._schedule.hour}"
            @focus=${() => this._hourType = 0}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
          <span>:</span>
          <input
            type="text"
            name="schedule-minutes"
            class="schedule-minutes"
            value="${this._schedule.minutes}"
            @focus=${() => this._minuteType = 0}
            @keydown=${this.allowOnlyNumbers}
            maxlength="2"
          />
        </div>
        <div class='scheduler-time-or'>OR</div>
        <div class='scheduler-time-event'>
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

    if (this._originalName && scenes[this._originalName]) {
      delete scenes[this._originalName]
    }

    if (this._scene.name) {
      this.serviceCall(
        'donder_scenes',
        'write',
        {...scenes, [this._scene.name]: this._scene},
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

    return html`
      <ha-card
        tabindex="0"
        .label=${`Boilerplate: ${this.config || 'No Entity Defined'}`}
      >
        <div class=${`donder-widget ${this._mode} ${isNested ? 'nested' : ''}`}>
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
                  class="button"
                  @action=${this.deleteScene}
                  .actionHandler=${actionHandler({
                    hasHold: hasAction(this.config.hold_action),
                  })}
                >
                  <ha-icon icon='mdi:trash-can-outline'></ha-icon>
                </button>` : null
              }
              <button
                class="button"
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
              class="button"
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
