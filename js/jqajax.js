$(document).ready(function() {

    // Ajax Get Req
    function showData() {
        output = '';
        $.ajax({
            url: "php/retrieve.php",
            method: "GET",
            dataType: "json",
            success: function(data) {
                x = data ? data : "";
                for (var i = 0; i < x.length; i++) {
                    output +=
                        `<tr>
                    <td>${x[i].id}</td>
                    <td>${x[i].name}</td>
                    <td>${x[i].email}</td>
                    <td>${x[i].password}</td>
                    <td>
                    <button class="btn btn-warning btn-sm btn-edit" data-sid=${x[i].id}>Edit</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-sid=${x[i].id}>Delete</button>
                    </td>
                    </tr>`;
                }
                $('#tbody').html(output);
            }
        })
    };

    showData()
        // Ajax Insert Req 
    $("#btnadd").click(function(e) {
        e.preventDefault();
        let id = $("#student-id").val()
        let nm = $("#name-id").val()
        let em = $("#email-id").val()
        let pw = $("#password-id").val()

        mydata = { id, name: nm, email: em, password: pw };

        $.ajax({
            url: "php/insert.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function(data) {
                msg = `<div class="alert alert-dark mt-3">${data}</div>`;
                $('#msg').html(msg)
                $('#myform')[0].reset();
                showData();
            }
        });
    });

    // Ajax Delete Req
    $("tbody").on("click", ".btn-delete", function() {
        let id = $(this).attr("data-sid")

        mydata = { sid: id };
        myThis = this;
        $.ajax({
            url: "php/delete.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function(data) {
                if (data == 1) {
                    deletedStr = 'Student Deleted Successfully!'
                    $(myThis).closest("tr").fadeOut();
                } else { deletedStr = 'Unable to Delete Student' };

                msg = `<div class='alert alert-dark mt-3'>${deletedStr}</div>`;
                $("#msg").html(msg)
            }
        })
    })

    // Ajax Edit Req
    $("tbody").on("click", ".btn-edit", function() {
        let id = $(this).attr("data-sid")

        mydata = { sid: id };

        $.ajax({
            url: 'php/edit.php',
            method: 'POST',
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function(data) {
                $("#student-id").val(data.id)
                $("#name-id").val(data.name);
                $("#email-id").val(data.email);
                $("#password-id").val(data.password);
            }
        })
    })
});