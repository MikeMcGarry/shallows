var url = "https://www.google-analytics.com/collect"

//var gaId = Your Google Analytics ID here, it begins with UA-;
var version = 1;
var clientId = 5;
var hitType = "event";

//Function to send data to Google Analytics via measurement protocol POST request
function send(payload) {
	var http = new XMLHttpRequest();
    	http.open("POST", url, true);
    	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	try {
		http.send(encodeURI(payload));		
	}
	catch(err) {
		alert("error: " + err.message);
	}		
			
	
		
}

//Function to create payload when task is created
function Activity() {
	var subjectField = "tsk5";
	var statusField = "tsk12";
	var eventCategory = "activity";
	var subject = window.document.getElementById(subjectField).value;
	var status = window.document.getElementById(statusField).value;
	var params = "v=" + version + "&tid=" + gaId + "&cid=" + clientId + "&t=" + hitType + "&ec=" + eventCategory + "&ea=" + subject + "&el=" + status;
	send(params);		
}

//Function to create payload when lead status changed
function LeadStatus() {
	var statusField = "lea13_ileinner";	
	var newLeadStatus = window.document.getElementById(statusField).textContent;
	var eventCategory = "lead-status-change";
	if (leadStatus != newLeadStatus) {
		var params = "v=" + version + "&tid=" + gaId + "&cid=" + clientId + "&t=" + hitType + "&ec=" + eventCategory + "&ea=" + newLeadStatus + " from " + leadStatus;		
		send(params);
	}
}

//Function to create payload when opportunity stage changed
function OpportunityStatus() {
	var statusField = "opp11_ileinner";
	var revenueField = "opp7_ileinner";
	var newOpportunityStatus = window.document.getElementById(statusField).textContent;
	var eventCategory = "opportunity-status-change";	
	if (opportunityStatus != newOpportunityStatus) {	
		var params = "v=" + version + "&tid=" + gaId + "&cid=" + clientId + "&t=" + hitType + "&ec=" + eventCategory + "&ea=" + newOpportunityStatus + " from " + opportunityStatus;
		if (newOpportunityStatus == "Closed Won") {
			var revenue = window.document.getElementById(revenueField).textContent;
			var revenueStripped = parseInt(revenue.replace( /[^\d.]/g, '' )); 
			params += ("&ev=" + revenueStripped);
		}
		send(params);
}
}

//Function to apply event listeners to appropriate elements depending on task, lead status change or opportunity stage change
function ApplyEventListeners(elementId, callbackFunction) {	
	
		saveButtons = window.document.getElementsByName(elementId);
		for (var i = 0; i < saveButtons.length; i++) {	
					
				saveButtons[i].addEventListener("click", callbackFunction, false);			
			
   	}
}

//Check for task, lead status change or opportunity stage change
if (window.location.href.indexOf("/00T/") != -1) {		
	ApplyEventListeners("save", Activity);
} else if (window.location.href.indexOf("/00Q") != -1) {	
	ApplyEventListeners("inlineEditSave", LeadStatus);
	var leadStatus = window.document.getElementById("lea13_ileinner").textContent;
} else if (window.location.href.indexOf("/006") != -1) {	
	ApplyEventListeners("inlineEditSave", OpportunityStatus);
	var opportunityStatus = window.document.getElementById("opp11_ileinner").textContent;
}
