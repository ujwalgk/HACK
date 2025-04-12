// Update offline status
function updateOfflineStatus() {
    const offlineStatus = document.getElementById('offlineStatus');
    if (navigator.onLine) {
        offlineStatus.textContent = 'Online';
        offlineStatus.style.backgroundColor = 'green';
    } else {
        offlineStatus.textContent = 'Offline';
        offlineStatus.style.backgroundColor = 'red';
    }
}

// Listen for online and offline events
window.addEventListener('online', updateOfflineStatus);
window.addEventListener('offline', updateOfflineStatus);

// Set initial status
document.addEventListener('DOMContentLoaded', updateOfflineStatus);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateOnlineStatus();
    loadTranslations('en');
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    }
});

// Language selection
document.getElementById('languageSelect').addEventListener('change', function() {
    loadTranslations(this.value);
});

// Translations for different languages
const translations = {
    en: {
        title: "EduREACH",
        quote: "Education is the most powerful weapon which you can use to change the world.",
        todo: "To-Do List",
        progress: "Progress Tracker",
        goals: "Goal Setting",
        subjects: "Subject Material",
        math: "Mathematics",
        science: "Science",
        language: "Language",
    },
    hi: {
        title: "एडुरीच",
        quote: "शिक्षा सबसे शक्तिशाली हथियार है जिसका उपयोग आप दुनिया को बदलने के लिए कर सकते हैं।",
        todo: "कार्य सूची",
        progress: "प्रगति ट्रैकर",
        goals: "लक्ष्य निर्धारण",
        subjects: "विषय सामग्री",
        math: "गणित",
        science: "विज्ञान",
        language: "भाषा",
    },
    ta: {
        title: "எடுரீச்",
        quote: "கல்வி உலகை மாற்ற நீங்கள் பயன்படுத்தக்கூடிய சக்திவாய்ந்த ஆயுதமாகும்.",
        todo: "செயல்பாட்டு பட்டியல்",
        progress: "முன்னேற்ற கண்காணிப்பு",
        goals: "இலக்கு அமைத்தல்",
        subjects: "பாடப் பொருள்",
        math: "கணிதம்",
        science: "அறிவியல்",
        language: "மொழி",
    },
    te: {
        title: "ఎడురీచ్",
        quote: "విద్య ప్రపంచాన్ని మార్చడానికి మీరు ఉపయోగించగల శక్తివంతమైన ఆయుధం.",
        todo: "చేయవలసిన పనుల జాబితా",
        progress: "పురోగతి ట్రాకర్",
        goals: "లక్ష్యాల అమరిక",
        subjects: "విషయ పదార్థం",
        math: "గణితం",
        science: "సైన్స్",
        language: "భాష",
    },
    bn: {
        title: "এডুরিচ",
        quote: "শিক্ষা সবচেয়ে শক্তিশালী অস্ত্র যা আপনি বিশ্ব পরিবর্তনের জন্য ব্যবহার করতে পারেন।",
        todo: "করণীয় তালিকা",
        progress: "অগ্রগতি ট্র্যাকার",
        goals: "লক্ষ্য নির্ধারণ",
        subjects: "বিষয়বস্তু",
        math: "গণিত",
        science: "বিজ্ঞান",
        language: "ভাষা",
    },
    mr: {
        title: "ಎಡುರೀಚ್",
        quote: "ಶಿಕ್ಷಣವು ನೀವು ಜಗತ್ತನ್ನು ಬದಲಾಯಿಸಲು ಬಳಸಬಹುದಾದ ಶಕ್ತಿಯುತವಾದ ಆಯುಧವಾಗಿದೆ.",
        todo: "ಮಾಡಬೇಕಾದ ಕಾರ್ಯಗಳ ಪಟ್ಟಿ",
        progress: "ಪ್ರಗತಿ ಟ್ರ್ಯಾಕರ್",
        goals: "ಗುರಿ ಹೊಂದಿಸುವಿಕೆ",
        subjects: "ವಿಷಯ ಸಾಮಗ್ರಿ",
        math: "ಗಣಿತ",
        science: "ವಿಜ್ಞಾನ",
        language: "ಭಾಷೆ",
    },
};

