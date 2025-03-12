let array = [];
const delay = ms => new Promise(res => setTimeout(res, ms));

// Generate the array bars
function generateArray() {
    array = [];
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = ''; // Clear previous bars
    for (let i = 0; i < 40; i++) {
        const value = Math.floor(Math.random() * 300) + 1;
        array.push(value);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 1.5}px`;
        arrayContainer.appendChild(bar);
    }
}

// Bubble Sort Algorithm
async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");

            if (array[j] > array[j + 1]) {
                // Swap heights
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap bar heights
                bars[j].style.height = `${array[j] * 1.5}px`;
                bars[j + 1].style.height = `${array[j + 1] * 1.5}px`;

                await delay(100);  // Slow down for visualization
            }
            
            bars[j].classList.remove("active");
            bars[j + 1].classList.remove("active");
        }
        bars[array.length - i - 1].classList.add("sorted");
    }
    bars[0].classList.add("sorted");  // Mark last bar as sorted
}

// Quick Sort Algorithm
async function quickSort() {
    const bars = document.getElementsByClassName("bar");
    await quickSortHelper(0, array.length - 1, bars);
    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add("sorted");
    }
}

async function quickSortHelper(start, end, bars) {
    if (start >= end) return;
    let pivotIndex = await partition(start, end, bars);
    await quickSortHelper(start, pivotIndex - 1, bars);
    await quickSortHelper(pivotIndex + 1, end, bars);
}

async function partition(start, end, bars) {
    let pivotValue = array[end];
    let pivotIndex = start;
    bars[end].classList.add("active");

    for (let i = start; i < end; i++) {
        bars[i].classList.add("active");
        if (array[i] < pivotValue) {
            // Swap elements
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];

            // Update bar heights
            bars[i].style.height = `${array[i] * 1.5}px`;
            bars[pivotIndex].style.height = `${array[pivotIndex] * 1.5}px`;

            pivotIndex++;
        }
        await delay(100);
        bars[i].classList.remove("active");
    }

    // Swap the pivot with the pivotIndex element
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex] * 1.5}px`;
    bars[end].style.height = `${array[end] * 1.5}px`;

    bars[end].classList.remove("active");
    return pivotIndex;
}

// Selection Sort Algorithm
async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("active");
            bars[minIndex].classList.add("active");

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            await delay(100);
            bars[j].classList.remove("active");
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];

            bars[i].style.height = `${array[i] * 1.5}px`;
            bars[minIndex].style.height = `${array[minIndex] * 1.5}px`;
        }
        bars[i].classList.add("sorted");
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("active");

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 1.5}px`;
            bars[j].classList.add("active");

            await delay(100);
            bars[j].classList.remove("active");
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 1.5}px`;

        bars[i].classList.remove("active");
    }
    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add("sorted");
    }
}

// Merge Sort Algorithm
async function mergeSort() {
    const bars = document.getElementsByClassName("bar");
    await mergeSortHelper(0, array.length - 1, bars);
}

async function mergeSortHelper(start, end, bars) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid, bars);
    await mergeSortHelper(mid + 1, end, bars);
    await merge(start, mid, end, bars);
}

async function merge(start, mid, end, bars) {
    let leftArray = array.slice(start, mid + 1);
    let rightArray = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i] * 1.5}px`;
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j] * 1.5}px`;
            j++;
        }
        await delay(100);
        bars[k].classList.add("active");
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i] * 1.5}px`;
        await delay(100);
        bars[k].classList.add("active");
        i++;
        k++;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j] * 1.5}px`;
        await delay(100);
        bars[k].classList.add("active");
        j++;
        k++;
    }

    for (let x = start; x <= end; x++) {
        bars[x].classList.add("sorted");
    }
}

// Initialize with a new array
generateArray();
