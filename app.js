/* =========================================================
   FAITHWALLS — CHRISTIAN WALLPAPER STUDIO
   Built from the original Gradient Wallpaper Studio structure.
   ========================================================= */

const IMAGES = [
    { name: "Cross at Sunrise", file: "images/wallpaper1_cross_sunrise.jpg" },
    { name: "Jesus", file: "images/wallpaper2_jesus_portrait.jpg" },
    { name: "God's Word", file: "images/wallpaper3_bible.jpg" },
    { name: "Cross in Nature", file: "images/wallpaper4_nature_cross.jpg" },
    { name: "Resurrection", file: "images/wallpaper5_resurrection.jpg" },
    { name: "Prayer", file: "images/wallpaper6_prayer.jpg" },
    { name: "God Is Greater", file: "images/wallpaper7_god_is_greater.jpg" },
    { name: "Nativity", file: "images/wallpaper8_nativity.jpg" },
    { name: "Joy & Strength", file: "images/wallpaper9_joy_strength.jpg" },
    { name: "Moses", file: "images/wallpaper10_moses.jpg" },
    { name: "Lion of Judah", file: "images/wallpaper11_lion_of_judah.jpg" },
    { name: "It Is Finished", file: "images/wallpaper12_finished.jpg" },
    { name: "Peace", file: "images/wallpaper13_peace.jpg" },
    { name: "Protection", file: "images/wallpaper14_protection.jpg" }
];

const VIDEOS = [
    { name: "Sunrise Cross", file: "videos/video1_sunrise_cross.mp4" },
    { name: "Waterfall", file: "videos/video2_waterfall_nature.mp4" },
    { name: "Night Cross", file: "videos/video3_night_sky_cross.mp4" },
    { name: "Bible Light", file: "videos/video4_bible_lighting.mp4" },
    { name: "Ocean Sunset", file: "videos/video5_ocean_sunset.mp4" },
    { name: "Forest Light", file: "videos/video6_forest_light.mp4" },
    { name: "City Cross", file: "videos/video7_city_cross.mp4" },
    { name: "Lion of Judah", file: "videos/video8_lion_of_judah.mp4" },
    { name: "Nativity", file: "videos/video9_nativity_scene.mp4" },
    { name: "Three Crosses", file: "videos/video10_three_crosses.mp4" },
    { name: "Heavenly Light", file: "videos/video11_underwater_light.mp4" },
    { name: "Praise & Worship", file: "videos/video12_praise_worship.mp4" },
    { name: "Rain", file: "videos/video13_rain_nature.mp4" },
    { name: "Mountain", file: "videos/video14_mountain_sunset.mp4" },
    { name: "God of fire", file:"videos/video15_God_of_fire.mp4"
        
    },
];

const PROMPTS = [
    "A majestic angel standing beneath heavenly golden light, cinematic Christian art, peaceful atmosphere, vertical phone wallpaper",
    "Jesus walking on water at sunrise, dramatic clouds, radiant light, biblical cinematic artwork, vertical wallpaper",
    "The empty tomb at dawn, rays of heavenly light, peaceful Christian scene, cinematic vertical wallpaper",
    "The three Hebrew men standing safely in the fiery furnace with a divine fourth figure, Daniel 3, cinematic art",
    "Moses before the burning bush, holy light in the wilderness, reverent biblical artwork, vertical phone wallpaper",
    "The Lion of Judah beneath a golden sky, powerful Christian symbolism, cinematic vertical wallpaper"
];

const state = {
    selectedImage: null,
    selectedVideo: null,
    creatorImageOne: null,
    creatorImageTwo: null,
    position: "center"
};

const video = document.getElementById("wallpaperVideo");
const canvas = document.getElementById("wallpaperCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("wallpaperImage");

const imageButtons = document.getElementById("imageButtons");
const videoButtons = document.getElementById("videoButtons");
const phoneGlow = document.getElementById("phoneGlow");
const previewCaption = document.getElementById("previewCaption");

const verseInput = document.getElementById("verseInput");
const referenceInput = document.getElementById("referenceInput");
const previewVerse = document.getElementById("previewVerse");
const previewReference = document.getElementById("previewReference");

const imageOneInput = document.getElementById("imageOneInput");
const imageTwoInput = document.getElementById("imageTwoInput");
const createButton = document.getElementById("createButton");

const promptList = document.getElementById("promptList");
const toast = document.getElementById("toast");

const wallpaperSheet = document.getElementById("wallpaperSheet");
const setWallpaperButton = document.getElementById("setWallpaperButton");
const cancelSheet = document.getElementById("cancelSheet");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.faithToastTimer);
    window.faithToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function createImageButtons() {
    imageButtons.innerHTML = "";

    IMAGES.forEach((wallpaper, index) => {
        const button = document.createElement("button");
        button.className = "image-button";
        button.dataset.index = index;

        const img = document.createElement("img");
        img.src = wallpaper.file;
        img.alt = wallpaper.name;
        img.loading = "lazy";

        const label = document.createElement("span");
        label.className = "button-label";
        label.textContent = wallpaper.name;

        button.appendChild(img);
        button.appendChild(label);

        button.addEventListener("click", () => selectImage(index));
        imageButtons.appendChild(button);
    });
}

