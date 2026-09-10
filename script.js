document.addEventListener("DOMContentLoaded", function () {

    const galleryImages =
        document.querySelectorAll(".gallery img");

    const modal =
        document.getElementById("photoModal");

    const modalImage =
        document.getElementById("modalImage");

    const closeModal =
        document.getElementById("closeModal");


    if (!modal || !modalImage || !closeModal) {
        return;
    }


    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            modalImage.src = image.src;

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });



    function closePhotoModal() {

        modal.classList.remove("active");

        modalImage.src = "";

        document.body.style.overflow = "";

    }



    closeModal.addEventListener(
        "click",
        closePhotoModal
    );



    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                closePhotoModal();
            }

        }
    );



    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closePhotoModal();

            }

        }
    );

});