// NAV MENU
var container = document.querySelector('#site-navigation-menu');
var button = document.querySelector('#site-navigation-menu-button');
var text = document.querySelector('#site-navigation-menu-button-text');

delete container.dataset.jsInactive;
button.removeAttribute('hidden');
button.setAttribute('aria-expanded', 'false');

button.addEventListener('click', function(event) {
	if(button.getAttribute('aria-expanded') === 'true') {
		button.setAttribute('aria-expanded', 'false');
		text.textContent = 'Open menu';
	}
	else {
		button.setAttribute('aria-expanded', 'true');
		text.textContent = 'Close menu';
	}
});





// ANIMATIONS TOGGLE
var body = document.querySelector('body');
var toggle = document.querySelector('#site-animations-toggle');
var checkbox = toggle.querySelector('input');
var storedPreference = localStorage.getItem('prefersReducedMotion');
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateMotionPreferences() {
	if (checkbox.checked) {
		body.dataset.prefersReducedMotion = 'no-preference';
		localStorage.setItem('prefersReducedMotion', 'no-preference');
	}
	else {
		body.dataset.prefersReducedMotion = 'reduce';
		localStorage.setItem('prefersReducedMotion', 'reduce');
	}
}

// Honour previously set preferences
if (storedPreference != null) {
	storedPreference == 'reduce' ? checkbox.checked = false : checkbox.checked = true;
}
// Honour system preferences if no stored preference
else {
	prefersReducedMotion ? checkbox.checked = false : checkbox.checked = true;
}

// Act on preferences
checkbox.checked ? body.dataset.prefersReducedMotion = 'no-preference' : body.dataset.prefersReducedMotion = 'reduce';

// Listen for switches
toggle.addEventListener('change', updateMotionPreferences);

// Show toggle
toggle.removeAttribute('hidden');