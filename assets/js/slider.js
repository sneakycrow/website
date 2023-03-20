import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState} from "https://cdn.skypack.dev/preact/hooks";
import htm from "https://cdn.skypack.dev/htm";

// Initialize htm with Preact
const html = htm.bind(h);

const Slider = ({slides = []}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const prevSlide = () => {
        if (currentSlideIndex === 0) {
            setCurrentSlideIndex(slides.length - 1);
        } else {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    }

    const updated_at = new Date("2022-12-01 02:44:01 UTC").toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'utc'
        }
    );

    return html`
        <div class="project-card">
            <div>
                ${slides[currentSlideIndex].private ?
                        html`<h4 class="private">
                            Project: ${slides[currentSlideIndex].short_name}
                        </h4>`
                        :
                        html`<h4 class="public">
                            Project: <a
                                href=${"https://github.com/" + slides[currentSlideIndex].repository}>${slides[currentSlideIndex].short_name}</a>
                        </h4>`
                }
                <ul class="language-list">
                    ${slides[currentSlideIndex].languages?.map(lang => html`
                        <li>${lang.name}</li>
                    `)}
                </ul>
                <p>${slides[currentSlideIndex].description}</p>
            </div>
            <button onClick=${() => prevSlide()}>
                next
            </button>
        </div>
    `
}

const target = document.querySelectorAll
(".slider")

target.forEach(node => {
    let parsed_slides = JSON.parse(node.dataset.slides);
    if (parsed_slides.length > 0) {
        return render(html`
            <${Slider} slides=${parsed_slides}/>`, node)
    }
})