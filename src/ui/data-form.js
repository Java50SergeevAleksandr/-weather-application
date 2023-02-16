const FORM_ID = "data-form-id";
const DATE_FROM_ID = "date-from-id";
const DATE_TO_ID = "date-to-id";
const NAME_DATE_FROM = "dateFrom";
const NAME_DATE_TO = "dateTo";
const NAME_SET_CITIE = "city";
const NAME_HOUR_FROM = "hourFrom";
const NAME_HOUR_TO = "hourTo";
const CLASS_NAME_FORM_INPUT = "form-input";

export class DataForm {
    #formElement;
    #dateFromElement;
    #dateToElement;
    constructor(parentId, maxDays) {
        const parentElement = document.getElementById(parentId);
        this.#fillForm(parentElement);
        this.#formElement = document.getElementById(FORM_ID);
        this.#dateToElement = document.getElementById(DATE_TO_ID);
        this.#dateFromElement = document.getElementById(DATE_FROM_ID);
        this.#setMinMaxDates(maxDays);
    }
    #fillForm(parentElement) {
        parentElement.innerHTML = `
        <form id="${FORM_ID}">
            <label for="${DATE_FROM_ID}" class="label-${DATE_FROM_ID}">Choose date from:</label>
            <input required name="${NAME_DATE_FROM}" type="date" id="${DATE_FROM_ID}" class="${CLASS_NAME_FORM_INPUT}">

            <label for="${DATE_TO_ID}" class="label-${DATE_TO_ID}">Choose date to:</label>
            <input required name="${NAME_DATE_TO}" type="date" id="${DATE_TO_ID}" class="${CLASS_NAME_FORM_INPUT}">

            <div class="form-select-group">
                <label>Select City</label>
                <select required name="city" id="cities" class="form-select">
                    <option value="uuuu"></option>
                    
                </select>
            </div>
            

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
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

}