const FORM_ID = "data-form-id";
const DATE_FROM_ID = "date-from-id";
const DATE_TO_ID = "date-to-id";
const SET_CITY_ID = "cities-id";
const HOUR_FROM_ID = "hour-from-id";
const HOUR_TO_ID = "hour-to-id";
const NAME_DATE_FROM = "dateFrom";
const NAME_DATE_TO = "dateTo";
const NAME_SET_CITY = "city";
const NAME_HOUR_FROM = "hourFrom";
const NAME_HOUR_TO = "hourTo";
const CLASS_NAME_FORM_INPUT = "form-input";
const CLASS_NAME_DIV_SELECT = "form-select-group";
const CLASS_NAME_DIV_BUTTONS = "form-buttons";
const HOUR_SET = 24;

export class DataForm {
    #formElement;
    #parentElement;
    #hourFromElement;
    #hourToElement;
    #setCityElement;
    #dateFromElement;
    #dateToElement;
    #inputElements;
    constructor(parentId, maxDays, cities) {
        this.#parentElement = document.getElementById(parentId);
        if (!this.#parentElement) {
            throw `wrong perrent ID ${parentId}`;
        }
        this.#fillForm(this.#parentElement);
        this.#hourFromElement = document.getElementById(HOUR_FROM_ID);
        this.#hourToElement = document.getElementById(HOUR_TO_ID);
        this.#setCityElement = document.getElementById(SET_CITY_ID);
        this.#formElement = document.getElementById(FORM_ID);
        this.#dateToElement = document.getElementById(DATE_TO_ID);
        this.#dateFromElement = document.getElementById(DATE_FROM_ID);
        this.#inputElements = document.querySelectorAll(`#${FORM_ID} [name]`);
        this.#fillCities(cities);
        this.#fillHours(HOUR_SET);
        this.#setMinMaxDates(maxDays);
    }

    #fillForm(parentElement) {
        parentElement.innerHTML = `
        <form id="${FORM_ID}">
            <label for="${DATE_FROM_ID}" class="label-${DATE_FROM_ID}">Choose date from</label>
            <input required name="${NAME_DATE_FROM}" type="date" id="${DATE_FROM_ID}" class="${CLASS_NAME_FORM_INPUT}">

            <label for="${DATE_TO_ID}" class="label-${DATE_TO_ID}">Choose date to</label>
            <input required name="${NAME_DATE_TO}" type="date" id="${DATE_TO_ID}" class="${CLASS_NAME_FORM_INPUT}">

            <div class="${CLASS_NAME_DIV_SELECT}">
                <label for="${HOUR_FROM_ID}" class="label-${HOUR_FROM_ID}">Choose hour from</label>
                <select required name="${NAME_HOUR_FROM}" id="${HOUR_FROM_ID}" class="${CLASS_NAME_FORM_INPUT}">
                    <option value=""></option>                    
                </select>
            </div>

            <div class="${CLASS_NAME_DIV_SELECT}">
                <label for="${HOUR_TO_ID}" class="label-${HOUR_TO_ID}">Choose hour to</label>
                <select required name="${NAME_HOUR_TO}" id="${HOUR_TO_ID}" class="${CLASS_NAME_FORM_INPUT}">
                    <option value=""></option>                    
                </select>
            </div>

            <div class="${CLASS_NAME_DIV_SELECT}">
                <label for="${SET_CITY_ID}" class="label-${SET_CITY_ID}">Select City</label>
                <select required name="${NAME_SET_CITY}" id="${SET_CITY_ID}" class="${CLASS_NAME_FORM_INPUT}">
                    <option value=""></option>                    
                </select>
            </div>
            
            <div class="${CLASS_NAME_DIV_BUTTONS}">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>`
    }

    #setMinMaxDates(maxDays) {
        const current = new Date();
        const maxDayOfMonth = current.getDate() + maxDays;
        const maxDate = new Date();
        maxDate.setDate(maxDayOfMonth);
        const minDateStr = current.toISOString().split("T")[0];
        const maxDateStr = maxDate.toISOString().split("T")[0];
        this.#dateFromElement.min = minDateStr;
        this.#dateToElement.min = minDateStr;
        this.#dateFromElement.max = maxDateStr;
        this.#dateToElement.max = maxDateStr;
    }

    #fillCities(cities) {
        this.#setCityElement.innerHTML = Object.keys(cities).map(value => `<option value="${value}">${value}</option>`);
    }

    #fillHours(hours) {
        const res = [];
        for(let i = 0; i < hours; i++) {
            res.push(i);
        }        
        this.#hourFromElement.innerHTML = res.map((_, index) => `<option value="${index}">${index}</option>`);
        this.#hourToElement.innerHTML = res.map((_, index) => `<option value="${index}">${index}</option>`);
    }
   
    addHandler(handlerFunc) {
        this.#formElement.addEventListener("submit", async (event) => {
            event.preventDefault();
            const inputData = Array.from(this.#inputElements)
                .reduce((res, val) => {
                    res[val.name] = val.value;
                    return res;
                }, {});
                handlerFunc(inputData);
        })
    }
}

