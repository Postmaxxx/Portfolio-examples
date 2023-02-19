//--------------- mobile--------------------------------
const navBtnMob = document.querySelector("[data-obj='nav__btn_mob']");
let navDropContMainBS = new bootstrap.Collapse(document.querySelector("[data-obj='nav_bottom__drop_main']"));


//------------------------------ collapsable submenus and control buttons ------------------------------------
const menuButtons = document.querySelectorAll("[data-navbtn]");
const navSelectableButtons = document.querySelectorAll("[data-navbtnSelectable]"); //buttons with frame
const navBSObjects = Array.from(document.querySelectorAll("[data-nav-collapsed]")).map(obj => { //creating array from BS submenus
    return new bootstrap.Collapse(obj)
});



//---------------------------------cookies----------------------------------
const cookieButtons = document.querySelectorAll("[data-cookieaction]");
const blockCookiesBS = new bootstrap.Collapse(document.querySelector("[data-obj='block_cookies']"));




//-----------------------------------side menu / modal contactUs -----------------------------
const contactUsModal = document.querySelector("[data-obj='contactUsModal']");
const modalMessageCloseBtn = contactUsModal.querySelector("[data-obj='contactUsModal__btn_close']");
const modalMessageSubmitBtn = contactUsModal.querySelector("[data-obj='contactUsModal__btn_submit']");
const modalMessageInputs = contactUsModal.querySelectorAll("[data-obj='modal-body__input']");
const modalMessageValidateInputs = contactUsModal.querySelectorAll("[data-validate]");
const modalMessageBS = new bootstrap.Modal(document.querySelector("[data-obj='contactUsModal']"));


//-----------------------------------side menu / modal email signUp -----------------------------
const emailSignUpModal = document.querySelector("[data-obj='emailSignUpModal']");
const modalEmailSignUpCloseBtn = emailSignUpModal.querySelector("[data-obj='emailSignUpModal__btn_close']");
const modalEmailSignUpBtn = emailSignUpModal.querySelector("[data-obj='emailSignUpModal__btn_submit']");
const modalEmailSignUpInputs = emailSignUpModal.querySelectorAll("[data-obj='modal-body__input']");
const modalEmailSignUpValidateInputs = emailSignUpModal.querySelectorAll("[data-validate]");
const modalemailSignUpBS = new bootstrap.Modal(document.querySelector("[data-obj='emailSignUpModal']"));

//-----------------------------------side menu / modal email download -----------------------------
const emailDownloadModal = document.querySelector("[data-obj='emailDownloadModal']");
const modalEmailDownloadCloseBtn = emailDownloadModal.querySelector("[data-obj='emailDownloadModal__btn_close']");
const modalEmailDownloadBtn = emailDownloadModal.querySelector("[data-obj='emailDownloadModal__btn_submit']");
const modalEmailDownloadInputs = emailDownloadModal.querySelectorAll("[data-obj='modal-body__input']");
const modalEmailDownloadValidateInputs = emailDownloadModal.querySelectorAll("[data-validate]");
const modalemailDownloadBS = new bootstrap.Modal(document.querySelector("[data-obj='emailDownloadModal']"));

const accemailDownloadModal = emailDownloadModal.querySelector("[data-obj='accordion-emailDownloadModal']");
let accemailDownloadModalButton = accemailDownloadModal.querySelector("[data-obj='accordion-emailDownloadModal__button']");
var accemailDownloadModalBody = new bootstrap.Collapse(accemailDownloadModal.querySelector("[data-obj='acc-emailDownloadModal__body-1']"), {
    toggle: false
});


//-----------------------------------news-blog-navigation -----------------------------
const newsCategories = document.querySelector("[data-news='categories']"); 







//------------------------------- store -----------------------------------------------

let store = { 
    menu: "",
    newsCategory: "",
    newsSubCategory: "",
    showCookies: true,
    modalContactUS: false,
    cookies_delay: 3000
}



//------------------------------- close all menus and modal windows------------------------------
function closeAll() {

    navBSObjects.forEach(objBS => {
            objBS.hide();
    })

    if (navSelectableButtons) {
        navSelectableButtons.forEach(button => {
            button.classList.remove("opened")
        }) 
    }


    navBtnMob.classList.remove("opened");
}


//----------------- menu ---------------------------------------------------
function toggleMenu(clickedButton) {
    const menuName = clickedButton.dataset.navbtn;
    if (menuName === store.menu) {
        store.menu = "";
    } else {
        if (store.menu && menuName === "mob_main") {
            store.menu = "";
        } else {
            store.menu = menuName;
        }
    }

    if (store.menu === "") {
        closeAll();
        return;
    }

    
    if ((store.menu === "mob_main") || (store.menu === "mob_back")) {
        closeAll();
        navBtnMob.classList.add("opened");
        navDropContMainBS.show();
    }

//-------------------------------------------------------------------------------

    navBSObjects.forEach(objBS => {
        if (clickedButton.dataset.navbtn === objBS._element.dataset.obj) {
            closeAll();
            objBS.show();
            if (clickedButton.dataset.navbtnselectable !== undefined) {
                clickedButton.classList.add("opened");  
            }
        }
    })
    

    if (store.menu === "contact_modal") {
        closeAll();
        modalMessageBS.show();
    }

    if (store.menu === "email-singup_modal") {
        closeAll();
        modalemailSignUpBS.show();
    }

    if (store.menu === "email-download_modal") {
        closeAll();
        modalemailDownloadBS.show();
    }

}


//------------------------ button listeners----------------------------------------
menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        toggleMenu(button);
    })
})


