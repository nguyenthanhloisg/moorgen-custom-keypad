document.addEventListener("DOMContentLoaded", () => {
    // Lấy các giá trị từ sessionStorage
    const selectedProtocol = sessionStorage.getItem("selectedProtocol")
    const inputArtworkName = sessionStorage.getItem("inputArtworkName")
    const inputComponentName = sessionStorage.getItem("inputComponentName")
    const selectedImage = sessionStorage.getItem("selectedImage");


    const outputImage = sessionStorage.getItem("outputImage")
    const imageElement = document.getElementById("output-image")

    if (!selectedImage) {
        alert("You haven't chosen the type of keypad yet\nPlease go to start page");
        window.location.href = "../";
    }

    // Thực hiện điều kiện và cập nhật nội dung các div
    if (selectedProtocol === "Mobus") {
        document.getElementById("protocol-name").innerHTML = "Protocol: Mobus"
    } else if (selectedProtocol === "KNX") {
        document.getElementById("protocol-name").innerHTML = "Protocol: KNX"
    } else if (selectedProtocol === "Other") {
        document.getElementById("protocol-name").innerHTML = "Protocol: Other"}

    if(outputImage){
        imageElement.src = outputImage
    }

    document.getElementById('button-download').addEventListener('click', function() {
        const image = document.getElementById('output-image');
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'Artwork.png'; // Tên file khi tải về
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Cập nhật nội dung cho artwork-name và component-name
    if (inputArtworkName) {
        document.getElementById("artwork-name").innerHTML = inputArtworkName
    }

    if (inputComponentName) {
        document.getElementById("component-name").innerHTML = "Component ID: " + inputComponentName
    }
    // Add click event listener to the logo to clear sessionStorage
    ["logo-link", "button-reset"].forEach(id => {
        document.getElementById(id).addEventListener("click", () => sessionStorage.clear())
    })
})