function createVideoButtons() {
    videoButtons.innerHTML = "";

    VIDEOS.forEach((wallpaper, index) => {
        const button = document.createElement("button");
        button.className = "video-button";
        button.dataset.index = index;

        const preview = document.createElement("video");
        preview.src = wallpaper.file;
        preview.muted = true;
        preview.loop = true;
        preview.autoplay = true;
        preview.playsInline = true;
        preview.preload = "metadata";

        const label = document.createElement("span");
        label.className = "button-label";
        label.textContent = wallpaper.name;

        button.appendChild(preview);
        button.appendChild(label);

        button.addEventListener("click", () => selectVideo(index));
        videoButtons.appendChild(button);
    });
}

function clearSelections() {
    document.querySelectorAll(".image-button, .video-button")
        .forEach(button => button.classList.remove("active"));
}

function selectImage(index) {
    if (!IMAGES[index]) return;

    state.selectedImage = index;
    state.selectedVideo = null;
    clearSelections();

    document.querySelector(`.image-button[data-index="${index}"]`)
        ?.classList.add("active");

    video.pause();
    video.removeAttribute("src");
    video.load();

    video.style.display = "none";
    canvas.style.display = "none";
    image.style.display = "block";

    image.src = IMAGES[index].file;

    previewCaption.textContent =
        `${IMAGES[index].name} — Christian wallpaper`;

    phoneGlow.style.background =
        "radial-gradient(circle, rgba(216,188,106,.25), transparent 68%)";
}

function selectVideo(index) {
    if (!VIDEOS[index]) return;

    state.selectedVideo = index;
    state.selectedImage = null;
    clearSelections();

    document.querySelector(`.video-button[data-index="${index}"]`)
        ?.classList.add("active");

    image.style.display = "none";
    canvas.style.display = "none";
    video.style.display = "block";
    video.style.visibility = "visible";
    video.controls = false;

    video.pause();
    video.removeAttribute("src");
    video.load();
    video.src = VIDEOS[index].file;
    video.load();

    const startSelectedVideo = () => {
        video.currentTime = 0;
        const promise = video.play();
        if (promise) {
            promise.catch(() => {
                video.controls = true;
            });
        }
    };

    if (video.readyState >= 2) {
        startSelectedVideo();
    } else {
        video.addEventListener("loadeddata", startSelectedVideo, { once: true });
    }

    previewCaption.textContent =
        `${VIDEOS[index].name} — live Christian wallpaper`;
}

function updateVerse() {
    previewVerse.textContent =
        verseInput.value.trim() || "Be strong and courageous.";

    previewReference.textContent =
        referenceInput.value.trim() || "Joshua 1:9";
}

verseInput.addEventListener("input", updateVerse);
referenceInput.addEventListener("input", updateVerse);

function readImage(file, callback) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {
        const img = new Image();

        img.onload = () => callback(img);
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

imageOneInput.addEventListener("change", () => {
    readImage(imageOneInput.files[0], img => {
        state.creatorImageOne = img;
        showToast("First image loaded");
    });
});

imageTwoInput.addEventListener("change", () => {
    readImage(imageTwoInput.files[0], img => {
        state.creatorImageTwo = img;
        showToast("Second image loaded");
    });
});

document.querySelectorAll("[data-position]").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll("[data-position]")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");
        state.position = button.dataset.position;
    });
});

