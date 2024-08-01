import axios from "axios";
import moment from "moment";

export async function getDateTime() {
    try {
        // Запрос к API времени
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
        const utcDateTime = response.data.datetime;
        
        // Используем moment.js для работы с полученным временем
        const momentDate = moment.utc(utcDateTime);
        return momentDate
    } catch (error) {
        console.error('Ошибка получения времени:', error);
    }
}

