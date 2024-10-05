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
        saveElementAsImage('output-image__outside');
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

function saveElementAsImage(elementId) {
    const inputImage = document.getElementById(elementId);
    const button = document.getElementById('button-download');
    
    // Ẩn button trước khi tạo hình ảnh
    button.style.display = 'none';
    
    html2canvas(inputImage, {dpi: 192, scale: 2, useCORS: true}).then(function(canvas) {
        const imgData = canvas.toDataURL("image/png", 1.0); // Chất lượng cao nhất
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'Artwork.png'; // Tên file khi tải về
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Hiển thị lại button sau khi hình ảnh đã được tạo
        button.style.display = 'block';
    });
}
