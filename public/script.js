//Alert Box Success/Failure
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search)

    if(urlParams.has('success')) {
        // alert('Reservation successful')
        redirect('/reservation')
    }else if (urlParams.has('error')) {
        alert('There was an error in making the reservation. Please call (951)220-4136')
    }
}


//Tabbed Menu
function openMenu(event, menuName) {
    let menuArray = document.getElementsByClassName('menu')
    for (let i=0; i < menuArray.length; i++ ) {
        menuArray[i].style.display = 'none'
    }

    let tablinks = document.getElementsByClassName('tablink')
    for (let i=0; i < tablinks.length; i++ ) {
        tablinks[i].classList.remove('active-tab')
    }

     document.getElementById(menuName).style.display ='block'
     event.currentTarget.classList.add('active-tab')
} 

document.getElementById("mainLink").click()