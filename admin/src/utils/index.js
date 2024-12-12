export function capitalizeFirstLetter(input) {
    if(input){
    const a = input[0].toUpperCase();
    return a+input.slice(1);
    }
}