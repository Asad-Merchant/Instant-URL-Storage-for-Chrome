let myLeads = []
let inputEl = document.getElementById("input-el")
let saveBtn = document.getElementById("save-btn")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let saveTab = document.getElementById("save-tab")
let fromLocalStorage = localStorage.getItem("myLeads")



if(fromLocalStorage){
    myLeads = JSON.parse(fromLocalStorage)
    renderLeads()
}


saveBtn.addEventListener("click", function(){
    let string = "https://" + inputEl.value
    myLeads.push(string)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads()
})

saveTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
})


function renderLeads() {
    let leads = ""
    for(let i=0; i<myLeads.length; i++){
        leads += `
        <li>
            <a href=${myLeads[i]}>${myLeads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = leads
}

