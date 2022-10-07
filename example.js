const getPalette = require('./index');

const arrayPalette = getPalette([
    {
        color: "rgb(255, 189, 0)", // required
        name: "primary", // required
        shade: 400
    },
    {
        color: "rgba(255, 189, 0, 1)", // required
        name: "secondary", // required
        shade: 500
    },
    {
        color: "hsl(44, 100%, 50%)", // required
        name: "tertiary", // required
        shade: 600
    },
    {
        color: "#FFBD00", // required
        name: "quaternary", // required
        shade: 300, // you will set shades is mandatory
        shades: [100, 200, 300, 400, 500]
    }
]);

// const objectPalette = getPalette({
//     color: "#FFBD00", // required
//     name: "primary", // required
//     shade: 300, // you will set shaders is mandatory
//     shades: [100, 200, 300, 400, 500]
// });

// const stringPalette = getPalette("#FFBD00");

console.log(arrayPalette);