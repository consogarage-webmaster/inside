document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach($modal => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach($trigger => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
    ) || []
  ).forEach($close => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });

  // TABS
  const TABS = [...document.querySelectorAll('#tabs li')];
  const CONTENT = [...document.querySelectorAll('#tab-content>div')];
  console.log(TABS);
  const ACTIVE_CLASS = 'is-active';

  function initTabs() {
    TABS.forEach(tab => {
      tab.addEventListener('click', e => {
        let selected = tab.getAttribute('data-tab');
        updateActiveTab(tab);
        updateActiveContent(selected);
      });
    });
  }

  function updateActiveTab(selected) {
    TABS.forEach(tab => {
      if (tab && tab.classList.contains(ACTIVE_CLASS)) {
        tab.classList.remove(ACTIVE_CLASS);
      }
    });
    selected.classList.add(ACTIVE_CLASS);
  }

  function updateActiveContent(selected) {
    CONTENT.forEach(item => {
      if (item && item.classList.contains(ACTIVE_CLASS)) {
        item.classList.remove(ACTIVE_CLASS);
      }
      let data = item.getAttribute('data-content');
      if (data === selected) {
        item.classList.add(ACTIVE_CLASS);
      }
    });
  }

  initTabs();
});

// Dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    trigger.addEventListener('click', () => {
      dropdown.classList.toggle('is-active');
    });
  });

  document.addEventListener('click', event => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-active');
      }
    });
  });
});
