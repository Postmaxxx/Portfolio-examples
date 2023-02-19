const amountOfPhotos = 20; // minimum value is 3
const url = `https://api.unsplash.com/photos?per_page=${amountOfPhotos}&query=coffee&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`;

const gallery = document.querySelector(".gallery");

function makeRequest(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data.map(item => {
                return {
                    path: item.urls.small,
                    name: item.alt_description || `Unnamed photo by ${item.user.first_name} ${item.user.last_name}`,
                    author: `${item.user.first_name} ${item.user.last_name}`,
                    width: item.width,
                    height: item.height
                };
            });
        });
}


makeRequest(url)
	.then((images) => {
		gallery.innerHTML = createGallery(images);
		makeListeners(document.querySelectorAll(".gallery__image"));
	})
	.catch(() => alert('Fetch error'));


const createGallery = (photos) => {
	return photos
		.map((item) => {
            return `<div class="gallery__image" style="background-image: url(${item.path})" data-name="${item.name}" data-width="${item.width}" data-height="${item.height}"></div>`   
        })
		.join("");
};


const makeListeners = (imagesArray) => {
	imagesArray.forEach((item, i) => {
		item.addEventListener("click", () => updateStyles(i));
	});
    gallery.addEventListener('mousewheel', (e) => {
        gallery.scrollLeft += e.deltaY / 3
    })
};


const updateStyles = (selected) => {
	const imagesArray = document.querySelectorAll(".gallery__image");
	imagesArray.forEach((item, i) => {
        if (i === selected) {
            item.classList.toggle("gallery__image_selected")

            let imageWidth = item.dataset.width;
            let imageHeight = item.dataset.height;
            const divHeight = item.clientHeight;
            const k = imageHeight / divHeight;
            const calculatedWidth = imageWidth / k;
            const minWidth = Math.min(calculatedWidth, 1100)

            item.style.minWidth = `${minWidth}px`
        } else {
            item.classList.remove("gallery__image_selected")
            item.style.minWidth = `60px`
        }
	});
};