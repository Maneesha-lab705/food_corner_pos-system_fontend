import {OrderModel} from "../model/OrderModel.js";
import {order_db} from "../db/db.js";

var row_index = null;

const loadOrderData = () => {
    $('#order-table-body').empty();
    order_db.map((item, index) => {
        let record = `<tr><td class="itemCode">${item.itemCode}</td><td class="description">${item.description}</td><td class="price">${item.price}</td><td class="orderQty">${item.orderQty}
        </td><td class="total">${item.total}</td></tr>`;
        $("#order-table-body").append(record);
    });
};

// submit
$("#add-button>button[type='button']").eq(0).on("click", () => {

    console.log("hello")
    let itemCode = $("#itemCode").val();
    let description = $("#description-order").val();
    let price = $("#price-order").val();
    let orderQty = $("#orderQty").val();
    let total = orderQty*price;

    let order_obj = new OrderModel(itemCode, description, price, orderQty, total);

    order_db.push(order_obj);

    loadOrderData();
});