function loadTranslations(lang) {
    document.getElementById('mathLabel').textContent = translations[lang].math;
    document.getElementById('scienceLabel').textContent = translations[lang].science;
    document.getElementById('languageLabel').textContent = translations[lang].language;
    document.getElementById('backButton').textContent = translations[lang].back;
}

// Function to change the language of the webpage
function changeLanguage(language) {
    const translation = translations[language];

    // Update text content dynamically
    document.querySelector("h1").textContent = translation.title;
    document.querySelector(".quote-section").textContent = translation.quote;
    document.querySelector(".tab-button[onclick=\"openTab('todo')\"]").textContent = translation.todo;
    document.querySelector(".tab-button[onclick=\"openTab('progress')\"]").textContent = translation.progress;
    document.querySelector(".tab-button[onclick=\"openTab('goals')\"]").textContent = translation.goals;
    document.querySelector(".tab-button[onclick=\"openTab('subjects')\"]").textContent = translation.subjects;

    // Update subject material labels if visible
    const mathLabel = document.getElementById("mathLabel");
    const scienceLabel = document.getElementById("scienceLabel");
    const languageLabel = document.getElementById("languageLabel");

    if (mathLabel) mathLabel.textContent = translation.math;
    if (scienceLabel) scienceLabel.textContent = translation.science;
    if (languageLabel) languageLabel.textContent = translation.language;
}

// Event listener for language selection
document.getElementById("languageSelect").addEventListener("change", function () {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
});

// Content management
function loadContent(category) {
    const contentViewer = document.getElementById('contentViewer');
    const contentTitle = document.getElementById('contentTitle');
    const contentDisplay = document.getElementById('contentDisplay');

    // Define content for each category
    const content = {
        math: "Welcome to the Mathematics section. Here you'll find resources and exercises to improve your math skills.",
        science: "Explore the wonders of Science! Learn about physics, chemistry, biology, and more.",
        language: "Enhance your language skills with grammar tips, vocabulary exercises, and reading materials."
    };

    // Set the title and content based on the category
    contentTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    contentDisplay.textContent = content[category];

    // Show the content viewer
    contentViewer.style.display = 'block';
}

function hideContent() {
    const contentViewer = document.getElementById('contentViewer');
    contentViewer.style.display = 'none';
}

function syncContent() {
    if (navigator.onLine) {
        alert("Syncing content with server...");
        // In a real app, this would sync cached progress and download new content
    } else {
        alert("You need to be online to sync.");
    }
}

