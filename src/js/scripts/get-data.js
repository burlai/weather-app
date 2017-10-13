import $ from 'jquery';

export default function getData(url, successCallback, errorCallback) {
    $.ajax(url, {
        success: successCallback,
        error: errorCallback
    });
}
