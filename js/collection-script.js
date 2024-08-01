document.addEventListener("DOMContentLoaded", () => {
    // Add click event listener to the logo to clear sessionStorage
    document.getElementById("logo-link").addEventListener("click", () => {
        sessionStorage.clear();
    });
})
//function selectImage
function selectImage(imageName) {
    sessionStorage.setItem('selectedImage', imageName);
}