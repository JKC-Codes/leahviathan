// NAV MENU
var container = document.querySelector('#site-nav');
var button = document.querySelector('#site-nav-button');
var text = document.querySelector('#site-nav-button-text');
button.removeAttribute('hidden');

delete container.dataset.javascriptActive;
container.dataset.open = 'false';
button.setAttribute('aria-expanded', 'false');

button.addEventListener('click', function(event) {
	if(button.getAttribute('aria-expanded') === 'true') {
		container.dataset.open = 'false';
		button.setAttribute('aria-expanded', 'false');
		text.textContent = 'Open menu';
	}
	else {
		container.dataset.open = 'true';
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
	function setPreference(preference) {
		localStorage.setItem('prefersReducedMotion', preference);
	}
	checkbox.checked ? setPreference('no-preference') : setPreference('reduce');
})

// Show toggle
toggle.removeAttribute('hidden');