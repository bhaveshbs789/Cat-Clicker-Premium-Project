//--------model--------------
var model = {
	currentCat : null,
	adminViewVisible: false,
	cats : [
		{
			clickCount : 0,
			catName: "huey",
			catImageLocation: "images/huey.jpg"
		},
		{
			clickCount : 0,
			catName: "dewey",
			catImageLocation: "images/dewey.jpg"
		},
		{
			clickCount : 0,
			catName: "louie",
			catImageLocation: "images/louie.jpg"
		},
		{
			clickCount : 0,
			catName: "jim",
			catImageLocation: "images/jim.jpg"
		},
		{
			clickCount : 0,
			catName: "berta",
			catImageLocation: "images/berta.jpg"
		}
	]
}

//----------The octopus aka the controller------	

var octopus = {
	init: function(){
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
		adminView.init();
		adminView.hide();

	},
	getCurrentCat: function(){
		return model.currentCat;
	},
	getCats: function(){
		return model.cats;
	},
	setCurrentCat: function(cat){
		model.currentCat = cat;
	},
	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	},
	showAdmin: function(){
		if(model.adminViewVisible == false){
			model.adminViewVisible == true;
			adminView.show();
			adminView.render();
		} else {
			model.adminViewVisible == false;
			adminView.hide();
		}
	},
	hideAdmin: function(){
		adminView.hide();
	},
	saveAdmin: function(){
		model.currentCat.catName = adminView.adminCatName.value;
		model.currentCat.catImageLocation = adminView.adminCatUrl.value;
		model.currentCat.clickCount = adminView.adminCatClicks.value;
		catView.render();
		catListView.render();
		adminView.hide();

	},
	cancelAdmin: function(){
		adminView.hide();
	}

}

//---------------Views-----------------------
var catView = {
	init: function(){
		this.catElem = document.getElementById('cat');
		this.catName = document.getElementById('cat-name');
		this.catClickCount = document.getElementById('cat-click-count');
		this.catImage = document.getElementById('cat-image');

		this.catImage.addEventListener('click',function(){
			octopus.incrementCounter();
		})

		this.render();
	},
	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.catName.textContent = currentCat.catName;
		this.catClickCount.textContent = currentCat.clickCount;
		this.catImage.src = currentCat.catImageLocation;
	}
}

var catListView = {
	init: function(){
		this.catList = document.getElementById('cat-list');

		this.render();
	},
	render: function(){
		var cat,liElem,i;
		var cats = octopus.getCats();

		this.catList.innerHTML = '';

		for(i=0; i<cats.length; i++){
			cat = cats[i];

			liElem = document.createElement('li');
			liElem.textContent = cat.catName;

			liElem.addEventListener('click',(function(c){
				return function(){
					octopus.setCurrentCat(c);
					catView.render();
					//octopus.incrementCounter(); //- dont want the the counter to 
					// increase when clicking on li element ie in list
					adminView.render();
				};
			})(cat));

			this.catList.appendChild(liElem);
		}
	}
};

var adminView = {
	init: function(){
		this.adminCatName = document.getElementById('admin-Cat-Name');
		this.adminCatUrl = document.getElementById('admin-Cat-Url');
		this.adminCatClicks = document.getElementById('admin-Cat-Clicks');

		var admin = document.getElementById('admin');
		

		this.adminButton = document.getElementById('admin-button');
		this.adminButtonCancel = document.getElementById('admin-cancel');
		this.adminButtonSave = document.getElementById('admin-save');

		this.adminButton.addEventListener('click', function(){
			octopus.showAdmin();
		});

		this.adminButtonCancel.addEventListener('click', function(){
			octopus.hideAdmin();
		});

		this.adminButtonSave.addEventListener('click', function(){
			octopus.saveAdmin();
		});

		this.render();
	},

	show: function(){
		admin.style.display = 'block';
	},

	hide: function(){
		//debugger
		admin.style.display = 'none';
	},

	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.adminCatName.value = currentCat.catName;
		this.adminCatUrl.value = currentCat.catImageLocation;
		this.adminCatClicks.value = currentCat.clickCount;
	}
};

octopus.init();
