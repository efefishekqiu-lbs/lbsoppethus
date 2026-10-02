document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const menuButton = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
        revealObserver.observe(element);
    });

    const filterButtons = document.querySelectorAll(
        ".filters button"
    );

    const projects = document.querySelectorAll(
        ".project-card"
    );

    function filterProjects(category) {
        filterButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );
        });

        projects.forEach((project) => {
            const shouldShow =
                category === "all" ||
                project.dataset.category === category;

            project.classList.toggle(
                "hidden",
                !shouldShow
            );
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterProjects(
                button.dataset.filter
            );
        });
    });

    document
        .querySelectorAll(".program-card")
        .forEach((card) => {
            card.addEventListener("click", () => {
                const category = card.dataset.filter;

                filterProjects(category);

                document
                    .querySelector("#projekt")
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            });

            const button = card.querySelector("button");

            button.addEventListener("click", (event) => {
                event.stopPropagation();

                const category = card.dataset.filter;

                filterProjects(category);

                document
                    .querySelector("#projekt")
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            });
        });

    const roomText = document.querySelector("#roomText");

    const roomDescriptions = {
        entrance:
            "Börja här. Vi hjälper dig att hitta rätt under öppet hus.",

        tech:
            "Här hittar du AI, webbutveckling, programmering och spelutveckling.",

        estet:
            "Här hittar du grafisk design, foto, film, musikproduktion och spelgrafik."
    };

    function selectRoom(room) {
        document
            .querySelectorAll(".map-room")
            .forEach((element) => {
                element.classList.toggle(
                    "active",
                    element.dataset.room === room
                );
            });

        document
            .querySelectorAll(".find-item")
            .forEach((element) => {
                element.classList.toggle(
                    "active",
                    element.dataset.room === room
                );
            });

        roomText.textContent =
            roomDescriptions[room];
    }

    document
        .querySelectorAll(".map-room, .find-item")
        .forEach((element) => {
            element.addEventListener("click", () => {
                selectRoom(
                    element.dataset.room
                );
            });
        });

    const modal = document.querySelector(
        ".project-modal"
    );

    const modalTitle = document.querySelector(
        "#modalTitle"
    );

    const modalType = document.querySelector(
        "#modalType"
    );

    const modalDescription = document.querySelector(
        "#modalDescription"
    );

    const modalTech = document.querySelector(
        "#modalTech"
    );

    function openProject(project) {
        modalTitle.textContent =
            project.dataset.title;

        modalType.textContent =
            `[ ${project.dataset.type.toUpperCase()} ]`;

        modalDescription.textContent =
            project.dataset.description;

        modalTech.textContent =
            project.dataset.tech;

        modal.classList.add("active");
        body.classList.add("lock");
    }

    function closeProject() {
        modal.classList.remove("active");
        body.classList.remove("lock");
    }

    projects.forEach((project) => {
        project.addEventListener("click", () => {
            openProject(project);
        });
    });

    document
        .querySelector(".modal-close")
        .addEventListener(
            "click",
            closeProject
        );

    document
        .querySelector(".modal-overlay")
        .addEventListener(
            "click",
            closeProject
        );

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeProject();

                mobileMenu.classList.remove(
                    "active"
                );
            }
        }
    );
});

document.querySelectorAll('.present-art,.tilt-3d').forEach(el=>{
    el.style.transition='transform .15s ease';
    el.style.transformStyle='preserve-3d';
    el.style.willChange='transform';
  
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
  
      el.style.transition='transform .05s linear';
      el.style.transform=`perspective(800px) rotateX(${-y*20}deg) rotateY(${x*20}deg) scale(1.03)`;
    });
  
    el.addEventListener('mouseleave',()=>{
      el.style.transition='transform .4s ease';
      el.style.transform='perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
})