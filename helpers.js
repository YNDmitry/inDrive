export function fadeOutAudio(audio, targetVolume, duration) {
  let volume = audio.volume;
  const step = (volume - targetVolume) / (duration / 10); // Определяем шаг уменьшения громкости
  const fade = setInterval(() => {
    if (volume > targetVolume) {
      volume -= step;
      audio.volume = Math.max(volume, targetVolume); // Убедимся, что громкость не становится меньше targetVolume
    } else {
      clearInterval(fade);
    }
  }, 10); // Обновляем громкость каждые 10 мс
}

export function fadeInAudio(audio, targetVolume, duration) {
  let volume = audio.volume;
  const step = (targetVolume - volume) / (duration / 10); // Определяем шаг увеличения громкости
  const fade = setInterval(() => {
    if (volume < targetVolume) {
      volume += step;
      audio.volume = Math.min(volume, targetVolume); // Убедимся, что громкость не становится больше targetVolume
    } else {
      clearInterval(fade);
    }
  }, 10); // Обновляем громкость каждые 10 мс
}