// Cache management
const CACHE_NAME = 'eduvillage-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icons/maths.png',
    '/icons/science.png',
    '/icons/language.png'
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const taskCount = document.getElementById('taskCount');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';
    
    // Initialize the app
    function init() {
        renderTodos();
        updateTaskCount();
        
        // Event Listeners
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        clearCompletedBtn.addEventListener('click', clearCompleted);
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderTodos();
            });
        });
    }
    
    // Add a new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text !== '') {
            const newTodo = {
                id: Date.now(),
                text,
                completed: false
            };
            
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            todoInput.value = '';
            updateTaskCount();
        }
    }
    
    // Render todos based on current filter
    function renderTodos() {
        todoList.innerHTML = '';
        
        let filteredTodos = [];
        
        switch(currentFilter) {
            case 'active':
                filteredTodos = todos.filter(todo => !todo.completed);
                break;
            case 'completed':
                filteredTodos = todos.filter(todo => todo.completed);
                break;
            default:
                filteredTodos = todos;
        }
        
        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'No tasks found';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = '#888';
            todoList.appendChild(emptyMessage);
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                if (todo.completed) {
                    li.classList.add('completed');
                }
                
                li.innerHTML = `
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="task-text">${todo.text}</span>
                    <button class="delete-btn">Delete</button>
                `;
                
                const checkbox = li.querySelector('input');
                const deleteBtn = li.querySelector('.delete-btn');
                
                checkbox.addEventListener('change', function() {
                    todo.completed = this.checked;
                    saveTodos();
                    renderTodos();
                    updateTaskCount();
                });
                
                deleteBtn.addEventListener('click', function() {
                    todos = todos.filter(t => t.id !== todo.id);
                    saveTodos();
                    renderTodos();
                    updateTaskCount();
                });
                
                todoList.appendChild(li);
            });
        }
    }
    
    // Clear completed todos
    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
        updateTaskCount();
    }
    
    // Update task count
    function updateTaskCount() {
        const activeTodos = todos.filter(todo => !todo.completed).length;
        taskCount.textContent = `${activeTodos} ${activeTodos === 1 ? 'task' : 'tasks'} left`;
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Initialize the app
    init();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const todoList = document.getElementById('todoList');

    const task = taskInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    if (task === '' || date === '' || time === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span><strong>Task:</strong> ${task}</span><br>
        <span><strong>Date:</strong> ${date}</span><br>
        <span><strong>Time:</strong> ${time}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    // Add the new task to the list
    todoList.appendChild(listItem);

    // Clear the input fields
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function deleteTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
}

let totalProgress = 0;
let totalTasks = 0;

function addProgress() {
    const taskInput = document.getElementById('progressTaskInput');
    const percentageInput = document.getElementById('progressPercentageInput');
    const progressList = document.getElementById('progressList');
    const circularProgress = document.getElementById('circularProgress');
    const progressText = document.getElementById('progressText');
    const hoursInput = document.getElementById('hoursStudiedInput');

    const task = taskInput.value;
    const percentage = parseInt(percentageInput.value);

    if (task === '' || isNaN(percentage) || percentage < 0 || percentage > 100) {
        alert('Please enter a valid task and progress percentage (0-100)!');
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <div class="progress-item">
            <span class="progress-task"><strong>Task:</strong> ${task}</span>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentage}%;"></div>
            </div>
            <span class="progress-percentage">${percentage}%</span>
            <button onclick="deleteProgress(this, ${percentage})">Delete</button>
        </div>
    `;

    // Add the new progress item to the list
    progressList.appendChild(listItem);

    // Update total progress and tasks
    totalProgress += percentage;
    totalTasks++;
    updateCircularProgress();

    // Clear the input fields
    taskInput.value = '';
    percentageInput.value = '';
}

function deleteProgress(button, percentage) {
    const listItem = button.parentElement.parentElement;
    listItem.remove();

    // Update total progress and tasks
    totalProgress -= percentage;
    totalTasks--;
    updateCircularProgress();
}

function updateCircularProgress() {
    const circularProgress = document.getElementById('circularProgress');
    const progressText = document.getElementById('progressText');

    const averageProgress = totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;

    // Update the circular progress bar
    circularProgress.style.background = `conic-gradient(#4caf50 ${averageProgress}%, #ddd ${averageProgress}%)`;

    // Update the progress text
    progressText.textContent = `${averageProgress}%`;
}

function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goalDeadlineInput = document.getElementById('goalDeadlineInput');
    const goalTypeInput = document.getElementById('goalTypeInput');

    const goal = goalInput.value;
    const deadline = goalDeadlineInput.value;
    const goalType = goalTypeInput.value;

    if (goal === '' || deadline === '') {
        alert('Please enter a goal and a deadline!');
        return;
    }

    const goalList = document.querySelector(`#${goalType}Goals .goal-list`);

    // Create a new goal item
    const listItem = document.createElement('li');
    listItem.classList.add('goal-item');
    listItem.innerHTML = `
        <div class="goal-content">
            <span class="goal-text">${goal}</span>
            <span class="goal-deadline">Deadline: ${deadline}</span>
            <span class="goal-timer" id="timer-${Date.now()}"></span>
        </div>
        <button onclick="completeGoal(this)">Complete</button>
    `;

    // Add the goal to the appropriate list
    goalList.appendChild(listItem);

    // Start the countdown timer
    startCountdown(deadline, listItem.querySelector('.goal-timer'));

    // Clear the input fields
    goalInput.value = '';
    goalDeadlineInput.value = '';
}

function startCountdown(deadline, timerElement) {
    const deadlineDate = new Date(deadline).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = deadlineDate - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.textContent = 'Time is up!';
            timerElement.style.color = 'red';
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            timerElement.textContent = `${days}d ${hours}h ${minutes}m left`;
        }
    }, 1000);
}

