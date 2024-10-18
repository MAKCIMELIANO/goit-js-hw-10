import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
  inputTimer: document.querySelector('#datetime-picker'),
};

refs.btnStart.disabled = true;
refs.btnStart.classList.add('timer-button__disabled');
refs.inputTimer.classList.add('timer-input__disabled');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0];
      refs.btnStart.disabled = false;
      refs.btnStart.classList.add('timer-button__normal');
      refs.inputTimer.classList.add('timer-input__normal');
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.btnStart.classList.add('timer-button__disabled');
      refs.inputTimer.classList.add('timer-input__disabled');
    }
  },
};

const flatpickrInstance = flatpickr(refs.inputTimer, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.btnStart.addEventListener('click', () => {
  if (userSelectedDate) {
    const nowDate = new Date();
    const diff = userSelectedDate - nowDate;

    refs.btnStart.disabled = true;
    refs.btnStart.classList.remove('timer-button__normal');
    refs.inputTimer.classList.remove('timer-input__normal');
    refs.btnStart.classList.add('timer-button__disabled');
    refs.inputTimer.classList.add('timer-input__disabled');
    refs.inputTimer.disabled = true;

    const timerInterval = setInterval(() => {
      const remainingTime = diff - (new Date() - nowDate);
      const timeParts = convertMs(remainingTime);

      refs.days.textContent = timeParts.days;
      refs.hours.textContent = timeParts.hours;
      refs.minutes.textContent = timeParts.minutes;
      refs.seconds.textContent = timeParts.seconds;

      if (remainingTime <= 0) {
        refs.days.textContent = '0';
        refs.hours.textContent = '0';
        refs.minutes.textContent = '0';
        refs.seconds.textContent = '0';
        clearInterval(timerInterval);
        refs.btnStart.disabled = false;
        refs.inputTimer.disabled = false;
      }
    }, 1000);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Date not selected!',
      position: 'topRight',
    });
  }
});
