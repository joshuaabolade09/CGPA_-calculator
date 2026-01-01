'use strict';
let btnToggle = document.querySelector('#theme-toggle')
let fullsection = document.querySelector('#body-code')
let knob = document.querySelector('#knob')
let th = document.querySelector('#th')
let tbody = document.querySelector('#t-body')
const calcGraph = document.querySelector('.cal-graph');
const scoreInput = document.querySelectorAll('.score-input');
const unitsInput = document.querySelectorAll('.units-input');
const courseName = document.querySelectorAll('.course-name');
const nextSemester = document.querySelector('.next-semester');
const gradeInput =document.querySelectorAll('.grade-input');
const pointInput = document.querySelectorAll('.points-input');
const addCourse = document.querySelector('#btn-add-course')    
const totalUnitsInput = document.querySelector('.total-units');
const semesterButtons = document.querySelectorAll('.semester');
const previousButton = document.querySelector('#prevSemester')
const nextButton = document.querySelector('#nextSemester')
const semesterContainer = document.querySelector('.semester-container ')
const graphContainer = document.querySelector('.cal-graph')
const viewGraphButton = document.querySelector('#cal-graph')
const cgpaDisplay = document.querySelector('.cgpa')
const CGPAtext = document.querySelector('.CGPA')
const unitstext = document.querySelector('.unit-text')
const allInputs = document.querySelectorAll('input');


//Toggling Dark Mode
btnToggle.addEventListener('click', function () {
  console.log('clicked');

  // Toggle switch animation
  knob.classList.toggle('translate-x-6');

  // Page colors
  fullsection.classList.toggle('bg-black');
  fullsection.classList.toggle('text-white');

  // Table head & body
  th.classList.toggle('bg-gray-800');
  th.classList.toggle('text-white');

  tbody.classList.toggle('bg-gray-700');
  tbody.classList.toggle('text-black');
  cgpaDisplay.classList.toggle('text-blue-600');
   CGPAtext.classList.toggle('text-gray-800');
   unitstext.classList.toggle('text-black-800');
   totalUnitsInput.classList.toggle('text-gray-800');
   viewGraphButton.classList.toggle('text-gray-800')
   calcGraph.classList.toggle('text-black-800');



  // Semester buttons
  semesterButtons.forEach(button => {
    button.classList.toggle('text-white');
  });

  previousButton.classList.toggle('bg-gray-900');
  nextButton.classList.toggle('bg-gray-900');


  // ✅ INPUT FIX (THIS IS THE IMPORTANT PART)
  allInputs.forEach(input => {
    input.classList.toggle('text-white');
    input.classList.toggle('placeholder-gray-300');
    input.classList.toggle('border-gray-400');
    input.classList.toggle('focus:border-blue-400');
  });
});

// Updating Grade and Points based on user input

function userInput (scoreInput){
   const row= scoreInput.closest('tr')
   const gradeInput = row.querySelector('.grade-input')
    const unitsInput= row.querySelector('.units-input')
    const pointInput = row.querySelector('.points-input')
   const score = Number(scoreInput.value)
   const units= Number(unitsInput.value) || 0
    
     if ((score >= 70) && (score <= 100)){
        gradeInput.textContent = "A"
        console.log(unitsInput)
        pointInput.textContent= Number(unitsInput.value) * 5
  
  }
  else if (score > 100 || score < 0) {
      gradeInput.value = "";
      
    }
    else if (score >= 60 && score < 70) {
      gradeInput.textContent = "B";
       pointInput.textContent= Number(unitsInput.value) * 4
    }
    else if (score >= 50 && score < 60) {
      gradeInput.textContent = "C";
       pointInput.textContent= Number(unitsInput.value) * 3
    }
    else if (score >= 45 && score < 50) {
      gradeInput.textContent = "D";
       pointInput.textContent= Number(unitsInput.value) * 2
    }
     else if (score >= 40 && score < 45) {
      gradeInput.textContent = "E";
       pointInput.textContent= Number(unitsInput.value) * 1
    }
    else if (score >= 0 && score < 40) {
      gradeInput.textContent = "F";
       pointInput.textContent= Number(unitsInput.value) * 0
    }
    else {
        gradeInput.textContent = " ";
    }
    
   
   
  
}
//Adding Units together

function totalUnits(){
   let totalUnits = Array.from(tbody.querySelectorAll('.units-input'))
   .reduce((acc, input) => acc + (Number(input.value) || 0), 0);
   document.querySelector('.total-units').textContent = `Total Units: ${totalUnits}`;
   console.log(totalUnits)
   return totalUnits;   

}
totalUnits()

