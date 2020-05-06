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
var toggle = document.querySelector('#site-animations-toggle');
var checkbox = toggle.querySelector('input');
var storedPreference = localStorage.getItem('prefersReducedMotion');
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Honour previously set preferences
if (storedPreference != null) {
	storedPreference == 'reduce' ? checkbox.checked = false : checkbox.checked = true;
}
// Honour system preferences if no stored preference
else {
	prefersReducedMotion ? checkbox.checked = false : checkbox.checked = true;
}

// Listen for switches
toggle.addEventListener('change', function() {
	if (checkbox.checked) {
		localStorage.setItem('prefersReducedMotion', 'no-preference');
	}
	else {
		localStorage.setItem('prefersReducedMotion', 'reduce');
	}
});

// Show toggle
toggle.removeAttribute('hidden');