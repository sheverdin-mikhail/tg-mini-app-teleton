import { GameTapEvent } from "../types/game";

// Функция для выбора случайного события на основе шансов
export function getRandomGameTapEvent(events: GameTapEvent[]): GameTapEvent {
    const totalChance = events.reduce((sum, event) => sum + event.chance, 0);
    let randomChance = Math.random() * totalChance;
  
    for (const event of events) {
      if (randomChance < event.chance) {
        return event;
      }
      randomChance -= event.chance;
    }
  
    // В случае ошибки или отсутствия совпадений, возвращаем последнее событие
    return events[events.length - 1];
  }