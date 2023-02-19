const questionForm = document.querySelector("#questionsForm");
const accQuestions = questionForm.querySelector("#accordion-questions");

let accQuestionsButton = accQuestions.querySelector("#accordion-questions__button");

var accQuestionsBody = new bootstrap.Collapse(accQuestions.querySelector("#acc-questions__body-1"), {
    toggle: false
});



function fillInputTheme(value) {
    questionForm.querySelector("#questions-contact_theme").value = value; //fill invisible input with the current/chosen value
}

 if (questionForm) {

     function changeQuestionValue(e) { // change the header text from the selected item
         accQuestionsButton.children[0].innerText = e.target.children[0].innerText;
         fillInputTheme(accQuestionsButton.children[0].innerText);
         accQuestionsBody.hide();
     }
     
     
     
     accQuestions.addEventListener('click', (e) => {
         if (e.target.id != "accordion-questions__button") { // if selected !header
             changeQuestionValue(e);
         }
     })
     
     
     
     fillInputTheme(accQuestionsButton.children[0].innerText);
 }
//# sourceMappingURL=questions.js.map
