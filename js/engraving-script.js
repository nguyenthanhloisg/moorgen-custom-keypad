document.addEventListener("DOMContentLoaded", () => {
    const selectedImage = sessionStorage.getItem("selectedImage")
    const selectedLayout = sessionStorage.getItem("selectedLayout")
    const imageElement = document.getElementById("style-image")

    const popperWrapper = document.querySelector(".popper-wrapper-outside")

    const popperWrapperScroll = document.querySelector(".popper-wrapper")

    const rows = ["row1-1", "row1-2", "row2-1", "row2-2", "row3-1", "row3-2", "row4-1", "row4-2"]
    const detailedRows = [
        "row1-1-top",
        "row1-1-bottom",
        "row1-2-top",
        "row1-2-bottom",
        "row2-1-top",
        "row2-1-bottom",
        "row2-2-top",
        "row2-2-bottom",
        "row3-1-top",
        "row3-1-bottom",
        "row3-2-top",
        "row3-2-bottom",
        "row4-1-top",
        "row4-1-bottom",
        "row4-2-top",
        "row4-2-bottom"
    ]
    const defaultIconClass = "icomoon-light-icon-0"
    const blankIconClass = "icomoon-blank-icon"

    if (selectedImage) {
        imageElement.src = `../img/${selectedImage}`
        imageElement.alt = selectedImage
    } else {
        imageElement.src = "../img/default.jpg"
        imageElement.alt = "Please go to start page"
        alert("You haven't chosen the type of keypad yet\nPlease go to start page")
        window.location.href = "../"
    }

    if (selectedLayout === "icon-only") {
        let currentButton = null
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        //show layout icon-only
        document.querySelector(".style-icon-only-layout").style.display = "block"
        document.querySelector(".engraving-icon-only-layout").style.display = "grid"

        // Khôi phục img src từ sessionStorage khi tải lại trang
        const savedIcons = JSON.parse(sessionStorage.getItem("selectedIcons")) || {}
        rows.forEach(row => {
            const iconSelector = document.querySelector(`.icon-selector-container-outside.${row} i`)
            const iconImgContainer = document.querySelector(`.icon-img-container.${row} i`)

            const iconClass = savedIcons[row] || defaultIconClass
            iconSelector.className = iconClass
            iconImgContainer.className = iconClass

            // Thêm sự kiện click cho icon-selector
            document
                .querySelector(`.icon-selector-container-outside.${row}`)
                .addEventListener("click", function (event) {
                    // Bỏ active-color từ các nút khác
                    document
                        .querySelectorAll(".icon-selector-container-outside")
                        .forEach(el => el.classList.remove("active-color"))

                    // Thêm active-color cho nút được click
                    this.classList.add("active-color")

                    // Tạo một Popper instance cho mỗi row
                    const popperInstance = Popper.createPopper(iconSelector, popperWrapper, {
                        placement: 'top', // Đặt vị trí hiển thị của popper
                        modifiers: [
                            {
                                name: "offset",
                                options: {
                                    offset: [0, 27] // Điều chỉnh khoảng cách giữa popper và rows
                                }
                            },
                            {
                                name: 'flip',
                                options: {
                                    fallbackPlacements: ['top'], // Không có vị trí thay thế
                                    flipVariations: false, // true
                                },
                            },
                        ]
                    })

                    popperInstance.update() // Cập nhật vị trí của popper

                    // Hiển thị popper-wrapper
                    popperWrapper.style.display = "none"

                    // Reset animation
                    popperWrapper.classList.remove("showPopper")
                    void popperWrapper.offsetWidth // Trigger reflow
                    popperWrapper.classList.add("showPopper")

                    popperWrapper.style.display = "block"

                    // Đặt lại vị trí cuộn về đầu
                    // popperWrapper.scrollTop = 0;

                    currentButton = row

                    event.stopPropagation() // Ngăn chặn sự kiện lan truyền đến document
                })
        })
        // Thêm sự kiện click cho popper-icon-picker
        document.querySelectorAll(".popper-icon-picker-outside").forEach(picker => {
            picker.addEventListener("click", function () {
                if (currentButton) {
                    const iconClass = this.querySelector("i").className
                    const iconSelector = document.querySelector(`.icon-selector-container-outside.${currentButton} i`)
                    const iconImgContainer = document.querySelector(`.icon-img-container.${currentButton} i`)

                    iconSelector.className = iconClass
                    iconImgContainer.className = iconClass

                    // Lưu lại icon đã chọn vào sessionStorage
                    savedIcons[currentButton] = iconClass
                    sessionStorage.setItem("selectedIcons", JSON.stringify(savedIcons))

                    // Ẩn popperWrapper
                    popperWrapper.style.display = "none"
                }
            })
        })

        // Ngăn chặn sự kiện click lan truyền từ popperWrapper đến document
        popperWrapper.addEventListener("click", function (event) {
            event.stopPropagation()
        })

        // Ẩn popperWrapper khi click ra ngoài
        document.addEventListener("click", function () {
            popperWrapper.style.display = "none"
            document
                .querySelectorAll(".icon-selector-container-outside")
                .forEach(el => el.classList.remove("active-color"))
        })

        // Ngan su kien cuon trang lan ra ngoai
        popperWrapperScroll.addEventListener('wheel', function(event) {
            // Kiểm tra xem popper có đang cuộn không
            const canScrollUp = this.scrollTop > 0;
            const canScrollDown = this.scrollTop + this.clientHeight < this.scrollHeight;
        
            // Ngăn chặn cuộn toàn trang nếu có thể cuộn bên trong popper
            if ((event.deltaY < 0 && !canScrollUp) || (event.deltaY > 0 && !canScrollDown)) {
                event.preventDefault();
            }
        });
    } else if (selectedLayout === "mixing") {
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        // show layout
        document.querySelector(".style-mixing-layout").style.display = "block"
        document.querySelector(".engraving-mixing-layout").style.display = "grid"

        let currentButtonMX = null

        //Update text
        detailedRows.forEach(function (row) {
            updateText("inputmx-" + row, "mx-" + row)
        })

        // Khôi phục img src từ sessionStorage khi tải lại trang
        const savedIconsMX = JSON.parse(sessionStorage.getItem("selectedIconsMX")) || {}
        rows.forEach(row => {
            const iconSelectorMX = document.querySelector(`.icon-selector-container-mx.${row} i`)
            const iconImgContainerMX = document.querySelector(`.double-line-container.${row} i`)

            const iconClassMX = savedIconsMX[row] || blankIconClass
            iconSelectorMX.className = iconClassMX
            iconImgContainerMX.className = iconClassMX

            // Thêm sự kiện click cho icon-selector
            document.querySelector(`.icon-selector-container-mx.${row}`).addEventListener("click", function (event) {
                // Bỏ active-color từ các nút khác
                document
                    .querySelectorAll(".icon-selector-container-mx")
                    .forEach(el => el.classList.remove("active-color"))

                // Thêm active-color cho nút được click
                this.classList.add("active-color")

                // Tạo một Popper instance cho mỗi row
                const popperInstanceMX = Popper.createPopper(iconSelectorMX, popperWrapper, {
                    placement: "top", // Đặt vị trí hiển thị của popper
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [0, 27] // Điều chỉnh khoảng cách giữa popper và rows
                            }
                        },
                        {
                            name: 'flip',
                            options: {
                                fallbackPlacements: ['top'], // Không có vị trí thay thế
                                flipVariations: false, // true
                            },
                        },
                    ]
                })

                popperInstanceMX.update() // Cập nhật vị trí của popper

                // Hiển thị popper-wrapper
                popperWrapper.style.display = "none"

                // Reset animation
                popperWrapper.classList.remove("showPopper")
                void popperWrapper.offsetWidth // Trigger reflow
                popperWrapper.classList.add("showPopper")

                popperWrapper.style.display = "block"

                // Đặt lại vị trí cuộn về đầu
                // popperWrapper.scrollTop = 0;

                currentButtonMX = row

                event.stopPropagation() // Ngăn chặn sự kiện lan truyền đến document
            })
        })
        // Thêm sự kiện click cho popper-icon-picker
        document.querySelectorAll(".popper-icon-picker-outside").forEach(picker => {
            picker.addEventListener("click", function () {
                if (currentButtonMX) {
                    const iconClassMX = this.querySelector("i").className
                    const iconSelectorMX = document.querySelector(`.icon-selector-container-mx.${currentButtonMX} i`)
                    const iconImgContainerMX = document.querySelector(`.double-line-container.${currentButtonMX} i`)

                    iconSelectorMX.className = iconClassMX
                    iconImgContainerMX.className = iconClassMX

                    // Lưu lại icon đã chọn vào sessionStorage
                    savedIconsMX[currentButtonMX] = iconClassMX
                    sessionStorage.setItem("selectedIconsMX", JSON.stringify(savedIconsMX))

                    // Ẩn popperWrapper
                    popperWrapper.style.display = "none"
                }
            })
        })

        // Ngăn chặn sự kiện click lan truyền từ popperWrapper đến document
        popperWrapper.addEventListener("click", function (event) {
            event.stopPropagation()
        })

        // Ẩn popperWrapper khi click ra ngoài
        document.addEventListener("click", function () {
            popperWrapper.style.display = "none"
            document.querySelectorAll(".icon-selector-container-mx").forEach(el => el.classList.remove("active-color"))
        })

        // Ngan su kien cuon trang lan ra ngoai
        popperWrapperScroll.addEventListener('wheel', function(event) {
            // Kiểm tra xem popper có đang cuộn không
            const canScrollUp = this.scrollTop > 0;
            const canScrollDown = this.scrollTop + this.clientHeight < this.scrollHeight;
        
            // Ngăn chặn cuộn toàn trang nếu có thể cuộn bên trong popper
            if ((event.deltaY < 0 && !canScrollUp) || (event.deltaY > 0 && !canScrollDown)) {
                event.preventDefault();
            }
        });
    } else if (selectedLayout === "single-line") {
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        //show layout
        document.querySelector(".style-single-line-layout").style.display = "block"
        document.querySelector(".engraving-single-line-layout").style.display = "grid"
        rows.forEach(function (row) {
            updateText("input-" + row, "sl-" + row)
        })
    } else if (selectedLayout === "double-line") {
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        // show layout
        document.querySelector(".style-double-line-layout").style.display = "block"
        document.querySelector(".engraving-double-line-layout").style.display = "grid"
        detailedRows.forEach(function (row) {
            updateText("input-" + row, "dl-" + row)
        })
    }

    document.getElementById("direct-button-next").addEventListener("click", () => {
        saveElementAsImage("engravedImage", () => {
            window.location.href = "../configuration/"
        })
    })

    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear()
    })
})