function completeGoal(button) {
    const listItem = button.parentElement;
    listItem.classList.add('completed'); // Mark the goal as completed
    listItem.querySelector('.goal-timer').textContent = 'Goal Completed!';
    listItem.querySelector('.goal-timer').style.color = 'green';
    button.remove(); // Remove the "Complete" button

    // Show the congrats modal
    showCongratsModal();
}

function openTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show the selected tab content and set the button as active
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add('active');
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const userClass = document.getElementById('class').value;
    const place = document.getElementById('place').value;

    // Validate form inputs
    if (!name || !number || !userClass || !place) {
        alert('Please fill in all fields!');
        return;
    }

    // Save user data to localStorage (optional)
    localStorage.setItem('userName', name);
    localStorage.setItem('userNumber', number);
    localStorage.setItem('userClass', userClass);
    localStorage.setItem('userPlace', place);

    // Hide login page and show main content
    document.getElementById('loginPage').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block'; // Show logout button
});

// Handle logout functionality
document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear user data from localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userNumber');
    localStorage.removeItem('userClass');
    localStorage.removeItem('userPlace');

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';
    document.getElementById('class').value = '';
    document.getElementById('place').value = '';

    // Show login page and hide main content
    document.getElementById('loginPage').style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none'; // Hide logout button
});

// Hide main content and logout button initially, show login page
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginPage').style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none'; // Hide logout button
});

// Update the login page title dynamically
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#loginPage h2').textContent = 'Enter to Your World';
});

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
};

