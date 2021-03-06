var sheetKeyPrivate = "1MJpC2n-ekpnRXaLsb7B4dI6VOQIzn1eZO61I7sy2yiA";

var google = require('googleapis');

var API_KEY = 'AIzaSyDIQ1Yb3d-VREZlm2WJ6DbtiLQgGA914F4';
var API_ENV = process.env['PUBLIC_GAPI_KEY'];

var public_getDataList = function (callback) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth: API_ENV || API_KEY,
        spreadsheetId: sheetKeyPrivate,
        range: 'Sheet1',
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var rows = response.values;
        callback(rows);
    });

};
exports.public_getDataList = public_getDataList;
