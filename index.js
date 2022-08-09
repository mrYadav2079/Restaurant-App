const searchTables = ()=>{
  let t1 = document.getElementById('serach').value.toUpperCase();
  for(var i =0;i<3;i++){
  let t3=document.getElementsByClassName("tableitem")[i];
  let t2 = document.getElementsByClassName("tableitem")[i].getElementsByTagName("h3")[0].textContent.toUpperCase();
   if(t2.indexOf(t1)>-1)
   {
           t3.style.display="";
   }
   else{
       t3.style.display="none"; 
   }
  }


}
const searchItem=()=>{
  let t1= document.getElementById('searchitem').value.toUpperCase();
  for(var i=0;i<5;i++){
      let t3 = document.getElementsByClassName("item")[i];
      let t2 = document.getElementsByClassName("item")[i].getElementsByTagName("h3")[0].textContent.toUpperCase();
      if(t2.indexOf(t1)>-1){
          t3.style.display="";
      }else{
          t3.style.display="none";
      }
  }

}

function showTable(t1){
    const a = document.getElementById("summary-" + t1);
    a.style.display="block";
}

function closeTable(t1){
    const a = document.getElementById("summary-" + t1);
    a.style.display="none";
}




function create(event){
    event.preventDefault();
}

function itemDrag(event){
    event.dataTransfer.setData("text",event.target.id);
}

function drop(event,target){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    let item = document.getElementById(data).textContent;
    var tableid = target.id.replace("able","");
    console.log(data);
    console.log(target.id);
    console.log(item);
    var vals = item.split(" Price:");
    console.log(vals);
    var itemexists= false;
    let tbodies=document.getElementById(tableid).getElementsByTagName("tbody");
    console.log(tbodies);
    console.log(tbodies.length);
    for(var i=0;i<tbodies.length;i++){
        let tr = tbodies[i].children[0];
        console.log(tr);
        let itemname=tr.children[0].textContent;
        console.log(itemname);
        console.log(vals[0]);
        if (itemname == vals[0]) {
            itemexists = true;
            inputId = tableid + "i" + (i + 1);
            console.log("inputid", inputId);
            console.log("inputid", document.getElementById(inputId));
            let quantity = parseInt(document.getElementById(inputId).value) + 1;
            console.log(tr.children[2]);
            tr.children[2].innerHTML = `<input type="number" id=${inputId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${tableid}'); ">`;
            break;
          }
        
    }
    let quantity = 1;
    let inpId =
      tableid + "i" + document.getElementById(tableid).rows.length;
  
    if (itemexists == false) {
      console.log(document.getElementById(tableid).innerHTML);
      document.getElementById(
        tableid
      ).innerHTML += `<tr><td>${vals[0]}</td><td>${vals[1]}</td><td><input type="number" id=${inpId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${tableid}'); "></td><td><a onclick="deleteItem(this,'${tableid}')"><div class="w3-padding w3-xlarge w3-text-black">
          <i class="material-icons">delete</i>
          </div></a></td></tr>`;
      total = calculateTotal(tableid);
      document.getElementById("total" + tableid).innerHTML = `${total}`;
    }
    var itemsId = "items" + tableid;
    var noOfItems = document.getElementById(tableid).rows.length - 1;
    document.getElementById(itemsId).innerHTML = `Items : ${noOfItems}`;
    calculateTotal(tableid);
}


function setQuantity(element) {
    let quantity = element.value;
    if (quantity < 0 || quantity > 10) {
      alert("Minimum order 1 and Maximum orders is 10");
      element.defaultValue = 1;
      element.value = 1;
    } else {
      element.defaultValue = quantity;
    }
    console.log(element);
  }

  function calculateTotal(tableId) {
    var totalId = "total" + tableId;
    var total = 0;
    console.log(totalId);
    console.log(tableId);
    var Rows = document.getElementById(tableId).rows;
    for (let k = 1; k < Rows.length; k++) {
      let i = Rows[k];
      console.log(i);
      let j= Rows[k].children[2];
      console.log(j);
      let abcd =  Rows[k].children[2].children[0];
      console.log(abcd);
      let inputId = Rows[k].children[2].children[0].id;
      console.log(inputId);
      let price = parseInt(Rows[k].children[1].textContent);
      total += price * parseInt(document.getElementById(inputId).value);
    }
    var itemsId = "items" + tableId;
    document.getElementById(itemsId).innerHTML = `Items : ${Rows.length - 1}`;
    document.getElementById(totalId).innerHTML = `Total : ${total}`;
    totalId = "total" + tableId;
    document.getElementById(totalId).innerHTML = `<b>Total :</b> ${total}`;
    return total;
  }

  function deleteItem(element, id) {
    element.parentElement.parentElement.parentElement.remove();
    calculateTotal(id);
  }


  function resetTable(id) {
    alert("The total bill is " + calculateTotal(id));
    document.getElementById(id).innerHTML = `<thead><tr>
      <th>Item</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>delete</th>
      </tr></thead>`;
    calculateTotal(id);
    console.log(id);
    let viewId = "view" + id.slice(1);
    let bId = "reset" + id.slice(1);
    document.getElementById(bId).style.display = "block";
    document.getElementById(viewId).style.display = "block";
    const modal = document.querySelector("#my-modal-" + id);
    modal.style.display = "none";
    const table = document.getElementById("table" + id.slice(1));
    table.style.backgroundColor = "white";
  }
