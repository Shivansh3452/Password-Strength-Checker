console.log(" main.js loaded");
const passwordInput=document.getElementById("password")
const progressBar=document.getElementById("password-strength-meter").firstElementChild
const messageList=document.getElementById("password-strength-messages")

function checkPasswordStrength(password){
    let score=0
    const hasLowercase=/[a-z]/.test(password)
    const hasUppercase=/[A-Z]/.test(password)
    const hasNumbercase=/[0-9]/.test(password)
    const hasSymbol=/[^\w\s]/.test(password)
    const length=password.length

    if (length>=8){
        score+=2
    }
    if (length>=12){
        score+=1
    }
    if (hasLowercase && hasUppercase){
        score+=2
    }
    if (hasNumbercase || hasSymbol){
        score+=2
    }
    const percentage=Math.round((score/7)*100)
    progressBar.style.width=`${percentage}%`
    progressBar.setAttribute('aria-valuenow',percentage)

    progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
    messageList.innerHTML=''
    switch(true){
        case(score<=2):
        messageList.innerHTML='<li class="list-group-item text-danger">That is weak dude</li>'
        progressBar.classList.add('weak')
        break;

        case(score<=4):
        messageList.innerHTML='<li class="list-group-item text-warning">Okay! but can be improved</li>'
        progressBar.classList.add('medium')
        break;

        case(score<=10):
        messageList.innerHTML='<li class="list-group-item text-success">Damn Strong</li>'
        progressBar.classList.add('strong')
        break;
    }
}

passwordInput.addEventListener('keyup',()=>{
    const password=passwordInput.value
    checkPasswordStrength(password)
})