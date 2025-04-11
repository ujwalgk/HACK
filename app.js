// Check online status
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    const status = document.getElementById('offlineStatus');
    if (navigator.onLine) {
        status.textContent = 'Online';
        status.style.backgroundColor = '#2ecc71';
        document.getElementById('syncButton').style.display = 'block';
    } else {
        status.textContent = 'Offline';
        status.style.backgroundColor = '#ff6b6b';
        document.getElementById('syncButton').style.display = 'none';
    }
}

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

const translations = {
    en: {
        math: "Mathematics",
        science: "Science",
        language: "Language",
        back: "Back"
    },
    hi: {
        math: "गणित",
        science: "विज्ञान",
        language: "भाषा",
        back: "वापस"
    },
    ta: {
        math: "கணிதம்",
        science: "அறிவியல்",
        language: "மொழி",
        back: "திரும்பு"
    },
    te: {
        math: "గణితం",
        science: "సైన్స్",
        language: "భాష",
        back: "వెనుకకు"
    }
};

function loadTranslations(lang) {
    document.getElementById('mathLabel').textContent = translations[lang].math;
    document.getElementById('scienceLabel').textContent = translations[lang].science;
    document.getElementById('languageLabel').textContent = translations[lang].language;
    document.getElementById('backButton').textContent = translations[lang].back;
}

// Content management
function loadContent(category) {
    document.querySelector('.content-categories').style.display = 'none';
    const viewer = document.getElementById('contentViewer');
    viewer.style.display = 'block';
    
    // In a real app, this would load from IndexedDB or cached files
    const content = {
        math: "<h3>Basic Arithmetic</h3><p>Learn addition, subtraction, multiplication and division.</p>",
        science: "<h3>Science Basics</h3><p>Introduction to physics, chemistry and biology.</p>",
        language: "<h3>Language Learning</h3><p>Improve reading and writing skills.</p>"
    };
    
    document.getElementById('contentTitle').textContent = 
        translations[document.getElementById('languageSelect').value][category];
    document.getElementById('contentDisplay').innerHTML = content[category];
}

function hideContent() {
    document.querySelector('.content-categories').style.display = 'grid';
    document.getElementById('contentViewer').style.display = 'none';
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
    '/icons/math.png',
    '/icons/science.png',
    '/icons/language.png'
];
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