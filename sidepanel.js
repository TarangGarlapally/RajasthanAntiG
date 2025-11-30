// DOM Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const apiKeyInput = document.getElementById('apiKeyInput');
const modelSelect = document.getElementById('modelSelect');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const setupNote = document.getElementById('setupNote');

// State
let apiKey = '';
let selectedModel = 'mistralai/Mistral-7B-Instruct-v0.2';
let conversationHistory = [];

// Initialize
loadSettings();

// Event Listeners
settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden');
    apiKeyInput.value = apiKey;
    modelSelect.value = selectedModel;
});

cancelSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
});

saveSettingsBtn.addEventListener('click', async () => {
    apiKey = apiKeyInput.value.trim();
    selectedModel = modelSelect.value;

    if (apiKey) {
        await chrome.storage.local.set({ apiKey, selectedModel });
        settingsPanel.classList.add('hidden');
        sendBtn.disabled = false;
        if (setupNote) {
            setupNote.style.display = 'none';
        }
    } else {
        alert('Please enter a valid API key');
    }
});

messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

// Functions
async function loadSettings() {
    const data = await chrome.storage.local.get(['apiKey', 'selectedModel']);
    if (data.apiKey) {
        apiKey = data.apiKey;
        sendBtn.disabled = false;
        if (setupNote) {
            setupNote.style.display = 'none';
        }
    }
    if (data.selectedModel) {
        selectedModel = data.selectedModel;
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message || !apiKey) return;

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Remove welcome message if present
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }

    // Add user message
    addMessage(message, 'user');
    conversationHistory.push({ role: 'user', content: message });

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
        // Call Hugging Face API
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${selectedModel}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: buildPrompt(),
                    parameters: {
                        max_new_tokens: 500,
                        temperature: 0.7,
                        top_p: 0.95,
                        return_full_text: false
                    }
                }),
            }
        );

        removeTypingIndicator(typingId);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API request failed');
        }

        const data = await response.json();
        let aiResponse = '';

        if (Array.isArray(data) && data[0]?.generated_text) {
            aiResponse = data[0].generated_text;
        } else if (data.generated_text) {
            aiResponse = data.generated_text;
        } else {
            aiResponse = 'Sorry, I received an unexpected response format.';
        }

        // Clean up response
        aiResponse = aiResponse.trim();

        // Add AI message
        addMessage(aiResponse, 'assistant');
        conversationHistory.push({ role: 'assistant', content: aiResponse });

    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage(`Error: ${error.message}. Please check your API key in settings.`, 'assistant');
        console.error('API Error:', error);
    }
}

function buildPrompt() {
    // Build a simple prompt from conversation history
    let prompt = '';
    conversationHistory.forEach(msg => {
        if (msg.role === 'user') {
            prompt += `User: ${msg.content}\n`;
        } else {
            prompt += `Assistant: ${msg.content}\n`;
        }
    });
    prompt += 'Assistant:';
    return prompt;
}

function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '👤' : '🤖';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content typing-indicator';
    typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return 'typing-indicator';
}

function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

console.log('AI Chat Sidebar loaded successfully');
