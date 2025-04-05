$(document).ready(function(){

    // Smooth Scrolling Functionality
    $('a.nav-link[href^="#"], a.navbar-brand[href^="#"], a.btn[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            var navHeight = $('.navbar').outerHeight() || 60;
            $('html, body').stop().animate({
                scrollTop: target.offset().top - navHeight
            }, 800); // Duration of the scroll animation

            // Close the navbar collapse on click (for mobile)
            if($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').trigger('click');
            }
        }
    });

    // Bootstrap Form Validation Initialization
    $("#contactForm").submit(function(event) {
        var form = this;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          // Optional: Add feedback or focus on first invalid field
        } else {
           // Optional: Add code here to handle successful submission (e.g., AJAX call, success message)
           // For demonstration, we'll just log it and prevent default for now
           console.log("Form seems valid, would submit here.");
           event.preventDefault();
           alert("Message Sent (Simulated)!");
           form.reset(); // Reset form fields
           $(form).removeClass('was-validated'); // Reset validation state
        }
        $(form).addClass('was-validated');
    });

    // Initialize Bootstrap Scrollspy
    // Make sure the offset matches or is slightly more than the navbar height
    $('body').scrollspy({ target: '#navbarNav', offset: 70 });

    // Intersection Observer for Scroll Animations
    const animatedElements = $('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add small delay to adding class for better visual effect
                    setTimeout(() => {
                         $(entry.target).addClass('is-visible');
                    }, 100); // 100ms delay
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -50px 0px', // Trigger a bit before element is fully in view
            threshold: 0.1 // 10% visibility needed
        });

        animatedElements.each(function() {
            observer.observe(this);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.addClass('is-visible');
    }

    // Initial animation for elements already in view on load (optional but good)
     $('.animate-on-load').each(function() {
        $(this).addClass('is-visible'); // Use the same visibility class
     });

});