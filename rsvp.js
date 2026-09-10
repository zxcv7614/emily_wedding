document.addEventListener(
    "DOMContentLoaded",
    function () {


        const form =
            document.getElementById("rsvpForm");


        const successMessage =
            document.getElementById(
                "successMessage"
            );


        const submitButton =
            document.getElementById(
                "submitButton"
            );


        const attendanceInputs =
            document.querySelectorAll(
                'input[name="attendance"]'
            );


        const guestGroup =
            document.getElementById(
                "guestGroup"
            );


        /*
        ========================================
        GOOGLE APPS SCRIPT URL

        아래 URL을 본인의
        Google Apps Script Web App URL로
        변경하세요.
        ========================================
        */

        const GOOGLE_SCRIPT_URL =
            "YOUR_GOOGLE_APPS_SCRIPT_URL";



        // =========================
        // ATTENDANCE
        // =========================

        attendanceInputs.forEach(
            function (input) {

                input.addEventListener(
                    "change",
                    function () {

                        if (
                            input.value ===
                            "불참" &&
                            input.checked
                        ) {

                            guestGroup.style.display =
                                "none";

                        } else if (
                            input.value ===
                            "참석" &&
                            input.checked
                        ) {

                            guestGroup.style.display =
                                "block";

                        }

                    }
                );

            }
        );



        // =========================
        // SUBMIT
        // =========================

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const attendance =
                    formData.get(
                        "attendance"
                    );


                const data = {

                    name:
                        formData.get(
                            "name"
                        ),

                    side:
                        formData.get(
                            "side"
                        ),

                    attendance:
                        attendance,

                    guests:
                        attendance === "참석"
                            ? formData.get("guests")
                            : "0",

                    message:
                        formData.get(
                            "message"
                        ),

                    timestamp:
                        new Date()
                            .toLocaleString()

                };


                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "전달 중...";


                try {


                    await fetch(
                        GOOGLE_SCRIPT_URL,
                        {

                            method:
                                "POST",

                            mode:
                                "no-cors",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    data
                                )

                        }
                    );


                    form.style.display =
                        "none";


                    successMessage
                        .classList
                        .add(
                            "active"
                        );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });


                } catch (error) {


                    console.error(
                        error
                    );


                    alert(
                        "전송 중 오류가 발생했습니다. 다시 시도해 주세요."
                    );


                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        "참석 여부 전달하기";

                }


            }
        );


    }
);