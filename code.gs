function calcPackage(input) {
  if (input=="3 Mini Lessons") return 238;
  else if (input =="4 Mini Lessons") return 298;
  else if (input =="3 Full Lessons") return 538;
  else if (input =="4 Full Lessons") return 638;
  return 0;
}

function calcTuition(lesson,price) {
  if (lesson=="3 Mini Lessons"||lesson =="4 Mini Lessons") return price*4/9;
  return price;
}

function mini(lesson,teacher){
  var count=0;
  for (var i=0; i<lesson.length; i++){
    if ((lesson[i]=="3 Mini Lessons"||lesson[i] =="4 Mini Lessons" )&& (teacher[i]==250 ||teacher[i]==200||teacher[i]==150 )) count++;  
  }
  return count;
}

function name() {
return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function empty(student) {
return "No information available for "+student+". Please contact us if you think this is a mistake. \nE-mail: bellissimomusicarts@gmail.com";
}

function daily(date){
    var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Schedule').getRange(1,1,10,15).getValues();
    col=sheet[1].indexOf(date);
    var r = 'Full Lessons and Open Events of '+date+' (EST)\n\n';
    for (var row = 0; row<sheet.length; row++){
      var cell = sheet[row][col].toString(); 
      if (cell.includes ("Masterclass")) r+= sheet[row][0] + "\n" + cell+'\n\n';
      else if (cell.includes("(full)")){
        r+=sheet[row][0] + "\n";
        ar=cell.split("\n");
        for (var i=0;i<ar.length;i++ ){
          if (ar[i].includes("(full)")){
            r+= ar[i] + "\n"
          }
        }
        r+='\n';
      }
    }
    if (date == "July 21") r+="8:30 pm Conversation about 'The impact music has on our lives'";
    return r;
}

function onEdit(e){
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Schedule').getRange('A1').setValue(Math.random());
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Piece').getRange('A1').setValue(Math.random());
}


function getDate(date){
  strDate=date.getYear()+"/"+date.getMonth()+"/"+date.getDay();
  var dict = {'2021/07/19':"July 19",'2021/07/20':"July 20",'2021/07/21':"July 21",'2021/07/22':"July 22",'2021/07/23':"July 23",'2021/07/24':"July 24",'2021/07/25':"July 25",'2021/07/26':"July 26",'2021/07/27':"July 27",'2021/07/28':"July 28",'2021/07/29':"July 29"};
  return strDate;
}

function asdasd(teacher,col){
  var r="";
   var cell=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(teacher).getRange(3,col).getValues().toString(); 
  ar=cell.split("\n");
    for (var i=0;i<ar.length;i++ ){

    var end=ar[i].indexOf(' (');
      var student=ar[i].substring(ar[i].indexOf(' ')+1,end);
      var student=student.substring(student.indexOf(' ')+1);
  
    r+=oneRep(teacher,student);              
    }
  return r;
}

function allRep(teacher,col){
  var r="";
  var ms=false;
  var cell=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(teacher).getRange(3,col).getValues().toString(); 
  if (cell.includes("Masterclass")) ms=true;
  ar=cell.split("\n");
  for (var i=0;i<ar.length;i++ ){
    var student;
    if (ms==true){
      if (ar[i].includes("Masterclass")) i+=1;
      student=ar[i].substring(0,ar[i].indexOf(' ('));
    }
    else if(ms==false){
      var end=ar[i].indexOf(' (');
      student=ar[i].substring(ar[i].indexOf(' ')+1,end);
      student=student.substring(student.indexOf(' ')+1);

    }
    r+=oneRep(teacher,student);              
  }  
  ms=false;
  return r;
}

function oneRep(teacher, student){
  var r=""
  flag = false;
  var rep=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Piece').getRange(1,1,150,10).getValues();
  if (rep.toString().includes(student)==false) return student+" - no submission\n\n"
  for (var i=0;i<rep.length;i++ ){
    var s = rep[i][2];
    if (s==student && rep[i][1]==teacher){
      flag=true;
      r+=student+' - '+rep[i][3]+' by '+rep[i][4];
      if (rep[i][7]!=""){
        r+='\n'+rep[i][7]+' by '+rep[i][8];
      }
      if (rep[i][9]!=""){
        r+='\nScore: '+rep[i][9];
      }
      r+='\n\n';
    }
  }
  if (student!="" && student!="\n" && flag==false) r += student+" - no submission\n\n"
  return r;
}

function getTime(student){ 
  classTime=student+"'s Schedule \n\n";
  flag=false;
  var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Schedule').getRange(1,1,10,15).getValues();
  for (var row =0; row < sheet.length; row++){
    for (var col =0; col < sheet[0].length; col++){
      var cell = sheet[row][col].toString();
      if (cell.includes(student)){
        flag=true;          
        ar=cell.split("\n");
        for (var i=0;i<ar.length;i++ ){
          if (ar[i].includes(student)){
            classTime+= "Date: " + sheet[0][col] + ", " + sheet[1][col]  + "\n";
            classTime+= "Professor: " + sheet[row][0] + "\n";            
            classTime+= "Lesson time: " + ar[i] + "\n";
            classTime+="\n\n";
          }
        }
      }
    }
  }
  if (!flag) return "No information available for "+student+". Please contact us if you think this is a mistake. \nE-mail: bellissimomusicarts@gmail.com";
  return classTime;
}

