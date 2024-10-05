document.addEventListener("DOMContentLoaded", () => {
    const imageElement = document.getElementById("material-image")
    const seriesElements = {
        supercar: document.querySelector(
            ".materials-product-color-picker-container.supercar-series"
        ),
        swiss: document.querySelector(".materials-product-color-picker-container.swiss-series")
    }
    const colorPickerImages = document.querySelectorAll(".color-picker-image")
    const imgPrefix = "../img/"

    // function preloadImages(...urls) {
    //     urls.forEach(url => {
    //         const img = new Image()
    //         img.src = url
    //     })
    // }
    // preloadImages(
    //     `${imgPrefix}supercar-snowflake-silver.jpg`,
    //     `${imgPrefix}supercar-mica-black.jpg`,
    //     `${imgPrefix}supercar-champagne-silver.jpg`,
    //     `${imgPrefix}supercar-champagne-gold.jpg`,
    //     `${imgPrefix}swiss-warm-white.jpg`,
    //     `${imgPrefix}swiss-snowflake-silver.jpg`,
    //     `${imgPrefix}swiss-mica-black.jpg`,
    //     `${imgPrefix}swiss-gem-gray.jpg`,
    //     `${imgPrefix}swiss-ferrari-red.jpg`,
    //     `${imgPrefix}swiss-champaign-silver.jpg`,
    //     `${imgPrefix}swiss-champaign-gold.jpg`
    // )
    
    function updateImage(colorImage) {
        const filename = colorImage.src.split("/").pop().replace("color-picker-", "")
        imageElement.src = `${imgPrefix}${filename}`
        imageElement.alt = filename

        colorPickerImages.forEach(picker => picker.classList.remove("active-color"))
        colorImage.classList.add("active-color")

        sessionStorage.setItem("selectedImage", filename)
        seriesElements.supercar.style.display = filename.startsWith("supercar-") ? "flex" : "none"
        seriesElements.swiss.style.display = filename.startsWith("swiss-") ? "flex" : "none"
    }
    const selectedImage = sessionStorage.getItem("selectedImage")
    if (selectedImage) {
        imageElement.src = `${imgPrefix}${selectedImage}`
        imageElement.alt = selectedImage
        seriesElements.supercar.style.display = selectedImage.startsWith("supercar-")
            ? "flex"
            : "none"
        seriesElements.swiss.style.display = selectedImage.startsWith("swiss-")
            ? "flex"
            : "none"
        const correspondingColorPicker = document.querySelector(
            `.color-picker-image[src$="color-picker-${selectedImage}"]`
        )
        if (correspondingColorPicker) {
            correspondingColorPicker.classList.add("active-color")
        }
    } else {
        alert("You haven't chosen the type of keypad yet\nPlease go to start page")
        window.location.href = "../"
    }
    colorPickerImages.forEach(img => img.addEventListener("click", () => updateImage(img)))

    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear()
    })
})
