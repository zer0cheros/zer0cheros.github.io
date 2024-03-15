const showModal = document.getElementById('show-modal');
const blogForm = document.getElementById('form');
let hacks =  []
let currentAction = 'add';
(async function initialize() {
    await addToStore(); 
    getHacks();
})();

showModal.addEventListener('click', ()=>{
    document.getElementById('modal').style.display = 'flex';
})

document.getElementById('close').addEventListener('click', ()=>{
    document.getElementById('modal').style.display = 'none';
})

blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = blogForm.dataset.hackId ? parseInt(blogForm.dataset.hackId) : hacks.length + 1;
    const title = blogForm.title.value;
    const content = blogForm.content.value;
    const author = blogForm.author.value;
    const img = blogForm.img.value;

    if (title && content) {
        if (currentAction === 'add') {
            // Add logic
            hacks.push({ id, title, content, author, img });
        } else if (currentAction === 'update') {
            // Update logic
            const hackIndex = hacks.findIndex(hack => hack.id === id);
            if (hackIndex !== -1) {
                hacks[hackIndex] = { id, title, content, author, img };
            }
        }
        localStorage.setItem('hacks', JSON.stringify(hacks));
        blogForm.reset();
        document.getElementById('modal').style.display = 'none';
        delete blogForm.dataset.hackId;
        currentAction = 'add';
        getHacks();
    } else {
        alert('Fyll i alla fält');
    }
});

function deleteHack(id){
    console.log(id);
    hacks = hacks.filter((hack)=>{
        return hack.id !== id;
    })
    localStorage.setItem('hacks', JSON.stringify(hacks));
    getHacks();
}


async function getHacks(){
    let allHacks = '';
    console.log(hacks);
    hacks.forEach((hack)=>{
        allHacks += `
        <div class="flex max-w-[30%] mb-10 bg-slate-50 shadow-md rounded-md flex-col items-center justify-center">
        <h2 class="text-3xl mb-4">${hack.title}</h2>
        <p>${hack.content}</p>
        <h4> Author: ${hack.author}</h4>
        <img class="p-5" src="${hack.img}" alt="hack">
        <div class="flex px-20 py-5 justify-between w-full">
        <svg onclick="UpdateHack(${hack.id})" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"/>
        </svg>
        <svg onclick="deleteHack(${hack.id})" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        </div>
        `
    })
    document.getElementById('hacks').innerHTML = allHacks;
}

async function readFromJson(){
    const res = await fetch('hacks.json');
    const data = await res.json();
    return data;
}

async function addToStore() {
    if (!localStorage.getItem('hacks')) {
        const data = await readFromJson();
        localStorage.setItem('hacks', JSON.stringify(data));
        hacks = data;
    } else {
        hacks = JSON.parse(localStorage.getItem('hacks'));
    }
}
function prepareUpdateForm(id) {
    currentAction = 'update'; 
    const hackIndex = hacks.findIndex(hack => hack.id === id);
    if (hackIndex === -1) return; 
    const hack = hacks[hackIndex];
    document.getElementById('title').value = hack.title;
    document.getElementById('content').value = hack.content;
    document.getElementById('author').value = hack.author;
    document.getElementById('img').value = hack.img;
    document.getElementById('modal').style.display = 'flex';
    blogForm.dataset.hackId = id;
}

function UpdateHack(id) {
    prepareUpdateForm(id); 
}
