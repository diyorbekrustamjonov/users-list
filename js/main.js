
const usersList = document.querySelector("tbody")
const modalInfo = document.querySelector("#modalInfo")
const editForm = document.querySelector("#editForm")
const modalAddUserForm = document.querySelector("#modalAddUserForm") 

const navbar = document.querySelectorAll(".nav-item")
const fl = document.querySelectorAll("small[sml-id=\"all\"]")
let globalFiltered = "all"

function checkedInput (event) {
	const found = users.find(el => el.userId == event.dataset.id)
  if(found) {
		found.status = event.checked
    console.log(found.status)
		window.localStorage.setItem('users', JSON.stringify(users))
		renderUsers()
	}
}

const modalAddUserData = document.querySelectorAll("#modalAddUserData")

// Modal closas
const closeAddModal = document.querySelector("#closeAddModal")
const closeEdidtModal = document.querySelector("#closeEditModal")

function renderUsers(users){
    let allUsers = ''
    for(let user of users){
        allUsers += `
            <tr>
                <td class="align-middle">
                <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                    <input type="checkbox" onclick="checkedInput(this)" class="custom-control-input" id="${user.userId}" data-id="${user.userId}">
                    <label class="custom-control-label" for="${user.userId}"></label>
                </div>
                </td>
                <td class="align-middle text-center">
                    <div class="bg-light d-inline-flex justify-content-center align-items-center align-top" style="width: 35px; height: 35px; border-radius: 3px;"><i class="fa fa-fw fa-photo" style="opacity: 0.8;"></i></div>
                </td>
                <td class="text-nowrap align-middle">${user.fullName}</td>
                <td class="text-nowrap align-middle"><span>${user.date}</span></td>
                <td class="text-center align-middle">
                    <div class="btn-group align-top">
                        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-id="${user.userId}" onclick="btnEdit(this)" data-target="#editModal">Edit</button>
                        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-id="${user.userId}" data-target="#infoModal" onclick="showInfo(this)"><i class="fa fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-id="${user.userId}" onclick="deleteBtn(this)"><i class="fa fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `
    }
    usersList.innerHTML = allUsers
}
renderUsers(users)



function btnEdit(event){
  const modalEditHeaderText = document.querySelector("#modalEditHeaderText")
  const modalEditData = document.querySelectorAll("#modalEditData")
  const found = users.find(el => el.userId == +event.dataset.id)
  modalEditHeaderText.innerHTML = `User #${found.userId}, ${found.fullName}`

  modalEditData[0].value = found.fullName
  modalEditData[1].value = found.username
  modalEditData[2].value = found.email

  editForm.onsubmit = function(event){
    event.preventDefault()
    if(modalEditData[4].value != found.password) return alert("Current password is correct")
    if(modalEditData[5].value != modalEditData[6].value && modalEditData[5].value.trim().length >=! 8) return alert("New password and confirm password are not equal")
    found.fullName = modalEditData[0].value
    found.username = modalEditData[1].value 
    found.email = modalEditData[2].value
    found.date = modalEditData[3].value
    found.password = modalEditData[5].value
    window.localStorage.setItem("users", JSON.stringify(users))
    renderUsers(users)
    closeEdidtModal.click()
  }
}


function showInfo(event){
  
    let ModalInfoFullName = document.querySelector("#ModalInfoFullName")
    let ModalInfoEmail = document.querySelector("#ModalInfoEmail")
    let ModalInfoPassword = document.querySelector("#ModalInfoPassword")
    let ModalInfoUsername = document.querySelector("#ModalInfoUsername")
    let ModalInfoDate = document.querySelector("#ModalInfoUserId") 
    let ModalInfoUserId = document.querySelector("#ModalInfoUserId")
    const found = users.find(el => el.userId == +event.dataset.id)
    ModalInfoFullName.innerHTML = found.fullName
    ModalInfoEmail.innerHTML = found.email
    ModalInfoPassword.innerHTML = found.password
    ModalInfoUsername.innerHTML = found.username
    ModalInfoDate.innerHTML = found.date
    ModalInfoUserId.innerHTML = found.userId
}

function deleteBtn(event){
  const found = users.find(el => el.userId == +event.dataset.id)
  users.splice(users.indexOf(found), 1)
  window.localStorage.setItem("users", JSON.stringify(users))
  renderUsers(users)
}


modalAddUserForm.onsubmit = function(e){
  e.preventDefault()
  if(modalAddUserData[4].value.trim() != modalAddUserData[5].value.trim()) return alert("New password and confirm password are not equal")
  let newUser = {
    userId: users.length ? users.at(-1).userId + 1 : 1,
    fullName: modalAddUserData[0].value,
    username: modalAddUserData[1].value,
    email: modalAddUserData[2].value,
    date: modalAddUserData[3].value,
    password: modalAddUserData[4].value
  }
  users.push(newUser)
  window.localStorage.setItem("users", JSON.stringify(users))
  renderUsers(users)
  closeAddModal.click()
}



