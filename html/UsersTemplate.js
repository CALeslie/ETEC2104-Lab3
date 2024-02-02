"use strict";

function submitChanges(){
    let file = document.getElementById("pic").files[0];
    let R = new FileReader();
    if(!file){
        console.log("No file!");
        finishUpdate(R);
        return;
    }
    
    R.addEventListener("load", () => {
        finishUpdate(R);
    })
    R.readAsBinaryString(file);
}

function finishUpdate(R) {
    let name = document.getElementById("name").value;
    let login = document.getElementById("login").value;
    let dob = document.getElementById("dob").value;
    let email = document.getElementById("email").value;
    let picture = btoa(R.result);
    let J = {
        Name: name,
        Login: login,
        Dob: dob,
        Email: email,
        Picture: picture
    };
    fetch( "/profile/.*",
        {   method: "POST",
            body: JSON.stringify(J)
        }
    ).then( (resp) => {
        //can also use text(), blob(), or arrayBuffer()
        resp.json().then( (J) => {
            console.log("Server said:",J);
        });
    }).catch( (err) => {
        console.log("Uh oh",err);
    })

    if (name != "") {
        document.getElementById("nameDisplay").innerHTML = "Name: " + name;
    }
    if (login != "") {
        document.getElementById("loginDisplay").innerHTML = "Login: " + login;
    }
    if (dob != "") {
        document.getElementById("dobDisplay").innerHTML = "DOB: " + dob;
    }
    if (email != "") {
        document.getElementById("emailDisplay").innerHTML = "Email: " + email;
    }
    if (document.getElementById("pic").files[0] != null) {
        document.getElementById("pictureDisplay").src = URL.createObjectURL(document.getElementById("pic").files[0]);
    }
    
    document.getElementById("name").value = null;
    document.getElementById("login").value = null;
    document.getElementById("dob").value = null;
    document.getElementById("email").value = null;
    document.getElementById("pic").value = null;
}