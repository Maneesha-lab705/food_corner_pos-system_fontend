
// import {ItemModel} from "../model/ItemModel.js";
// import {customer_db, item_db} from "../db/db.js";
//
$(document).ready(function (){
    $("#item-batons>button[type='button']").eq(0).click(function (){
        let code = $("#item_code").val();
        let description = $("#description").val();
        let price = $("#price").val();
        let qty = $("#item_qty").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8090/mini/item",
            async:true,
            data:JSON.stringify({
                code:code,
                description:description,
                unitPrice:price,
                qty:qty
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been save successfully!',
                    'success'
                );
                fetchData()
            },
            error: function (xhr, exception) {
                Swal.fire(
                    'Success!',
                    'Customer has been save successfully!',
                    'success'
                );
            }
        })
        clearInput();
    })
})


$(document).ready(function (){
    $("#item-batons>button[type='button']").eq(1).click(function (){
        let code = $("#item_code").val();
        let description = $("#description").val();
        let price = $("#price").val();
        let qty = $("#item_qty").val();
        $.ajax({
            method:"PUT",
            contentType:"application/json",
            url:"http://localhost:8090/mini/item",
            async:true,
            data:JSON.stringify({
                code:code,
                description:description,
                unitPrice:price,
                qty:qty
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been UPDATE successfully!',
                    'success'
                );
                fetchData()

            },
            error: function (xhr, exception) {
                Swal.fire(
                    'UnSuccess !',
                    'Customer has been UPDATE unsuccessfully!',
                    'UnSuccess'
                );
            }
        })
        clearInput()
    })
})

$(document).ready(function (){
    $("#item-batons>button[type='button']").eq(2).click(function (){
        let code = $("#item_code").val();
        // Show confirmation dialog

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true


        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method:"DELETE",
                    contentType:"application/json",
                    url:"http://localhost:8090/mini/item",
                    async:true,
                    data:JSON.stringify({
                        code:code,
                    }),
                    success: function (data) {
                        fetchData();
                    },
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"

                });
            }

        });

    })
})
function clearInput() {
    // Get the input element by its ID
    var inputElement = document.getElementById("item_code");
    var desc=document.getElementById("description");
    var price=document.getElementById("price");
    var qty=document.getElementById("item_qty");
    // Clear the input value
    inputElement.value = "";
    desc.value = "";
    price.value = "";
    qty.value = "";
}

$(document).ready(function () {
    // Call fetchData on page load
    fetchData();
});

function fetchData() {
    var tableBody = $('#item_table-body');

    // Fetch data using AJAX
    $.ajax({
        method: 'GET',
        url: "http://localhost:8090/mini/item",
        async: true,
        success: function (items) {
            tableBody.empty();

            items.forEach(function (item) {
                var row = $('<tr class="item-row">'); // Add a class to each row

                row.append($('<td>').text(item.code));
                row.append($('<td>').text(item.description));
                row.append($('<td>').text(item.unitPrice));
                row.append($('<td>').text(item.qty));

                tableBody.append(row);
            });

            // Add click event for each table row
            $('.item-row').click(function () {
                // Get data from the clicked row
                var code = $(this).find('td:eq(0)').text();
                var description = $(this).find('td:eq(1)').text();
                var unitPrice = $(this).find('td:eq(2)').text();
                var qty = $(this).find('td:eq(3)').text();

                // Set data in text fields
                $('#item_code').val(code);
                $('#description').val(description);
                $('#price').val(unitPrice);
                $('#item_qty').val(qty);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch item data. Status code:", status);
        }
    });
    clearInput();
}
$('#item-search').on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

// $("#item-search").on('input',() =>{
//     let search_item = $('#item-search').val();
//     let result = item_db.filter((item) =>
//         item.description.toLowerCase().startsWith(search_item.toLowerCase()) ||
//         item.price.toLowerCase().startsWith(search_item.toLowerCase()) ||
//         item.item_qty.toLowerCase().startsWith(search_item.toLowerCase())
//     );
//     $('#item_table-body').empty();
//     result.map((item, index) => {
//         let record = `<tr><td class="item_code">${item.item_code}</td><td class="description">${item.description}</td><td class="price">${item.price}</td><td class="item_qty">${item.item_qty}</td></tr>`;
//         $("#item_table-body").append(record);
//     });
// });
//
// $("#item-search").on('input', () => {
//     let search_item = $('#item-search').val();
//     let result = items.filter((item) =>
//         item.description.toLowerCase().includes(search_item.toLowerCase()) ||
//         item.price.toString().toLowerCase().includes(search_item.toLowerCase()) || // Assuming item.price is a number
//         item.item_qty.toString().toLowerCase().includes(search_item.toLowerCase())
//     );
//     $('#item_table-body').empty();
//     result.map((item, index) => {
//         let record = `<tr><td class="item_code">${item.item_code}</td><td class="description">${item.description}</td><td class="price">${item.price}</td><td class="item_qty">${item.item_qty}</td></tr>`;
//         $("#item_table-body").append(record);
//     });
// });


// var row_index = null;
//
// const loadItemData = () => {
//     $('#item_table-body').empty();
//     item_db.map((item, index) => {
//         let record = `<tr><td class="item_code">${item.item_code}</td><td class="description">${item.description}</td><td class="price">${item.price}</td><td class="item_qty">${item.item_qty}</td></tr>`;
//         $("#item_table-body").append(record);
//     });
// };
//
// // submit
// $("#item-batons>button[type='button']").eq(0).on("click", () => {
//     let item_code = $("#item_code").val();
//     let description = $("#description").val();
//     let price = $("#price").val();
//     let item_qty = $("#item_qty").val();
//
//     let item_obj = new ItemModel(item_code, description, price, item_qty);
//
//     item_db.push(item_obj);
//
//     $("#item-batons>button[type='reset']").click();
//
//     loadItemData();
// });
//
// // update
// $("#item-batons>button[type='button']").eq(1).on("click", () => {
//
//     let item_code = $("#item_code").val();
//     let description = $("#description").val();
//     let price = $("#price").val();
//     let item_qty = $("#item_qty").val();
//
//     let item_obj = new ItemModel(item_code, description, price, item_qty);
//
//     let index = item_db.findIndex(item => item.item_code === item_code);
//
//     item_db[index] = item_obj;
//
//     $("#item-batons>button[type='reset']").click();
//
//     loadItemData();
// })
//
// // delete
// $("#item-batons>button[type='button']").eq(2).on("click", () => {
//     let item_code = $("#item_code").val();
//
//     let index = item_db.findIndex(item => item.item_code === item_code);
//
//     item_db.splice(index, 1);
//
//     $("#item-batons>button[type='reset']").click();
//
//     loadItemData();
// })
//
// $("#item_table-body").on("click", "tr", function() {
//     row_index = $(this).index();
//
//     let item_code = $(this).find(".item_code").text();
//     let description = $(this).find(".description").text();
//     let price = $(this).find(".price").text();
//     let item_qty = $(this).find(".item_qty").text();
//
//     $("#item_code").val(item_code);
//     $("#description").val(description);
//     $("#price").val(price);
//     $("#item_qty").val(item_qty);
// });