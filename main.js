const result = document.querySelector("#result");
const info = document.querySelector("#info");
const cam = document.querySelector("#cam");
const cells = []
for (let i = 0; i < 4; i++)
    cells.push(document.querySelector(`#cell${i}`))

let cameraIndex = 0;
let html5QrCode = undefined;
let devices = undefined;

function setupCamera() {
    Html5Qrcode.getCameras().then(d => {
        html5QrCode = new Html5Qrcode("reader");
        devices = d;
        startCamera();
    }).catch(err => {
        console.log(err)
    });
}

function solve(code) {
    // real rocket science here
    return [3, 2, 0, 3, 1, 0, 3, 1, 2, 3, 1, 2, 0, 1, 2, 0][code % 16]; // jk
}

function startCamera() {
    if (!(devices?.length) || html5QrCode == undefined)
        return;

    html5QrCode.start(
        devices[cameraIndex % devices.length].id,
        {
            fps: 7,
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
            // console.log(err)
        })
        .catch((err) => {
            // console.log(err)
        });
}

cam.addEventListener("click", () => {
    cameraIndex += 1;
    setupCamera();
});

function debounce(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 300, event);
    };
}

window.addEventListener("resize", debounce(function (e) {
    setupCamera();
}));

setupCamera();

document.body.addEventListener("click", () => {
    result.classList.add("transparent");
    info.classList.add("transparent");
});