export const cleanErrors = (array)=>{
    for( const element of array){
       if(element instanceof HTMLInputElement){
        element.style.border = ''
       } else {
        element.textContent = ''
       }
    }
}