function drawCover(ctx, img, x, y, width, height) {
    const scale = Math.max(width / img.width, height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(
        img,
        x + (width - w) / 2,
        y + (height - h) / 2,
        w,
        h
    );
}

function createChristianWallpaper() {
    if (!state.creatorImageOne && !state.creatorImageTwo) {
        showToast("Upload at least one image first");
        return;
    }

    const W = 1080;
    const H = 1920;

    canvas.width = W;
    canvas.height = H;

    const first = state.creatorImageOne || state.creatorImageTwo;
    const second = state.creatorImageTwo || state.creatorImageOne;

    drawCover(ctx, first, 0, 0, W, H);

    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.fillRect(0, 0, W, H);

    if (second && second !== first) {
        ctx.save();

        ctx.globalAlpha = .45;
        ctx.globalCompositeOperation = "screen";

        drawCover(ctx, second, 0, 0, W, H);

        ctx.restore();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "rgba(0,0,0,.05)");
    gradient.addColorStop(.55, "rgba(0,0,0,.15)");
    gradient.addColorStop(1, "rgba(0,0,0,.75)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0,0,0,.9)";
    ctx.shadowBlur = 18;

    const verse = verseInput.value.trim() || "Be strong and courageous.";
    const reference = referenceInput.value.trim() || "Joshua 1:9";

    let y;

    if (state.position === "top") y = 350;
    else if (state.position === "bottom") y = 1510;
    else y = 950;

    ctx.font = "bold 58px Arial";
    wrapText(ctx, `"${verse}"`, W / 2, y, 900, 72);

    ctx.shadowBlur = 10;
    ctx.fillStyle = "#d8bc6a";
    ctx.font = "bold 34px Arial";
    ctx.fillText(reference, W / 2, y + 180);

    image.style.display = "none";
    video.style.display = "none";
    canvas.style.display = "block";

    state.selectedImage = null;
    state.selectedVideo = null;
    clearSelections();

    previewCaption.textContent = "Your custom Christian wallpaper";

    showToast("Wallpaper created");
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    words.forEach(word => {
        const test = line + word + " ";

        if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line.trim());
            line = word + " ";
        } else {
            line = test;
        }
    });

    if (line) lines.push(line.trim());

    lines.forEach((lineText, i) => {
        ctx.fillText(lineText, x, y + i * lineHeight);
    });
}

createButton.addEventListener("click", createChristianWallpaper);

function downloadCurrent(target) {
    if (state.selectedVideo !== null) {
        const selected = VIDEOS[state.selectedVideo];
        const link = document.createElement("a");

        link.href = selected.file;
        link.download =
            selected.name.replace(/\s+/g, "_").toLowerCase() + ".mp4";

        document.body.appendChild(link);
        link.click();
        link.remove();

        showToast(`${selected.name} downloaded`);
        return;
    }

    if (state.selectedImage !== null) {
        const selected = IMAGES[state.selectedImage];
        const link = document.createElement("a");

        link.href = selected.file;
        link.download =
            selected.name.replace(/\s+/g, "_").toLowerCase() + ".jpg";

        document.body.appendChild(link);
        link.click();
        link.remove();

        showToast(`${selected.name} downloaded`);
        return;
    }

    if (canvas.style.display !== "none") {
        canvas.toBlob(blob => {
            if (!blob) {
                showToast("Could not create wallpaper");
                return;
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `faithwalls-${target}.png`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
            showToast("Custom wallpaper downloaded");
        }, "image/png");

        return;
    }

    showToast("Select or create a wallpaper first");
}

setWallpaperButton.addEventListener("click", () => {
    wallpaperSheet.classList.add("show");
});

cancelSheet.addEventListener("click", () => {
    wallpaperSheet.classList.remove("show");
});

wallpaperSheet.addEventListener("click", event => {
    if (event.target === wallpaperSheet) {
        wallpaperSheet.classList.remove("show");
    }
});

document.querySelectorAll(".sheet-option").forEach(option => {
    option.addEventListener("click", () => {
        const target = option.dataset.target;

        wallpaperSheet.classList.remove("show");
        downloadCurrent(target);
    });
});

document.querySelectorAll(".story-button").forEach(button => {
    button.addEventListener("click", () => {
        const file = button.dataset.image;
        const verse = button.dataset.verse;
        const reference = button.dataset.reference;

        const index = IMAGES.findIndex(item => item.file === file);

        verseInput.value = verse;
        referenceInput.value = reference;
        updateVerse();

        if (index >= 0) {
            selectImage(index);
        }
    });
});

function createPrompts() {
    promptList.innerHTML = "";

    PROMPTS.forEach(promptText => {
        const prompt = document.createElement("div");

        prompt.className = "prompt";
        prompt.textContent = promptText;

        prompt.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(promptText);
                showToast("Prompt copied");
            } catch {
                showToast("Copy failed");
            }
        });

        promptList.appendChild(prompt);
    });
}

window.addEventListener("resize", () => {
    if (canvas.style.display !== "none" && canvas.width) {
        /* Keep the custom wallpaper canvas intact. */
    }
});

createImageButtons();
createVideoButtons();
createPrompts();
updateVerse();
