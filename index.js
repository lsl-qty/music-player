// ====================== 请在这里替换你的学号和姓名 ======================
const STUDENT_ID = "你的学号";
const STUDENT_NAME = "你的姓名";
document.querySelector(".top-info").innerText =
`广东东软学院 | Web编程技术实验2 | 学号：${STUDENT_ID} | 姓名：${STUDENT_NAME}`;

// 播放列表（可在线播放，无需本地文件）
const playlist = [
    {
        name: "洛春赋",
        singer: "云汐",
        url: "https://music.163.com/song/media/outer/url?id=2041060996.mp3"
    },
    {
        name: "起风了",
        singer: "买辣椒也用券",
        url: "https://music.163.com/song/media/outer/url?id=1330350933.mp3"
    },
    {
        name: "稻香",
        singer: "周杰伦",
        url: "https://music.163.com/song/media/outer/url?id=153076.mp3"
    }
];

// 元素获取
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songNameEl = document.getElementById("song-name");
const singerEl = document.getElementById("singer");
const listEl = document.getElementById("list");
const rateSelect = document.getElementById("rate");

let currentIndex = 0;

// 初始化列表
function initList() {
    listEl.innerHTML = "";
    playlist.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerText = `${index + 1}. ${song.name} - ${song.singer}`;
        li.onclick = () => {
            currentIndex = index;
            loadSong();
            audio.play();
            updateBtn();
        };
        if (index === currentIndex) li.classList.add("active");
        listEl.appendChild(li);
    });
}

// 加载当前歌曲
function loadSong() {
    let song = playlist[currentIndex];
    audio.src = song.url;
    songNameEl.innerText = song.name;
    singerEl.innerText = song.singer;
    initList();
}

// 更新播放/暂停按钮
function updateBtn() {
    playPauseBtn.innerText = audio.paused ? "播放" : "暂停";
}

// 时间格式化
function formatTime(t) {
    let m = Math.floor(t / 60).toString().padStart(2, "0");
    let s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// 上一曲
prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong();
    audio.play();
    updateBtn();
};

// 下一曲
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong();
    audio.play();
    updateBtn();
};

// 播放暂停
playPauseBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updateBtn();
};

// 进度条更新
audio.ontimeupdate = () => {
    progressBar.max = audio.duration || 0;
    progressBar.value = audio.currentTime;
    currentTimeEl.innerText = formatTime(audio.currentTime);
};

// 歌曲加载完成
audio.onloadedmetadata = () => {
    durationEl.innerText = formatTime(audio.duration);
    progressBar.max = audio.duration;
};

// 拖动进度条
progressBar.oninput = () => {
    audio.currentTime = progressBar.value;
};

// 倍速
rateSelect.onchange = () => {
    audio.playbackRate = rateSelect.value;
};

// 自动下一曲
audio.onended = () => {
    nextBtn.click();
};

// 启动
loadSong();
initList();