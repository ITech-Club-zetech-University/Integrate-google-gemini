let history = [];

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  // Display user message
  addMessage(message, "user-msg");
  input.value = "";

  // Call backend
  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      addMessage("Error: Unable to get a response from the server.", "bot-msg");
      return;
    }

    const data = await response.json();

    // Display bot reply
    addMessage(data.reply, "bot-msg");

    // Update conversation history
    history = data.history;
  } catch (err) {
    addMessage("Error: Could not connect to the server.", "bot-msg");
  }
}

function addMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  chatBox.appendChild(div);

  // Auto scroll
  chatBox.scrollTop = chatBox.scrollHeight;
}
