function name() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function onEdit(e){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Class Schedule').getRange('A1').setValue(Math.random());
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rehearsal Schedule').getRange('K1').setValue(Math.random());
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Practice Schedule').getRange('A1').setValue(Math.random());
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Event Schedule').getRange('K1').setValue(Math.random());
}

function getStudentSchedule(student) { 
  let schedule = student + "'s Schedule | BAMA International Music Festival 2023 in Poland\n\n";
  let classSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Class Schedule').getRange(1,1,15,11).getValues();
  let eventSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Event Schedule').getRange(1,1,15,11).getValues();
  let rehearsalSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rehearsal Schedule').getRange(1,1,15,11).getValues();
  let practiceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Practice Schedule').getRange(1,1,30,11).getValues();
  let dates = [["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                ["July 30", "July 31", "August 1", "August 2", "August 3", "August 4", "August 5"]];
  let masterclassRooms = [4,5,27,14,15,31,33,38,41,42]; // fix

  for (let col = 0; col < dates[0].length; col++) {
    if (col == 3){
      schedule += "August 2, Wednesday\n\nWarsaw trip\n\n\n";
      continue;
    };


    schedule += dates[1][col] + ", " + dates[0][col] + "\n\n";

    let exist = false;
    let globalExist = false;

    // masterclasses
    for (let row = 0; row < classSheet.length; row++){
      let cell = classSheet[row][col+1].toString();
      if (cell.includes(student)) {
        exist = true;
        globalExist = true;
        schedule += "Lesson\n";
        let classGroup = cell.split("\n\n");

        for (let i = 0; i < classGroup.length; i++){

          
          if (classGroup[i].includes(student)){
            let classes = classGroup[i].split("\n");

            if (classes[0] == "Open Class") {
              // open classes
              console.log("adding an open class");
              let openClassInfo = classes[1].split(" - ");
              schedule += "Time: " + openClassInfo[0] + "\n" + openClassInfo[1] + "\n" + openClassInfo[2] + "\n";
              
              for (let j = 2; j < classes.length; j++) {
                schedule += classes[j] + "\n";
              }
              schedule += "\n";

              console.log(schedule);

            } else if (classes[0] == "Chamber Class"){
              console.log("adding a chamber class");
              schedule += "Time: " + classes[1] + "\nRoom 31\nChamber Class with Prof. Hanna Holeksa\n(bonus group lesson with BAMA early bird applicants)\n"
              
            } else {
              // private classes
              console.log("adding a private class");
              for (let k = 0; k < classes.length; k++ ){
                if (classes[k].includes(student)) {
                  classInfo = classes[k].split(" ");
                  schedule += "Time: "+ classInfo[0] + "\nRoom " + masterclassRooms[row-2] + "\nPrivate Masterclass with Prof. " + classSheet[row][0] + "\n";
                }
              }
            }
          }
        }
      }
      
    }

    if (exist) schedule += "\n";
    exist = false;
    
    // rehearsal and meeting with conductor
    cell = rehearsalSheet[2][col].toString();
    if (cell.includes(student)) {
      exist = true;
      globalExist = true;
      console.log("adding rehearsal");
      
      let rehearsalGroup = cell.split("\n\n");

      for (let i = 0; i < rehearsalGroup.length; i++){ 
        if (rehearsalGroup[i].includes(student)){
          let rehearsalTimes = rehearsalGroup[i].split("\n");
          if (rehearsalTimes.includes("Meeting with conductor")) {
             schedule += "5 Minute Meeting with Conductor Bartosz Staniszewski\n";
             for (let j = 0; j < rehearsalTimes.length; j++) {
              if (rehearsalTimes[j].includes(student))schedule += "Time: " + rehearsalTimes[j].substring(0, rehearsalTimes[j].indexOf(" ")) + "\nRoom 12\n";
              }
          } else {
            schedule += "Orchestra Rehearsal\n";
            for (let j = 0; j < rehearsalTimes.length; j++) {
              //console.log(typeof(rehearsalTimes[j]));
              if (rehearsalTimes[j].includes(student)) {
                schedule += "Time: " +rehearsalTimes[j].substring(0, rehearsalTimes[j].indexOf(" "))+ "\nRoom 12\n";
              }
            }
          }
        }
      }
    }
    if (exist) schedule += "\n";
    exist = false;  
    
              

    // practice
    for (let row = 2; row < practiceSheet.length; row++){
      cell = practiceSheet[row][col+1].toString();
      //console.log("practicetest " + practiceSheet[0][col]+ practiceSheet[row][0]+ cell);

      if (cell.includes(student)) {
        if (!exist) schedule +="Practice Time\n";
        exist = true;
        globalExist = true;

        let practiceTimes = cell.split("\n");

        for (let time of practiceTimes) {
          
          if (time.includes(student)) {
            console.log("adding practice time");
            schedule += time.substring(0, time.indexOf(" ")) + "  Room: " + practiceSheet[row][0] + "\n";
          } 
        }
      }
    }
    if (exist) schedule += "\n";
    exist = false;

    


    // events
    //console.log("adding events");
    //schedule +="General Events\n" + eventSheet[2][col] + "\n\n";

    if (!globalExist) schedule += "--\n\n"

    schedule += "\n";

    console.log(schedule);
  }
  schedule += "\n";
  return schedule;
}


function getFacultySchedule(faculty) { 
  let schedule = faculty + "'s Schedule | BAMA International Music Festival 2023 in Poland\n\n";
  let classSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Class Schedule').getRange(1,1,15,11).getValues();
  let rehearsalSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rehearsal Schedule').getRange(1,1,15,11).getValues();
  let dates = [["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"],
                ["July 30", "July 31", "August 1", "August 2", "August 3", "August 4", "August 5", "August 6"]];
  let masterclassRooms = [4,5,27,14,15,31,33,38,41,42]; 

  
  for (let row = 0; row < classSheet.length; row++){
    
    let cell = classSheet[row][0].toString();
    console.log(cell);
    if (cell.includes(faculty)) {
      for (let col = 1; col <= dates[0].length; col++) {
        if (classSheet[row][col] != "") schedule += dates[1][col-1] + ", " + dates[0][col] + "\nRoom:" + masterclassRooms[row-2]+ "\n"+classSheet[row][col] + "\n\n";
      }
    }
  }
  schedule+="\n\n\n"

  
  let exist = false;
  // rehearsal and meeting with conductor

  for (let col = 1; col < dates[0].length; col++) {
    let cell = rehearsalSheet[2][col].toString();
    if (cell.includes(faculty)) {
      exist = true;
      console.log("adding rehearsal");
      
      let rehearsalGroup = cell.split("\n\n");

      for (let i = 0; i < rehearsalGroup.length; i++){ 
        if (rehearsalGroup[i].includes(faculty)){
          let rehearsalTimes = rehearsalGroup[i].split("\n");
          if (rehearsalTimes.includes("Meeting with conductor")) {
              schedule += "5 Minute Meeting with Conductor Bartosz Staniszewski\n";
              for (let j = 0; j < rehearsalTimes.length; j++) {
              if (rehearsalTimes[j].includes(faculty))schedule += "Time: " + rehearsalTimes[j].substring(0, rehearsalTimes[j].indexOf(" ")) + "\nRoom 12\n";
              }
          } else {
            schedule += "Orchestra Rehearsal\n";
            for (let j = 0; j < rehearsalTimes.length; j++) {
              if (rehearsalTimes[j].includes(faculty)) {
                schedule += "Time: " +rehearsalTimes[j].substring(0, rehearsalTimes[j].indexOf(" "))+ "\nRoom 12\n";
              }
            }
          }
        }
      }
    }
    if (exist) schedule += "\n\n";
    exist = false;
  }
  return schedule;
}

console.log(getStudentSchedule("Emily Luo"));
//console.log(getFacultySchedule("Sijing (Bella) Ye"));




