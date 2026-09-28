document.addEventListener('DOMContentLoaded', () => {
    const projectTabs = Array.from(document.querySelectorAll('.project-tab'));
    const projectPanels = Array.from(document.querySelectorAll('.project-panel'));
    const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
    const revealElements = document.querySelectorAll('.hero-copy, .hero-panel, .info-card, .project-list, .project-panel, .contact-copy, .contact-form');

    const activateProject = (projectId) => {
        projectTabs.forEach((tab) => {
            const isActive = tab.dataset.project === projectId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        projectPanels.forEach((panel) => {
            const isActive = panel.id === `project-${projectId}`;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    };

    projectTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateProject(tab.dataset.project));
        tab.addEventListener('keydown', (event) => {
            const moveNext = event.key === 'ArrowDown' || event.key === 'ArrowRight';
            const movePrev = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
            const activateCurrent = event.key === 'Enter' || event.key === ' ';

            if (activateCurrent) {
                event.preventDefault();
                activateProject(tab.dataset.project);
                return;
            }

            if (!moveNext && !movePrev) {
                return;
            }

            event.preventDefault();
            const nextIndex = moveNext
                ? (index + 1) % projectTabs.length
                : (index - 1 + projectTabs.length) % projectTabs.length;

            projectTabs[nextIndex].focus();
            activateProject(projectTabs[nextIndex].dataset.project);
        });
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealElements.forEach((element) => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add('reveal');
            element.classList.add('is-visible');
        });
    }

    if ('IntersectionObserver' in window) {
        const sections = Array.from(document.querySelectorAll('main section[id]'));
        const visibleSections = new Map();
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections.set(entry.target.id, entry.intersectionRatio);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            const currentSection = [...visibleSections.entries()]
                .sort((a, b) => b[1] - a[1])[0]?.[0];

            if (!currentSection) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
            });
        }, { threshold: [0.2, 0.45, 0.7] });

        sections.forEach((section) => navObserver.observe(section));
    }
});
