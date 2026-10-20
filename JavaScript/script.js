const questionForm = document.getElementById("question_form");
const questionArea = document.getElementById("question");
const answerDiv = document.getElementById("answer");
const emailInput = document.getElementById("email");

const BACKEND_URL = "https://prv-school.onrender.com/chat"

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

  try {
    const payload = {
      message: text,
      student: STUDENT_ID,
      email: email || null
    };

    // --- FAKE MODE (bez backendu) ---
    if (!USE_BACKEND) {
      answerDiv.textContent =
        `Demo odpověď (bez serveru)\n\n` +
        `Student: ${payload.student}\n` +
        `Dotaz: ${payload.message}`;
      return;
    }

    // --- REAL MODE (s backendem) ---
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      answerDiv.textContent = "Server vrátil chybu: " + res.status;
      return;
    }

    const data = await res.json();

    if (data.reply) {
      answerDiv.textContent = data.reply;
    } else if (data.error) {
      answerDiv.textContent = "Chyba serveru: " + data.error;
    } else {
      answerDiv.textContent = "Server nevrátil žádnou odpověď.";
    }
  } catch (err) {
    console.error(err);
    answerDiv.textContent = "Nepodařilo se spojit se serverem.";
  } finally {
    form.querySelector("button").disabled = false;
    textarea.value = "";
  }
});