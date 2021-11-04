const reducer = (state = [], action) => {
    switch (action.type) {
        case "setupQuestion":
            return state = action.payload
        // case "shuffleQuestions":
        //     return state = shuffle(state)
        default:
            return state
    }
}

// function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
//     while (currentIndex !== 0) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
//       [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
// }

export default reducer
