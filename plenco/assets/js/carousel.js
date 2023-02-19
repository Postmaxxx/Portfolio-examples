let items = document.querySelector("[data-bs-ride='carousel']").querySelectorAll("[data-obj='carousel-item']")

if (items) {
    items.forEach((el) => {
        const minPerSlide = 2
        let next = el.nextElementSibling
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
              }
              
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })
}

//# sourceMappingURL=carousel.js.map
