import { weatherConfig } from "./config/weather_config.js";
import { DataProcessor } from "./service/dataProcessor.js";

const schema = [
    {columnName: 'Date', fieldName: 'date'},
    {columnName: 'Hour', fieldName: 'hour'},
    {columnName: "Temperature", fieldName: 'temperature'},   
]

const tableWeatherResults = new Table("table-section", "Weather", schema);

const url = weatherConfig.url;
const cities = weatherConfig.cities;
const dataProcessor = new DataProcessor(url, cities);
// async function displayTemperatures() {
//     const data = await dataProcessor.getTemperatureData("Haifa", "2023-02-14", "2023-02-15", "10", "12");
//     console.log(data);
// }
// displayTemperatures();

async function handleData(videoData) {
    const message = checkPlayingTime(videoData.playingTime);
    if(!message) {
        videoPlayer.setUrl(videoData.selectedVideo);
        videoPlayer.start();
        await sleep(videoData.playingTime * 1000);
        videoPlayer.stop();
    }
    return message;
}

inputForm.addHandler(handleData);