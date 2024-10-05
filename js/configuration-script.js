document.addEventListener("DOMContentLoaded", () => {
    const selectedProtocol = sessionStorage.getItem("selectedProtocol");
    const radios = document.querySelectorAll('input[name="protocol"]');
    const inputComponentName = document.getElementById("input-component-name")
    const inputArtworkName = document.getElementById("input-artwork-name")
    const selectedImage = sessionStorage.getItem("selectedImage");
    // Load the saved value from sessionStorage

    if (!selectedImage) {
        alert("You haven't chosen the type of keypad yet\nPlease go to start page");
        window.location.href = "../";
    }

    if (selectedProtocol) {
        const radio = document.querySelector(`input[name="protocol"][value="${selectedProtocol}"]`);
        if (radio) {
            radio.checked = true;
        }
    } else {
        // Save the default checked value to sessionStorage
        const defaultCheckedRadio = document.querySelector('input[name="protocol"]:checked');
        if (defaultCheckedRadio) {
            sessionStorage.setItem("selectedProtocol", defaultCheckedRadio.value);
        }
    }

    // Save the selected value to sessionStorage on click
    radios.forEach(radio => {
        radio.addEventListener("click", function () {
            if (radio.checked) {
                sessionStorage.setItem("selectedProtocol", this.value);
            }
        });
    });

    // Load giá trị từ sessionStorage nếu có
    if (sessionStorage.getItem("inputComponentName")) {
        inputComponentName.value = sessionStorage.getItem("inputComponentName")
    }

    if (sessionStorage.getItem("inputArtworkName")) {
        inputArtworkName.value = sessionStorage.getItem("inputArtworkName")
    }

    // Lưu giá trị vào sessionStorage khi input có thay đổi
    inputComponentName.addEventListener("input", function () {
        sessionStorage.setItem("inputComponentName", inputComponentName.value)
    })

    inputArtworkName.addEventListener("input", function () {
        sessionStorage.setItem("inputArtworkName", inputArtworkName.value)
    })

    // Add click event listener to the direct button to check layout selection
    document.querySelector(".direct-button-next").addEventListener("click", (event) => {
        if (!inputArtworkName.value.trim() || !inputComponentName.value.trim()) {
            event.preventDefault();
            alert("Please fill out this form");
        }
    });

    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear()
    })
})