document.addEventListener('DOMContentLoaded', function () {
    const loginPage = document.getElementById('loginPage');
    const mainContent = document.getElementById('mainContent');
    const logoutButton = document.getElementById('logoutButton');
    const loginForm = document.getElementById('loginForm');

    // Show login page by default
    loginPage.style.display = 'flex';
    mainContent.style.display = 'none';

    // Handle login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginPage.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Handle logout button click
    logoutButton.addEventListener('click', function () {
        mainContent.style.display = 'none';
        loginPage.style.display = 'flex';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const offlineStatus = document.getElementById('offlineStatus');

    // Function to update the status
    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineStatus.textContent = "Online";
            offlineStatus.style.color = "green";
        } else {
            offlineStatus.textContent = "Offline";
            offlineStatus.style.color = "red";
        }
    }

    // Initial status check
    updateOnlineStatus();

    // Listen for online and offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

document.addEventListener('DOMContentLoaded', function () {
    const congratsModal = document.getElementById('congratsModal');
    const closeModal = document.getElementById('closeModal');

    // Function to show the modal
    function showCongratsModal() {
        congratsModal.style.display = 'flex'; // Show the modal
    }

    // Function to close the modal
    closeModal.addEventListener('click', function () {
        congratsModal.style.display = 'none'; // Hide the modal
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === congratsModal) {
            congratsModal.style.display = 'none';
        }
    });

    // Example: Call this function when a goal is completed
    function completeGoal(goalId) {
        // Mark the goal as completed (your existing logic)
        const goalElement = document.getElementById(goalId);
        goalElement.classList.add('completed');

        // Show the congrats modal
        showCongratsModal();
    }

    // Example usage: Call completeGoal('goalId') when a goal is completed
});

document.addEventListener('DOMContentLoaded', function () {
    const progressList = document.getElementById('progressList');
    const circularProgress = document.getElementById('circularProgress');
    const progressText = document.getElementById('progressText');
    const hoursProgress = document.getElementById('hoursProgress');
    const hoursText = document.getElementById('hoursText');
    const hoursInput = document.getElementById('hoursStudiedInput');

    let totalHours = 0;

    // Function to update the circular progress bar for hours
    function updateHoursProgress(hours) {
        const hoursPercentage = Math.min((hours / 100) * 100, 100); // Cap at 100%
        hoursProgress.style.background = `conic-gradient(#4caf50 ${hoursPercentage}%, #ddd ${hoursPercentage}%)`;
        hoursText.textContent = `${hours} hrs`;
    }

    // Event listener for real-time updates to the circular progress bar
    hoursInput.addEventListener('input', function () {
        const hours = parseInt(hoursInput.value, 10) || 0; // Default to 0 if input is invalid
        updateHoursProgress(hours);
    });

    function addProgress() {
        const taskInput = document.getElementById('progressTaskInput');
        const percentageInput = document.getElementById('progressPercentageInput');

        const task = taskInput.value;
        const percentage = parseInt(percentageInput.value, 10);
        const hours = parseInt(hoursInput.value, 10);

        if (!task || isNaN(percentage) || isNaN(hours)) {
            alert('Please fill in all fields!');
            return;
        }

        // Add the task to the progress list
        const listItem = document.createElement('li');
        listItem.textContent = `${task} - ${percentage}% - ${hours} hrs`;
        progressList.appendChild(listItem);

        // Update the circular progress bar for percentage
        circularProgress.style.background = `conic-gradient(#4caf50 ${percentage}%, #ddd ${percentage}%)`;
        progressText.textContent = `${percentage}%`;

        // Update the total hours and circular progress bar for hours
        totalHours += hours;
        updateHoursProgress(totalHours);

        // Clear input fields
        taskInput.value = '';
        percentageInput.value = '';
        hoursInput.value = '';
    }

    // Attach the addProgress function to the button
    window.addProgress = addProgress;
});

hoursInput.addEventListener('input', function () {
    const hours = parseInt(hoursInput.value, 10) || 0; // Default to 0 if input is invalid
    updateHoursProgress(hours);
});

<input type="number" id="hoursStudiedInput" placeholder="Hours Studied" min="0" />

function updateHoursProgress(hours) {
    const hoursPercentage = Math.min((hours / 100) * 100, 100); // Cap at 100%
    hoursProgress.style.background = `conic-gradient(#4caf50 ${hoursPercentage}%, #ddd ${hoursPercentage}%)`;
    hoursText.textContent = `${hours} hrs`;
}

document.addEventListener('DOMContentLoaded', function () {
    const hoursInput = document.getElementById('hoursStudiedInput');
    const hoursProgress = document.getElementById('hoursProgress');
    const hoursText = document.getElementById('hoursText');

    // Function to update the circular progress bar for hours
    function updateHoursProgress(hours) {
        const hoursPercentage = Math.min((hours / 100) * 100, 100); // Cap at 100%
        hoursProgress.style.background = `conic-gradient(#4caf50 ${hoursPercentage}%, #ddd ${hoursPercentage}%)`;
        hoursText.textContent = `${hours} hrs`;
    }

    // Event listener for real-time updates to the circular progress bar
    hoursInput.addEventListener('input', function () {
        const hours = parseInt(hoursInput.value, 10) || 0; // Default to 0 if input is invalid
        updateHoursProgress(hours);
    });
});

<div class="offline-status" id="offlineStatus">Offline</div>

document.addEventListener('DOMContentLoaded', function () {
    const offlineStatus = document.getElementById('offlineStatus');

    function updateOnlineStatus() {
        if (navigator.onLine) {
            offlineStatus.textContent = "Online";
            offlineStatus.style.color = "green";
        } else {
            offlineStatus.textContent = "Offline";
            offlineStatus.style.color = "red";
        }
    }

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});


