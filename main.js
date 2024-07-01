Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        var cameraId = devices[0].id;
    }

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        cameraId,
        {
            fps: 10,
            qrbox: {
                width: 400,
                height: 300
            }
        },
        (decodedText, decodedResult) => {
            let value = parseInt(decodedText);

            console.log(decodedText, decodedResult)
        },
        (errorMessage) => {
            console.log(errorMessage)
        })
        .catch((err) => {
        });

}).catch(err => {
    console.log(err)
});