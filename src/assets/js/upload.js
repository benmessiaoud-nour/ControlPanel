(function () {
    const uploaders = document.querySelectorAll(".js-upload");

    Array.from(uploaders, uploader => {
        const upload = uploader.querySelector(".js-upload-value"),
            placeholder = uploader.querySelector(".js-upload-placeholder"),
            remove = uploader.querySelector(".js-upload-remove");

        upload.addEventListener("change", function (event) {
            const img = this.files[0];

            // Check if a file is selected
            if (!img) {
                console.error("No file selected");
                return;
            }

            // Check if the selected file is indeed a Blob (File)
            if (!(img instanceof Blob)) {
                console.error("Selected file is not a Blob or File");
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(img);

            reader.onloadend = () => {
                uploader.classList.add("has-image");
                placeholder.src = reader.result;
            }

            reader.onerror = () => {
                console.error("There was an error reading the file");
            }
        });

        remove.addEventListener("click", e => {
            upload.value = null;
            uploader.classList.remove("has-image");
            placeholder.src = "";
        });
    });
})();