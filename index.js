// function to create registration
function signUp(event) {
    event.preventDefault();
// calling the spinner on the button
    const getSpin = document.getElementById("spin");
    getSpin.style.display = "inline-block";

    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
    const getConfirmPassword = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.fire({
            icon: 'warning',
            text: 'All fields are required',
            confirmButtonColor: '#2d85de',
        })
        getSpin.style.display = "none";
    }else if(getConfirmPassword !== getpassword) {
        Swal.fire({
            icon: 'warning',
            text: 'Password is incorrect',
            confirmButtonColor: '#2d85de',
        });

    } else if(getpassword.lenght > 6) {
        Swal.fire({
            icon: 'info',
            text: "Password should not be more than 6 characters",
            confirmButtonColor: '#2d85de',
        });
    }
    else {
        const regData = new FormData();
        regData.append("name",getName);
        regData.append("email",getEmail);
        regData.append("password",getPassword);
        regData.append("password_confirmation",getConfirmPassword);

        const regRequest = {
            method: 'POST',
            body: regData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, regRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2d85de'
                })
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 3000);
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful',
                    confirmButtonColor: '#2d85de'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}


// function to create login
function logIn(event) {
    event.preventDefault();
    const getSpin = document.getElementById("spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#2d85de'
        })
        getSpin.style.display = "none";
    }else{
        const logData = new FormData();
        logData.append("email", getEmail);
        logData.append("password", getPassword);

        const logReg ={
            method: 'POST',
            body: logData
        };
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, logReg)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("adminlogin", JSON.stringify(result));
            const myDetails = localStorage.getItem("adminlogin");
            const theDetails = JSON.parse(myDetails);
            if (theDetails.hasOwnProperty("email")) {
                window.location.href = "dashboard.html"
            }else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful',
                    confirmButtonColor: '#2d85de'
                })
                getSpin.style.display = "none";
            }

        })
        .catch(error => console.log('error', error));
    }
}
// function login ends here

// function to pop up for top three students
var modal = document.getElementById('popup-modal');

var modalBtn = document.getElementById('modal-Btn');

var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click', openmodal);

closeBtn.addEventListener('click', closemodal);

window.addEventListener('click', outsideclick);

function openmodal(){
    modal.style.display = 'block';
}

function closemodal(){
    modal.style.display = 'none';
}

function outsideclick(e){
    if(e.target == modal){

    modal.style.display = 'none';
    }
}
// function for dashboard details
function getDashApi() {
    const mySpin = document.querySelector(".pagemodal");
    mySpin.style.display = "block";
    const getToken = localStorage.getItem("adminlogin");
    const tokenItem = JSON.parse(getToken);
    const token = tokenItem.token;

    const tokAuth = new Headers();
    tokAuth.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: 'GET',
        headers: tokAuth
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const category = document.querySelector(".category");
        const learn = document.querySelector(".learn");
        const total = document.querySelector(".total");
        const quiz = document.querySelector(".quiz");
        const students = document.querySelector(".students");
        const getAdmin = document.getElementById("adminId")
        category.innerHTML = `${result.total_number_of_categories}`;
        learn.innerHTML = `${result.total_number_of_learningmaterial}`;
        total.innerHTML = `${result.total_number_of_subcategories}`;
        quiz.innerHTML =   `${result.total_number_of_quize}`;
        students.innerHTML = `${result.total_number_of_students}`;
        getAdmin.innerHTML = `${result.admin_email}`;

        mySpin.style.display = "none";
        // styling of fonts
        category.style.fontSize = "30px";
        learn.style.fontSize = "30px";
        total.style.fontSize = "30px";
        quiz.style.fontSize = "30px";
        students.style.fontSize = "30px";

    })
    .catch(error => console.log('error', error));
}
getDashApi();
// dashboard function api ends here

// function to get top three students
function getTopThree() {
    const getToken = localStorage.getItem("adminlogin");
    const tokenItem = JSON.parse(getToken);
    const token = tokenItem.token;

    const tokHuth = new Headers();
    tokHuth.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: 'GET',
        headers: tokHuth
    };

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const topThree = document.querySelector(".allstudent");
        if (result.length === 0) {
            topThree.innerHTML = "No record found";
        }
        else {
            result.map((item) => {
                data += `
                <div class="card-details">
                    <p><span class="title">Name</span>: <span class="details">${item.name}</span></p>
                    <p><span class="title">Email</span>: <span class="details">${item.email}</span></p>
                    <p><span class="title">Phone</span>: <span class="details">${item.phone_number}</span></p>
                    <p><span class="title">Position</span>: <span class="details">${item.position}</span></p>
                    <p><span class="title">Score</span>: <span class="details">${item.total_score}</span></p>
                </div>
                `
            })

        }
        topThree.innerHTML = data;
    })
    .catch(error => console.log('error', error));

}
getTopThree();
// top three students function ends here

// function to get all students
function getAllStudents() {
    const getToken = localStorage.getItem("adminlogin");
    const tokenItem = JSON.parse(getToken);
    const token = tokenItem.token;

    const tokButh = new Headers();
    tokButh.append("Authorization", `Bearer ${token}`);

    const dashReq = {
        method: 'GET',
        headers: tokButh
    };

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const AllStudents = document.querySelector(".tablecontent");
        if (result.lenght === 0) {
            AllStudents.innerHTML = "No record found";
        }
        else {
            result.map((item)=> {
                data += 
                `
                    <tr>
                       <td>${item.name}</td>
                       <td>${item.email}</td>
                       <td>${item.phone_number}</td>
                       <td>${item.position}</td>
                       <td>${item.total_score}</td>
                    </tr>
                `
            })

        }
        AllStudents.innerHTML = data;
    })
    .catch(error => console.log('error', error));
}
getAllStudents();
// get all students functions ends here




// function to create-category section
function createCategory(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const categoryName = document.getElementById("sec").value;
    const getImage = document.getElementById("image").files[0];

    if (categoryName === "" || getImage === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#2D85DE'
        });
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem('adminlogin');
        const token = JSON.parse(getToken);
        const theToken = token.token;

        const catHeader = new Headers();
        catHeader.append("Authorization", `Bearer ${theToken}`);

        const formdata = new FormData();
        formdata.append("name", categoryName);
        formdata.append("image", getImage);


        const dashReq = {
            method: 'POST',
            headers: catHeader,
            body: formdata
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
        fetch(url, dashReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'created successfully',
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                  location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
            
        })
        .catch(error => console.log('error', error));

    }
}

// function for category list
function getCatList() {
    const getScrollItem = document.querySelector(".scroll-object");
    const getToken = localStorage.getItem('adminlogin');
    const token = JSON.parse(getToken);
    const myToken = token.token;

    const listHeaders = new Headers();
    listHeaders.append("Authorization", `Bearer ${myToken}`);

    const listOptions = {
        method: 'GET',
        headers: listHeaders
    }

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

    fetch(url, listOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result?.map((item) => {
            data += `
            <div class="search-card">
              <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
              <p>${item.name}</p>
              <div class="text-right">
                <button class="update-button" onclick="openModal(${item.id})">Update</button>
                <button class="delete-button" onclick="deleteCategory(${item.id})">Delete</button>
              </div>
            </div>
            `
            getScrollItem.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
}

getCatList();