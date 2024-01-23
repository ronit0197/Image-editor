let inputImage = document.getElementById("file-input"),
chooseImage = document.getElementById("load-image"),
imagePreview = document.getElementById("image"),
container = document.querySelector(".container"),
filter = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".name"),
slider = document.querySelector(".slider input"),
filterValue = document.querySelector(".value"),
editableImage = document.getElementById("image"),
rotation = document.querySelectorAll(".rotate button"),
resetFilter = document.querySelector(".reset-filter"),
saveImage = document.getElementById("save-image");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, rotate = 0, flipVertical = 1, flipHorizontal = 1;

// Load image function
const loadImage = () =>{

    let file = inputImage.files[0];
    if(!file){
        return;
    }else{
        imagePreview.src = URL.createObjectURL(file);
    }
    imagePreview.addEventListener("load", ()=>{
        container.classList.remove("disable");
    });
}
// Filter button click
filter.forEach(option =>{

    option.addEventListener("click", ()=>{

        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");

        filterName.innerText = option.innerHTML;

        if(option.innerHTML === "Brightness"){

            slider.max = 200;
            slider.value = brightness;
            filterValue.innerText = `${brightness}%`;

        }else if(option.innerHTML === "Saturation"){

            slider.max = 200;
            slider.value = saturation;
            filterValue.innerText = `${saturation}%`;

        }else if(option.innerHTML === "Inversion"){

            slider.max = 100;
            slider.value = inversion;
            filterValue.innerText = `${inversion}%`;

        }else if(option.innerHTML === "Grayscale"){

            slider.max = 100;
            slider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;

        }

    });

});

// Change filter value function
const changeValue = () =>{
    filterValue.innerText = `${slider.value}%`;

    let selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.innerHTML === "Brightness"){

        brightness = slider.value;

    }else if(selectedFilter.innerHTML === "Saturation"){

        saturation = slider.value;

    }else if(selectedFilter.innerHTML === "Inversion"){

        inversion = slider.value;

    }else if(selectedFilter.innerHTML === "Grayscale"){

        grayscale = slider.value;

    }

    applyFilter()
}

// Function to apply the filter to image
function applyFilter(){
    editableImage.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
    editableImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

// Rotation button click
rotation.forEach(option =>{
    option.addEventListener("click", ()=>{
        if(option.id === "left"){

            rotate -= 90;

        }else if(option.id === "right"){

            rotate += 90;

        }else if(option.id === "vertical"){

            flipVertical = flipVertical === 1 ? -1 : 1;

        }else{

            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        applyFilter()
    });
});

// Reset filter function
resetFilter.addEventListener("click", ()=>{
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    flipVertical = 1;
    flipHorizontal = 1;

    filter[0].click(); //Clicking the brightness button to reset.

    applyFilter()
});

// Save image function
saveImage.addEventListener("click", ()=>{

    let canvas = document.createElement("canvas"); //Creating a new canvas
    let ctx = canvas.getContext("2d"); //Returning a drawing contwxt on the canvas
    canvas.width = editableImage.naturalWidth; //Setting canvas width according to the image
    canvas.height = editableImage.naturalHeight; //Setting canvas height according to the image

    // Applying the user selected filters
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //Translating canvas from center
    if(rotate != 0){ //Rotate the canvas
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipVertical, flipHorizontal);
    ctx.drawImage(editableImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    let link = document.createElement("a");
    link.download = "Image.jeg";
    link.href = canvas.toDataURL();
    link.click();

});

// Load image execution
inputImage.addEventListener("change", loadImage);
chooseImage.addEventListener("click", ()=> inputImage.click());
// Change filter value execution
slider.addEventListener("input", changeValue);