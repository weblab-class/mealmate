function newNavbarItem(text, url, currentPath, user) {
	const itemBox = document.createElement('li');
	const itemLink = document.createElement('a');
	itemLink.innerHTML = text;
	itemLink.href = url;
    console.log("url: " + url);
    console.log("currentPath: " + currentPath);
	if (url == currentPath) {
		itemLink.className = "active";
	}
    if (user != undefined) {
        if (url == (currentPath + "?" + user._id)) {
            itemLink.className = "active";
        }
    }
	itemBox.appendChild(itemLink);

	return itemBox;
}

//Bootstrap dropdown source: https://www.w3schools.com/bootstrap/bootstrap_ref_js_dropdown.asp
function newDropdown(text, links, linkLabels, currentPath, user){
	const dropdownBox = document.createElement('li'); //itemBox = dropdownBox
	dropdownBox.className = "dropdown";

	const dropButton = document.createElement('button');
	dropdownBox.appendChild(dropButton);
	dropButton.className = "btn btn-primary dropdown-toggle"; //bootstrap button styling
	dropButton.type="button";
	dropButton.setAttribute("data-toggle", "dropdown");
	dropButton.innerHTML= text+" <span class='caret'></span>";
    
	const dropMenu = document.createElement('ul');
	dropdownBox.appendChild(dropMenu);
	dropMenu.className="dropdown-menu dropdown-menu-left";
	dropMenu.setAttribute("role", "menu");
	dropMenu.setAttribute("aria-labelledby", "menu1");

	for (let i = 0; i < links.length; i++){
		const dropItem = document.createElement('li');
        dropItem.className="dropdown-li text-center";
		dropMenu.appendChild(dropItem);
		dropItem.setAttribute("role", "presentation");

		const dropLink = document.createElement('a'); //itemLink = dropLink
        dropLink.className="dropdown-a";
		dropItem.appendChild(dropLink);
		dropLink.setAttribute("role", "menuitem");
		dropLink.setAttribute("tabindex", "-1");
		dropLink.href=links[i];
		dropLink.innerHTML=linkLabels[i];
        
        if (links[i] == currentPath) {
            dropLink.className = "dropdown-a active";
        }
        if (user != undefined) {
            if (links[i] == (currentPath + "?" + user._id)) {
                dropLink.className = "dropdown-a active";
                dropButton.className = "btn btn-primary dropdown-toggle bold"
            }
        }
        
	}
    
    
    
	/*opens menu when hover, goes to first link if click*/
    /*do something if width is less than a certain amount: https://stackoverflow.com/questions/7715124/do-something-if-screen-width-is-less-than-960-px */
    if ($(window).width() > 768) {
       console.log("Greater than 768");
       dropdownBox.addEventListener("mouseover", function(){
		  dropMenu.style.display = "block";
	   });
	   dropdownBox.addEventListener("mouseout", function(){
		  dropMenu.style.display = "none";
       });
    }
    else {
       console.log("Less than 768");
    }
    
    $(window).resize(function() {
      if ($(window).width() > 768) {
         console.log('Resized greated than 768');
         dropdownBox.addEventListener("mouseover", function(){
		    dropMenu.style.display = "block";
	     });
	     dropdownBox.addEventListener("mouseout", function(){
		    dropMenu.style.display = "none";
         });
      }
     else {
        console.log('Resized less than 768');
        /* Want to make it not show up, but idk how... */
     }
    });
    
	/*
	dropButton.addEventListener("click", function(){
        document.location.href = links[0];
	});
	*/

	return dropdownBox;
}


function renderNavbar(user){
	const navbarDiv = document.getElementById('myNavbar');
	const navbarObjects = document.createElement('ul');
	navbarObjects.className = "nav navbar-nav navbar-right";

	const currentPath = window.location.pathname; // get the current page
	
	navbarObjects.appendChild(newNavbarItem('HOME', '/', currentPath));
    navbarObjects.appendChild(newNavbarItem('ABOUT', '/about', currentPath));
    
	if (user._id !== undefined) {
		//navbarObjects.appendChild(newNavbarItem('PROFILE', '/u/profile?'+user._id, currentPath, user)); 
        //navbarObjects.appendChild(newNavbarItem('FIND', '/u/findMealmate?'+user._id, currentPath, user));
        //navbarObjects.appendChild(newNavbarItem('MATCHES', '/u/matches?'+user._id, currentPath, user));
		//navbarObjects.innerHTML = '<div class="dropdown"> <button class="dropbtn">Dropdown <i class="fa fa-caret-down"></i> </button> <div class="dropdown-content">  <a href="#">Link 1</a>  <a href="#">Link 2</a> <a href="#">Link 3</a> </div </div> ';
		navbarObjects.appendChild(newDropdown('PROFILE', ['/u/profile?'+user._id, '/u/edit?'+user._id], ['VIEW', 'EDIT'], currentPath, user));
        navbarObjects.appendChild(newDropdown('MATCHES', ['/u/matches?'+user._id, '/u/findMealmate?'+user._id], ['CURRENT', 'FIND'], currentPath, user));
		navbarObjects.appendChild(newNavbarItem('LOGOUT', '/logout', currentPath, user));
	} else {
		navbarObjects.appendChild(newNavbarItem('LOGIN', 'auth/facebook', currentPath)); // add this when FB authentication happens
	}
	
	navbarDiv.appendChild(navbarObjects);
	
}