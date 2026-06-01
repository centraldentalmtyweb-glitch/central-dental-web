document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navbar Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close nav on click link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // Sticky Header logic
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Services Modals Data & Logic ---
  const servicesData = {
    general: {
      title: "Odontología Integral",
      description: "Servicios de prevención y mantenimiento de la salud oral. Incluye diagnósticos completos con radiografías, limpiezas regulares, obturaciones con resinas estéticas de alta durabilidad y tratamientos preventivos con flúor o selladores.",
      duration: "45 - 60 minutos",
      frequency: "Recomendado cada 6 meses",
      price: "$800 MXN",
      image: "assets/general_modal.jpg"
    },
    ortodoncia: {
      title: "Ortodoncia Avanzada",
      description: "Alineación de dientes y corrección de mordida utilizando brackets metálicos tradicionales, brackets cerámicos (estéticos) o alineadores invisibles de última generación. Tratamiento personalizado supervisado por ortodoncistas calificados.",
      duration: "12 a 24 meses (visitas de 30 min)",
      frequency: "Citas mensuales de ajuste",
      price: "Desde $1,800 MXN al mes",
      image: "assets/orto_modal.jpg"
    },
    endodoncia: {
      title: "Endodoncia Especializada",
      description: "Tratamiento de conductos diseñado para salvar piezas dentales gravemente dañadas o infectadas, eliminando el dolor y la inflamación de la pulpa dental de forma segura y cómoda bajo anestesia local.",
      duration: "1 a 2 sesiones de 60 min",
      frequency: "Procedimiento único",
      price: "Desde $3,500 MXN",
      image: "assets/endo_modal.jpg"
    },
    estetica: {
      title: "Odontología Estética",
      description: "Procedimientos diseñados para embellecer tu sonrisa. Incluye blanqueamiento dental clínico de alta intensidad, carillas de resina o porcelana ultrafinas para corregir imperfecciones de forma y color, y coronas de zirconio libre de metal.",
      duration: "45 a 90 minutos",
      frequency: "Blanqueamiento: cada 12-18 meses",
      price: "Desde $2,500 MXN",
      image: "assets/estetica_modal.jpg"
    },
    maxilofacial: {
      title: "Cirugía Maxilofacial e Implantes",
      description: "Extracciones de terceros molares (muelas del juicio) complejas, colocación de implantes dentales de titanio para reemplazar dientes perdidos y cirugías correctivas de tejidos blandos y óseos bajo estrictos protocolos estériles.",
      duration: "60 - 90 minutos",
      frequency: "Varía según el tratamiento",
      price: "Desde $4,000 MXN",
      image: "assets/cirugia_modal.jpg"
    },
    urgencias: {
      title: "Atención de Urgencias 24/7",
      description: "Atención inmediata para dolores agudos de muelas, fracturas dentales accidentales, desprendimiento de coronas, inflamación severa o abscesos. Priorizamos tu cita para aliviar el malestar el mismo día.",
      duration: "30 - 60 minutos",
      frequency: "Atención inmediata",
      price: "Valoración desde $500 MXN",
      image: "assets/urgencias_modal.jpg"
    }
  };

  const modalOverlay = document.getElementById('serviceModal');
  const modalBanner = modalOverlay.querySelector('.modal-banner');
  const modalTitle = modalOverlay.querySelector('.modal-banner h3');
  const modalText = modalOverlay.querySelector('.modal-text');
  const modalDuration = document.getElementById('modal-duration');
  const modalFrequency = document.getElementById('modal-frequency');
  const modalPrice = document.getElementById('modal-price');
  const modalClose = modalOverlay.querySelector('.modal-close');
  const modalBookBtn = document.getElementById('modal-book-btn');

  // Open Modal function
  window.openServiceModal = function(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalText.textContent = data.description;
    modalDuration.textContent = data.duration;
    modalFrequency.textContent = data.frequency;
    modalPrice.textContent = data.price;
    modalBanner.style.backgroundImage = `url('${data.image}')`;
    
    // Config booking button action in modal
    modalBookBtn.onclick = () => {
      closeServiceModal();
      document.getElementById('citas').scrollIntoView({ behavior: 'smooth' });
      // Select appropriate service in form
      const selectElement = document.getElementById('appointment-service');
      if (selectElement) {
        selectElement.value = serviceKey;
      }
    };

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeServiceModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeServiceModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeServiceModal();
  });

  // --- Before/After Whitening Slider ---
  const sliderInput = document.getElementById('whitening-slider');
  const afterImage = document.querySelector('.slider-image.after');
  const sliderHandle = document.querySelector('.slider-handle');

  if (sliderInput && afterImage && sliderHandle) {
    sliderInput.addEventListener('input', (e) => {
      const position = e.target.value;
      afterImage.style.width = `${position}%`;
      sliderHandle.style.left = `${position}%`;
    });
  }



  // --- Reviews Carousel ---
  const reviewsTrack = document.getElementById('reviews-track');
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  
  let currentSlide = 0;
  const slideCount = reviewCards.length;
  let autoplayTimer;

  // Create dot indicators
  if (dotsContainer) {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    if (!reviewsTrack) return;
    reviewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  if (reviewsTrack) {
    startAutoplay();
  }

  // --- Interactive Booking Form with LocalStorage & Validation ---
  const bookingForm = document.getElementById('booking-form');
  const bookingCard = document.querySelector('.booking-card');
  const successMessage = document.querySelector('.success-message');
  
  const apptDate = document.getElementById('appointment-date');
  const apptTime = document.getElementById('appointment-time');

  // Limit date inputs: Minimum date is today, Maximum is 3 months from now
  if (apptDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    apptDate.setAttribute('min', minDateStr);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const max_yyyy = maxDate.getFullYear();
    const max_mm = String(maxDate.getMonth() + 1).padStart(2, '0');
    const max_dd = String(maxDate.getDate()).padStart(2, '0');
    const maxDateStr = `${max_yyyy}-${max_mm}-${max_dd}`;
    apptDate.setAttribute('max', maxDateStr);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('appointment-name').value.trim();
      const phone = document.getElementById('appointment-phone').value.trim();
      const service = document.getElementById('appointment-service').value;
      const dateVal = apptDate.value;
      const timeVal = apptTime.value;
      const comments = document.getElementById('appointment-comments').value.trim();

      // Form validation
      if (!name || !phone || !service || !dateVal || !timeVal) {
        alert('Por favor complete todos los campos obligatorios.');
        return;
      }

      // Check if selected date is a Sunday (Sunday = 0 in JS, but input returns YYYY-MM-DD local time)
      // Note: we parsed date split to avoid timezone offsets
      const dateParts = dateVal.split('-');
      const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      if (dateObj.getDay() === 0) {
        alert('Lo sentimos, la clínica está cerrada los domingos. Por favor seleccione un día de lunes a sábado.');
        return;
      }

      // Verify time schedule: 10:00 to 19:00 Mon-Fri, 10:00 to 18:00 Sat
      const timeParts = timeVal.split(':');
      const hour = parseInt(timeParts[0]);
      const minute = parseInt(timeParts[1]);
      
      const isSaturday = dateObj.getDay() === 6;
      const hourLimit = isSaturday ? 18 : 19;
      
      if (hour < 10 || hour > hourLimit || (hour === hourLimit && minute > 0)) {
        const scheduleStr = isSaturday ? "10:00 AM a 6:00 PM" : "10:00 AM a 7:00 PM";
        alert(`Lo sentimos, el horario de atención para el día seleccionado es de ${scheduleStr}. Por favor elija otra hora.`);
        return;
      }

      // Save appointment details in LocalStorage
      const appointmentId = 'CD-' + Math.floor(100000 + Math.random() * 900000);
      const newAppointment = {
        id: appointmentId,
        name,
        phone,
        service,
        date: dateVal,
        time: timeVal,
        comments,
        createdAt: new Date().toISOString()
      };

      // Get existing appointments
      const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      savedAppointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(savedAppointments));

      // Show confirmation
      bookingForm.style.display = 'none';
      successMessage.style.display = 'flex';

      // Populate success view details
      document.getElementById('confirm-id').textContent = appointmentId;
      document.getElementById('confirm-service').textContent = document.querySelector(`#appointment-service option[value="${service}"]`).textContent;
      
      // Format date beautifully
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('confirm-date').textContent = dateObj.toLocaleDateString('es-MX', options);
      document.getElementById('confirm-time').textContent = timeVal + ' hrs';

      // Config WhatsApp confirm button
      const whatsappBtn = document.getElementById('confirm-whatsapp-btn');
      if (whatsappBtn) {
        const formattedDate = dateObj.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
        const textMessage = `Hola Central Dental, agendé una cita en su página web:\n\n*Folio:* ${appointmentId}\n*Nombre:* ${name}\n*Servicio:* ${newAppointment.service}\n*Fecha:* ${formattedDate}\n*Hora:* ${timeVal} hrs.\n\nQuedo a la espera de su confirmación. ¡Muchas gracias!`;
        const encodedText = encodeURIComponent(textMessage);
        whatsappBtn.href = `https://wa.me/528113200894?text=${encodedText}`;
      }
    });

    // Reset Form button action (book another appointment)
    const resetBookingBtn = document.getElementById('reset-booking-btn');
    if (resetBookingBtn) {
      resetBookingBtn.addEventListener('click', () => {
        bookingForm.reset();
        successMessage.style.display = 'none';
        bookingForm.style.display = 'block';
      });
    }
  }

  // --- Leaflet Map Integration ---
  // Coordinates for Central Dental Monterrey (Av. Cuauhtémoc 720, Centro)
  const clinicCoords = [25.6805, -100.3183];
  
  if (document.getElementById('map')) {
    // Initialize leaflet map
    const map = L.map('map', {
      scrollWheelZoom: false
    }).setView(clinicCoords, 16);

    // Load OpenStreetMap Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Icon or Styled Circle Marker
    const marker = L.marker(clinicCoords).addTo(map);
    
    marker.bindPopup(`
      <div style="font-family: 'Outfit', sans-serif; padding: 5px; min-width: 200px;">
        <h4 style="margin: 0 0 5px 0; color: #B95F95; font-size: 16px; font-weight: 700;">Central Dental</h4>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #585C61; line-height: 1.4;">Av. Cuauhtémoc 720, Centro, Monterrey</p>
        <a href="https://www.google.com/maps/search/?api=1&query=Central+Dental+Av.+Cuauhtemoc+720+Monterrey" target="_blank" rel="noopener" style="display: inline-block; background-color: #B95F95; color: #fff; text-decoration: none; padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-align: center; margin-top: 5px; width: 100%; transition: background-color 0.2s;">
          <i class="fa-solid fa-map-location-dot"></i> Abrir en Google Maps
        </a>
      </div>
    `).openPopup();
  }
});
