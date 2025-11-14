document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear()

  // Custom cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      cursorOutline.style.left = `${posX}px`
      cursorOutline.style.top = `${posY}px`
    })

    // Cursor hover effects
    const hoverElements = document.querySelectorAll("a, button, .btn, .filter-btn")
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "scale(2)"
        cursorOutline.style.transform = "scale(1.5)"
      })

      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "scale(1)"
        cursorOutline.style.transform = "scale(1)"
      })
    })
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    // Save preference to localStorage
    const isDarkMode = body.classList.contains("dark-mode")
    localStorage.setItem("darkMode", isDarkMode)
  })

  // Check for saved theme preference
  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode")
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Animate progress bars when skills section comes into view
  const skillsSection = document.querySelector(".skills")
  const progressBars = document.querySelectorAll(".progress")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0"

      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
  }

  // Enhanced Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === skillsSection) {
          animateProgressBars()
        }

        // Add animation classes
        entry.target.classList.add("fade-in-up")

        // Animate children elements
        const children = entry.target.querySelectorAll(".detail-item, .skill-item, .portfolio-item, .info-item")
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("slide-in-left")
          }, index * 100)
        })

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg-animation")

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }

    // Header background opacity
    const header = document.querySelector("header")
    const opacity = Math.min(scrolled / 100, 0.95)
    header.style.background = `rgba(255, 255, 255, ${opacity})`

    if (document.body.classList.contains("dark-mode")) {
      header.style.background = `rgba(15, 15, 35, ${opacity})`
    }
  })

  // Enhanced button ripple effect
  function createRipple(event) {
    const button = event.currentTarget
    const circle = document.createElement("span")
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`
    circle.classList.add("ripple")

    const ripple = button.getElementsByClassName("ripple")[0]
    if (ripple) {
      ripple.remove()
    }

    button.appendChild(circle)

    setTimeout(() => {
      circle.remove()
    }, 600)
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn, .filter-btn")
  buttons.forEach((button) => {
    button.addEventListener("click", createRipple)
  })

  // Typing animation for hero subtitle
  const typingElement = document.querySelector(".typing-animation")
  if (typingElement) {
    const text = typingElement.textContent
    typingElement.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          typingElement.style.borderRight = "none"
        }, 1000)
      }
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000)
  }

  // Enhanced form interactions
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })
  })

  // Contact form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = "Message Sent!"
        submitBtn.style.background = "var(--secondary-gradient)"

        // Reset form
        setTimeout(() => {
          this.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          submitBtn.style.background = "var(--primary-gradient)"
        }, 2000)
      }, 1500)
    })
  }

  // Add floating particles effect
  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "vw"
    particle.style.animationDuration = Math.random() * 3 + 2 + "s"
    particle.style.opacity = Math.random()
    particle.style.width = particle.style.height = Math.random() * 4 + 1 + "px"

    document.body.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 5000)
  }

  // Create particles periodically
  setInterval(createParticle, 300)

  // Add CSS for particles
  const particleStyles = `
        .particle {
            position: fixed;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float-up linear infinite;
        }
        
        @keyframes float-up {
            to {
                transform: translateY(-100vh);
                opacity: 0;
            }
        }
    `

  const styleSheet = document.createElement("style")
  styleSheet.textContent = particleStyles
  document.head.appendChild(styleSheet)

  // Profile photo effects
  const profilePhoto = document.querySelector(".profile-photo")
  if (profilePhoto) {
    profilePhoto.addEventListener("mouseenter", () => {
      profilePhoto.style.transform = "scale(1.1)"
      profilePhoto.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)"
    })

    profilePhoto.addEventListener("mouseleave", () => {
      profilePhoto.style.transform = "scale(1)"
      profilePhoto.style.boxShadow = "none"
    })
  }
})

// Add CSS for ripple effect
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`

const rippleStyleSheet = document.createElement("style")
rippleStyleSheet.textContent = rippleStyles
document.head.appendChild(rippleStyleSheet)
