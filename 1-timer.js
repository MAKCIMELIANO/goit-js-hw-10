import"./assets/styles-C3X0D_Cu.js";import{f as m,i as o}from"./assets/vendor-BbbuE1sJ.js";const t={timer:document.querySelector(".timer"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]"),btnStart:document.querySelector("[data-start]"),inputTimer:document.querySelector("#datetime-picker")};t.btnStart.disabled=!0;t.btnStart.classList.add("timer-button__disabled");t.inputTimer.classList.add("timer-input__disabled");let r=null;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]>new Date?(r=e[0],t.btnStart.disabled=!1,t.btnStart.classList.add("timer-button__normal"),t.inputTimer.classList.add("timer-input__normal")):(o.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),t.btnStart.classList.add("timer-button__disabled"),t.inputTimer.classList.add("timer-input__disabled"))}};m(t.inputTimer,b);function p(e){const d=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),c=Math.floor(e%864e5%36e5/6e4),l=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:u,minutes:c,seconds:l}}t.btnStart.addEventListener("click",()=>{if(r){const e=new Date,a=r-e;t.btnStart.disabled=!0,t.btnStart.classList.remove("timer-button__normal"),t.inputTimer.classList.remove("timer-input__normal"),t.btnStart.classList.add("timer-button__disabled"),t.inputTimer.classList.add("timer-input__disabled"),t.inputTimer.disabled=!0;const i=setInterval(()=>{const s=a-(new Date-e),n=p(s);t.days.textContent=n.days,t.hours.textContent=n.hours,t.minutes.textContent=n.minutes,t.seconds.textContent=n.seconds,s<=0&&(t.days.textContent="0",t.hours.textContent="0",t.minutes.textContent="0",t.seconds.textContent="0",clearInterval(i),t.btnStart.disabled=!1,t.inputTimer.disabled=!1)},1e3)}else o.error({title:"Error",message:"Date not selected!",position:"topRight"})});
//# sourceMappingURL=1-timer.js.map
