/* =========================================================
   PRIYANSHU PORTFOLIO — SCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.textContent =
            navLinks.classList.contains("active")
                ? "✕"
                : "☰";

    });


    // Close menu after clicking a link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/* =========================================================
   360° PROFILE ROTATION
========================================================= */

const profileCard =
    document.querySelector(".profile-card");

const rotateBtn =
    document.querySelector("#rotateBtn");


let isRotated = false;


if (rotateBtn && profileCard) {

    rotateBtn.addEventListener("click", () => {

        isRotated = !isRotated;

        if (isRotated) {

            profileCard.style.transform =
                "rotateY(180deg)";

            rotateBtn.innerHTML =
                "↻ Show Profile";

        } else {

            profileCard.style.transform =
                "rotateY(0deg)";

            rotateBtn.innerHTML =
                "↻ Rotate 360°";

        }

    });

}


/* =========================================================
   MOUSE 3D PROFILE EFFECT
========================================================= */

const profileScene =
    document.querySelector(".profile-scene");


if (profileScene && profileCard) {

    profileScene.addEventListener(
        "mousemove",
        (event) => {

            // Don't disturb the back/front rotation

            if (isRotated) return;


            const rect =
                profileScene.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -7;


            const rotateY =
                ((x - centerX) / centerX) * 7;


            profileCard.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    profileScene.addEventListener(
        "mouseleave",
        () => {

            if (!isRotated) {

                profileCard.style.transform =
                    "rotateX(0deg) rotateY(0deg)";

            }

        }
    );

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .experience-card, .education-card, .skills-card, .feature-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-reveal"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================================================
   NUMBER COUNTER
========================================================= */

function animateNumber(
    element,
    target,
    suffix = ""
) {

    let current = 0;

    const duration = 1200;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        current =
            Math.floor(
                progress * target
            );


        element.textContent =
            current + suffix;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   STAT COUNTER OBSERVER
========================================================= */

const stats =
    document.querySelectorAll(
        ".stat strong"
    );


let statsAnimated = false;


const statsObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !statsAnimated
                ) {

                    statsAnimated = true;


                    if (stats[0]) {

                        animateNumber(
                            stats[0],
                            4,
                            "+"
                        );

                    }


                    if (stats[1]) {

                        stats[1].textContent =
                            "1–8";

                    }


                    if (stats[2]) {

                        animateNumber(
                            stats[2],
                            4,
                            ""
                        );

                    }


                    statsObserver.disconnect();

                }

            });

        },
        {
            threshold: 0.7
        }
    );


if (stats.length) {

    statsObserver.observe(
        stats[0]
    );

}


/* =========================================================
   SMOOTH BUTTON HOVER
========================================================= */

document
    .querySelectorAll(".btn")
    .forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                button.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                button.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);