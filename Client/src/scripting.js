
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getAll')
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']));
});

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    if(data.length===0){
        table.innerHTML = "<tr><td class='no-data'>No Recipes</td></tr>"
        return;
    }
    let tableHtml = "";

    data.forEach(function({diabetes1, diabetes2, nutfree, dairyfree, glutenfree, highprotein, lowsugar, name, link}){
        tableHtml += "<tr>";
        tableHtml += `<td><a href ="${link}">${name}</a></td>`
        tableHtml += "</tr>"
    });

    table.innerHTML = tableHtml;
}

const searchBtn = document.querySelector('#search-button')

searchBtn.onclick = function(){
    searchName = document.querySelector('#Search').value
    tag = document.querySelector('#TagBar').value

    if(tag == "Tags"){
        tag = "null";
    }

    if(searchName == ""){
        searchName = "null"
    }

    console.log('http://localhost:3000/search/' + searchName +'/' + tag)

    fetch('http://localhost:3000/search/' + searchName + '/' + tag)
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']));
    
}