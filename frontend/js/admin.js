let quoteCounter;
let quoteData = [];
function load(){
    loadCount();
    
}

function loadCount(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'admin-count',true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quoteCounter = parseInt(xhr.responseText,10)
            getQuotesDB();
        }
    };  
    
}


function loadQuestions(){
    for(i = 0; i < quoteCounter;i++){
        let div = document.getElementById('newQuote');
        document.getElementById('newQuote').style.marginLeft = "15px";
        let quoteDiv = document.createElement('div');
        quoteDiv.setAttribute('id', "div"+i);
        div.appendChild(quoteDiv);

        let h4 = document.createElement('h4');
        h4.textContent = "Author Name";
        quoteDiv.appendChild(h4);

        let authorInput = document.createElement('input');
        authorInput.setAttribute('type','text');
        authorInput.setAttribute('style', 'width: 400px;');
        authorInput.setAttribute('style', 'color : black;');
        authorInput.setAttribute('id', "author"+ i);
        authorInput.value = quoteData[i].author;
        quoteDiv.appendChild(authorInput);
        quoteDiv.appendChild(document.createElement("br")); 
        quoteDiv.appendChild(document.createElement("br")); 

        let quoteText = document.createElement('h4');
        quoteText.textContent = "Quote:";
        quoteDiv.appendChild(quoteText);

        let quoteTextArea = document.createElement('textarea')
        quoteTextArea.setAttribute('rows', '6');
        quoteTextArea.setAttribute('cols', '50');
        quoteTextArea.setAttribute('id', "quote" + i);
        quoteTextArea.value = quoteData[i].quote;
        quoteDiv.appendChild(quoteTextArea);
        quoteDiv.appendChild(document.createElement("br")); 
        quoteDiv.appendChild(document.createElement("br")); 

        let updateButton = document.createElement('button');
        updateButton.textContent = "Update Quote to Database"
        updateButton.setAttribute('onclick','updateQuote('+quoteData[i].id+','+ i +')')
        updateButton.setAttribute('class', 'btn-warning')
        quoteDiv.appendChild(updateButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Quote"
        deleteButton.setAttribute('onclick','deleteQuote('+quoteData[i].id+',div'+i+')')
        deleteButton.setAttribute('class', 'btn-warning')
        quoteDiv.appendChild(deleteButton);
        quoteDiv.appendChild(document.createElement("br")); 
        quoteDiv.appendChild(document.createElement("br")); 
    }
}

function getQuotesDB(){
    if (quoteCounter === 0){
        alert("Currently no quotes are stored in the DB")
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'admin-data',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quoteData = JSON.parse(xhr.responseText)
            if(quoteCounter ==  quoteData.length)
            {
                loadQuestions();
            }
        }
    }; 
    
}

function addQuote(dbid){
    let div = document.getElementById('newQuote');
    let quoteDiv = document.createElement('div');
    document.getElementById('newQuote').style.marginLeft = "15px";
    quoteDiv.setAttribute('id' , 'div'+quoteCounter);
    div.appendChild(quoteDiv);

    let h4 = document.createElement('h4');
    h4.textContent = "Author Name:";
    quoteDiv.appendChild(h4);

    let authorInput = document.createElement('input');
    authorInput.setAttribute('type','text');
    authorInput.setAttribute('style', 'width: 400px;');
    authorInput.setAttribute('style', 'color : black;');
    authorInput.setAttribute('id', "author"+ quoteCounter);
    quoteDiv.appendChild(authorInput);
    quoteDiv.appendChild(document.createElement("br")); 
    quoteDiv.appendChild(document.createElement("br")); 

    let quoteText = document.createElement('h4');
    quoteText.textContent = "Quote:";
    quoteDiv.appendChild(quoteText);

    let quoteTextArea = document.createElement('textarea')
    quoteTextArea.setAttribute('rows', '6');
    quoteTextArea.setAttribute('cols', '50');
    quoteTextArea.setAttribute('id', "quote" + quoteCounter);
    quoteDiv.appendChild(quoteTextArea);
    quoteDiv.appendChild(document.createElement("br")); 
    quoteDiv.appendChild(document.createElement("br")); 

    let updateButton = document.createElement('button');
    updateButton.textContent = "Update To Database"
    updateButton.setAttribute('id', 'update-btn'+quoteCounter)
    updateButton.setAttribute('onclick','updateQuote('+null+','+ quoteCounter +',)')
    updateButton.setAttribute('class', 'btn-warning')
    quoteDiv.appendChild(updateButton);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Quote"
    deleteButton.setAttribute('id', 'delete-btn'+quoteCounter)
    deleteButton.setAttribute('onclick','deleteQuote('+null+',div'+ quoteCounter +')')
    deleteButton.setAttribute('class', 'btn-warning')
    quoteDiv.appendChild(deleteButton);
    quoteDiv.appendChild(document.createElement("br")); 
    quoteDiv.appendChild(document.createElement("br")); 

    quoteCounter++;
}

function deleteQuote(id,div){
    div.remove();
    if(id != null){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'delete-question',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhr.send("id="+id);
    }
}

function updateQuote(id,num){
    if(id == null){
        let author = document.getElementById('author' + num).value
        let quote = document.getElementById('quote' +num).value
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'update-question-post',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('update-btn'+num).setAttribute('onclick','updateQuote('+JSON.parse(xhr.responseText)[0].id+','+ num +')')
                document.getElementById('delete-btn'+num).setAttribute('onclick','deleteQuote('+JSON.parse(xhr.responseText)[0].id+',div'+ num +')')
            }
        };
        xhr.send("quote="+quote+"&author="+author);
    }else{
        let author = document.getElementById('author' + num).value
        let quote = document.getElementById('quote' +num).value
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'update-question',true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            }
        };
        xhr.send("id="+id+"&quote="+quote+"&author="+author);
    }
}