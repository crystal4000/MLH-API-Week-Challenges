// This script fetches random user data and their country information from two different APIs
// and displays it on the webpage. It also handles loading states and error messages.
// The script uses the RandomUser API to get user data and the REST Countries API to get country information.
// The script is designed to be run in a browser environment and uses the Fetch API to make network requests.
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const loader = document.getElementById('loader');
    const profileContainer = document.getElementById('profileContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    // User elements
    const userImage = document.getElementById('userImage');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const userCity = document.getElementById('userCity');
    const userCountry = document.getElementById('userCountry');
    const userAge = document.getElementById('userAge');
    
    // Country elements
    const countryFlag = document.getElementById('countryFlag');
    const countryName = document.getElementById('countryName');
    const countryOfficialName = document.getElementById('countryOfficialName');
    const countryCapital = document.getElementById('countryCapital');
    const countryRegion = document.getElementById('countryRegion');
    const countrySubregion = document.getElementById('countrySubregion');
    const countryPopulation = document.getElementById('countryPopulation');
    const countryCurrencies = document.getElementById('countryCurrencies');
    const countryLanguages = document.getElementById('countryLanguages');
    const countryTimezones = document.getElementById('countryTimezones');
    
   
    generateBtn.addEventListener('click', generateProfile);
    
   
    generateProfile();
    
    
    async function generateProfile() {
        // Reset UI
        showLoader();
        hideError();
        
        try {
            // 1. Get random user data
            const userData = await fetchRandomUser();
            
            // 2. Use the user's country to get country info
            const countryData = await fetchCountryInfo(userData.location.country);
            
            // 3. Update the UI with the data
            updateUserUI(userData);
            updateCountryUI(countryData);
            
            // 4. Show the profile container
            showProfile();
        } catch (error) {
            console.error('Error generating profile:', error);
            showError();
        } finally {
            hideLoader();
        }
    }
    
   
    async function fetchRandomUser() {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        return data.results[0];
    }
    
 
    async function fetchCountryInfo(countryName) {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        return data[0];
    }
    
    
    function updateUserUI(userData) {
        userImage.src = userData.picture.large;
        userName.textContent = `${userData.name.first} ${userData.name.last}`;
        userEmail.textContent = userData.email;
        userPhone.textContent = userData.phone;
        userCity.textContent = userData.location.city;
        userCountry.textContent = userData.location.country;
        userAge.textContent = `${userData.dob.age} years old`;
    }
    
   
    function updateCountryUI(countryData) {
        countryFlag.src = countryData.flags.png;
        countryName.textContent = countryData.name.common;
        countryOfficialName.textContent = countryData.name.official;
        countryCapital.textContent = countryData.capital ? countryData.capital[0] : 'N/A';
        countryRegion.textContent = countryData.region;
        countrySubregion.textContent = countryData.subregion || 'N/A';
        countryPopulation.textContent = formatNumber(countryData.population);
        
        // Format currencies
        const currencyList = [];
        if (countryData.currencies) {
            for (const code in countryData.currencies) {
                currencyList.push(`${code} - ${countryData.currencies[code].name}`);
            }
        }
        countryCurrencies.textContent = currencyList.join(', ') || 'N/A';
        
        // Format languages
        const languageList = [];
        if (countryData.languages) {
            for (const code in countryData.languages) {
                languageList.push(countryData.languages[code]);
            }
        }
        countryLanguages.textContent = languageList.join(', ') || 'N/A';
        
        // Format timezones
        countryTimezones.textContent = countryData.timezones ? countryData.timezones.join(', ') : 'N/A';
    }
    
    // Helper function to format numbers with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // UI helper functions
    function showLoader() {
        loader.style.display = 'block';
        profileContainer.style.display = 'none';
    }
    
    function hideLoader() {
        loader.style.display = 'none';
    }
    
    function showProfile() {
        profileContainer.style.display = 'grid';
    }
    
    function showError() {
        errorMessage.style.display = 'block';
    }
    
    function hideError() {
        errorMessage.style.display = 'none';
    }
});