function totalPoints(){
   let totalPoints= Array.from(tbody.querySelectorAll('.points-input'))
   .reduce((acc, curr)=> acc + (Number(curr.textContent) || 0), 0)   
   return totalPoints; 
}

// Event Listener for adding a new Row in the table body
tbody.addEventListener("input", function(e){
  if( e.target.classList.contains('score-input')|| e.target.classList.contains('units-input')){
   const row = e.target.closest('tr')
   const index = Array.from(tbody.children).indexOf(row) 
   console.log(index)
   const scoreInput = row.querySelector('.score-input')
   userInput(scoreInput)
  }
  totalUnits()
  calculateGPA()
  calculateCGPA()
})

addCourse.addEventListener('click', function (){
   console.log("okay na")
   const firstinput= tbody.lastElementChild

   const lastrow = firstinput.children[0]
   const newRow = Number(lastrow.textContent )+ 1
  

   console.log(newRow)
   const tr = document.createElement('tr')
   tr.innerHTML = `<td class=" px-4 py-2 text-center">${newRow}</td>
   <tr class="hover:bg-gray-50 transition">
   
          <td>
            <input class="course-name w-full bg-transparent border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-400 transition" placeholder="Course">
          </td>
          <td>
            <input class="score-input w-full bg-transparent border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-400 transition">
          </td>
          <td>
            <input class="units-input w-full bg-transparent border rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-blue-400 transition">
          </td>
          <td class="grade-input font-semibold text-blue-600">0</td>
          <td class="points-input font-semibold">0</td>
        </tr>

  
      `
   tbody.appendChild(tr)


   
})

//Change active when next semester is clicked

document.addEventListener('click', function(e){
   if (e.target.classList.contains('semester')){
   
     console.log("clicked")

     let currentActive = document.querySelector('.semester.border-b-4')

   if(e.target!==currentActive){
      e.target.classList.add('border-b-4', 'border-blue-900', 'pb-2', 'text-gray-900')
      currentActive.classList.remove('border-b-4', 'border-blue-900', 'pb-2','text-gray-900')
   }
   else{
      currentActive.classList.add('border-b-4', 'border-blue-900', 'pb-2')
   }

     
}
})

//Creating Semester Object to Hold data

const semesterData= {
   1: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   2: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   3: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},  
   4: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   5: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   6: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   7: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   8: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   9: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   10: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   11: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},
   12: {courses: [], scores:[], units: [], gpa: 0,  totalUnits: 0, totalPoints:0},  
   
}

let currentSemester = 1

//Function to save data to semester object


tbody.addEventListener("input", function(e){
  if( e.target.classList.contains('score-input')|| e.target.classList.contains('units-input') || e.target.classList.contains('course-name')){
    
   semesterData[currentSemester].courses = []
   semesterData[currentSemester].units = []
   semesterData[currentSemester].scores = []

   
   tbody.querySelectorAll('tr').forEach(row=>{
      const courseName= row.querySelector('.course-name').value
      const units= Number(row.querySelector(".units-input").value) || 0
      const score= Number(row.querySelector('.score-input').value) ||0
      const grade = row.querySelector('.grade-input').textContent || " "
      const points = Number(row.querySelector('.points-input').textContent) || 0


   //Push the object to the semester data
   semesterData[currentSemester].courses.push(courseName)
   semesterData[currentSemester].units.push(units)
   semesterData[currentSemester].scores.push(score)
    })
      console.log(semesterData[currentSemester])
  }
  
})
//Clear Table Body

function clearTableBody(){
   tbody.querySelectorAll('tr').forEach((row)=>{
      row.querySelector('.course-name').value = ""
      row.querySelector('.score-input').value = 0
      row.querySelector('.units-input').value = 0
      row.querySelector('.grade-input').textContent = "0 "
      row.querySelector('.points-input').textContent = " 0"
      
      document.querySelector('.total-units').textContent = "Total Units: 0"
      document.querySelector('.full-gpa').textContent = "GPA: 0.00"
   })
}
//Switch semester data
function switchSemester(semesterNumber) {

   if (semesterNumber == currentSemester)
      return;
   currentSemester = semesterNumber

   const data  = semesterData[semesterNumber];

   if (data.courses.length >0 ){
      loadSemesterData(semesterNumber)
   }
   else{
      clearTableBody()
      }
      totalUnits()
      calculateGPA()
      calculateCGPA()
   }
     
      function updatePaginationButtons(){
      if (semesterPage==1){
         previousButton.style.display = 'none'
      } else {
         previousButton.style.display = 'inline-block'
      }

      if (semesterPage + semester_Per_Page > maxPage){
         nextButton.style.display = 'none'
      } else {
         nextButton.style.display = 'inline-block'
      }
   }
  
   let semesterPage = 1
   let semester_Per_Page = 3
   let maxPage = 14;

   //Render Three Semester on the Body
   function renderData(){
      semesterContainer.innerHTML= " "

      

     for (let i= semesterPage;  i< semesterPage + semester_Per_Page; i++){
      const btn = document.createElement('button')
      btn.textContent= `Semester ${i}`
      btn.className ='semester text-xl md:text-3xl text-gray-500 hover:border-gray-300 cursor-pointer transition-all duration-300'
      btn.dataset.semester = i
     

     
      semesterContainer.appendChild(btn)

     }
     updatePaginationButtons()

   }
   //Upate Previous and Next Button


   //Display previous Btn
   previousButton.addEventListener('click', function(){
      console.log("Great")

      if (semesterPage- semester_Per_Page >=1){
         semesterPage-= semester_Per_Page

         renderData()
      }
      
      
   })

     nextButton.addEventListener('click', function(){
      console.log("Great")

      if (semesterPage + semester_Per_Page <= maxPage){
         semesterPage+= semester_Per_Page

         renderData()
      }
   
   })
