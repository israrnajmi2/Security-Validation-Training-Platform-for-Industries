//var server_url  = '/www_ss_dev/rest/'; //TEST AND  LOCAL
var server_url = '/rest/'; //PRODUCTION
//var server_url='/pages/';
//var server_url  = '/www_ss_prod/rest/'; //SNEI Deployment

function processget(data1, url1, handler) {
    url1 = server_url + url1;
    data1 = JSON.stringify(data1);
    $.ajax({
        type: "GET",
        url: url1,
        data: data1,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (ret) {
            handler(ret, null);
        },
        error: function (err) {
            handler(null, err);

        }
    });
};

function process(data1, url1, handler) {
    url1 = server_url + url1;
    data1 = JSON.stringify(data1);
    $.ajax({
        type: "POST",
        url: url1,
        data: data1,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (ret) {
            handler(ret, null);
        },
        error: function (err) {
            handler(null, err);
        }
    });
};

function processDelete(data1, url1, handler) {
    url1 = server_url + url1;
    data1 = JSON.stringify(data1);
    $.ajax({
        type: "DELETE",
        url: url1,
        data: data1,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (ret) {
            handler(ret, null);
        },
        error: function (err) {
            handler(null, err);
        }
    });
};

function makeAjaxCall(url1, cb) {
    url1 = server_url + url1;
    // data1=JSON.stringify(data1);
    $.ajax({
        type: "GET",
        url: url1,
        data: null,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (ret) {
            cb(ret);
        },
        error: function (err) {

        }
    });
}
