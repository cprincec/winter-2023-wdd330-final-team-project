import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const metric = document.querySelector("#radio-cels");
const imperial = document.querySelector("#radio-fahr");
// try getting the users's unit from previous use 
// Or default to metric
let unit = getLocalStorage("unit") || "metric";

metric.addEventListener("click", () => {
    if (metric.checked) {
        unit = metric.value;
        imperial.checked = false;
    }
})

imperial.addEventListener("click", () => {
    if (imperial.checked) {
        unit = imperial.value;
        metric.checked = false;
    }
})

export function degreeType() {
    setLocalStorage("unit", unit)
    return unit;
}

