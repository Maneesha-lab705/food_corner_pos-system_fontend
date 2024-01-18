import {CustomerModel} from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";


$(document).ready(function (){
    $("#customer-batons>button[type='button']").eq(0).click(function (){
        let customer_id = $("#customer_id").val();
        let name = $("#name").val();
        let address = $("#address").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8090/mini/customer",
            async:true,
            data:JSON.stringify({
                id:customer_id,
                name:name,
                address:address,
                email:email,
                contact:phone
            }),

            success: function (data) {
                Swal.fire(
                            'Success!',
                            'Customer has been saved successfully!',
                            'success'
                        );
                fetchCustomerData();
            },
            error: function (xhr, exception) {
                Swal.fire(
                    'UnSuccess !',
                    'Customer has been saved unsuccessfully!',
                    'UnSuccess'
                );
            }

        })
cleanData();
    })
})



// $(document).ready(function (){
//     $(".btn-danger").click(function (){
//         let customer_id = $("#customer_id").val();
//         $.ajax({
//             method:"DELETE",
//             contentType:"application/json",
//             url:"http://localhost:8090/mini/customer",
//             async:true,
//             data:JSON.stringify({
//                 id:customer_id,
//             }),
//             success: function (data) {
//                 Swal.fire(
//                     'Success!',
//                     'Customer has been delete successfully!',
//                     'success'
//
//                 );
//                 fetchCustomerData();
//             },
//             Alert: function (xhr, exception) {
//                 Swal.fire(
//                     'UnSuccess !',
//                     'Customer has been delete unsuccessfully!',
//                     'UnSuccess'
//                 );
//             },
//         })
//         cleanData();
//     })
// })
$(document).ready(function () {
    $(".btn-danger").click(function () {
        let customer_id = $("#customer_id").val();

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
                    url:"http://localhost:8090/mini/customer",
                    async:true,
                    data:JSON.stringify({
                        id:customer_id,
                    }),
                    success: function (data) {
                        fetchCustomerData();
                        cleanData()
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


    });

});
$(document).ready(function (){
    $("#customer-batons>button[type='button']").eq(1).click(function (){
        let customer_id = $("#customer_id").val();
        let name = $("#name").val();
        let address = $("#address").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        $.ajax({
            method:"PUT",
            contentType:"application/json",
            url:"http://localhost:8090/mini/customer",
            async:true,
            data:JSON.stringify({
                id:customer_id,
                name:name,
                address:address,
                email:email,
                contact:phone
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been update successfully!',
                    'success'

                );
                fetchCustomerData();
            },
            error: function (xhr, exception) {
                Swal.fire(
                    'UnSuccess !',
                    'Customer has been update unsuccessfully!',
                    'UnSuccess'
                );
            }
        })
        cleanData();
    })
})

$(document).ready(function () {
    // Function to fetch and display customer data in the table body

    // Call fetchCustomerData on page load
    fetchCustomerData();

    // Search functionality
    $('#customer-search').on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#customer-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
function fetchCustomerData() {
    var tableBody = $('#customer-table-body');

    // Fetch customer data using AJAX
    $.ajax({
        method: 'GET',
        url: "http://localhost:8090/mini/customer",
        async: true,
        success: function (customers) {
            tableBody.empty();

            customers.forEach(function (customer) {
                var row = $('<tr>');

                row.append($('<td>').text(customer.id));
                row.append($('<td>').text(customer.name));
                row.append($('<td>').text(customer.address));
                row.append($('<td>').text(customer.email));
                row.append($('<td>').text(customer.contact));

                tableBody.append(row);

                // Add click event for each table row
                row.click(function () {
                    // Get data from the clicked row
                    var id = $(this).find('td:eq(0)').text();
                    var name = $(this).find('td:eq(1)').text();
                    var address = $(this).find('td:eq(2)').text();
                    var email = $(this).find('td:eq(3)').text();
                    var contact = $(this).find('td:eq(4)').text();

                    // Set data in text fields
                    $('#customer_id').val(id);
                    $('#name').val(name);
                    $('#address').val(address);
                    $('#email').val(email);
                    $('#phone').val(contact);
                });
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}

function cleanData(){
    var  id=document.getElementById("customer_id")
    var  name=document.getElementById("name")
    var  address=document.getElementById("address")
    var  email=document.getElementById("email")
    var  contact=document.getElementById("phone")


    id.value="";
    name.value="";
    address.value="";
    email.value="";
    contact.value="";
}
//
//
// var row_index = null;
//
// const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
// var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//
// const loadCustomerData = () => {
//     $('#customer-table-body').empty();
//     customer_db.map((item, index) => {
//         let record = `<tr><td class="customer_id">${item.customer_id}</td><td class="name">${item.name}</td><td class="address">${item.address}</td><td class="email">${item.email}
//         </td><td class="phone">${item.phone}</td></tr>`;
//         $("#customer-table-body").append(record);
//     });
// };
//
// // submit
// $("#customer-batons>button[type='button']").eq(0).on("click", () => {
//
//     console.log("hello")
//     let customer_id = $("#customer_id").val();
//     let name = $("#name").val();
//     let address = $("#address").val();
//     let email = $("#email").val();
//     let phone = $("#phone").val();
//
//     if(customer_id) {
//         if(name) {
//             if(address) {
//                 let isValidEmail = pattern.test(email);
//                 if (email && isValidEmail){
//                     // if (email){
//                     let isValid = sriLankanMobileNumberRegex.test(phone);
//                     if(phone && isValid) {
//
//                         let customer_obj = new CustomerModel(customer_id, name, address, email, phone);
//
//                         customer_db.push(customer_obj);
//
//                         Swal.fire(
//                             'Success!',
//                             'Customer has been saved successfully!',
//                             'success'
//                         );
//
//                         $("#customer-batons>button[type='reset']").click();
//
//                         loadCustomerData();
//                     } else {
//                         toastr.error('Invalid Customer Mobile Number');
//                     }
//                 }else{
//                     toastr.error('Invalid Customer Email');
//                 }
//             } else {
//                 toastr.error('Invalid Customer Address');
//             }
//         } else {
//             toastr.error('Invalid Customer Name');
//         }
//     } else {
//         toastr.error('Invalid Customer Id');
//     }
// });
//
// // update
// $("#customer-batons>button[type='button']").eq(1).on("click", () => {
//
//     toastr.success('Are you the 6 fingered man?')
//
//     let customer_id = $("#customer_id").val();
//     let name = $("#name").val();
//     let address = $("#address").val();
//     let email = $("#email").val();
//     let phone = $("#phone").val();
//
//     let customer_obj = new CustomerModel(customer_id, name, address, email, phone);
//
//     let index = customer_db.findIndex(item => item.customer_id === customer_id);
//
//     customer_db[index] = customer_obj;
//
//     $("#customer-batons>button[type='reset']").click();
//
//     loadCustomerData();
// })
//
// // delete
// $("#customer-batons>button[type='button']").eq(2).on("click", () => {
//
//     toastr.error('Are you the 6 fingered man?')
//
//     let customer_id = $("#customer_id").val();
//
//     let index = customer_db.findIndex(item => item.customer_id === customer_id);
//
//     customer_db.splice(index, 1);
//
//     $("#customer-batons>button[type='reset']").click();
//
//     loadCustomerData();
// })
//
// $("#customer-table-body").on("click", "tr", function() {
//     row_index = $(this).index();
//
//     console.log(row_index);
//
//     let customer_id = $(this).find(".customer_id").text();
//     let name = $(this).find(".name").text();
//     let address = $(this).find(".address").text();
//     let email = $(this).find(".email").text();
//     let phone = $(this).find(".phone").text();
//
//     $("#customer_id").val(customer_id);
//     $("#name").val(name);
//     $("#address").val(address);
//     $("#email").val(email);
//     $("#phone").val(phone);
// });
//
// $("#customer-search").on('input',() =>{
//     let search_item = $('#customer-search').val();
//     let result = customer_db.filter((item) =>
//         item.name.toLowerCase().startsWith(search_item.toLowerCase()) ||
//         item.address.toLowerCase().startsWith(search_item.toLowerCase()) ||
//         item.email.toLowerCase().startsWith(search_item.toLowerCase()) ||
//         item.phone.toLowerCase().startsWith(search_item.toLowerCase())
//     );
//     $('#customer-table-body').empty();
//     result.map((item, index) => {
//         let record = `<tr><td class="customer_id">${item.customer_id}</td><td class="name">${item.name}</td><td class="address">${item.address}</td><td class="email">${item.email}
//         </td><td class="phone">${item.phone}</td></tr>`;
//         $("#customer-table-body").append(record);
//     });
// });