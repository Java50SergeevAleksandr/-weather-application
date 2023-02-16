import { weatherConfig } from "./config/weather_config.js";
import { DataProcessor } from "./service/dataProcessor.js";
import { DataForm } from "./ui/data-form.js";
import { Table } from "./ui/table.js";

const schema = [
    { columnName: 'Date', fieldName: 'date' },
    { columnName: 'Hour', fieldName: 'hour' },
    { columnName: "Temperature", fieldName: 'temperature' },
];
const url = weatherConfig.url;
const cities = weatherConfig.cities;
const tableWeatherResults = new Table("table-section", "Weather", schema);
const dataProcessor = new DataProcessor(url, cities);
const dataForm = new DataForm(form - section, weatherConfig.maxDays, cities);

async function handleData(inputData) {
    const processData = await dataProcessor.getTemperatureData(inputData.city, inputData.dateFrom, inputData.dateTo, inputData.hourFrom, inputData.hourTo);
    for (let i = 0; i < processData.lenght; i++) {
        tableWeatherResults.addRow(processData[i]);
    }   
}

dataForm.addHandler(handleData);