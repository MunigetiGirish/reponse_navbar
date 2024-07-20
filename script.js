let menuList = document.getElementById("menuList")
let content = document.getElementById("content")
menuList.style.maxHeight = "0px";

function toggleMenu(){
    if(menuList.style.maxHeight == "0px")
    {
        menuList.style.maxHeight = "300px";
        content.style.paddingTop="300px";
    }
    else{
        menuList.style.maxHeight = "0px";
        content.style.paddingTop="0px";
    }
   
}
document.addEventListener('DOMContentLoaded', () => {
    const navlinks = document.querySelectorAll('.nav_link');
    const contentDiv = document.getElementById('content');

    // Function to load content
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
                // Update active class
                navlinks.forEach(navlink => navlink.classList.remove('active'));
                document.querySelector(`a[href="${url}"]`).classList.add('active');
            })
            .catch(err => console.error('Error loading content:', err));
    }

    // Attach event listeners to nav links
    navlinks.forEach(navlink => {
        navlink.addEventListener('click', event => {
            event.preventDefault();
            const url = navlink.getAttribute('href');
            loadContent(url);
            history.pushState(null, '', url); // Update the URL without reloading the page
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });

    // Load initial content
    //loadContent(window.location.pathname);
});
