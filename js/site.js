var toggle = document.querySelector('#site-animations-toggle');
var checkbox = toggle.querySelector('input');
var storedPreference = localStorage.getItem('prefersReducedMotion');
var mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateToggle() {
	checkbox.checked ? toggle.dataset.checked = 'true' : toggle.dataset.checked = 'false';
}

// Honour previously set preferences
if (storedPreference != null) {
	storedPreference == 'reduce' ? checkbox.checked = false : checkbox.checked = true;
}
// Honour system preferences
else {
	mediaQueryList.matches ? checkbox.checked = false : checkbox.checked = true;
}

// Initialise toggle
updateToggle();

// Listen for switches
toggle.addEventListener('change', function() {
	function setPreference(preference) {
		localStorage.setItem('prefersReducedMotion', preference);
	}
	checkbox.checked ? setPreference('no-preference') : setPreference('reduce');
	updateToggle();
})





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
		text.textContent = 'Open';
	}
	else {
		container.dataset.open = 'true';
		button.setAttribute('aria-expanded', 'true');
		text.textContent = 'Close';
	}
});