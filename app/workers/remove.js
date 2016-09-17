onmessage = function(e){
    var file = e.data.file;
    var dropbox = e.data.dropbox;

    var xhr = new XMLHttpRequest();
    xhr.upload.onprogress = function(evt) {
        var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
        postMessage({
            status : 'REMOVE',
            data : percentComplete
        });
        // Upload in progress. Do something here with the percent complete.
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            var fileInfo = JSON.parse(xhr.response);
            postMessage({
                status : 'FINISHED',
                data : fileInfo
            });
            // Upload succeeded. Do something here with the file info.
        }
        else {
            var errorMessage = xhr.response || 'Unable to upload file';
            console.error(errorMessage);
            // Upload failed. Do something here with the error.
        }
    };

    xhr.open('POST', dropbox.removeUrl);
    xhr.setRequestHeader('Authorization', dropbox.Authorization);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        path : file.path_lower
    }));
}