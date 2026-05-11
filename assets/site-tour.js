document.addEventListener('DOMContentLoaded', () => {
  const tourButton = document.getElementById('site-tour-start');
  if (!tourButton) return;

  const steps = [
    {
      title: 'Welcome section',
      description: 'This is the homepage introduction for DH101. It sets the tone for the semester and explains what you will explore here.',
      selector: '.header-section',
    },
    {
      title: 'Weeks section',
      description: 'Browse the weekly project pages from here. Each week contains an artifact, reflection, and analysis of the work.',
      selector: '.card-section:nth-of-type(1)',
    },
    {
      title: 'Pages section',
      description: 'Access course pages like About, Accessibility, AI usage, and sustainability content from here.',
      selector: '.card-section:nth-of-type(2)',
    },
    {
      title: 'Navigation button',
      description: 'Use the top navigation button to return to the homepage from other pages at any time.',
      selector: '.home-nav',
    },
    {
      title: 'Interactive content',
      description: 'Explore the weekly project pages to find interactive content, games, and hands-on experiments as you move through the course.',
      selector: '.card-section:nth-of-type(1)',
    },
  ];

  let currentStep = 0;
  let activeHighlight = null;

  const overlay = document.createElement('div');
  overlay.className = 'tour-overlay';
  document.body.appendChild(overlay);

  const tooltip = document.createElement('div');
  tooltip.className = 'tour-tooltip';
  tooltip.innerHTML = `
    <h3 id="tour-title"></h3>
    <p id="tour-description"></p>
    <div class="tour-actions">
      <button type="button" id="tour-back" class="tour-btn-secondary">Back</button>
      <button type="button" id="tour-next" class="tour-btn-primary">Next</button>
      <button type="button" id="tour-close" class="tour-btn-secondary">Close</button>
    </div>
  `;
  document.body.appendChild(tooltip);

  const titleEl = tooltip.querySelector('#tour-title');
  const descriptionEl = tooltip.querySelector('#tour-description');
  const backButton = tooltip.querySelector('#tour-back');
  const nextButton = tooltip.querySelector('#tour-next');
  const closeButton = tooltip.querySelector('#tour-close');

  const setTourStep = (index) => {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    const step = steps[currentStep];
    const target = document.querySelector(step.selector);

    if (!target) return;

    if (activeHighlight) {
      activeHighlight.classList.remove('tour-highlight');
    }

    activeHighlight = target;
    activeHighlight.classList.add('tour-highlight');

    titleEl.textContent = step.title;
    descriptionEl.textContent = step.description;

    backButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next';

    positionTooltip(target);
  };

  const positionTooltip = (target) => {
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const padding = 16;

    let top = rect.bottom + padding;
    let left = rect.left;
    let maxLeft = window.innerWidth - tooltipRect.width - padding;

    if (top + tooltipRect.height > window.innerHeight) {
      top = rect.top - tooltipRect.height - padding;
    }

    if (left > maxLeft) {
      left = maxLeft;
    }

    if (left < padding) {
      left = padding;
    }

    if (top < padding) {
      top = padding;
    }

    tooltip.style.top = `${top + window.scrollY}px`;
    tooltip.style.left = `${left + window.scrollX}px`;
    tooltip.classList.add('visible');
  };

  const openTour = () => {
    document.body.classList.add('tour-active');
    overlay.classList.add('active');
    tooltip.classList.add('visible');
    setTourStep(0);
    window.addEventListener('resize', updateTooltipPosition);
    window.addEventListener('scroll', updateTooltipPosition);
  };

  const closeTour = () => {
    document.body.classList.remove('tour-active');
    overlay.classList.remove('active');
    tooltip.classList.remove('visible');
    if (activeHighlight) {
      activeHighlight.classList.remove('tour-highlight');
      activeHighlight = null;
    }
    window.removeEventListener('resize', updateTooltipPosition);
    window.removeEventListener('scroll', updateTooltipPosition);
  };

  const updateTooltipPosition = () => {
    if (!steps[currentStep]) return;
    const target = document.querySelector(steps[currentStep].selector);
    if (!target) return;
    positionTooltip(target);
  };

  tourButton.addEventListener('click', openTour);
  backButton.addEventListener('click', () => setTourStep(currentStep - 1));
  nextButton.addEventListener('click', () => {
    if (currentStep === steps.length - 1) {
      closeTour();
    } else {
      setTourStep(currentStep + 1);
    }
  });
  closeButton.addEventListener('click', closeTour);
  overlay.addEventListener('click', closeTour);
});
