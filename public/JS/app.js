console.log("Client side JS File is loaded!");

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         } else{
//             console.log(data.forecast);
//             console.log(data.location);
//             // console.log(data.address);
//         }
//     });
// })
const errorMessage = document.getElementById('error');
const dataMessage = document.getElementById('data');
const weatherform = document.querySelector('form');
const search = document.querySelector('input');

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value; // VALUE extracts the term entered in the search input field
    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            dataMessage.textContent = '';
            errorMessage.textContent = "Error: " + data.error;
        } else{
            errorMessage.textContent = '';
            dataMessage.textContent = "The location you entered is: " + data.location + " The forecast is: " + data.forecast;
            
            // console.log(data.address);
        }
    });
})
    
});

