ymq_define("Cart",["jquery","Config","cookie"],(function(t,i){return class e{constructor(){var t=this;this.instance=null,t.initConfig(),1==t.config.util.getValue(t.config.ymq_option_branding.extra,"cart-page-show",1)&&this.init()}initConfig(){var e=this;if(e.config=i.getInstance(),e.config.money_format=window.ymq_option.ymq_option_branding.lan.currency,e.config.shop=window.ymq_option.shop,e.config.token=window.ymq_option.token,e.config.timestamp=window.ymq_option.timestamp,e.config.customer_id=window.ymq_option.customer_id,e.config.ymq_option_settings=window.ymq_option.ymq_option_settings,e.config.ymq_option_branding=window.ymq_option.ymq_option_branding,t('form[action="/cart"]').length>=1)e.config.cart_form_class='form[action="/cart"]';else if(t('form[action$="/cart"]').length>=1){var n=t('form[action$="/cart"]').attr("action");e.config.cart_form_class=`form[action="${n}"]`}}initMemberVariables(){this.cartJson=window.ymq_option.cart,this.moneyDom=".ymq-money",this.automaticDiscount={},this.hasAutomaticDiscount=!1,this.cartPriceClass=["ymq_cart_items_subtotal_price","ymq_cart_original_total_price","ymq_cart_total_price"],this.otherCartPriceClass=["ymq_other_cart_total_price"],this.config.addPrice={},this.config.onetimetag=` ( ${this.config.util.getValue(this.config.ymq_option_branding.lan,"one-time-tag","one time")} )`,this.ajaxDdata={variant_id:{},customer_id:"",total_price:"",item_count:this.cartJson.item_count},this.cartPriceClassShopifyCartJsonData={},this.itemPriceClass=["ymq_item_price","ymq_item_final_price","ymq_item_original_price"],this.otherItemPriceClass=["ymq_item_other_price"],this.itemPriceClassShopifyCartJsonData={},this.itemLinePriceClass=["ymq_item_line_price","ymq_item_final_line_price","ymq_item_original_line_price"],this.otherItemLinePriceClass=["ymq_item_line_other_price"],this.itemLinePriceClassShopifyCartJsonData={},this.discountCode="",this.itemAddPrice={},this.itemAddLinePrice={},this.itemDiscountLinePrice={},this.needUpdateQty=[],"wolan1.myshopify.com"==window.ymq_option.shop?this.prefix_url="https://shopify.luckydn.top/api/":this.prefix_url="https://option.ymq.cool/api/",this.suffix_url="qty"}getAutomaticDiscount(){var i=this;return t.isEmptyObject(i.cartJson.cart_level_discount_applications)||(i.automaticDiscount.type=1,i.automaticDiscount.title=i.cartJson.cart_level_discount_applications[0].title,i.automaticDiscount.value=i.cartJson.cart_level_discount_applications[0].value,i.automaticDiscount.value_type=i.cartJson.cart_level_discount_applications[0].value_type,i.automaticDiscount.total_allocated_amount=i.cartJson.cart_level_discount_applications[0].total_allocated_amount,"automatic"!=i.cartJson.cart_level_discount_applications[0].type||i.hasAutomaticDiscount||(i.hasAutomaticDiscount=!0)),i}init(){var t=this;if(t.initMemberVariables(),0==this.cartJson.item_count)return!1;t.getAutomaticDiscount(),t.replaceDomPrice(),t.buildStyle().hidePaymentButton().buildDiscountDom().registerDiscountCodeEvent().doCheckout().registerQuantityChangeEvent()}replaceDomPrice(i=null){var e=this;i&&(e.cartJson=i),e.config.addPrice={},e.config.qtyInfo={},e.cartAddPrice=0,e.cartPriceClassShopifyCartJsonData.ymq_cart_items_subtotal_price=this.cartJson.items_subtotal_price,e.cartPriceClassShopifyCartJsonData.ymq_cart_original_total_price=this.cartJson.original_total_price,e.cartPriceClassShopifyCartJsonData.ymq_cart_total_price=this.cartJson.total_price,console.log(e.cartJson),e.cartJson.items.forEach((function(i,n){var a=i.quantity,o=i.key;e.config.addPrice[o]=[],e.itemPriceClassShopifyCartJsonData[o]={},e.itemPriceClassShopifyCartJsonData[o].ymq_item_price=i.price,e.itemPriceClassShopifyCartJsonData[o].ymq_item_final_price=i.final_price,e.itemPriceClassShopifyCartJsonData[o].ymq_item_original_price=i.original_price,e.itemLinePriceClassShopifyCartJsonData[o]={},e.itemLinePriceClassShopifyCartJsonData[o].ymq_item_line_price=i.line_price,e.itemLinePriceClassShopifyCartJsonData[o].ymq_item_final_line_price=i.final_line_price,e.itemLinePriceClassShopifyCartJsonData[o].ymq_item_original_line_price=i.original_line_price,i.hasOwnProperty("properties")&&!t.isEmptyObject(i.properties)&&Object.keys(i.properties).forEach((function(t){var n=i.properties[t];if(n){var c=e.getQtyInfo(n);c&&(e.config.qtyInfo[o]=c,a>c.max&&e.needUpdateQty.push({id:o,quantity:c.max}),a<c.min&&e.needUpdateQty.push({id:o,quantity:c.min}));var r=e.getMinMax(n);if(r&&(a>r.max&&e.needUpdateQty.push({id:o,quantity:r.max}),a<r.min&&e.needUpdateQty.push({id:o,quantity:r.min})),(n=n.split(" | ")).length>1){var s=n[n.length-1];(s=e.getPriceNew(s)).price>0&&e.config.addPrice[o].push(s)}}}));var c=0,r=0;e.config.addPrice[o].forEach((function(t){c-=-t.price,t.onetime?r-=-t.price:r-=-t.price*a})),e.itemAddPrice[o]=100*c,e.itemAddLinePrice[o]=100*r;var s=e.itemLinePriceClassShopifyCartJsonData[o].ymq_item_final_line_price,u=e.itemAddLinePrice[o],d=parseFloat((Number(s)- -u)/100).toFixed(2);e.itemDiscountLinePrice[o]=e.setQtyInfoDomAndPrice(o,d),e.cartAddPrice=e.cartAddPrice-100*-r-100*e.itemDiscountLinePrice[o],e.ajaxDdata.variant_id[n]={product_id:i.product_id,variant_id:i.variant_id,line_price:i.line_price,quantity:a,add_line_price:u,qty_discount_line_price:100*e.itemDiscountLinePrice[o],total_line_price:u+Number(i.line_price)-100*e.itemDiscountLinePrice[o]}})),e.needUpdateQty.length>0&&(e.needUpdateQty.forEach((function(i){t.ajax({type:"POST",url:"/cart/change.js",data:i,async:!1,success:function(t){console.log(111,222222)}})})),location.reload()),e.itemPriceClass.forEach((function(i){t(`.${i}`).each((function(){var n=t(this).data("ymq-item-key"),a=e.itemPriceClassShopifyCartJsonData[n][i],o=e.itemAddPrice[n],c=parseFloat((a- -o)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(c)),e.setQtyInfoDomAndPrice(n,c,t(this))}))})),e.itemLinePriceClass.forEach((function(i){t(`.${i}`).each((function(){var n=t(this).data("ymq-item-key"),a=e.itemLinePriceClassShopifyCartJsonData[n][i],o=e.itemAddLinePrice[n],c=parseFloat((a- -o)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(c)),e.setQtyInfoDomAndPrice(n,c,t(this))}))})),e.otherItemPriceClass.forEach((function(i){t(`.${i}`).each((function(){var i=t(this).data("ymq-item-key"),n=e.getPrice(t(this).html());console.log(n);var a=e.itemAddPrice[i],o=parseFloat((n- -a)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(o)),e.setQtyInfoDomAndPrice(i,o,t(this))}))})),e.otherItemLinePriceClass.forEach((function(i){t(`.${i}`).each((function(){var i=t(this).data("ymq-item-key"),n=e.getPrice(t(this).html()),a=e.itemAddLinePrice[i],o=parseFloat((n- -a)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(o)),e.setQtyInfoDomAndPrice(i,o,t(this))}))})),e.cartPriceClass.forEach((function(i){t(`.${i}`).each((function(){var n=e.cartPriceClassShopifyCartJsonData[i];if(e.hasAutomaticDiscount&&1==Number(e.automaticDiscount.type)&&"percentage"==e.automaticDiscount.value_type)var a=e.cartAddPrice*(1-e.automaticDiscount.value/100);else a=e.cartAddPrice;var o=parseFloat((n- -a)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(o))}))})),e.otherCartPriceClass.forEach((function(i){t(`.${i}`).each((function(){var i=e.getPrice(t(this).html());if(e.hasAutomaticDiscount&&1==Number(e.automaticDiscount.type)&&"percentage"==e.automaticDiscount.value_type)var n=e.cartAddPrice*(1-e.automaticDiscount.value/100);else n=e.cartAddPrice;var a=parseFloat((i- -n)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(a))}))})),e.hasAutomaticDiscount&&1==Number(e.automaticDiscount.type)&&"percentage"==e.automaticDiscount.value_type&&t(".ymq_cart_level_discount_applications").each((function(){var i=e.automaticDiscount.total_allocated_amount,n=e.cartAddPrice*(e.automaticDiscount.value/100),a=parseFloat((i- -n)/100).toFixed(2);t(this).text(e.config.doFormatWithoutRate(a))})),this.ajaxDdata.total_price=Number(this.cartJson.total_price)+Number(this.cartAddPrice),window.ymq_option.ymq_option_branding.extra.plan>1&&1==Number(e.config.util.getValue(e.config.ymq_option_branding.extra,"make-sku",0))?e.config.addedCartEvent=!1:0==e.cartAddPrice?e.config.addedCartEvent=!0:e.config.addedCartEvent=!1}setQtyInfoDomAndPrice(t,i,e=null){var n=this,a=i;if(n.config.qtyInfo.hasOwnProperty(t)){var o=n.config.qtyInfo[t];a=1==Number(o.discount_type)?i*(1-o.discount/100):i-o.discount,null!=e&&Number(o.discount)>0&&(n.suffix_url="qty",n.config.addedCartEvent=!1,e.next(".ymq-qty-discount-price").remove(),e.css("cssText","text-decoration:line-through!important;").after(`<span class="ymq-qty-discount-price"><br/><span>${n.config.doFormatWithoutRate(a)}</span></span>`))}return parseFloat(i-a).toFixed(2)}hidePaymentButton(){var i=this;if(!i.config.addedCartEvent){console.log(1122);var e=i.config.util.getValue(i.config.ymq_option_branding.extra,"payment-button-hide",""),n="";""!=e&&(n+=`\n\t\t\t\t\t\t${e}{\n\t\t\t\t\t\t\tdisplay: none!important;\n\t\t\t\t\t\t}\n\t\t\t\t\t`,t(e).hide()),n+='\n\t\t\t\t\t#dynamic-checkout-cart, .shopify-cleanslate, .additional-checkout-buttons,[data-shopify="payment-button"]{\n\t\t\t\t\t\tdisplay: none!important;\n\t\t\t\t\t}\n\t\t\t\t',t(i.config.styleDomId).append(n),t("#dynamic-checkout-cart, .shopify-cleanslate, .additional-checkout-buttons").hide(),t('[data-shopify="payment-button"]').hide().remove()}return i}f(i){"cart"==window.ymq_option.page&&setTimeout((function(){var e=t(i.target).closest("form"),n=e.find('[name="update"][type="submit"]');e.is('[action~="/cart"]')&&n.length?e.submit():window.location.reload()}),1e3)}registerQuantityChangeEvent(){var i=this;return setTimeout((function(){var e=i.config.util.getValue(i.config.ymq_option_branding.extra,"cart-quantity-click-change","");""!=e?t(e).click(i.f):0==t('.btn-link[name="update"]').length&&t('[href^="/cart/change"], [data-action="decrease-quantity"], [data-action="increase-quantity"], .js-qty__adjust, .js-counter .inputCounter-down, .js-counter .inputCounter-up, a.remove_item_button, .cart-remove-btn, [data-cart-action="increment"], .cart-table .qtyminus_multi, .cart-table .qtyplus_multi, .mini_cart_actions .plus, .mini_cart_actions .minus, .cart_tbl .minus_btn, .cart_tbl .plus_btn, .btn-increment, .quantity .quantity-up, .quantity .quantity-down, .quantity input[type="button"], [data-ajax-cart-quantity-modifier], .gt_quantity_plus, .gt_quantity_minus, .quantity-plus, .quantity-minus, .gt_cart-quantity--minus, .gt_cart-quantity--plus, a.cart-item__remove, .quantity [class="update btn item"], [data-cart-item-remove]').click(i.f);var n=i.config.util.getValue(i.config.ymq_option_branding.extra,"cart-quantity-change","");""!=n?t(n).change(i.f):0==t('.btn-link[name="update"]').length&&t('[data-quantity-input]:not(.cart__qty-input), input.cart-item__qty-input, input.cart__quantity, input.cart__product-qty, [data-cart-product-quantity], .cart-table .item-qty, .cart_tbl .number_val_input, .cart-product-quantity .input-qty, .cart-quantity > input[type="number"], .quantity .cart-item__quantity-input, .quantity input[type="number"], .cart__qty-input, [data-ajax-cart-quantity-value], .number_quantity, [name="quantity"], input.quantity-selector, .update-cart--template, .gt_cart-quantity--number, input[name="updates[]"]').change(i.f)}),5),i}doCheckout(){var i=this,e=i.config.util.getValue(i.config.ymq_option_branding.extra,"check-out-button","");if(""!=e)var n=e;else n='[name="checkout"], a[href^="/checkout"], a[href="/account/login"].cart__submit, button[type="submit"].btn-order, a.btn.cart__checkout, a.cart__submit, .wc-proceed-to-checkout button, #cart_form .buttons .btn-primary';function a(){var e=t('[name^="attributes["]');for(var n in e.each((function(t,e){if(e.name&&e.value){var n=e.name.match(/attributes\[([^\]]*)\]/);i.config.obj_attributes[n[1]]=e.value}})),i.config.obj_attributes=Object.assign(i.config.obj_attributes,i.cartJson),window.SECOMAPP&&SECOMAPP.ca&&SECOMAPP.ca.globalValue&&(i.config.obj_attributes=Object.assign(i.config.obj_attributes,SECOMAPP.ca.globalValue)),i.config.cart2&&(i.config.obj_attributes=Object.assign(i.config.obj_attributes,i.config.cart2.attributes)),i.config.obj_attributes)i.config.note_attributes.push({name:n,value:i.config.obj_attributes[n]})}function o(e){var n=null;i.config.cart_form.length&&(n=i.config.cart_form.attr("action").match(/\/cart(\?locale=\w{2})/)),!n&&i.config.checkouts.attr("href")&&(n=i.config.checkouts.attr("href").match(/\/checkout(\?locale=\w{2})/));var a=n?n[1]:"";i.config.checkouts.css("pointerEvents","none");var o="";i.config.cart_form.find('[name="note"]').each((function(t,i){o+=i.value})),i.startLoading(i.checkOutDom),t.post(`${i.prefix_url}checkout${i.suffix_url}`,{data:i.cartJson,discountCode:i.discountCode,shop:i.config.shop,token:i.config.token,timestamp:i.config.timestamp,customer_id:i.config.customer_id,note:o,note_attributes:i.config.note_attributes,tags:i.config.tags.join(", ")}).done((function(t){setTimeout((function(){i.config.checkouts.css("pointerEvents","auto")}),5e3),window.location.href=t.data+a})).fail((function(e){500==Number(e.status)?t.post(`${i.prefix_url}checkout`,{data:i.cartJson,discountCode:i.discountCode,shop:i.config.shop,token:i.config.token,timestamp:i.config.timestamp,customer_id:i.config.customer_id,note:o,note_attributes:i.config.note_attributes,tags:i.config.tags.join(", ")}).done((function(t){setTimeout((function(){i.config.checkouts.css("pointerEvents","auto")}),5e3),window.location.href=t.data+a})).fail((function(t){setTimeout((function(){i.config.checkouts.css("pointerEvents","auto")}),5e3),window.location.href="/checkout"+a})):(setTimeout((function(){i.config.checkouts.css("pointerEvents","auto")}),5e3),window.location.href="/checkout"+a)}))}return t(n).css("pointerEvents","auto"),i.config.addedCartEvent||("cairpods.myshopify.com"===Shopify.shop&&t(document.body).append("<style>.tbn_btn_hooker {display: none;}</style>"),t("#dynamic-checkout-cart, .shopify-cleanslate, .additional-checkout-buttons").hide(),i.config.checkouts=t(n),i.config.cart_form=t(n).closest("form"),i.config.obj_attributes=i.config.obj_attributes||{},i.config.note_attributes=i.config.note_attributes||[],i.config.tags=i.config.tags||[],t("#nudge-offer").hide(),t("#cart_agree").show(),t("head").append("<style>.js_agree_ck+label::before, .pr .scl_selected { display: none !important; }</style>"),t(n).attr("onclick",""),t(document).on("click",n,(function(e){if(window.ymq_option&&window.ymq_option.cart){e.preventDefault(),e.stopImmediatePropagation(),i.checkOutDom=t(this);var n=t(e.target);t("#torden-terms-checkbox, #cart_agree").attr("required",!0),window.localDeliveryVersion&&i.config.cart_form.find('[name="attributes[local_delivery_request]"]').length&&i.config.note_attributes.push({name:"Delivery date/time",value:i.config.cart_form.find('[name="attributes[local_delivery_request]"]').val()});for(var c=0;c<i.cartJson.items.length;c+=1){var r=i.cartJson.items[c],s=document.querySelectorAll("[id='updates_"+r.key+"']");1!=s.length&&(s=document.querySelectorAll("[id='updates_"+r.variant_id+"']")),1==s.length&&(i.cartJson.items[c].quantity=s[0].value)}var u=!1;window.navigator&&navigator.platform&&(u=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform));var d=t("#CartPageAgree"),m=t(e.target).closest("form");return d.length&&!d.is(":checked")&&window.theme&&window.theme.strings&&window.theme.strings.cartTermsConfirmation?(alert(theme.strings.cartTermsConfirmation),!1):"A"!==n.prop("tagName")&&m.length&&m.get(0).checkValidity&&!m.get(0).checkValidity()?void(m.get(0).reportValidity&&(u?(setTimeout((function(){document.activeElement.scrollIntoView&&document.activeElement.scrollIntoView({block:"center",behavior:"smooth"})})),setTimeout((function(){document.activeElement.type&&"file"===document.activeElement.type&&document.activeElement.blur()}),900)):m.get(0).reportValidity())):(t.get({url:"/cart.js",dataType:"json"}).done((function(t){i.cartJson=t,i.config.cart2=t,a(),o(i.config.cart2)})).fail((function(){a(),o()})),!1)}})),i.config.addedCartEvent=!0),i}startLoading(t){t.addClass("ymq-btn-progress")}disabledSubmit(){return this.config.addedCartEvent||t(this.config.cart_form_class).submit((function(t){return t.preventDefault(),!1})),this}getPrice(t){var i=this.config.doFormatWithoutRate(1).replace(/[0-9,.-]+/g,"");return console.log(t.indexOf(i)),-1!=t.indexOf(i)?(console.log(i),Number(t.replace(/[^0-9.-]+/g,""))):0}getMinMax(t){if(/^.*: \( \d+ - \d+ \) $/.test(t)){var i=0,e=999999999999999;return"null"!=t.match(/.*: \( (\d+) - \d+ \) /)&&(i=t.match(/.*: \( (\d+) - \d+ \) /)[1]),"null"!=t.match(/.*: \( \d+ - (\d+) \) /)&&(e=t.match(/.*: \( \d+ - (\d+) \) /)[1]),{min:i,max:e}}return!1}getQtyInfo(t){if(/^.*: \d+ - \d+ \| .*: \d+ \| .*: .*-[1,2]$/.test(t)){var i=0,e=999999999999999,n=0,a=2;return"null"!=t.match(/.*: (\d+) - \d+ \| .*: \d+ \| .*: .*-[1,2]/)&&(i=t.match(/.*: (\d+) - \d+ \| .*: \d+ \| .*: .*-[1,2]/)[1]),"null"!=t.match(/.*: \d+ - (\d+) \| .*: \d+ \| .*: .*-[1,2]/)&&(e=t.match(/.*: \d+ - (\d+) \| .*: \d+ \| .*: .*-[1,2]/)[1]),"null"!=t.match(/.*: \d+ - \d+ \| .*: (\d+) \| .*: .*-[1,2]/)&&(n=t.match(/.*: \d+ - \d+ \| .*: (\d+) \| .*: .*-[1,2]/)[1]),"null"!=t.match(/.*: \d+ - \d+ \| .*: \d+ \| .*: .*-([1,2])/)&&(a=t.match(/.*: \d+ - \d+ \| .*: \d+ \| .*: .*-([1,2])/)[1]),{min:i,max:e,discount:n,discount_type:a}}return!1}getPriceNew(t){var i=this,e=!1,n=0;t.endWith(i.config.onetimetag)&&(e=!0,t=t.slice(0,-i.config.onetimetag.length));var a=i.config.doFormatWithoutRate(1).replace(/[0-9,.-]+/g,"");return console.log(t.indexOf(a)),-1!=t.indexOf(a)&&(console.log(a),n=Number(t.replace(/[^0-9.-]+/g,""))),{onetime:e,price:n}}buildStyle(){var i=this,e=":root{";Object.keys(i.config.ymq_option_branding).forEach((function(t){"lan"!=t&&"extra"!=t&&Object.keys(i.config.ymq_option_branding[t]).forEach((function(n){e+=`\n\t\t\t\t\t\t${n}: ${i.config.ymq_option_branding[t][n]};\n\t\t\t\t\t`}))})),e+="}";var n=i.config.util.getValue(i.config.ymq_option_branding.extra,"title-value","1,2,9,10");n=n.split(",");var a=[];return n.forEach((function(t){a.push(`.ymq-options-box-${t} .ymq_option_text_span`)})),e+=`\n\t\t\t\t${a.join(",")}{\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\t\t\t`,t(i.config.styleDomId).html(e),i}registerDiscountCodeEvent(){var i=this;return 1==i.config.util.getValue(i.config.ymq_option_branding.extra,"discount",0)&&(t(document).on("keyup","#ymq-discount-input",(function(){t("#ymq-discount-error-info").html(""),t("#ymq-discount-input").removeClass("ymq-discount-input-error"),t(this).val()?t("#ymq-discount-apply").removeClass("ymq-discount-apply-disable"):t("#ymq-discount-apply").addClass("ymq-discount-apply-disable")})),t(document).on("click","#ymq-discount-apply",(function(){var e=t(this);if(e.hasClass("ymq-btn-progress")||""==t("#ymq-discount-input").val())return!1;e.addClass("ymq-btn-progress"),i.ajaxDdata.code=t("#ymq-discount-input").val(),t.ajax({type:"GET",url:`https://${window.location.host}/discount/${i.ajaxDdata.code}`}),t.post(`${i.prefix_url}discount${i.suffix_url}`,{data:i.ajaxDdata,shop:i.config.shop,token:i.config.token,timestamp:i.config.timestamp,customer_id:i.config.customer_id}).done((function(n){t("#ymq-discount-success-info").show(),i.discountCode=i.ajaxDdata.code,t("#ymq-discount-success-code").html(i.ajaxDdata.code),e.removeClass("ymq-btn-progress"),t.cookie("ymq_discount_code",i.ajaxDdata.code,{expires:7}),i.cartPriceClass.forEach((function(e){var a=t(`.${e}`);a.addClass("ymq-text-decoration"),a.each((function(){var t=i.cartPriceClassShopifyCartJsonData[e],o=i.cartAddPrice,c=(parseFloat((t- -o)/100).toFixed(2),Number(t)+Number(o)-Number(n.data));a.next().hasClass("ymq_cart_discount_price")?a.next().html(i.config.doFormat(parseFloat(c/100).toFixed(2))):a.after(`\n\t\t\t\t\t\t\t\t\t\t<span class="ymq_cart_discount_price">\n\t\t\t\t\t\t\t\t\t\t\t${i.config.doFormat(parseFloat(c/100).toFixed(2))}\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t`)}))}))})).fail((function(n){t.cookie("ymq_discount_code",null),t("#ymq-discount-input").addClass("ymq-discount-input-error"),t("#ymq-discount-error-info").html("Enter a valid discount code"),t("#ymq-discount-success-info").hide(),e.removeClass("ymq-btn-progress"),i.cartPriceClass.forEach((function(i){t(`.${i}`).each((function(){t(this).removeClass("ymq-text-decoration").next(".ymq_cart_discount_price").remove()}))}))}))})),t(document).on("click",".ymq-svg-close",(function(){t("#ymq-discount-input").val("").trigger("keyup"),t("#ymq-discount-success-info").hide(),i.ajaxDdata.code="",i.discountCode="",t.cookie("ymq_discount_code",null),t.ajax({type:"GET",url:`https://${window.location.host}/discount/ymq`}),i.cartPriceClass.forEach((function(i){t(`.${i}`).each((function(){t(this).removeClass("ymq-text-decoration").next(".ymq_cart_discount_price").remove()}))}))}))),i}buildDiscountDom(){var i=this;if(!i.hasAutomaticDiscount&&1==i.config.util.getValue(i.config.ymq_option_branding.extra,"discount",0)&&"cart"==window.ymq_option.page){var e=`\n\t\t\t\t<div id="ymq-discount">\n\t\t\t\t\t<div id="ymq-discount-action">\n\t\t\t\t\t\t<div id="ymq-discount-active">\n\t\t\t\t\t\t\t<input placeholder="${i.config.ymq_option_branding.lan.discount_code}" id="ymq-discount-input" type="text" name="reduction_code">\n\t\t\t\t\t\t\t<div id="ymq-discount-apply" class="ymq-discount-apply-disable">${i.config.ymq_option_branding.lan.application}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="ymq-discount-info">\n\t\t\t\t\t\t\t<div id="ymq-discount-success-info" style="display: none;">\n\t\t\t\t\t\t\t\t<svg class="ymq-svg-coupon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M17.78 3.09C17.45 2.443 16.778 2 16 2h-5.165c-.535 0-1.046.214-1.422.593l-6.82 6.89c0 .002 0 .003-.002.003-.245.253-.413.554-.5.874L.738 8.055c-.56-.953-.24-2.178.712-2.737L9.823.425C10.284.155 10.834.08 11.35.22l4.99 1.337c.755.203 1.293.814 1.44 1.533z" fill-opacity=".55"></path><path d="M10.835 2H16c1.105 0 2 .895 2 2v5.172c0 .53-.21 1.04-.586 1.414l-6.818 6.818c-.777.778-2.036.782-2.82.01l-5.166-5.1c-.786-.775-.794-2.04-.02-2.828.002 0 .003 0 .003-.002l6.82-6.89C9.79 2.214 10.3 2 10.835 2zM13.5 8c.828 0 1.5-.672 1.5-1.5S14.328 5 13.5 5 12 5.672 12 6.5 12.672 8 13.5 8z"></path></svg>\n\t\t\t\t\t\t\t\t<span id="ymq-discount-success-code"></span>\n\t\t\t\t\t\t\t\t<svg class="ymq-svg-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13"><path d="M1.5 1.5l10.05 10.05M11.5 1.5L1.45 11.55" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"></path></svg>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id="ymq-discount-error-info"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div style="clear: both;"></div>\n\t\t\t`,n=i.config.util.getValue(i.config.ymq_option_branding.extra,"discount-before","");if(""!=n)t(n).before(e);else{var a=null;t(i.config.cart_form_class).children().each((function(){t(this).find(".ymq_cart_total_price").length>=1&&(a=t(this))})),null==a&&(a=t(i.config.cart_form_class).children().last()),a&&a.before(e)}}return i}static getInstance(){return this.instance||(this.instance=new e),this.instance}}}));