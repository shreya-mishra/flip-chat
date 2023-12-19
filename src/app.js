// app.js
document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("app");
  const chatList = [
    // ... Your chat data
  ];

  let selectedChat = null;

  // Function to render chat list
  function renderChatList() {
    const filteredChats = chatList.filter(
      (chat) =>
        chat.title.toLowerCase().includes(filter.toLowerCase()) ||
        chat.orderId.toLowerCase().includes(filter.toLowerCase())
    );

    const chatListElement = document.createElement("ul");
    filteredChats.forEach((chat) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${chat.title} - ${chat.orderId}`;
      listItem.addEventListener("click", () => onSelectChat(chat));
      chatListElement.appendChild(listItem);
    });

    appElement.innerHTML = "";
    appElement.appendChild(chatListElement);
  }

  // Function to render messages for the selected chat
  function renderChat() {
    if (!selectedChat) return;

    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    const messageList = document.createElement("ul");
    messageList.classList.add("message-list");

    selectedChat.messageList.forEach((message) => {
      const listItem = document.createElement("li");
      listItem.classList.add("message");
      listItem.textContent = `${message.sender}: ${message.message}`;
      messageList.appendChild(listItem);
    });

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Type a message");

    const sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.addEventListener("click", () => sendMessage());

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(messageList);
    chatContainer.appendChild(inputContainer);

    appElement.innerHTML = "";
    appElement.appendChild(chatContainer);
  }

  // Function to handle chat selection
  function onSelectChat(chat) {
    selectedChat = chat;
    renderChat();
  }

  // Function to send a message
  function sendMessage() {
    if (!selectedChat) return;

    const input = document.querySelector("input");
    const message = input.value.trim();

    if (message) {
      selectedChat.messageList.push({
        sender: "USER",
        message,
      });

      input.value = "";
      renderChat();
    }
  }

  // Initial render
  renderChatList();
});
