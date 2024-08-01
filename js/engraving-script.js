document.addEventListener("DOMContentLoaded", () => {
    const selectedImage = sessionStorage.getItem("selectedImage");
    const selectedLayout = sessionStorage.getItem("selectedLayout");
    const imageElement = document.getElementById("style-image");

    const popperWrapper = document.querySelector('.popper-wrapper');
    const iconSelectorContainers = document.querySelectorAll('.icon-selector-container-outside');

    const rows = ['row1-1', 'row1-2', 'row2-1', 'row2-2', 'row3-1', 'row3-2', 'row4-1', 'row4-2'];

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
        rows.forEach(row => {
            const buttonId = `icon-selector-${row}`;
            const pickerIdFF = `icon-picker-${row}`;

            const savedSrc = sessionStorage.getItem(buttonId);

            const iconPickerElementFF = document.getElementById(pickerIdFF);
            const buttonidElement = document.getElementById(buttonId);
            
            if (iconPickerElementFF) {
                if (savedSrc) {
                    buttonidElement.src = savedSrc;
                    iconPickerElementFF.src = savedSrc;
                } else {
                    // Đặt src mặc định nếu không có dữ liệu trong sessionStorage
                    iconPickerElementFF.src = '../img/icon/light/light-icon-0.svg';
                    buttonidElement.src = '../img/icon/light/light-icon-0.svg';
                }
            }
        });
        saveElementAsImage('engravedImage')
    
    //show wrapperPopper
    rows.forEach(row => {
        const container = document.querySelector(`.icon-selector-container-outside.${row}`);
        const button = document.getElementById(`icon-selector-${row}`);
        
        container.addEventListener('click', (event) => {
            // Hiển thị popper-wrapper
            popperWrapper.style.display = 'none';
    
            // Reset animation
            popperWrapper.classList.remove('popper-wrapper__popup');
            void popperWrapper.offsetWidth; // Trigger reflow
            popperWrapper.classList.add('popper-wrapper__popup');
            
            popperWrapper.style.display = 'block';
    
            // Đặt lại vị trí cuộn về đầu
            popperWrapper.scrollTop = 0;
    
            // Xóa class active-color của các button trước đó
            iconSelectorContainers.forEach(btn => btn.classList.remove('active-color'));
            event.currentTarget.classList.add('active-color');
    
            // Thêm class active-color cho button được click
            button.classList.add('active-color');
    
            // Lưu vị trí button hiện tại
            currentButton = button;
    
            // Ngăn chặn sự kiện click lan ra ngoài
            event.stopPropagation();
        });
    });

    // Ẩn popper-wrapper khi click ra ngoài
    document.addEventListener('click', () => {
        popperWrapper.style.display = 'none';
        iconSelectorContainers.forEach(button => button.classList.remove('active-color'));
    });

    // Ngăn chặn sự kiện click trên popper-wrapper lan ra ngoài
    // popperWrapper.addEventListener('click', (event) => {
    //     event.stopPropagation();
    // });

    // Update iconPicker
    const iconPickers = document.querySelectorAll('.popper-icon-picker-outside');
    iconPickers.forEach(iconPickerOutside => {
        iconPickerOutside.addEventListener('click', () => {
            const iconPicker = iconPickerOutside.querySelector('img');
            if (currentButton && iconPicker) {
                // Thay đổi img src của button hiện tại
                currentButton.src = iconPicker.src;

                // Lưu img src vào sessionStorage
                sessionStorage.setItem(currentButton.id, iconPicker.src);

                // Cập nhật lại icon-picker tương ứng
                const pickerId = currentButton.id.replace('icon-selector', 'icon-picker');
                const iconPickerElement = document.getElementById(pickerId);
                if (iconPickerElement) {
                    iconPickerElement.src = iconPicker.src;
                    saveElementAsImage('engravedImage');
                }
            }
        });
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

function saveElementAsImage(elementId) {
    const inputImage = document.getElementById(elementId);
    html2canvas(inputImage, {scale: 2, useCORS: true, backgroundColor: null}).then(function(canvas) {
        const imgData = canvas.toDataURL("image/png", 1.0); // Chất lượng cao nhất
        sessionStorage.setItem("outputImage", imgData); // Lưu hình ảnh vào sessionStorage
    })
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
        saveElementAsImage('engravedImage')
    });
}




