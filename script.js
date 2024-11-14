var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset();  
          setTimeout(function () {
            status.innerHTML = ""; 
           
            location.reload(); 
          }, 2000);
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form";
            }
          });
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
    }
  
    form.addEventListener("submit", handleSubmit);

    
    let ecommerceIndex = 1;
    let calculatorIndex = 1;

    function showSlides(index, project) {
      let slides;
      if (project === 'ecommerce') {
        slides = document.querySelectorAll('.project-card:first-child .slide');
        ecommerceIndex = index;
      } else if (project === 'calculator') {
        slides = document.querySelectorAll('.project-card:last-child .slide');
        calculatorIndex = index;
      }
      if (index > slides.length) {
        index = 1;
        if (project === 'ecommerce') ecommerceIndex = 1;
        else calculatorIndex = 1;
      }
      if (index < 1) {
        index = slides.length;
        if (project === 'ecommerce') ecommerceIndex = slides.length;
        else calculatorIndex = slides.length;
      }
      slides.forEach(slide => slide.style.display = 'none');
      slides[index - 1].style.display = 'block';
    }
    function changeSlide(n, project) {
      if (project === 'ecommerce') {
        showSlides(ecommerceIndex += n, 'ecommerce');
      } else if (project === 'calculator') {
        showSlides(calculatorIndex += n, 'calculator');
      }
    }
    showSlides(1, 'ecommerce');
    showSlides(1, 'calculator');

    
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      alert('Your message has been sent successfully!');
      form.reset();
    }).catch(() => {
      alert('There was an error. Please try again.');
    });
  });
