const track = document.getElementById("track");

if (track) {
    track.innerHTML = `
        <div style="
            width:100%;
            height:300px;
            background:red;
            color:white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:28px;">
            TRACK IS WORKING
        </div>
    `;
}