function saveElementAsImage(elementId, callback) {
    const inputImage = document.getElementById(elementId)
    html2canvas(inputImage, { dpi: 192, scale: 2, useCORS: true, backgroundColor: null })
        .then(function (canvas) {
            const imgData = canvas.toDataURL("image/png", 1.0) // Chất lượng cao nhất
            sessionStorage.setItem("outputImage", imgData) // Lưu hình ảnh vào sessionStorage
            if (callback) callback() // Gọi callback khi hoàn tất
        })
        .catch(error => {
            console.error("Error saving image:", error)
            if (callback) callback(error) // Gọi callback với lỗi nếu có
        })
}

// function updateText(inputId, displayId) {
//     const inputElement = document.getElementById(inputId)
//     const displayElement = document.getElementById(displayId)

//     // Khôi phục dữ liệu từ sessionStorage nếu có
//     if (sessionStorage.getItem(inputId)) {
//         inputElement.value = sessionStorage.getItem(inputId)
//         displayElement.textContent = inputElement.value
//     }

//     // Lắng nghe sự kiện input và cập nhật sessionStorage
//     inputElement.addEventListener("input", function () {
//         displayElement.textContent = this.value
//         sessionStorage.setItem(inputId, this.value)
//         // saveElementAsImage('engravedImage')
//     })
// }

function updateText(inputId, displayId) {
    const inputElement = document.getElementById(inputId)
    const displayElement = document.getElementById(displayId)

    // Khôi phục dữ liệu từ sessionStorage nếu có
    const savedValue = sessionStorage.getItem(inputId)
    if (savedValue !== null) {
        inputElement.value = savedValue
        displayElement.textContent = savedValue
    }

    // Lắng nghe sự kiện input và cập nhật sessionStorage
    inputElement.addEventListener("input", function () {
        const currentValue = this.value
        displayElement.textContent = currentValue

        // Nếu input rỗng, lưu giá trị rỗng vào sessionStorage
        if (currentValue === "") {
            sessionStorage.setItem(inputId, "")
        } else {
            sessionStorage.setItem(inputId, currentValue)
        }
        // saveElementAsImage('engravedImage')
    })
}
