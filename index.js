const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

// Prompt user for inputs
inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter the text for the logo (up to 3 characters):',
        validate: input => {
          if (input.length > 0 && input.length <= 3) return true;
          return 'You can enter up to 3 characters only!';
        }
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or a hexadecimal number for the text color:',
        validate: input => {
          const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(input);
          if (isValidHex || isNaN(input)) return true;
          return 'Enter a valid color keyword or a hexadecimal number!';
        }
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Circle', 'Triangle', 'Square']
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or a hexadecimal number for the shape color:',
        validate: input => {
          const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(input);
          if (isValidHex || isNaN(input)) return true;
          return 'Enter a valid color keyword or a hexadecimal number!';
        }
      }
    ]).then(answers => {
    let shape;
    switch (answers.shape) {
        case 'Triangle':
            shape = new Triangle(answers.shapeColor);
            break;
        case 'Circle':
            shape = new Circle(answers.shapeColor);
            break;
        case 'Square':
            shape = new Square(answers.shapeColor);
            break;
        default:
            console.error('Invalid shape selection');
            return;
    }

    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape.render()}
            <text x="150" y="115" font-family="Arial" font-size="40" fill="${answers.textColor}" text-anchor="middle">
                ${answers.text}
            </text>
        </svg>
    `;

    fs.writeFileSync('./output/logo.svg', svgContent);
    console.log("Generated logo.svg");
});
