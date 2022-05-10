export default function checkoutEvents(accountId) {
    var purchased = Shopify.checkout.line_items;
    var productsPurchased = [];
    var orderTotal = 0;
    for (var i = 0; i < purchased.length; i++) {
      productsPurchased.push({
        product_id: purchased[i].product_id.toString(),
        product_name: purchased[i].title,
        product_brand: purchased[i].vendor,
        product_price: purchased[i].price,
        product_quantity: purchased[i].quantity
      });
      orderTotal += (purchased[i].price * purchased[i].quantity);
    }
    
     window.NRTV_EVENT_DATA = {
            page_type: 'checkout',
            is_new_customer: null,
            products_purchased: productsPurchased,
            order_id: Shopify.checkout.order_id.toString(),
            order_value: orderTotal,
            currency: Shopify.checkout.presentment_currency
    };
        

    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = "https://static.narrativ.com/tags/narrativ-brand.1.0.0.js";
    b.async = true;
    b.id = 'nrtvTag';
    b.setAttribute('data-narrativ-id', accountId);
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a);
}





var purchased = Shopify.checkout.line_items;
var productsPurchased = [];
var orderTotal = 0;
for (var i = 0; i < purchased.length; i++) {
  productsPurchased.push({
    product_id: purchased[i].product_id.toString(),
    product_name: purchased[i].title,
    product_brand: purchased[i].vendor,
    product_price: purchased[i].price,
    product_quantity: purchased[i].quantity
  });
  orderTotal += (purchased[i].price * purchased[i].quantity);
}

 window.NRTV_EVENT_DATA = {
        page_type: 'checkout',
        is_new_customer: null,
        products_purchased: productsPurchased,
        order_id: Shopify.checkout.order_id.toString(),
        order_value: orderTotal,
        currency: Shopify.checkout.presentment_currency
};

(function (window, document, accountId) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = "https://static.narrativ.com/tags/narrativ-brand.1.0.0.js";
    b.async = true;
    b.id = 'nrtvTag';
    b.setAttribute('data-narrativ-id', accountId);
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a);
})(window, document, ACCOUNT ID);
