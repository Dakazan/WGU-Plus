// An array of the courses that are currently supported (have /links txt files)
var supportedCourses = [
      10280016,   10560005,   10820005,   10840005,
      11020005,   11040005,   11320005,   1280002,
      2820002,    360003,     4720001,    4780002,
      4800001,    5360001,    5380001,    5520004,
      5700001,    6340001,    6840001,    7000001,
      7020003,    7040001,    7060002,    7380002,
      7740002,    7880003,    7900007,    8080002,
      8120002,    8400002,    8520002,    8780003,
      8840002,    9560004,    9860004,    6860002,
      9300002,    9780002,    11240006,   11700005,
      12480005,   12520005,   12520006
    ];

// Create initial timer to check every .5 seconds if page has loaded
var waitTime = setInterval(checkLoaded, 500);

chrome.extension.onMessage.addListener(function(request, sender, response) {
  if (request.type === 'getQuickLinks') {
    // Fired from background.js when the url changes, recreates timer to check if page has loaded
    waitTime = setInterval(checkLoaded, 500);
  }
  return true;
});

function checkLoaded() {
  // If this element is in the page (.length > 0), then Quick Links can be inserted into it
  if (document.getElementsByClassName("responsive--hidden--sm responsive--hidden--xs ng-scope").length > 0) {
    clearInterval(waitTime);
    // If there is already a Quick Links, don't put another one
    if (document.getElementsByClassName("wguplus_accordion").length < 1) {
      // Create the button that shows/hides the content
      var myButton = document.createElement("button");
      var buttonHTML = "&nbsp;&nbsp;Quick Links";
      myButton.className = "wguplus_accordion";
      myButton.innerHTML = buttonHTML;

      // Create the table that will store our resources
      var myTable = document.createElement("table");
      var tableW = document.createAttribute("width");
      tableW.value = "100%";
      myTable.setAttributeNode(tableW);

      // Get the current class ID by pulling the 6th element separated by a / from the URL
      // http://my.wgu.edu/courses/course/<THIS>/
      var splitURL = window.location.href.split("/");
      var currClass = splitURL[5];

      // Create our empty resource arrays
      var linkTypeArr = [""];
      var linkImgArr = [""];
      var linkNameArr = [""];
      var linkAddrArr = [""];

      // If the currClass is in our list of supported courses continue...
      if(supportedCourses.indexOf(parseInt(currClass, 10)) > -1){
          // Read the file that corresponds to our current class's resources
          var xhr = new XMLHttpRequest();
          xhr.open('GET', chrome.extension.getURL('links/' + currClass + '.txt'), true);
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  // Break the file up by line and start using the 3rd line (skip the header)
                  var lines = xhr.responseText.split("\n");
                  for (i = 2; i < lines.length; i++) {
                      // Ensure current line isn't blank
                      if (lines[i] != "") {
                          // Split the current line by pipes and init our temporary variables
                          var elements = lines[i].split("|");
                          var currType = "ERROR";
                          var currName = "ERROR";
                          var currAddr = "ERROR";
                          var currImg = "ERROR";
                          // If the line has all 3 required parts, process it
                          if (elements.length == 3) {
                              currType = elements[0].replace(/^\s+|\s+$/g, "");
                              currName = elements[1].replace(/^\s+|\s+$/g, "");
                              currAddr = elements[2].replace(/^\s+|\s+$/g, "");

                              if (currType != "") {
                                  // Set the image based on the type
                                  switch(currType.toLowerCase()){
                                      case "ucertify":
                                          currImg = chrome.extension.getURL("images/ucertify.png");
                                          break;
                                      case "lynda":
                                          currImg = chrome.extension.getURL("images/lynda.png");
                                          break;
                                      case "testout":
                                      case "labsim":
                                          currImg = chrome.extension.getURL("images/testout.png");
                                          break;
                                      case "cbtnuggets":
                                          currImg = chrome.extension.getURL("images/cbtnuggets.png");
                                          break;
                                      case "acrobatiq":
                                          currImg = chrome.extension.getURL("images/acrobatiq.png");
                                          break;
                                      case "doc":
                                          currImg = chrome.extension.getURL("images/doc.png");
                                          break;
                                      case "hawkes":
                                          currImg = chrome.extension.getURL("images/hawkes.png");
                                          break;
                                      case "mindedgeonline":
                                          currImg = chrome.extension.getURL("images/mindedgeonline.png");
                                          break;
                                      case "pdf":
                                          currImg = chrome.extension.getURL("images/pdf.png");
                                          break;
                                      case "skillsoft":
                                          currImg = chrome.extension.getURL("images/skillsoft.png");
                                          break;
                                      case "vitalsource":
                                          currImg = chrome.extension.getURL("images/vitalsource.png");
                                          break;
                                      case "youtube":
                                          currImg = chrome.extension.getURL("images/youtube.png");
                                          break;
                                      case "zybooks":
                                          currImg = chrome.extension.getURL("images/zybooks.png");
                                          break;
                                      default:
                                          currType = "Generic";
                                          currImg = chrome.extension.getURL("images/other.png");
                                          break;
                                  }
                              }
                              else {
                                  // If the type isn't set, ERROR both Type and Image
                                  currType = "ERROR";
                                  currImg = "ERROR";
                              }
                              if (currName == "") {
                                  // If the name isn't set, try to set it based off the type
                                  switch(currType.toLowerCase()) {
                                      case "ucertify":
                                          currName = "uCertify";
                                          break;
                                      case "lynda":
                                          currName = "Lynda";
                                          break;
                                      case "testout":
                                      case "labsim":
                                          currName = "Test Out";
                                          break;
                                      case "cbtnuggets":
                                          currName = "CBT Nuggets";
                                          break;
                                      case "acrobatiq":
                                          currName = "Acrobatiq";
                                          break;
                                      case "doc":
                                          currName = "Document";
                                          break;
                                      case "hawkes":
                                          currName = "Hawkes Learning";
                                          break;
                                      case "mindedgeonline":
                                          currName = "MindEdge Online";
                                          break;
                                      case "pdf":
                                          currName = "PDF";
                                          break;
                                      case "skillsoft":
                                          currName = "SkillSoft";
                                          break;
                                      case "vitalsource":
                                          currName = "Vital Source";
                                          break;
                                      case "youtube":
                                          currName = "YouTube Video";
                                          break;
                                      case "zybooks":
                                          currName = "zyBooks Text";
                                          break;
                                      default:
                                          currName = "Generic";
                                          break;
                                  }
                              }
                              if (currAddr == "") {
                                  // If the URL is blank, set it to error
                                  currAddr = "ERROR";
                              }
                          }
                          // Add the current resource's information to their respective arrays
                          linkTypeArr.push(currType);
                          linkImgArr.push(currImg);
                          linkNameArr.push(currName);
                          linkAddrArr.push(currAddr);
                      }
                  }

                  // Remove the first element of the array. It was just there to initialize it.
                  if (linkTypeArr.length > 1) {
                      linkTypeArr.splice(0,1);
                  }
                  if (linkImgArr.length > 1) {
                      linkImgArr.splice(0,1);
                  }
                  if (linkNameArr.length > 1) {
                      linkNameArr.splice(0,1);
                  }
                  if (linkAddrArr.length > 1) {
                      linkAddrArr.splice(0,1);
                  }

                  // Build the table row for each set of elements in the resource arrays
                  for (i = 0; i < linkAddrArr.length; i++) {
                      // Only add the row if none of the elements have errors
                      if (linkTypeArr[i] != "ERROR" && linkNameArr[i] != "ERROR" && linkAddrArr[i] != "ERROR") {
                          // If the name is longer than 11 characters, shrink the text to 75% at the smallest
                          maxNameLen = 11;

                          var fontSize = 100;

                          if (linkNameArr[i].length > maxNameLen) {
                              var diff = (linkNameArr[i].length - maxNameLen);
                              var mult = (diff / 5) * 10;
                              fontSize = Math.ceil(fontSize - mult);
                          }

                          if (fontSize < 75) {
                              fontSize = 75;
                          }

                          //Build the row using information from the appropriate arrays
                          var myRow = document.createElement("tr");
                          myRow.innerHTML = "<td class='wguplus_td_image'><a target='_blank' href='" + linkAddrArr[i] + "'><img src='" + linkImgArr[i] + "' width='50' height='50'></a></td>" +
                              "<td class='wguplus_td_title'><a target='_blank' href='" + linkAddrArr[i] + "'><span style='font-size:" + fontSize + "%;'>" + linkNameArr[i] + "</span></a></td>";
                          myTable.append(myRow);
                      }
                  }

                  // Build the rest of the HTML to hold the table
                  var myP = document.createElement("p");
                  myP.append(myTable);
                  var myContent = document.createElement("div");
                  myContent.className = "wguplus_content";
                  myContent.append(myP);
                  var myPanel = document.createElement("div");
                  myPanel.className = "wguplus_panel";
                  myPanel.append(myContent);

                  // Add the resources panel and the accordion button above the Course Mentor dropdown
                  document.getElementsByClassName("responsive--hidden--sm responsive--hidden--xs ng-scope")[0].prepend(myPanel);
                  document.getElementsByClassName("responsive--hidden--sm responsive--hidden--xs ng-scope")[0].prepend(myButton);

                  // Javascript to make the panel appear/disappear when the button is pressed
                  var acc = document.getElementsByClassName("wguplus_accordion");

                  for (var i = 0; i < acc.length; i++) {
                      acc[i].onclick = function() {
                          this.classList.toggle("active");
                          var pan = this.nextElementSibling;
                          if (pan.style.maxHeight){
                              pan.style.maxHeight = null;
                              pan.style.border = "none";
                          } else {
                              pan.style.maxHeight = pan.scrollHeight + "px";
                              pan.style.border = "1px solid rgba(0,0,0,0.25)";
                          }

                      }
                  }
              }
          }
          // Earlier portions only defined what would happen when the file was read. This actually reads the file.
          xhr.send();
      }else{
        // If the currClass is not found with the supportedCourses array.
        console.log("WGU-PLUS: At this time, we do not have resources for course: "+currClass+".");
      }
    }
  }
}
