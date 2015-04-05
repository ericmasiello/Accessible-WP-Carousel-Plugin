# Accessible-WP-Carousel-Plugin

## Shortcodes

To create an accessible carousel, inside of a post or page insert a `[carousel]` shortcode tag with a corresponding closing `[/carousel]` tag.

Then, between carousel opening and closing tag, insert a `[carousel_item]` along with the closing `[/carousel_item]` for each image/content area you would like to appear in your carousel. Insert your images between the  carousel_item tags.

Example:


<pre>Some random content.

[carousel]
    [carousel_item]
        &lt;img src="/path/to/image/1" alt="Alt text 1" /&gt;
    [/carousel_item]
    [carousel_item]
        &lt;img src="/path/to/image/2" alt="Alt text 2" /&gt;
    [/carousel_item]
    [carousel_item]
        &lt;img src="/path/to/image/3" alt="Alt text 3" /&gt;
    [/carousel_item]
[/carousel]
</pre>

## Shortcode properties

### carousel properties

#### Autoplay
By default, your carousel will not automatically start playing. If you would like it to, add the `autoplay=true` attribute to the opening carousel tag. Example: `[carousel autoplay=true]`.

#### Delay
By default, your carousel will have a delay of 4 seconds between each slide once you start playing. If you wish to change that value, set the `delay` attribute to the number of seconds you wish to use. Example: `[carousel delay=3]` (delay of 3 seconds).

### carousel_item properties

#### Overlay text
You can overlay text on top of your slide's image by setting the `text` attribute. Example: `[carousel_item text="This message will appear on top of my image"]...[/carousel_item]`

#### Overlay text alignment
By default, any text set using the `text` attribute will align to the left. If you wish to set the text to align to the right, simply set both the `text` and `align` properties. Example: `[carousel_item text="I will be to the right" align="right"]...[/carousel_item]`




