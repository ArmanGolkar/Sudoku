const puzzleEl = document.getElementById("puzzle");
const solvBtn = document.getElementById("solve-button");
const solutionDisplay=document.getElementById("message");
const squares = 81;
let submission = [];

for (let i = 0; i < squares; i++) {
    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'number');
    inputEl.setAttribute('min', '0');
    inputEl.setAttribute('max', '9');
    puzzleEl.appendChild(inputEl);

    const row = Math.floor(i / 9);
    const col = i % 9;

    // Check if the cell is in an "odd-section"
    if (
        (Math.floor(row / 3) + Math.floor(col / 3)) % 2 === 1
    ) {
        inputEl.classList.add('odd-section');
    }


}

async function joinValues() {
    const inputElements = document.querySelectorAll('input');
    const submission = [];

    inputElements.forEach(input => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push('.');
        }
    });

    console.log(submission);
    return submission;
}
const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input');
    if (isSolvable && solution) {
        inputs.forEach((inputEl, i) => {
            inputEl.value = solution[i];
        });
        solutionDisplay.innerHTML='This is the answer'
        
    } else {
        solutionDisplay.innerHTML='This is not solvable'
    }
};



const solve = async () => {
    const submission = await joinValues();
    const data = { numbers: submission.join('') };
    console.log('data', data);

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data) // Send the 'data' object directly
    })
    // ...
    
    .then(response => response.json())
    .then(data => {console.log(data)
    populateValues(data.solvable, data.solution)
    submission=[]
})

    .catch(error => {
        console.error('Error:', error);
    });
}


solvBtn.addEventListener('click', solve);
