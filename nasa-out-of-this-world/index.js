
// Demo API Key - Replace with your own from api.nasa.gov
const API_KEY = 'DEMO_KEY';

// Create star background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Fetch Astronomy Picture of the Day
async function fetchAPOD() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data = await response.json();
        
        const apodContainer = document.getElementById('apod-container');
        
        let mediaHTML = '';
        if (data.media_type === 'image') {
            mediaHTML = `<img src="${data.url}" alt="${data.title}" class="img-fluid apod-img">`;
        } else if (data.media_type === 'video') {
            mediaHTML = `<div class="ratio ratio-16x9">
                            <iframe src="${data.url}" title="${data.title}" allowfullscreen></iframe>
                        </div>`;
        }
        
        apodContainer.innerHTML = `
            <div>
                ${mediaHTML}
                <div class="mt-4 text-start">
                    <h3>${data.title}</h3>
                    <p class="text-muted">${data.date}</p>
                    <p>${data.explanation}</p>
                    <p class="small">Credit: ${data.copyright || 'NASA'}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching APOD:', error);
        document.getElementById('apod-container').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Unable to load Astronomy Picture of the Day. Please try again later.
            </div>
        `;
    }
}

// Fetch Earth Polychromatic Imaging Camera (EPIC) data
async function fetchEPIC() {
    try {
        const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${API_KEY}`);
        const data = await response.json();
        
        if (data.length > 0) {
            const latest = data[0];
            const date = new Date(latest.date);
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '/');
            
            // Format: https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
            const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${formattedDate}/png/${latest.image}.png?api_key=${API_KEY}`;
            
            document.querySelector('#epic-container img').src = imageUrl;
            document.getElementById('epic-date').textContent = `Date: ${date.toLocaleDateString()} - Time: ${date.toLocaleTimeString()}`;
        }
    } catch (error) {
        console.error('Error fetching EPIC data:', error);
        document.querySelector('#epic-container').innerHTML = `
            <div class="alert alert-danger h-100 d-flex align-items-center justify-content-center" role="alert">
                Unable to load Earth imagery. Please try again later.
            </div>
        `;
    }
}

// Fetch Near Earth Objects data
async function fetchNEO() {
    try {
        // Get today's date
        const today = new Date();
        const startDate = today.toISOString().slice(0, 10);
        
        // Get date 7 days from now
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
        const endDateStr = endDate.toISOString().slice(0, 10);
        
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDateStr}&api_key=${API_KEY}`);
        const data = await response.json();
        
        // Update counts
        document.getElementById('neo-count').textContent = data.element_count;
        
        let hazardousCount = 0;
        let neoListHTML = '';
        
        // Process NEO data
        Object.keys(data.near_earth_objects).forEach(date => {
            const dateObjects = data.near_earth_objects[date];
            
            dateObjects.forEach(neo => {
                if (neo.is_potentially_hazardous_asteroid) {
                    hazardousCount++;
                }
                
                // Calculate a size scale for visualization (1-100)
                const diameterMin = neo.estimated_diameter.kilometers.estimated_diameter_min;
                const diameterMax = neo.estimated_diameter.kilometers.estimated_diameter_max;
                const avgDiameter = (diameterMin + diameterMax) / 2;
                const sizeScale = Math.min(100, Math.max(1, Math.round(avgDiameter * 50)));
                
                neoListHTML += `
                    <div class="neo-object">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5>${neo.name.replace('(', '').replace(')', '')}</h5>
                                <p class="mb-1">Date: ${new Date(date).toLocaleDateString()}</p>
                                <div class="d-flex gap-3 mb-2">
                                    <div class="custom-tooltip">
                                        <span>Size: ${avgDiameter.toFixed(2)} km</span>
                                        <span class="tooltip-text">Estimated diameter between ${diameterMin.toFixed(2)} and ${diameterMax.toFixed(2)} kilometers</span>
                                    </div>
                                    <div class="custom-tooltip">
                                        <span>Speed: ${parseInt(neo.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h</span>
                                        <span class="tooltip-text">Relative velocity during closest approach</span>
                                    </div>
                                </div>
                                <p class="mb-0">Miss Distance: ${parseInt(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
                            </div>
                            <div style="width: ${sizeScale}px; height: ${sizeScale}px; background-color: ${neo.is_potentially_hazardous_asteroid ? '#ff5722' : '#4caf50'}; border-radius: 50%;" class="ms-2 flex-shrink-0"></div>
                        </div>
                        ${neo.is_potentially_hazardous_asteroid ? '<span class="hazard-badge badge bg-danger">Potentially Hazardous</span>' : ''}
                    </div>
                `;
            });
        });
        
        document.getElementById('hazardous-count').textContent = hazardousCount;
        document.getElementById('neo-list').innerHTML = neoListHTML || '<p class="text-center">No near Earth objects found for the next 7 days.</p>';
        
    } catch (error) {
        console.error('Error fetching NEO data:', error);
        document.getElementById('neo-list').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Unable to load Near Earth Objects data. Please try again later.
            </div>
        `;
    }
}

// Initialize the application
async function initialize() {
    // Show loading indicator
    document.getElementById('loading').style.display = 'flex';
    
    // Create stars background
    createStars();
    
    // Fetch data from NASA APIs
    await Promise.all([fetchAPOD(), fetchEPIC(), fetchNEO()]);
    
    // Hide loading indicator
    document.getElementById('loading').style.display = 'none';
}

// Handle EPIC type switching (natural vs. enhanced)
document.querySelectorAll('#epic-archives button').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        // Update active button
        document.querySelectorAll('#epic-archives button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Fetch the selected type of imagery (simplified for demo)
        document.querySelector('#epic-container img').src = `/api/placeholder/800/600?text=${type.toUpperCase()}`;
    });
});

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initialize);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation for elements as they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animate__animated')) {
                const animationClass = Array.from(entry.target.classList).find(cls => cls.startsWith('animate__') && cls !== 'animate__animated');
                if (animationClass) {
                    entry.target.classList.add(animationClass);
                }
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate__animated').forEach(element => {
    const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate__') && cls !== 'animate__animated');
    if (animationClass) {
        element.classList.remove(animationClass);
        observer.observe(element);
    }
});
