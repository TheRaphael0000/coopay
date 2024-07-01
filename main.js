const result = document.querySelector("#result");
const info = document.querySelector("#info");
const cells = []
for (let i = 0; i < 4; i++)
    cells.push(document.querySelector(`#cell${i}`))

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
        (decodedText, _) => {
            let code = parseInt(decodedText);
            let solution = solve(code);
            for (let i = 0; i < 4; i++)
                cells[i].innerHTML = i == solution ? "<i class='fa-solid fa-gift color1'></i>" : ""
            result.classList.remove("transparent");
            info.classList.remove("transparent");
        },
        (err) => {
            console.log(err)
        })
        .catch((err) => {
            console.log(err)
        });

}).catch(err => {
    console.log(err)
});

function solve(code) {
    // real rocket science here
    return [3, 2, 0, 3, 1, 0, 3, 1, 2, 3, 1, 2, 0, 1, 2, 0][code % 16]; // jk
}

document.body.addEventListener("click", () => {
    result.classList.add("transparent");
    info.classList.add("transparent");
});