renderData()
//calclate CGPA display ony when semester is on 2 and above




function calculateGPA(){
 let totalPoints= Array.from(tbody.querySelectorAll('.points-input'))
 .reduce((acc, curr)=> acc + (Number(curr.textContent) || 0), 0)
   let totalUnits = Array.from(tbody.querySelectorAll('.units-input'))
   .reduce((acc, input) => acc + (Number(input.value) || 0), 0);
   console.log(totalPoints)
   console.log(totalUnits)
   let gpa = totalUnits ? totalPoints / totalUnits : 0;

  

   semesterData[currentSemester].totalPoints = totalPoints
   semesterData[currentSemester].totalUnits = totalUnits
   semesterData[currentSemester].gpa = Number(gpa.toFixed(2))


   
   console.log(gpa)
    document.querySelector('.full-gpa').textContent = `GPA: ${gpa.toFixed(2)}`;
    return gpa.toFixed(2);
   

}
calculateGPA()


function calculateCGPA(){
   if (currentSemester < 2){
      cgpaDisplay.classList.add('hidden')
      return
   }
   else{
      let totalPoints =0
      let totalUnits =0
      cgpaDisplay.classList.remove('hidden')
      for (let i=1; i<= currentSemester; i++){
      
       totalPoints += semesterData[i].totalPoints
       totalUnits += semesterData[i].totalUnits

     
      }
      const cgpa = totalPoints? (totalPoints/totalUnits).toFixed(2): 0
      cgpaDisplay.textContent = `CGPA: ${cgpa}`
   }
}



//Load Semester Data
function loadSemesterData(currentData){
   const data = semesterData[currentData];
   if (!data)
      return;
   tbody.querySelectorAll('tr').forEach((row, index)=>{
   const courseInput  =  row.querySelector('.course-name')
    const scoreInput =   row.querySelector('.score-input')
  const unitsInput =   row.querySelector('.units-input')
   const gradeInput =   row.querySelector('.grade-input')
   const pointsInput =   row.querySelector('.points-input')

   courseInput.value = data.courses[index] || ""
   scoreInput.value = data.scores[index] || ""
   unitsInput.value = data.units[index] || ""   

   gradeInput.textContent = "0"
   pointsInput.textContent = "0 "

      if (scoreInput.value && unitsInput.value){
         userInput(scoreInput)
      }

   })

   calculateGPA()
   calculateCGPA()
}

//Load Semester Data when clicked
document.addEventListener('click', function(e){
   if (e.target.classList.contains('semester')){
      const semesterNumber = Number(e.target.dataset.semester);
      
      switchSemester(semesterNumber)
   }
})
let gpaChart = null;

viewGraphButton.addEventListener('click', function(){
   graphContainer.classList.toggle('hidden');

   if (!graphContainer.classList.contains("hidden")){
      renderGPAChart();
   }

})
//renderGPAChart

function renderGPAChart(){
   const ctx = document.getElementById('gpaChart').getContext('2d');

   const {gpas, labels} = getSemesterGPAs();
   if (gpaChart){
      gpaChart.destroy();
   }
   gpaChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: labels,
         datasets: [{
            label: 'GPA',
            data: gpas,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4
         }]
      }
   });
}



//Create Chart using Chart.js


function getSemesterGPAs(){
   const gpas = [];
   const labels = [];
   for (let sem in semesterData){
      const gpa = semesterData[sem].gpa;
      if (gpa > 0){
         gpas.push(gpa);
         labels.push(`Semester ${sem}`);
         
      }
}
return {gpas, labels};
}