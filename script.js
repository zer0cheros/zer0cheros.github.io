document.querySelector('#check').addEventListener('click', ()=>{

  const strength = getPasswordStrength(document.querySelector('#pass').value)
  openModal(strength)
})

function getPasswordStrength(password) {
    var strength = 0;
    var length = password.length;
    // Check if the password meets each criteria and increase strength accordingly
    if (length >= 16) {
        strength += 25
    } else {
        var lengthPercentage = (length  / 16) * 25; 
        strength += lengthPercentage;
      }
      
      var uppercaseCount = password.replace(/[^A-Z]/g, "").length;
      if (uppercaseCount > 3) {
        strength += 25;
      } else {
        var uppercasePercentage = (uppercaseCount / 3) * 25; 
        strength += uppercasePercentage;
      }
      var numbercaseCount = password.replace(/[^0-9]/g, "").length;
      if (numbercaseCount > 3) {
        strength += 25;
      } else {
        var numbercasePercentage = (numbercaseCount / 3) * 25;
        strength += numbercasePercentage;
      }
    var specialChar = password.replace(/[^!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/]/g, "").length;
    if (specialChar > 3) {
      strength += 25;
    } else {
      var specialCharPercentage = (specialChar / 3) * 25;
      strength += specialCharPercentage;
    }
  
    return strength;
  }

  function openModal(strength) {
    const modal = document.getElementById("modal");
    modal.classList.remove('hidden')
    modal.classList.add('fixed')
    const progressBarFill = document.getElementById("progress-bar-fill");
    const p = document.getElementById("procent");
    progressBarFill.style.width = `${strength}%`;
    if(strength < 20){
      progressBarFill.classList.add('bg-red-500')
      progressBarFill.classList.remove('bg-green-500')
    }
    else {
      progressBarFill.classList.add('bg-green-500')
      progressBarFill.classList.remove('bg-red-500')
    }
    p.innerText = `${strength.toFixed(0)}% Procent`
    modal.animate(
      [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
      { duration: 300, easing: 'ease-in-out' }
  );
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.animate(
      [{ transform: 'translateY(0%)' }, { transform: 'translateY(100%)' }],
      { duration: 300, easing: 'ease-in-out' }
  );
  setTimeout(()=>{
    modal.classList.remove('fixed')
    modal.classList.add('hidden')
  }, 300)
   
    
}