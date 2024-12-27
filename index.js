let box = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let turno = true;
let newbtn = document.querySelector('#new-btn');
let msgcont = document.querySelector('.msg-cont');
let msg = document.querySelector('#msg');

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [2,4,6]
];

// Reset game function to reset the board and hide winner message
const resetGame = () => {   
    turno = true; // Reset turn to "O"
    enableboxes(); // Enable all boxes
    msgcont.classList.add('hide'); // Hide the winner message
}

// Har box par click event add karo
box.forEach((box) => {
    box.addEventListener('click', () => {
        
        // Turn ke according "X" ya "O" set karo
        if (box.innerText === '') { // Ensure box is empty before marking
            if (turno) {
                box.innerText = "O";
                box.classList.add('O'); // Add 'o' class to style "O"
                turno = false; // Turn badlo
            } else {
                box.innerText = "X";
                box.classList.add('x'); // Add 'x' class to style "X"
                turno = true; // Turn badlo
            }
        }
        box.disabled = true; // Disable the clicked box

        checkWinner(); // Check if there's a winner
    });
});

// Disable all boxes
const disableboxes = () => {
    box.forEach((box) => {
        box.disabled = true;
    });
}

// Enable all boxes and reset inner text
const enableboxes = () => {
    box.forEach((box) => {
        box.disabled = false; // Enable box for clicking
        box.innerText = ''; // Clear text from box
        box.classList.remove('x', 'O'); // Remove any previous classes
    });
}

// Check karo ki koi jeeta ya nahi
const showwinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`; // Display the winner message
    msgcont.classList.remove('hide'); // Show the message container
    disableboxes(); // Disable all boxes after a winner is found
}

// Check the winner based on winning patterns
const checkWinner = () => {
    winpatterns.forEach((pattern) => {
        const box1 = box[pattern[0]].innerText;
        const box2 = box[pattern[1]].innerText;
        const box3 = box[pattern[2]].innerText;

        if (box1 === box2 && box2 === box3 && box1 !== '') {
            showwinner(box1); // If there's a winner, show it
        }
    });
}

// Reset button to clear the game
reset.addEventListener('click', resetGame);

// New Game button to start a new game
newbtn.addEventListener('click', resetGame);
