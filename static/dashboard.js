
function get_all_users(){

    if( $("#userTable").css('display').toLowerCase() == 'table') {
        $("#userTable").css('display','none')
        return
    }

    //call api//
    fetch('http://0.0.0.0:4000/api/user').then(
        (response)=>{
            return response.json()
        }
    ).then(
        (data)=>{
            insertData(data);
            $("#userTable").css('display','table')
        }
    )
}

function insertData(data){

    //clearing previous data
    $("#userTable tbody > tr").remove();
    console.log(data)
    data.forEach(obj => {

        addRow(obj)
    })
}

function addRow(obj){

  // Check if <tbody> tag exists, add one if not
  if ($("#userTable tbody").length == 0) {
   $("#userTable").append("<tbody></tbody>");
  }
  // Append row to <table>
  $("#userTable tbody").append(
    buildTableRow(obj));
}

function buildTableRow(obj) {
  var ret =
    "<tr>" +
     "<td>" + obj.id + "</td>" +
     "<td>" + obj.name + "</td>"
      + "<td>" + obj.email + "</td>" +
    "</tr>";
  return ret;
}


function get_user_details(event) {

  if($("#userDetail").length){
    return
  }

  let td = event.target.closest('td');
  let tr = event.target.closest('tr');

  if (!td) return;

  table = document.getElementById("userTable");
  if (!table.contains(td)) return;

  console.log(tr.innerHTML.split('>'))

  var result = tr.innerHTML.match(/<td>(.*?)<\/td>/g).map(function(val){
         return val.replace(/<\/?td>/g,'');
    });

   // call api //
   fetch(`http://0.0.0.0:4000/api/user/${result[0]}`).then(
        (response)=>{
            return response.json()
        }
    ).then(
        (data)=>{
        console.log(data)
            $('.userSection :input[type="button"]').prop('disabled', true);
            $('.userSection :input[type="button"]').css('cursor', 'not-allowed');

            $("#userTable").css('display','none')
            let user_detail_card = `

                <div id="userDetail" style="display:flex; flex-direction: column;border: 1px solid;">
                    <div style="display: flex;flex-direction: row;width:100%">

                         <div style="display: flex;flex-direction: row;width:100%;border: 1px solid;">
                            <div style="flex:111">user details</div>
                            <div style="flex:1"><input id="close" type="button" value="close"></div>
                        </div>

                    </div>

                    <div style="display: flex;flex-direction: column;">
                        <div style="display: flex;flex-direction: row;width:50%;border: 1px solid;justify-content: space-between">
                            <div>Username</div>
                            <div>${data.username}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width:50%;border: 1px solid;justify-content: space-between">
                            <div>Website</div>
                            <div>${data.website}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width:50%;border: 1px solid;justify-content: space-between">
                            <div>Phone</div>
                            <div>${data.phone}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width:50%;border: 1px solid;justify-content: space-between">
                            <div>Company Name</div>
                            <div>${data.company.name}</div>
                        </div>
                        <div style="display: flex;flex-direction: row;width:50%;border: 1px solid;justify-content: space-between">
                            <div>City</div>
                            <div>${data.address.city}</div>
                        </div>
                    </div>

                </div>

            `
            $("#display").before(user_detail_card)
            $("#close").click(()=>{
            console.log("here")
                $("#userDetail").remove()
                $('.userSection :input[type="button"]').prop('disabled', false);
                $('.userSection :input[type="button"]').css('cursor', 'pointer');
                $("#userTable").css('display','table')
            })


        }
    )

}



function executeHtml(){

            $("#open_ender_output").html('')
            var template = $.trim($("#template").val());
            if(template != ""){
                $('#open_ender_output').append(template);
            }

            return template
}

function saveHtml(){
    template = executeHtml()
    if(template){
        //save template
    }
}