"use strict";
import tabs from './modules/tabs';
import timer from './modules/timer';
import classes from './modules/classes';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calc';
import modal from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {

    tabs();
    timer();
    modal("[data-modal]", ".modal");``
    classes();
    form();
    slider();
    calc();
    })
