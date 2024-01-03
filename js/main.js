import { timer } from "./timer.js";

const deadline = document.querySelector('.timer').dataset.timerDeadline;
timer(deadline);