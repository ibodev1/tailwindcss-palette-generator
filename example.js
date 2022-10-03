const getPalette = require('./index');

const palette = getPalette([
    {
        color: "rgb(255, 189, 0)",
        name: "primary",
        shade: 400
    },
    {
        color: "rgba(255, 189, 0, 1)",
        name: "secondary",
        shade: 500
    },
    {
        color: "hsl(44, 100%, 50%)",
        name: "tertiary",
        shade: 600
    },
    {
        color: "#FFBD00",
        name: "quaternary",
        shade: 50
    }
]);

console.log(palette);