//--------------------cookies---------------------------


function cookiesAction(action) {
    console.log("cookies: ", action);
    if (action === "close") {
        store.showCookies = false;
        //insert some deny-cookie action here
    }
    if (action === "accept") {
        store.showCookies = false;
        //insert some accept-cookie action here
    }
    if (action === "deny") {
        store.showCookies = false;
        //insert some deny-cookie action here
    }
    store.showCookies ? blockCookiesBS.show() :  blockCookiesBS.hide();
}

if (cookieButtons) {
    cookieButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            cookiesAction(button.dataset.cookieaction);
        })
    })  
    
    setTimeout(() => {
        store.showCookies ? blockCookiesBS.show() : null;
    }, store.cookies_delay)

}







//--------------------------------modals ----------------------------------------------

//----------------------------------- Contact Us ------------------------------------------
function modalMessageSubmitClicked(e) {
    
    let correct = true;
    console.log(modalMessageValidateInputs);
    modalMessageValidateInputs.forEach(input => !input.validity.valid ? correct = false : null )
    if (correct) {
        // send form logic should be here
        let sendingData = []
        modalMessageInputs.forEach((input) => sendingData.push(input.value));
        console.log("sending data: ", sendingData);
        //store.menu = "";
        alert("All data has been sent! (Contact Us)");
        modalMessageBS.hide();

    } else {
        console.log('Incorrect sending data, sending canceled');
    }
}


modalMessageSubmitBtn.addEventListener("click", (e) => {
    modalMessageSubmitClicked(e);
})


contactUsModal.addEventListener("hide.bs.modal", (e) => {
    store.menu = "";
})


//----------------------------------- Email Sign Up ------------------------------------------

function modalEmailSignUpClicked(e) {
    let correct = true;
    modalEmailSignUpValidateInputs.forEach(input => !input.validity.valid ? correct = false : null )
    if (correct) {
        // send form logic should be here
        let sendingData = []
        modalEmailSignUpInputs.forEach((input) => sendingData.push(input.value));
        console.log("sending data: ", sendingData);
        //store.menu = "";
        alert("All data has been sent! (Sign Up)");
        modalemailSignUpBS.hide();
    } else {
        console.log('Incorrect sending data, sending canceled');
    }
}


modalEmailSignUpBtn.addEventListener("click", (e) => {
    modalEmailSignUpClicked(e);
})


emailSignUpModal.addEventListener("hide.bs.modal", (e) => {
    store.menu = "";
})




//----------------------------------- Email Download ------------------------------------------

function modalEmailDownloadClicked(e) {
    let correct = true;
    modalEmailDownloadValidateInputs.forEach(input => !input.validity.valid ? correct = false : null )
    if (correct) {
        // send form logic should be here
        let sendingData = []
        modalEmailDownloadInputs.forEach((input) => sendingData.push(input.value));
        console.log("sending data: ", sendingData);
        //store.menu = "";
        alert("All data has been sent! (Download)");
        modalemailDownloadBS.hide();
    } else {
        console.log('Incorrect sending data, sending canceled');
    }
}


modalEmailDownloadBtn.addEventListener("click", (e) => {
    modalEmailDownloadClicked(e);
})

emailDownloadModal.addEventListener("hide.bs.modal", (e) => {
    store.menu = "";
})


function fillInputIndustry(value) {
    emailDownloadModal.querySelector("[data-obj='emailDownloadModal-industry-input']").value = value; //fill invisible input with the current/chosen value
}

 
function changeemailDownloadModalValue(e) { // change the header text from the selected item
    accemailDownloadModalButton.children[0].innerText = e.target.children[0].innerText;
    fillInputIndustry(accemailDownloadModalButton.children[0].innerText);
    accemailDownloadModalBody.hide();
}


accemailDownloadModal.addEventListener('click', (e) => {
    if (e.target.dataset.obj != "accordion-emailDownloadModal__button") { // if selected !header
        changeemailDownloadModalValue(e);
    }
})


fillInputIndustry(accemailDownloadModalButton.children[0].innerText);





if (newsCategories) { //if page has newNavigation
    const newsCategoriesList = Array.from(newsCategories.children);
    store.newsCategory = newsCategoriesList[0].children[0].innerText; //select first Category as selected by default
    store.newsSubCategory = newsCategoriesList[0].children[1].children[0].innerText; //select first subCategory of selected Category as selected by default
    redrawNewsMenu()

    function redrawNewsMenu() {
        newsCategoriesList.map(menuItem => { //change classes for Category
            menuItem.children[0].innerText === store.newsCategory ? menuItem.classList.add('selected') : menuItem.classList.remove('selected')
        })
    }

    function changeNewsCategory(clickedObject) {
        if (clickedObject.parentNode.parentNode.tagName === 'LI') { //if subCategory is clicked
            store.newsSubCategory = clickedObject.innerText; 
        } else { //if category is clicked
            const clickedCategory = clickedObject.tagName === 'H3' ? clickedObject.parentNode : clickedObject; //get the parent li element if clicked on h3
            store.newsCategory = clickedCategory.children[0].innerText; //take the children (h3) html text as category description
            store.newsSubCategory = clickedCategory.children[1].children[0].innerText; //select the first nested li as a default subCategory
            redrawNewsMenu();
        }
        console.log('News category is: ', store.newsCategory);
        console.log('News subcategory is: ',store.newsSubCategory);
    }

    newsCategoriesList.map(menuItem => {
        menuItem.addEventListener('click', (e) => changeNewsCategory(e.target))
    })
}


  
//# sourceMappingURL=layout.js.map
