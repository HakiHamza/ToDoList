function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
  // countAll();
  // countCompleted();
  // countActive();
}

function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    console.log(snapshot);
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateItems(items);
    // countCompleted();
    // countActive();
  });
}

// function countAll() {
//   db.collection("todo-items")
//     .get()
//     .then((snap) => {
//       size = snap.size;
//       document.getElementById("demo").innerHTML = size;
//     });
// }

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    itemsHTML += `
    <div class="todo-items">
      <div class="todo-item" onclick="deleteListItem()">
        <div class="check">
            <div data-id="${item.id}" class="check-mark 
            ${item.status == "completed" ? "checked" : ""}">
            <img src="https://img.icons8.com/external-becris-lineal-becris/15/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png"/>
            </div>
        </div>
        <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
          ${item.text}
        </div>
        <div class="delete">
          <div onclick="deleteListItem()" class="delete-mark ${
            item.status == "completed" ? "checked" : "nothing"
          }" data-id="${item.id}">
            <img src="https://img.icons8.com/material-outlined/24/000000/filled-trash.png"/>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}

function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
  let bins = document.querySelectorAll(".trash");
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function () {
      markCompleted(checkMark.dataset.id);
    });
  });
  // bins.forEach((bin) => {
  //   bin.addEventListener("click", function () {
  //     deleteListItem(bin.dataset.id);
  //     countAll();
  //     countCompleted();
  //     countActive();
  //   });
  // });
}

function deleteListItem(id) {
  let item = db.collection("todo-items").doc(id);
  alert("i was clicked delete" + JSON.stringify.item);
  item.delete();
}

function markCompleted(id) {
  // from my database
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        item.update({
          status: "completed",
        });
      } else if (status == "completed") {
        item.update({
          status: "active",
        });
      }
    }
  });
}

// function deleteCompleted() {
//   var item = db.collection("todo-items").where("status", "==", "completed");
//   item.get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       doc.ref.delete();
//     });
//     countAll();
//     countCompleted();
//     countActive();
//   });
// }

// function deleteAll() {
//   var item = db.collection("todo-items");
//   item.get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       doc.ref.delete();
//     });
//     countAll();
//     countCompleted();
//     countActive();
//   });
// }

// function countCompleted() {
//   db.collection("todo-items")
//     .where("status", "==", "completed")
//     .get()
//     .then((snap) => {
//       size = snap.size;
//       document.getElementById("demo3").innerHTML = size;
//     });
// }

// countAll();
// countCompleted();
// countActive();
//   Delete function from firebase + delete all function + completed still need to be done
getItems();
