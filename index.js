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

        const url = "https://codesandbox.com.ng/yorubalearning/api/register_admin";

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
        const url = "https://codesandbox.com.ng/yorubalearning/api/admin_login";

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

    const url = "https://codesandbox.com.ng/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const category = document.querySelector(".category");
        const learn = document.querySelector(".learn");
        const total = document.querySelector(".total");
        const quiz = document.querySelector(".quiz");
        const students = document.querySelector(".students");
        category.innerHTML = `${result.total_number_of_categories}`;
        learn.innerHTML = `${result.total_number_of_learningmaterial}`;
        total.innerHTML = `${result.total_number_of_subcategories}`;
        quiz.innerHTML =   `${result.total_number_of_quize}`;
        students.innerHTML = `${result.total_number_of_students}`;

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

    const url = "https://codesandbox.com.ng/yorubalearning/api/admin/top_three_students";
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

    const url = "https://codesandbox.com.ng/yorubalearning/api/admin/get_all_students";
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



