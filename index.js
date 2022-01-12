let numberCows = prompt("Enter the number of Cows"); 
let numberChickens = prompt("Enter the umber of Chicken");


function printCowsAndChicken(numberCows, numberChickens)
{
    while (numberCows.length <= 3)
    {
        numberCows = "0" + numberCows;
    }
    while (numberChickens.length <= 3) {
        numberChickens = "0" + numberChickens;
    }
    return numberCows, numberChickens;
}

printCowsAndChicken(numberCows, numberChickens);

if (numberCows <= 1){
    console.log(`${result1} Cow`)
}
else
{
    console.log(`${result1} Cows`)
}

if (numberChickens <= 1) {
    console.log(`${result2} chicken`)
} else {
    console.log(`${result2} chickens`)
}

