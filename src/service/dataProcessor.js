export class DataProcessor {
    #url;
    #cities;
    constructor(url, cities) {
        this.#url = url;
        this.#cities = cities;
    }
    async #getData(actualUrl) {
        const responseFromServer =
            await fetch(actualUrl);
        return responseFromServer.json();


    }
    async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
        const latLong = this.#cities[city];
        const actualUrl = this.#getActualUrl(latLong.latitude, latLong.longitude,
            startDate, endDate);
        const rawData = await this.#getData(actualUrl);
        return processRawData(rawData, hourFrom, hourTo);
    }
    #getActualUrl(latitude, longitude, startDate, endDate) {
        return `${this.#url}&latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`
    }
}
function processRawData(rawData, hourFrom, hourTo) {

    const timeArray = getHoursElements(rawData.hourly.time, hourFrom, hourTo);
    const temperatureArray = getHoursElements(rawData.hourly.temperature_2m, hourFrom, hourTo);;
    return timeArray.map((t, index) => {
        const res = {};
        const dateTime = t.split("T");
        res.date = dateTime[0];
        res.hour = dateTime[1];
        res.temperature = temperatureArray[index];
        return res;

    })
}
function getHoursElements(array, hourFrom, hourTo) {
    return array.filter((__, index) => {
        const hour = index % 24;
        return hour >= hourFrom && hour <= hourTo
    })
}