document.addEventListener("DOMContentLoaded", () => {
    const selectedImage = sessionStorage.getItem("selectedImage")
    const imageElement = document.getElementById("style-image")

    if (selectedImage) {
        imageElement.src = `../img/${selectedImage}`
        imageElement.alt = selectedImage
    } else {
        imageElement.src = "../img/default.jpg"
        imageElement.alt = "Please go to start page"
        alert("You haven't chosen the type of keypad yet\nPlease go to start page")
        window.location.href = "../"
    }

    // Initially hide all layouts
    document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))

    // Load the saved layout from sessionStorage and show it
    const savedLayout = sessionStorage.getItem("selectedLayout")
    if (savedLayout) {
        showLayout(savedLayout)
        // Select the corresponding icon-picker-image
        const correspondingImage = document.querySelector(
            `.icon-picker-image[data-layout="${savedLayout}"]`
        )
        if (correspondingImage) {
            correspondingImage.classList.add("active-color")
        }
    }

    // Add click event listeners for images to show layout and add border
    document.querySelectorAll(".icon-picker-image").forEach(img => {
        img.addEventListener("click", event => {
            // Remove selected class from all images
            document
                .querySelectorAll(".icon-picker-image")
                .forEach(el => el.classList.remove("active-color"))
            // Add selected class to the clicked image
            event.target.classList.add("active-color")

            // Show the corresponding layout
            const layoutType = event.target.dataset.layout
            showLayout(layoutType)
        })
    })

    const rows = [
        "row1-1", "row1-2","row2-1", "row2-2","row3-1","row3-2","row4-1","row4-2"
    ]

    // Khôi phục img src từ sessionStorage khi tải lại trang
    const defaultIconClass = 'icomoon-light-icon-0';
    const blankIconClass = "icomoon-blank-icon"
    const savedIcons = JSON.parse(sessionStorage.getItem('selectedIcons')) || {};
    const savedIconsMX = JSON.parse(sessionStorage.getItem('selectedIconsMX')) || {};
    rows.forEach(row => {
        const iconImgContainer = document.querySelector(`.icon-img-container.${row} i`);
        const iconClass = savedIcons[row] || defaultIconClass;
        iconImgContainer.className = iconClass;

        const iconImgContainerMX = document.querySelector(`.double-line-container.${row} i`);
        const iconClassMX = savedIconsMX[row] || blankIconClass;
        iconImgContainerMX.className = iconClassMX;
    });

    rows.forEach(function (row) {
        updateText("input-" + row, "sl-" + row)
    })

    const detailedRows = [
        "row1-1-top","row1-1-bottom","row1-2-top","row1-2-bottom","row2-1-top","row2-1-bottom","row2-2-top","row2-2-bottom","row3-1-top","row3-1-bottom","row3-2-top","row3-2-bottom","row4-1-top","row4-1-bottom","row4-2-top","row4-2-bottom"
    ]
    detailedRows.forEach(function (row) {
        updateText("input-" + row, "dl-" + row)
        updateText("inputmx-" + row, "mx-" + row)
    })

    // Add click event listener to the direct button to check layout selection
    document.querySelector(".direct-button-next").addEventListener("click", event => {
        const selectedLayout = sessionStorage.getItem("selectedLayout")
        if (!selectedLayout) {
            event.preventDefault()
            alert("Please select your style layout")
        }
    })

    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear()
    })
})

function updateText(inputId, displayId) {
    const storedValue = sessionStorage.getItem(inputId)
    const displayElement = document.getElementById(displayId)
    if (storedValue !== null) {
        displayElement.textContent = storedValue
    }
}

function selectLayout(layout) {
    sessionStorage.setItem("selectedLayout", layout)
}

function showLayout(layout) {
    // Hide all layouts
    document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))

    // Show the selected layout
    if (layout === "icon-only") {
        document.querySelector(".style-icon-only-layout").style.display = "block"
    } else if (layout === "single-line") {
        document.querySelector(".style-single-line-layout").style.display = "block"
    } else if (layout === "double-line") {
        document.querySelector(".style-double-line-layout").style.display = "block"
    } else if (layout === "mixing"){
        document.querySelector(".style-mixing-layout").style.display = "block"
    }
    // Save the selected layout to sessionStorage
    sessionStorage.setItem("selectedLayout", layout)
}
