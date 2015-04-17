/**
 * Server 类，对 rest 接口进行封装
 * 使用例如：
 * servers.getUser(function () {
 *
 * });
 */

(function (window) {

    var url = {
        user: defines.baseUrl + '/restconnect/customer/status',
        login: defines.baseUrl + '/restconnect/customer/login',
        logout: defines.baseUrl + '/customer/account/logout',
        menus: defines.baseUrl + '/restconnect/?cmd=menu',
        products: defines.baseUrl + '/restconnect/?cmd=%s&limit=%s&page=%s',
        products_search: defines.baseUrl + '/restconnect/search/?q=%s',
        product_detail: defines.baseUrl + '/catalog/product/view/id/%s', //这个是直接详情页面
        product_rest: defines.baseUrl + '/restconnect/products/getproductdetail/productid/%s',
        //product_rest: defines.baseUrl + '/restconnect/products/getproductdetail/productid/%s',
        product_img: defines.baseSite + '/api/rest/products/%s/images/',
        product_attr: defines.baseUrl + '/restconnect/products/getcustomeattr/productid/%s', //开发中
        product_option: defines.baseUrl + '/restconnect/products/getcustomoption/productid/%s',
        cart_add: defines.baseUrl + '/restconnect/cart/add/'	//直接post到这个接口就返回参数
    };

    window.servers = {};

    servers.getUser = function (callback) {
        $.getJSON(url.user).done(callback).fail(error);
    };

    servers.login = function (username, password, callback) {
        $.getJSON(url.login, {
            username: username,
            password: password
        }, callback).fail(function () {
            alert('Please check the Username or Password!');
        });
    };

    servers.logout = function (callback) {
        $.get(url.logout, callback).fail(error);
    };

    servers.getMenus = function (callback) {
        $.getJSON(url.menus, callback).fail(error);
    };

    servers.getProducts = function (page, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.products, page.cmd, defines.productsLimit, page.num),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductsSearch = function (q, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.products_search, q),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductDetail = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_detail, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductRest = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_rest, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductImg = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_img, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductAttr = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_attr, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };

    servers.getProductOption = function (id, callback) {
        $.ajax({
            type: 'get',
            url: sprintf(url.product_option, id),
            contentType: 'application/json',
            dataType: 'json',
            success: callback,
            error: error
        });
    };
	
    servers.cartAdd = function (formId, callback) {
		$(formId).submit(function() {  
	        $(this).ajaxSubmit(options);  
    		});  
        var options = {
			//beforeSubmit:  showRequest,  //提交前处理 
			//success:       showResponse,  //处理完成 
			dataType:  'json',
			url: url.cart_add,
            success: callback
	        }
	};

    // 统一处理 API 请求错误
    function error(err) {
        console.log(err);
    }
})(window);