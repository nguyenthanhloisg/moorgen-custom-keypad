document.addEventListener("DOMContentLoaded", () => {
    const selectedImage = sessionStorage.getItem("selectedImage");
    const selectedLayout = sessionStorage.getItem("selectedLayout");
    const imageElement = document.getElementById("style-image");

    const popperWrapper = document.querySelector('.popper-wrapper');

    const rows = ['row1-1', 'row1-2', 'row2-1', 'row2-2', 'row3-1', 'row3-2', 'row4-1', 'row4-2'];
    const defaultIconClass = 'icomoon-light-icon-0';
    
    if (selectedImage) {
        imageElement.src = `../img/${selectedImage}`;
        imageElement.alt = selectedImage;
    } else {
        imageElement.src = "../img/default.jpg";
        imageElement.alt = "Please go to start page";
        alert("You haven't chosen the type of keypad yet\nPlease go to start page");
        window.location.href = "../";
    }

    if(selectedLayout === "icon-only"){
        let currentButton = null;
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        //show layout icon-only
        document.querySelector(".style-icon-only-layout").style.display = "block"
        document.querySelector(".engraving-icon-only-layout").style.display = "grid"

        // Khôi phục img src từ sessionStorage khi tải lại trang
        const savedIcons = JSON.parse(sessionStorage.getItem('selectedIcons')) || {};
        rows.forEach(row => {
            const iconSelector = document.querySelector(`.icon-selector-container-outside.${row} i`);
            const iconImgContainer = document.querySelector(`.icon-img-container.${row} i`);
        
            const iconClass = savedIcons[row] || defaultIconClass;
            iconSelector.className = iconClass;
            iconImgContainer.className = iconClass;
        
            // Thêm sự kiện click cho icon-selector
            document.querySelector(`.icon-selector-container-outside.${row}`).addEventListener('click', function(event) {
                // Bỏ active-color từ các nút khác
                document.querySelectorAll('.icon-selector-container-outside').forEach(el => el.classList.remove('active-color'));
        
                // Thêm active-color cho nút được click
                this.classList.add('active-color');
                        
                // Hiển thị popper-wrapper
                popperWrapper.style.display = 'none';
        
                // Reset animation
                popperWrapper.classList.remove('popper-wrapper__popup');
                void popperWrapper.offsetWidth; // Trigger reflow
                popperWrapper.classList.add('popper-wrapper__popup');
                
                popperWrapper.style.display = 'block';
        
                // Đặt lại vị trí cuộn về đầu
                popperWrapper.scrollTop = 0;

                currentButton = row;

                event.stopPropagation(); // Ngăn chặn sự kiện lan truyền đến document
            });
        });
        // Thêm sự kiện click cho popper-icon-picker
        document.querySelectorAll('.popper-icon-picker-outside').forEach(picker => {
            picker.addEventListener('click', function() {
                if (currentButton) {
                    const iconClass = this.querySelector('i').className;
                    const iconSelector = document.querySelector(`.icon-selector-container-outside.${currentButton} i`);
                    const iconImgContainer = document.querySelector(`.icon-img-container.${currentButton} i`);

                    iconSelector.className = iconClass;
                    iconImgContainer.className = iconClass;

                    // Lưu lại icon đã chọn vào sessionStorage
                    savedIcons[currentButton] = iconClass;
                    sessionStorage.setItem('selectedIcons', JSON.stringify(savedIcons));

                    // Ẩn popperWrapper
                    popperWrapper.style.display = 'none';
                }
            });
        });

        // Ngăn chặn sự kiện click lan truyền từ popperWrapper đến document
        popperWrapper.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // Ẩn popperWrapper khi click ra ngoài
        document.addEventListener('click', function() {
            popperWrapper.style.display = 'none';
        });

    } else if (selectedLayout === "single-line"){
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        //show layout
        document.querySelector(".style-single-line-layout").style.display = "block"
        document.querySelector(".engraving-single-line-layout").style.display = "grid"
        rows.forEach(function(row) {
            updateText('input-' + row, 'sl-' + row);
        });
    } else if (selectedLayout === "double-line") {
        const detailedRows = [
            'row1-1-top', 'row1-1-bottom', 'row1-2-top', 'row1-2-bottom',
            'row2-1-top', 'row2-1-bottom', 'row2-2-top', 'row2-2-bottom',
            'row3-1-top', 'row3-1-bottom', 'row3-2-top', 'row3-2-bottom',
            'row4-1-top', 'row4-1-bottom', 'row4-2-top', 'row4-2-bottom'
        ];
        // Hide all layouts
        document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
        document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
        // show layout
        document.querySelector(".style-double-line-layout").style.display = "block"
        document.querySelector(".engraving-double-line-layout").style.display = "grid"
        detailedRows.forEach(function(row) {
            updateText('input-' + row, 'dl-' + row);
        });
    }

    //su kien nut nhan
    // let isButtonClick = false;

    // document.getElementById('button__set--layout').addEventListener('click', function() {
    //     isButtonClick = true
    //     saveElementAsImage('engravedImage');
    //     alert("Layout has been set")
    // });

    document.getElementById('direct-button-next').addEventListener('click', () => {
        saveElementAsImage('engravedImage', () => {
            window.location.href = '../configuration/';
        });
    });

    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear()
    }) 
});

