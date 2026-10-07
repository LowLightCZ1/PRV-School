const questionForm = document.getElementById("question_form");
const questionArea = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const emailInput = document.getElementById("email");

const USE_BACKEND = false;

const STUDENT_ID = "Hajný_Matěj_4IT";

questionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = questionArea.value.trim();
    const email = emailInput.value.trim();

    if(!text){
        answerDiv.textContent = "Nejdřív napiš dotaz";
        return;
    }

    answerDiv.textContent = "Dotaz se zpracovává";
    questionForm.querySelector("button").disabled = true;

    try{
        const payload = {
            message: text,
            student: STUDENT_ID,
            email: email || null
        };

        // --- DEMO ANSWER (Bez backendu) --- ///
        if(!USE_BACKEND){
            `Demo odpověd (bez serveru) \n\n` +
            `Student: ${payload.student}\n` +
            `Dotaz: ${payload.message}`;

        }
    }
    catch (err) {
        console.error(err);
        answerDiv.textContent = "Nepodařilo se spojit se serverem.";
    } 
    finally 
    {
        form.querySelector("button").disabled = false;
        textarea.value = "";
    }
})