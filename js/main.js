const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
	contactForm.addEventListener('submit', async function (event) {
		event.preventDefault();

		const submitButton = contactForm.querySelector('input[type="submit"]');
		const accessKey = contactForm.querySelector('input[name="access_key"]').value.trim();

		if (!accessKey) {
			formStatus.textContent = 'Falta configurar la access key de Web3Forms para activar el formulario.';
			formStatus.className = 'form-status error';
			return;
		}

		submitButton.disabled = true;
		submitButton.value = 'Enviando...';
		formStatus.textContent = 'Enviando mensaje...';
		formStatus.className = 'form-status';

		try {
			const response = await fetch(contactForm.action, {
				method: 'POST',
				body: new FormData(contactForm)
			});

			const result = await response.json();

			if (response.ok && result.success) {
				formStatus.textContent = 'Mensaje enviado correctamente. Pronto nos pondremos en contacto.';
				formStatus.className = 'form-status success';
				contactForm.reset();
			} else {
				formStatus.textContent = result.message || 'No fue posible enviar el mensaje. Intenta de nuevo.';
				formStatus.className = 'form-status error';
			}
		} catch (error) {
			formStatus.textContent = 'No se pudo conectar con el servicio de formularios. Revisa tu conexion e intenta otra vez.';
			formStatus.className = 'form-status error';
		} finally {
			submitButton.disabled = false;
			submitButton.value = 'Enviar';
		}
	});
}