// function showLayout(layout) {
//     // Hide all layouts
//     document.querySelectorAll(".style-layout").forEach(el => (el.style.display = "none"))
//     document.querySelectorAll(".engraving-layout").forEach(el => (el.style.display = "none"))
//     // Show the selected layout
//     if (layout === "icon-only") {
//         document.querySelector(".style-icon-only-layout").style.display = "block"
//         document.querySelector(".engraving-icon-only-layout").style.display = "grid"
//     } else if (layout === "single-line") {
//         document.querySelector(".style-single-line-layout").style.display = "block"
//         document.querySelector(".engraving-single-line-layout").style.display = "grid"
//     } else if (layout === "double-line") {
//         document.querySelector(".style-double-line-layout").style.display = "block"
//         document.querySelector(".engraving-double-line-layout").style.display = "grid"
//     }
//     // Save the selected layout to sessionStorage
//     sessionStorage.setItem('selectedLayout', layout);
// }

// function saveElementAsImage(elementId) {
//     const inputImage = document.getElementById(elementId);
//     html2canvas(inputImage, {dpi: 192, scale: 2, useCORS: true, backgroundColor: null}).then(function(canvas) {
//         const imgData = canvas.toDataURL("image/png", 1.0); // Chất lượng cao nhất
//         sessionStorage.setItem("outputImage", imgData); // Lưu hình ảnh vào sessionStorage
//     })
// }

function saveElementAsImage(elementId, callback) {
    const inputImage = document.getElementById(elementId);
    html2canvas(inputImage, {dpi: 192, scale: 2, useCORS: true, backgroundColor: null}).then(function(canvas) {
        const imgData = canvas.toDataURL("image/png", 1.0); // Chất lượng cao nhất
        sessionStorage.setItem("outputImage", imgData); // Lưu hình ảnh vào sessionStorage
        if (callback) callback(); // Gọi callback khi hoàn tất
    }).catch(error => {
        console.error('Error saving image:', error);
        if (callback) callback(error); // Gọi callback với lỗi nếu có
    });
}

function updateText(inputId, displayId) {
    const inputElement = document.getElementById(inputId);
    const displayElement = document.getElementById(displayId);

    // Khôi phục dữ liệu từ sessionStorage nếu có
    if (sessionStorage.getItem(inputId)) {
        inputElement.value = sessionStorage.getItem(inputId);
        displayElement.textContent = inputElement.value;
    }

    // Lắng nghe sự kiện input và cập nhật sessionStorage
    inputElement.addEventListener('input', function() {
        displayElement.textContent = this.value;
        sessionStorage.setItem(inputId, this.value);
        // saveElementAsImage('engravedImage')
    });
}




