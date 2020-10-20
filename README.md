
# Library
### That is my personal library.
It contains utilities for web development.
 It can also be used as a portfolio.

## Carousel
Recoding a carousel/slider (like [here](https://getbootstrap.com/docs/4.0/components/carousel/)) with vanilla **JavaScript**
### How to use ?
Add **.css** .and **.js** files to your repository and link them to your **.html** :

    <link rel="stylesheet" href="{css_folder_path}/carousel.css">
    <script  src="{js_folder_path}/carousel.js"></script>

Now, add carousel's HTML structure in your code :

	<div class="carousel">
		<div class="carousel__inner>
			<div class="carousel__slide>First slide</div>
			<div class="carousel__slide>Second slide</div>
			<div class="carousel__slide>Third slide</div>
		</div>
		<ul class="carousel__nav>
			<li class="carousel__item></li>
			<li class="carousel__item></li>
			<li class="carousel__item></li>
		</ul>
		<div class="carousel__arrow--prev></div>
		<div class="carousel__arrow--next></div>
	</div>
*Here, there are 3 slides, but you can put as much as you want. Just remember to put as much of .carousel__item as .carousel__slide .*

The .js file provides a **Carousel** class.
In an other .js file or in a script tag, instanciate an object and call the **run** method :

	new Carousel().run();
*The default behavior of the **Carousel** is to take the first **.carousel** that is found and apply the script to it.*

You can create several carousels like this : 
	
	new Carousel(document.querySelector(".first-carousel").run();
	new Carousel(document.querySelector(".second-carousel").run();

## Contact

 - [Mail address](merlandepierrick@gmail.com)
 - [Linkedin](https://www.linkedin.com/in/pierrick-merlande-603628122/)
 - [Github](https://github.com/rickpi)
