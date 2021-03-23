let quoteCounter;
let clicked = false;
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
        quoteDiv.setAttribute('id', "div"+i)

        div.appendChild(quoteDiv);

        let h4 = document.createElement('h4');
        h4.textContent = "Author Name:";
        quoteDiv.appendChild(h4);

        let authorInput = document.createElement('p');
        authorInput.setAttribute('id', "author"+ i);
        authorInput.textContent = quoteData[i].quote;
        quoteDiv.appendChild(authorInput);

        let quoteText = document.createElement('h4');
        quoteText.textContent = "Quote:";
        quoteDiv.appendChild(quoteText);

        let quoteTextArea = document.createElement('p')
        quoteTextArea.setAttribute('id', "quote" + i);
        quoteTextArea.textContent = quoteData[i].author;
        quoteDiv.appendChild(quoteTextArea);
        quoteDiv.appendChild(document.createElement("br")); 
        quoteDiv.appendChild(document.createElement("br")); 
    }
}

function getQuotesDB(){
    if (quoteCounter === 0){
        alert("No quotes are stored in database")
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

function getRecentQuote(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'API/v1/quotes/1');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            if(clicked === false && quoteCounter > 0){

                let div = document.getElementById('recentQuoteBtn')
                div.after(document.createElement("br")); 
                div.after(document.createElement("br"));

                let quoteTextArea = document.createElement('p')
                quoteTextArea.setAttribute('id', "quote" + i);
                quoteTextArea.textContent = data[0].quote;
                div.after(quoteTextArea);

                let quoteText = document.createElement('h4');
                quoteText.textContent = "Recent Quote:";
                div.after(quoteText)

                let authorInput = document.createElement('p');
                authorInput.setAttribute('id', "author"+ i);
                authorInput.textContent = data[0].author;
                div.after(authorInput);

                let h4 = document.createElement('h4');
                h4.textContent = "Recent Author:";
                div.after(h4);
                clicked = true;
            }    
        }
        
    };
}