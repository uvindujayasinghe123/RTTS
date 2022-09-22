import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Paper, Typography } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const places = [
  {
    name: "Colombo",
    description:
      "<p>" +
      "The capital combines modern urban amenities with the country's colorful indigenous and colonial history. As a key stop on the world spice trade routes, Sri Lanka has long held strategic importance for European trading powers. The country has been a colony of Portugal, the Netherlands, and most recently the British, and all these cultures blend with the native culture to form a wonderful hybrid. You can taste these influences in food, see them in architecture and the arts, and you can really feel them in Colombo." +
      "</p><p>The city is also filled with museums and other things to see and do that can help connect you with Sri Lankan culture. Colombo sits on the coast, and there's a large green space and beach area right in the heart of the city separating an area called Fort from the Indian Ocean. It's the city's public playground and a fun place to visit, especially on Friday and Saturday nights." +
      "</p>" +
      "<ul><li>National Museum of Colombo</li><li>Viharamahadevi Park</li><li>National Zoological Gardens</li><li>Mount Lavinia Beach</li></ul>",
    images: [
      require("./rail/col1.jpg"),
      require("./rail/col2.jpg"),
      require("./rail/col3.jpg"),
      require("./rail/col4.jpg"),
      require("./rail/col5.jpg"),
      require("./rail/col6.jpg"),
      require("./rail/col7.jpg"),
    ],
  },
  {
    name: "Kandy",
    description:
      `<p>Located in central Sri Lanka, Kandy is the former capital city of the Sri Lankan royal dynasty, the country's main capital before the colonial period. The high point of what's called the "Kandian Era" was between the 15th and 18th centuries, when the area remained independent while most of the coastal regions were colonized by European powers.</p>` +
      `<p>Be sure to visit the city's National Museum of Kandy, as it illustrates the story of the region and its people via exhibits and artifacts. Nearby, the Temple of the Sacred Tooth Relic is a very holy Buddhist shrine, part of the royal palace complex.</p>`,
    images: [
      require("./rail/kan1.jpg"),
      require("./rail/kan2.jpg"),
      require("./rail/kan3.jpg"),
      require("./rail/kan4.jpg"),
    ],
  },
  {
    name: "Galle",
    description:
      `<p>The city of Galle is about a two-hour drive from Colombo via one of the country's first modern superhighways. This ancient trading port mainly reflects its colonial history and is focused around a large, 17th-century seafront fort.</p>` +
      `<p>Galle Fort is an entire preserved walled town, now filled with boutique hotels, shops, and restaurants (along with real residents). The entire area is a UNESCO World Heritage Site.</p>` +
      `<p>This is a great place to explore on foot — the entire Fort area is car-free. It's hard to get lost, as you're surrounded on three sides by the sea.</p>` +
      `<p>Aside from and outside the fort, the city is surrounded by some amazing beaches. Like others in the country, the wide sand beach leads into clear, turquoise water. There's even a beach right beneath the iconic Galle lighthouse.</p>`,
    images: [
      require("./rail/gal1.jpg"),
      require("./rail/gal2.png"),
      require("./rail/gal3.jpg"),
      require("./rail/gal4.jpg"),
    ],
  },
];

const Travel = (props) => {
  return (
    <React.Fragment>
      {places.map((place) => {
        return (
          <Paper style={{ margin: "10px 20% 10px 20%", padding: "40px" }}>
            <Carousel dynamicHeight={true}>
              {place.images.map((image) => {
                return (
                  <div>
                    <img src={image} alt="img" />
                  </div>
                );
              })}
            </Carousel>
            <Typography variant="h2">{place.name}</Typography>
            <div dangerouslySetInnerHTML={{ __html: place.description }}></div>
          </Paper>
        );
      })}
    </React.Fragment>
  );
};

export default Travel;
